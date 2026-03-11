import { X, Clock, Users, DollarSign, ChefHat, ShoppingCart, Printer, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Recipe } from "@shared/schema";
import { RecipeRating } from "@/components/recipe-rating";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  familySize: number;
  open: boolean;
  onClose: () => void;
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

export function RecipeDetailModal({ recipe, familySize, open, onClose }: RecipeDetailModalProps) {
  if (!recipe) return null;

  const servingMultiplier = familySize / recipe.servings;
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold leading-tight pr-8" data-testid="text-modal-recipe-name">
                {recipe.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                {recipe.description}
              </DialogDescription>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge className={dietaryColors[recipe.dietaryType]} variant="secondary">
              {recipe.dietaryType === "no-meat" ? "No Meat" : recipe.dietaryType.charAt(0).toUpperCase() + recipe.dietaryType.slice(1)}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{totalTime} min total</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Serves {familySize}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{priceSymbols[recipe.priceLevel]}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            {recipe.nutritionHighlights.map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
            <div className="ml-auto">
              <RecipeRating recipeId={recipe.id} compact />
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[50vh]">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Ingredients
                <span className="text-sm font-normal text-muted-foreground">
                  (adjusted for {familySize} people)
                </span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm" data-testid={`text-ingredient-${index}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                <ChefHat className="h-5 w-5 text-primary" />
                Instructions
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4" data-testid={`text-instruction-${index}`}>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-muted/30 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" data-testid="button-print-recipe">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" data-testid="button-share-recipe">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button className="ml-auto" size="sm" data-testid="button-add-to-meal-plan">
            Add to Meal Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
