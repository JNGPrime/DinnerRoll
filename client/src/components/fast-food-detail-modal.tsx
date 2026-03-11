import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Heart, Beef, Wheat, Droplet, Leaf, MapPin, Store } from "lucide-react";
import { SiDoordash, SiUbereats } from "react-icons/si";
import type { FastFoodItem, FastFoodRestaurant, DietaryType } from "@shared/schema";

function NutritionRow({ label, value, unit, icon: Icon }: { 
  label: string; 
  value: number; 
  unit: string; 
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="font-semibold">{value}{unit}</span>
    </div>
  );
}

interface FastFoodDetailModalProps {
  item: FastFoodItem | null;
  restaurant: FastFoodRestaurant | null;
  open: boolean;
  onClose: () => void;
}

export function FastFoodDetailModal({ item, restaurant, open, onClose }: FastFoodDetailModalProps) {
  if (!item || !restaurant) return null;

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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl leading-tight pr-8">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg" data-testid="text-restaurant-name">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Fast Food Restaurant
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2">
            {item.isHealthyChoice && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Heart className="h-3 w-3 mr-1" />
                Healthy Choice
              </Badge>
            )}
            <Badge variant="secondary" className={dietaryBadgeColors[item.dietaryType]}>
              {dietaryLabels[item.dietaryType]}
            </Badge>
            <Badge variant="outline">{item.nutrition.calories} calories</Badge>
          </div>

          <p className="text-muted-foreground">{item.description}</p>

          <div>
            <h4 className="font-semibold mb-3">Nutrition Information</h4>
            <Card>
              <CardContent className="py-2">
                <NutritionRow label="Calories" value={item.nutrition.calories} unit=" kcal" icon={Heart} />
                <NutritionRow label="Protein" value={item.nutrition.protein} unit="g" icon={Beef} />
                <NutritionRow label="Carbohydrates" value={item.nutrition.carbs} unit="g" icon={Wheat} />
                <NutritionRow label="Fat" value={item.nutrition.fat} unit="g" icon={Droplet} />
                <NutritionRow label="Fiber" value={item.nutrition.fiber} unit="g" icon={Leaf} />
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Sodium</span>
                  <span className="font-semibold">{item.nutrition.sodium}mg</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Order from {restaurant.name}</h4>
            <div className="flex gap-3">
              <Button 
                className="flex-1"
                asChild
                data-testid="button-modal-doordash"
              >
                <a href={restaurant.doordashUrl} target="_blank" rel="noopener noreferrer">
                  <SiDoordash className="h-5 w-5 mr-2" />
                  DoorDash
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                asChild
                data-testid="button-modal-ubereats"
              >
                <a href={restaurant.ubereatsUrl} target="_blank" rel="noopener noreferrer">
                  <SiUbereats className="h-5 w-5 mr-2" />
                  Uber Eats
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
