import { Clock, Users, DollarSign, ChefHat, Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
  familySize: number;
  onViewDetails: (recipe: Recipe) => void;
}

const dietaryColors: Record<string, string> = {
  meat: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "no-meat": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  vegetarian: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  vegan: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
};

const priceSymbols: Record<string, string> = {
  low: "$",
  medium: "$$",
  high: "$$$",
};

export function RecipeCard({ recipe, familySize, onViewDetails }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const servingMultiplier = familySize / recipe.servings;

  return (
    <Card className="group hover-elevate overflow-visible flex flex-col h-full">
      {recipe.imageUrl && (
        <div className="relative w-full h-40 overflow-hidden rounded-t-md">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
            loading="lazy"
            data-testid={`img-recipe-${recipe.id}`}
          />
        </div>
      )}
      <CardHeader className="pb-3 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2" data-testid={`text-recipe-name-${recipe.id}`}>
              {recipe.name}
            </h3>
          </div>
          <Badge 
            className={`shrink-0 ${dietaryColors[recipe.dietaryType]}`} 
            variant="secondary"
            data-testid={`badge-dietary-${recipe.id}`}
          >
            {recipe.dietaryType === "no-meat" ? "No Meat" : recipe.dietaryType.charAt(0).toUpperCase() + recipe.dietaryType.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-recipe-description-${recipe.id}`}>
          {recipe.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>Serves {familySize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4" />
            <span>{priceSymbols[recipe.priceLevel]}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">Nutrition Highlights</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recipe.nutritionHighlights.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button 
          className="flex-1" 
          onClick={() => onViewDetails(recipe)}
          data-testid={`button-view-recipe-${recipe.id}`}
        >
          <ChefHat className="h-4 w-4 mr-2" />
          View Recipe
        </Button>
        <Button variant="outline" size="icon" data-testid={`button-favorite-${recipe.id}`}>
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
