import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearch } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RecipeDetailModal } from "@/components/recipe-detail-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Dices, ChefHat, Check, X, Sparkles, Globe, HelpCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { PantryIngredient, RecipeMatch, PantryCategory, Recipe, CuisineType } from "@shared/schema";
import { cuisineTypes, cuisineLabels } from "@shared/schema";

const categoryLabels: Record<PantryCategory, string> = {
  proteins: "Proteins",
  vegetables: "Vegetables",
  grains: "Grains & Starches",
  dairy: "Dairy",
  "pantry-staples": "Pantry Staples",
  "herbs-spices": "Herbs & Spices",
};

const categoryOrder: PantryCategory[] = ["proteins", "vegetables", "grains", "dairy", "pantry-staples", "herbs-spices"];

function SpinAnimation({ isSpinning, isMystery = false }: { isSpinning: boolean; isMystery?: boolean }) {
  if (!isSpinning) return null;
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            {isMystery ? (
              <HelpCircle className="h-12 w-12 text-primary animate-pulse" />
            ) : (
              <Dices className="h-12 w-12 text-primary animate-pulse" />
            )}
          </div>
        </div>
        <p className="text-lg font-semibold animate-pulse">
          {isMystery ? "Mystery spinning..." : "Spinning the rolls..."}
        </p>
        <p className="text-sm text-muted-foreground">
          {isMystery ? "Discovering a recipe from around the world!" : "What will you cook tonight?"}
        </p>
      </div>
    </div>
  );
}

function RecipeMatchCard({ match, onViewDetails }: { match: RecipeMatch; onViewDetails: () => void }) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-amber-600 dark:text-amber-400";
    if (percentage >= 50) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-amber-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-match-${match.recipe.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base">{match.recipe.name}</CardTitle>
            {match.recipe.origin && (
              <div className="flex items-center gap-1 mt-1">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{match.recipe.origin}</span>
              </div>
            )}
          </div>
          <Badge variant="secondary" className={getMatchColor(match.matchPercentage)}>
            {match.matchPercentage}% match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor(match.matchPercentage)} transition-all`}
            style={{ width: `${match.matchPercentage}%` }}
          />
        </div>
        
        <div className="flex flex-wrap gap-1">
          {match.matchingIngredients.slice(0, 4).map((ing) => (
            <Badge key={ing} variant="secondary" className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <Check className="h-3 w-3 mr-0.5" />
              {ing}
            </Badge>
          ))}
          {match.matchingIngredients.length > 4 && (
            <Badge variant="secondary" className="text-xs">+{match.matchingIngredients.length - 4}</Badge>
          )}
        </div>
        
        {match.missingIngredients.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {match.missingIngredients.slice(0, 3).map((ing) => (
              <Badge key={ing} variant="outline" className="text-xs text-muted-foreground">
                <X className="h-3 w-3 mr-0.5" />
                {ing}
              </Badge>
            ))}
            {match.missingIngredients.length > 3 && (
              <Badge variant="outline" className="text-xs">+{match.missingIngredients.length - 3} more</Badge>
            )}
          </div>
        )}

        <Button size="sm" className="w-full mt-2" onClick={onViewDetails} data-testid={`button-view-match-${match.recipe.id}`}>
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
}

function SpinResultModal({ 
  match, 
  open, 
  onClose, 
  onViewRecipe,
  onSpinAgain,
  isMystery = false
}: { 
  match: RecipeMatch | null; 
  open: boolean; 
  onClose: () => void;
  onViewRecipe: () => void;
  onSpinAgain: () => void;
  isMystery?: boolean;
}) {
  if (!match || !open) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-in zoom-in-95 duration-300">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            {isMystery ? <HelpCircle className="h-8 w-8 text-primary" /> : <Sparkles className="h-8 w-8 text-primary" />}
          </div>
          <CardTitle className="text-xl">
            {isMystery ? "Mystery Recipe Revealed!" : "Tonight You're Making..."}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-1">{match.recipe.name}</h3>
            {match.recipe.origin && (
              <div className="flex items-center justify-center gap-1 mb-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">From {match.recipe.origin}</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{match.recipe.description}</p>
          </div>

          {!isMystery && (
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {match.matchPercentage}% ingredient match
              </Badge>
            </div>
          )}

          {!isMystery && (
            <div className="bg-muted/50 rounded-lg p-3 text-left">
              <p className="text-xs text-muted-foreground mb-2">You have:</p>
              <div className="flex flex-wrap gap-1">
                {match.matchingIngredients.map((ing) => (
                  <Badge key={ing} variant="secondary" className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    {ing}
                  </Badge>
                ))}
              </div>
              {match.missingIngredients.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground mt-2 mb-1">You'll need:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.missingIngredients.map((ing) => (
                      <Badge key={ing} variant="outline" className="text-xs">
                        {ing}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {isMystery && (
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">
                A completely random recipe from around the world!
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onSpinAgain} className="flex-1" data-testid="button-spin-again">
              {isMystery ? <HelpCircle className="h-4 w-4 mr-1" /> : <Dices className="h-4 w-4 mr-1" />}
              {isMystery ? "Mystery Again" : "Spin Again"}
            </Button>
            <Button onClick={onViewRecipe} className="flex-1" data-testid="button-view-spin-result">
              <ChefHat className="h-4 w-4 mr-1" />
              View Recipe
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-full" data-testid="button-close-spin-result">
            Maybe Later
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Pantry() {
  const search = useSearch();
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>("all");
  const [spinResult, setSpinResult] = useState<RecipeMatch | null>(null);
  const [showSpinResult, setShowSpinResult] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isMysterySpinning, setIsMysterySpinning] = useState(false);
  const [isMysteryResult, setIsMysteryResult] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeMatch | null>(null);
  const [autoSelectApplied, setAutoSelectApplied] = useState(false);

  const { data: ingredients = [], isLoading } = useQuery<PantryIngredient[]>({
    queryKey: ["/api/pantry/ingredients"],
  });

  useEffect(() => {
    if (autoSelectApplied || ingredients.length === 0) return;
    
    const params = new URLSearchParams(search);
    const itemNames = params.getAll("item");
    
    if (itemNames.length > 0) {
      const matchedIds = new Set<string>();
      
      itemNames.forEach(itemName => {
        const normalizedName = itemName.toLowerCase().trim();
        const matchingIngredient = ingredients.find(ing => 
          ing.name.toLowerCase().includes(normalizedName) || 
          normalizedName.includes(ing.name.toLowerCase())
        );
        if (matchingIngredient) {
          matchedIds.add(matchingIngredient.id);
        }
      });
      
      if (matchedIds.size > 0) {
        setSelectedIngredients(matchedIds);
      }
      setAutoSelectApplied(true);
    }
  }, [search, ingredients, autoSelectApplied]);

  const matchMutation = useMutation({
    mutationFn: async (ingredientIds: string[]) => {
      const response = await apiRequest("POST", "/api/pantry/match", { 
        ingredientIds, 
        cuisine: selectedCuisine 
      });
      return response.json() as Promise<RecipeMatch[]>;
    },
  });

  const spinMutation = useMutation({
    mutationFn: async (ingredientIds: string[]) => {
      const response = await apiRequest("POST", "/api/pantry/spin", { 
        ingredientIds,
        cuisine: selectedCuisine
      });
      return response.json() as Promise<RecipeMatch | null>;
    },
    onSuccess: (result) => {
      setIsSpinning(false);
      setIsMysteryResult(false);
      if (result) {
        setSpinResult(result);
        setShowSpinResult(true);
      }
    },
  });

  const mysterySpinMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/pantry/mystery-spin", {
        cuisine: selectedCuisine
      });
      return response.json() as Promise<Recipe>;
    },
    onSuccess: (recipe) => {
      setIsMysterySpinning(false);
      setIsMysteryResult(true);
      // Convert Recipe to RecipeMatch format for the modal
      setSpinResult({
        recipe,
        matchingIngredients: [],
        missingIngredients: [],
        matchPercentage: 0,
      });
      setShowSpinResult(true);
    },
  });

  const groupedIngredients = useMemo(() => {
    const groups: Record<PantryCategory, PantryIngredient[]> = {
      proteins: [],
      vegetables: [],
      grains: [],
      dairy: [],
      "pantry-staples": [],
      "herbs-spices": [],
    };
    ingredients.forEach((ing) => {
      groups[ing.category].push(ing);
    });
    return groups;
  }, [ingredients]);

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleFindRecipes = () => {
    matchMutation.mutate(Array.from(selectedIngredients));
  };

  const handleSpin = () => {
    if (selectedIngredients.size === 0) return;
    setIsSpinning(true);
    // Add a delay for the spinning animation
    setTimeout(() => {
      spinMutation.mutate(Array.from(selectedIngredients));
    }, 1500);
  };

  const handleMysterySpin = () => {
    setIsMysterySpinning(true);
    // Add a delay for the spinning animation
    setTimeout(() => {
      mysterySpinMutation.mutate();
    }, 1500);
  };

  const clearSelection = () => {
    setSelectedIngredients(new Set());
    matchMutation.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SpinAnimation isSpinning={isSpinning || isMysterySpinning} isMystery={isMysterySpinning} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold" data-testid="text-pantry-title">
              Recipes from Around the World
            </h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Select your ingredients and discover international recipes, or try a mystery spin!
          </p>
          
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-sm font-medium">Filter by Cuisine:</label>
            <Select value={selectedCuisine} onValueChange={(value) => setSelectedCuisine(value as CuisineType)}>
              <SelectTrigger className="w-[200px]" data-testid="select-cuisine">
                <SelectValue placeholder="Select cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisineTypes.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine} data-testid={`select-cuisine-${cuisine}`}>
                    {cuisineLabels[cuisine]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCuisine !== "all" && (
              <Badge variant="secondary" className="gap-1">
                <Globe className="h-3 w-3" />
                {cuisineLabels[selectedCuisine]}
                <button 
                  onClick={() => setSelectedCuisine("all")} 
                  className="ml-1 hover:text-primary"
                  data-testid="button-clear-cuisine"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Select Your Ingredients
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{selectedIngredients.size} selected</Badge>
                    {selectedIngredients.size > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearSelection} data-testid="button-clear-selection">
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-5 w-24 mb-2" />
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: 6 }).map((_, j) => (
                            <Skeleton key={j} className="h-8 w-20" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {categoryOrder.map((category) => (
                      <div key={category}>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">
                          {categoryLabels[category]}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {groupedIngredients[category].map((ing) => {
                            const isSelected = selectedIngredients.has(ing.id);
                            return (
                              <Button
                                key={ing.id}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleIngredient(ing.id)}
                                className="gap-1.5"
                                data-testid={`button-ingredient-${ing.id}`}
                              >
                                {isSelected && <Check className="h-3 w-3" />}
                                {ing.name}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {matchMutation.data && matchMutation.data.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4" data-testid="text-matches-heading">
                  {matchMutation.data.length} Recipes You Can Make
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchMutation.data.map((match) => (
                    <RecipeMatchCard 
                      key={match.recipe.id} 
                      match={match} 
                      onViewDetails={() => setSelectedRecipe(match)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="py-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Dices className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Recipe Roulette</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Can't decide? Let fate choose your dinner!
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full gap-2"
                    disabled={selectedIngredients.size === 0 || isSpinning}
                    onClick={handleSpin}
                    data-testid="button-spin"
                  >
                    <Dices className="h-5 w-5" />
                    Spin the Rolls!
                  </Button>
                  {selectedIngredients.size === 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Select at least one ingredient to spin
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="py-4">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    disabled={selectedIngredients.size === 0 || matchMutation.isPending}
                    onClick={handleFindRecipes}
                    data-testid="button-find-recipes"
                  >
                    <ChefHat className="h-4 w-4" />
                    {matchMutation.isPending ? "Finding..." : "Find All Matching Recipes"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
                <CardContent className="py-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Mystery Spin</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Feeling adventurous? Get a completely random recipe from around the world!
                  </p>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full gap-2 border-amber-500/50 hover:bg-amber-500/10"
                    disabled={isMysterySpinning}
                    onClick={handleMysterySpin}
                    data-testid="button-mystery-spin"
                  >
                    <HelpCircle className="h-5 w-5" />
                    Mystery Recipe!
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    No ingredients needed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SpinResultModal
        match={spinResult}
        open={showSpinResult}
        onClose={() => setShowSpinResult(false)}
        onViewRecipe={() => {
          setShowSpinResult(false);
          if (spinResult) {
            setSelectedRecipe(spinResult);
          }
        }}
        onSpinAgain={() => {
          setShowSpinResult(false);
          if (isMysteryResult) {
            handleMysterySpin();
          } else {
            handleSpin();
          }
        }}
        isMystery={isMysteryResult}
      />

      <RecipeDetailModal
        recipe={selectedRecipe?.recipe || null}
        familySize={4}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <Footer />
    </div>
  );
}
