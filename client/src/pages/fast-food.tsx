import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FastFoodDetailModal } from "@/components/fast-food-detail-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Flame, Beef, Wheat, Droplet, Leaf, Heart } from "lucide-react";
import { SiDoordash, SiUbereats } from "react-icons/si";
import type { FastFoodItem, FastFoodRestaurant, DietaryType } from "@shared/schema";

function NutritionBar({ label, value, unit, max, color, icon: Icon }: { 
  label: string; 
  value: number; 
  unit: string; 
  max: number; 
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="font-medium">{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function FastFoodItemCard({ 
  item, 
  restaurant,
  onSelect
}: { 
  item: FastFoodItem; 
  restaurant?: FastFoodRestaurant;
  onSelect: () => void;
}) {
  const dietaryBadgeColors: Record<DietaryType, string> = {
    meat: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    "no-meat": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    vegetarian: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    vegan: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  };

  const dietaryLabels: Record<DietaryType, string> = {
    meat: "With Meat",
    "no-meat": "Seafood",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
  };

  return (
    <Card 
      className="hover-elevate transition-all duration-200 cursor-pointer" 
      data-testid={`card-fast-food-${item.id}`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-snug mb-1">{item.name}</CardTitle>
            <p className="text-xs text-muted-foreground font-medium">{restaurant?.name}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {item.isHealthyChoice && (
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Healthy
              </Badge>
            )}
            <Badge variant="secondary" className={dietaryBadgeColors[item.dietaryType]}>
              {dietaryLabels[item.dietaryType]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        
        <div className="p-3 bg-muted/50 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-sm font-medium mb-2">
            <span>Nutrition Facts</span>
            <Badge variant="outline">{item.nutrition.calories} cal</Badge>
          </div>
          <NutritionBar 
            label="Protein" 
            value={item.nutrition.protein} 
            unit="g" 
            max={60} 
            color="bg-red-500" 
            icon={Beef}
          />
          <NutritionBar 
            label="Carbs" 
            value={item.nutrition.carbs} 
            unit="g" 
            max={100} 
            color="bg-amber-500" 
            icon={Wheat}
          />
          <NutritionBar 
            label="Fat" 
            value={item.nutrition.fat} 
            unit="g" 
            max={50} 
            color="bg-yellow-500" 
            icon={Droplet}
          />
          <NutritionBar 
            label="Fiber" 
            value={item.nutrition.fiber} 
            unit="g" 
            max={25} 
            color="bg-amber-500" 
            icon={Leaf}
          />
          <div className="flex items-center justify-between text-xs pt-1 border-t mt-2">
            <span className="text-muted-foreground">Sodium</span>
            <span className="font-medium">{item.nutrition.sodium}mg</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
            asChild
            data-testid={`button-doordash-${item.id}`}
          >
            <a href={restaurant?.doordashUrl} target="_blank" rel="noopener noreferrer">
              <SiDoordash className="h-4 w-4 mr-1" />
              DoorDash
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
            asChild
            data-testid={`button-ubereats-${item.id}`}
          >
            <a href={restaurant?.ubereatsUrl} target="_blank" rel="noopener noreferrer">
              <SiUbereats className="h-4 w-4 mr-1" />
              Uber Eats
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/4 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function FastFood() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("all");
  const [selectedDietary, setSelectedDietary] = useState<DietaryType | "all">("all");
  const [healthyOnly, setHealthyOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ item: FastFoodItem; restaurant: FastFoodRestaurant } | null>(null);

  const { data: restaurants = [] } = useQuery<FastFoodRestaurant[]>({
    queryKey: ["/api/fast-food/restaurants"],
  });

  const itemsUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedRestaurant !== "all") {
      params.set("restaurantId", selectedRestaurant);
    }
    if (selectedDietary !== "all") {
      params.set("dietaryType", selectedDietary);
    }
    if (healthyOnly) {
      params.set("healthyOnly", "true");
    }
    return `/api/fast-food/items?${params.toString()}`;
  }, [selectedRestaurant, selectedDietary, healthyOnly]);

  const { data: items = [], isLoading } = useQuery<FastFoodItem[]>({
    queryKey: [itemsUrl],
  });

  const restaurantMap = useMemo(() => {
    return restaurants.reduce((acc, r) => {
      acc[r.id] = r;
      return acc;
    }, {} as Record<string, FastFoodRestaurant>);
  }, [restaurants]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl sm:text-3xl font-bold" data-testid="text-fastfood-title">
              Fast Food Dinners
            </h2>
          </div>
          <p className="text-muted-foreground">
            Quick dinner options with full nutritional information. Order directly through DoorDash or Uber Eats.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="restaurant" className="text-xs text-muted-foreground">Restaurant</Label>
                <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
                  <SelectTrigger id="restaurant" className="w-[160px]" data-testid="select-restaurant">
                    <SelectValue placeholder="All restaurants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Restaurants</SelectItem>
                    {restaurants.map((r) => (
                      <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dietary" className="text-xs text-muted-foreground">Dietary</Label>
                <Select value={selectedDietary} onValueChange={(v) => setSelectedDietary(v as DietaryType | "all")}>
                  <SelectTrigger id="dietary" className="w-[140px]" data-testid="select-dietary">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="meat">With Meat</SelectItem>
                    <SelectItem value="no-meat">Seafood</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <Switch 
                  id="healthy" 
                  checked={healthyOnly} 
                  onCheckedChange={setHealthyOnly}
                  data-testid="switch-healthy"
                />
                <Label htmlFor="healthy" className="flex items-center gap-1 cursor-pointer">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Healthy Choices Only</span>
                  <span className="sm:hidden">Healthy</span>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <h3 className="font-semibold text-lg" data-testid="text-items-count">
            {isLoading ? "Loading..." : `${items.length} Menu Items`}
          </h3>
        </div>

        {isLoading ? (
          <LoadingGrid />
        ) : items.length === 0 ? (
          <Card className="py-12 text-center">
            <CardContent>
              <Flame className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters to see more options.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="grid-fast-food">
            {items.map((item) => (
              <FastFoodItemCard 
                key={item.id} 
                item={item} 
                restaurant={restaurantMap[item.restaurantId]}
                onSelect={() => {
                  const restaurant = restaurantMap[item.restaurantId];
                  if (restaurant) {
                    setSelectedItem({ item, restaurant });
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>

      <FastFoodDetailModal
        item={selectedItem?.item || null}
        restaurant={selectedItem?.restaurant || null}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <Footer />
    </div>
  );
}
