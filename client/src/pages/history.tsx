import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { Star, UtensilsCrossed } from "lucide-react";
import type { DinnerHistory } from "@shared/schema";

function StarRating({
  rating,
  onRate,
  interactive = false,
}: {
  rating: number | null;
  onRate?: (value: number) => void;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? rating ?? 0;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          disabled={!interactive}
          className={interactive ? "cursor-pointer" : "cursor-default"}
          onClick={() => onRate?.(value)}
          onMouseEnter={() => interactive && setHovered(value)}
          onMouseLeave={() => interactive && setHovered(null)}
          data-testid={`star-${value}`}
        >
          <Star
            className={`h-5 w-5 ${
              value <= display
                ? "fill-amber-400 text-amber-400"
                : "text-stone-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function HistoryPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const {
    data: history,
    isLoading,
    error,
  } = useQuery<DinnerHistory[] | null>({
    queryKey: ["/api/user/history"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      rating,
      notes,
    }: {
      id: string;
      rating: number | null;
      notes: string;
    }) => {
      return apiRequest("PATCH", `/api/user/history/${id}`, { rating, notes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/history"] });
      setEditingId(null);
      setEditRating(null);
      setEditNotes("");
    },
  });

  const startEditing = (item: DinnerHistory) => {
    setEditingId(item.id);
    setEditRating(item.rating);
    setEditNotes(item.notes || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditRating(null);
    setEditNotes("");
  };

  const sortedHistory = history
    ? [...history].sort((a, b) => {
        const dateA = a.cookedAt ? new Date(a.cookedAt).getTime() : 0;
        const dateB = b.cookedAt ? new Date(b.cookedAt).getTime() : 0;
        return dateB - dateA;
      })
    : [];

  const isUnauthorized = history === null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            data-testid="text-page-title"
          >
            Dinner History
          </h1>
          <p className="text-stone-300 text-lg" data-testid="text-page-subtitle">
            Track what your family has been eating
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-5 bg-stone-700 rounded w-1/3" />
                    <div className="h-4 bg-stone-700 rounded w-1/4" />
                    <div className="h-4 bg-stone-700 rounded w-1/2" />
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
                Sign in to track your dinner history
              </p>
              <a href="/profile.html" data-testid="link-sign-in">
                <Button>Sign In</Button>
              </a>
            </CardContent>
          </Card>
        ) : sortedHistory.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <UtensilsCrossed className="h-12 w-12 mx-auto text-stone-500 mb-4" />
              <p
                className="text-stone-300 text-lg"
                data-testid="text-empty-state"
              >
                No dinner history yet
              </p>
              <p className="text-stone-500 text-sm mt-1">
                Your meals will appear here once you start tracking
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((item) => (
              <Card key={item.id} data-testid={`card-history-${item.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className="text-white font-semibold text-lg"
                          data-testid={`text-meal-name-${item.id}`}
                        >
                          {item.mealName}
                        </h3>
                        <Badge
                          variant="secondary"
                          data-testid={`badge-meal-type-${item.id}`}
                        >
                          {item.mealType}
                        </Badge>
                      </div>

                      {item.source && (
                        <p
                          className="text-stone-300 text-sm"
                          data-testid={`text-source-${item.id}`}
                        >
                          Source: {item.source}
                        </p>
                      )}

                      {item.cookedAt && (
                        <p
                          className="text-stone-400 text-sm"
                          data-testid={`text-date-${item.id}`}
                        >
                          {new Date(item.cookedAt).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      )}

                      {editingId === item.id ? (
                        <div className="space-y-3 mt-3">
                          <div>
                            <p className="text-stone-300 text-sm mb-1">
                              Your Rating
                            </p>
                            <StarRating
                              rating={editRating}
                              onRate={setEditRating}
                              interactive
                            />
                          </div>
                          <div>
                            <p className="text-stone-300 text-sm mb-1">Notes</p>
                            <textarea
                              className="w-full bg-stone-800 border border-stone-700 rounded-md p-2 text-stone-200 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-amber-400"
                              rows={2}
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="How was this meal?"
                              data-testid={`input-notes-${item.id}`}
                            />
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              size="sm"
                              onClick={() =>
                                updateMutation.mutate({
                                  id: item.id,
                                  rating: editRating,
                                  notes: editNotes,
                                })
                              }
                              disabled={updateMutation.isPending}
                              data-testid={`button-save-${item.id}`}
                            >
                              {updateMutation.isPending ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelEditing}
                              data-testid={`button-cancel-${item.id}`}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 space-y-1">
                          <StarRating rating={item.rating} />
                          {item.notes && (
                            <p
                              className="text-stone-400 text-sm italic"
                              data-testid={`text-notes-${item.id}`}
                            >
                              {item.notes}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {editingId !== item.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(item)}
                        className="text-amber-400"
                        data-testid={`button-rate-${item.id}`}
                      >
                        Rate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
