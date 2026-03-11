import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  UtensilsCrossed,
  ShoppingCart,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface MealPlan {
  id: string;
  userId: string;
  date: string;
  mealName: string;
  recipeId: string | null;
  source: string | null;
  servings: number | null;
  estimatedCost: string | null;
  createdAt: Date | null;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatShortDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const GROCERY_LINKS = [
  { name: "HEB", url: "https://www.heb.com/search/?q=" },
  { name: "Kroger", url: "https://www.kroger.com/search?query=" },
  { name: "Instacart", url: "https://www.instacart.com/store/search_v3/search?search_term=" },
];

export default function MealPlannerPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [addingDay, setAddingDay] = useState<string | null>(null);
  const [newMealName, setNewMealName] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const { toast } = useToast();

  const monday = useMemo(() => {
    const today = new Date();
    const mon = getMonday(today);
    mon.setDate(mon.getDate() + weekOffset * 7);
    return mon;
  }, [weekOffset]);

  const sunday = useMemo(() => {
    const sun = new Date(monday);
    sun.setDate(sun.getDate() + 6);
    return sun;
  }, [monday]);

  const startDate = formatDate(monday);
  const endDate = formatDate(sunday);

  const weekDates = useMemo(() => {
    return DAYS.map((label, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return { label, date: formatDate(d), dateObj: d };
    });
  }, [monday]);

  const {
    data: mealPlans,
    isLoading,
  } = useQuery<MealPlan[] | null>({
    queryKey: ["/api/user/meal-plans", `?startDate=${startDate}&endDate=${endDate}`],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const addMutation = useMutation({
    mutationFn: async (body: {
      date: string;
      mealName: string;
      servings: number;
    }) => {
      return apiRequest("POST", "/api/user/meal-plans", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/meal-plans"] });
      setAddingDay(null);
      setNewMealName("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/user/meal-plans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/meal-plans"] });
    },
  });

  const handleAddMeal = (date: string) => {
    if (!newMealName.trim()) return;
    addMutation.mutate({ date, mealName: newMealName.trim(), servings: 1 });
  };

  const mealsByDate = useMemo(() => {
    const map: Record<string, MealPlan[]> = {};
    if (mealPlans) {
      for (const meal of mealPlans) {
        const d = meal.date.split("T")[0];
        if (!map[d]) map[d] = [];
        map[d].push(meal);
      }
    }
    return map;
  }, [mealPlans]);

  const shoppingItems = useMemo(() => {
    if (!mealPlans || mealPlans.length === 0) return [];
    const items = new Set<string>();
    for (const meal of mealPlans) {
      items.add(meal.mealName);
    }
    return Array.from(items).sort();
  }, [mealPlans]);

  const totalCost = useMemo(() => {
    if (!mealPlans || mealPlans.length === 0) return 0;
    return mealPlans.reduce((sum, meal) => {
      if (meal.estimatedCost) {
        const cost = parseFloat(meal.estimatedCost);
        return sum + (isNaN(cost) ? 0 : cost);
      }
      return sum;
    }, 0);
  }, [mealPlans]);

  const handleExportList = async () => {
    const listContent = shoppingItems.map(item => `- Ingredients for: ${item}`).join("\n");
    const fullContent = `Shopping List\n\n${listContent}${totalCost > 0 ? `\n\nEstimated Total Cost: $${totalCost.toFixed(2)}` : ""}`;
    
    try {
      await navigator.clipboard.writeText(fullContent);
      setCopiedToClipboard(true);
      toast({
        title: "Copied to Clipboard",
        description: "Shopping list has been copied successfully",
      });
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const isUnauthorized = mealPlans === null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            data-testid="text-page-title"
          >
            Meal Planner
          </h1>
          <p className="text-stone-300 text-lg" data-testid="text-page-subtitle">
            Plan your week, skip the stress
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-5 bg-stone-700 rounded w-1/2" />
                    <div className="h-4 bg-stone-700 rounded w-3/4" />
                    <div className="h-4 bg-stone-700 rounded w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isUnauthorized ? (
          <Card>
            <CardContent className="py-12 text-center">
              <UtensilsCrossed className="h-12 w-12 mx-auto text-stone-500 mb-4" />
              <p
                className="text-stone-300 text-lg mb-4"
                data-testid="text-auth-required"
              >
                Sign in to start planning your meals
              </p>
              <a href="/profile.html" data-testid="link-sign-in">
                <Button>Sign In</Button>
              </a>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setWeekOffset((o) => o - 1)}
                data-testid="button-prev-week"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span
                className="text-white font-medium text-lg"
                data-testid="text-week-range"
              >
                {formatShortDate(monday)} - {formatShortDate(sunday)}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setWeekOffset((o) => o + 1)}
                data-testid="button-next-week"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {weekDates.map(({ label, date, dateObj }) => {
                const meals = mealsByDate[date] || [];
                const isToday = formatDate(new Date()) === date;

                return (
                  <Card
                    key={date}
                    className={isToday ? "border-amber-400/50" : ""}
                    data-testid={`card-day-${date}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <div>
                          <span className="text-white font-semibold">{label}</span>
                          <span className="text-stone-400 text-sm ml-2">
                            {formatShortDate(dateObj)}
                          </span>
                        </div>
                        {isToday && (
                          <Badge variant="secondary" data-testid="badge-today">
                            Today
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2 min-h-[60px]">
                        {meals.length === 0 && addingDay !== date && (
                          <p className="text-stone-500 text-sm italic">
                            No meals planned
                          </p>
                        )}

                        {meals.map((meal) => (
                          <div
                            key={meal.id}
                            className="flex items-center justify-between gap-2 rounded-md bg-stone-800/50 px-3 py-2"
                            data-testid={`meal-item-${meal.id}`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-wrap">
                              <span
                                className="text-white text-sm truncate"
                                data-testid={`text-meal-name-${meal.id}`}
                              >
                                {meal.mealName}
                              </span>
                              {meal.source && (
                                <Badge
                                  variant="secondary"
                                  data-testid={`badge-source-${meal.id}`}
                                >
                                  {meal.source}
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteMutation.mutate(meal.id)}
                              disabled={deleteMutation.isPending}
                              data-testid={`button-delete-meal-${meal.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-stone-400" />
                            </Button>
                          </div>
                        ))}

                        {addingDay === date ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              className="w-full bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                              placeholder="Meal name..."
                              value={newMealName}
                              onChange={(e) => setNewMealName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddMeal(date);
                                if (e.key === "Escape") {
                                  setAddingDay(null);
                                  setNewMealName("");
                                }
                              }}
                              autoFocus
                              data-testid={`input-meal-name-${date}`}
                            />
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                size="sm"
                                onClick={() => handleAddMeal(date)}
                                disabled={addMutation.isPending || !newMealName.trim()}
                                data-testid={`button-save-meal-${date}`}
                              >
                                {addMutation.isPending ? "Adding..." : "Add"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setAddingDay(null);
                                  setNewMealName("");
                                }}
                                data-testid={`button-cancel-meal-${date}`}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-amber-400"
                            onClick={() => {
                              setAddingDay(date);
                              setNewMealName("");
                            }}
                            data-testid={`button-add-meal-${date}`}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Meal
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card data-testid="card-shopping-list">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-amber-400" />
                    <h2 className="text-white text-xl font-semibold">
                      Shopping List
                    </h2>
                  </div>
                  {shoppingItems.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleExportList}
                      data-testid="button-export-list"
                      className="flex items-center gap-2"
                    >
                      {copiedToClipboard ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Export
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {shoppingItems.length === 0 ? (
                  <p className="text-stone-500 text-sm" data-testid="text-empty-shopping">
                    Add meals to your plan to generate a shopping list
                  </p>
                ) : (
                  <>
                    <ul className="space-y-2 mb-6">
                      {shoppingItems.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-stone-300 text-sm"
                          data-testid={`shopping-item-${item}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          Ingredients for: {item}
                        </li>
                      ))}
                    </ul>

                    {totalCost > 0 && (
                      <div className="bg-stone-800/50 rounded-md px-3 py-2 mb-4">
                        <p
                          className="text-amber-400 font-semibold text-sm"
                          data-testid="text-total-cost"
                        >
                          Estimated Total Cost: ${totalCost.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="border-t border-stone-700 pt-4">
                      <p className="text-stone-400 text-sm mb-3">
                        Shop for ingredients:
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {GROCERY_LINKS.map(({ name, url }) => (
                          <a
                            key={name}
                            href={`${url}${encodeURIComponent(shoppingItems.join(" "))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`link-grocery-${name.toLowerCase()}`}
                          >
                            <Button variant="outline" size="sm">
                              {name}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}