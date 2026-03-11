import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FilterControls } from "@/components/filter-controls";
import { RecipeCard } from "@/components/recipe-card";
import { RecipeDetailModal } from "@/components/recipe-detail-modal";
import { PickyEaterSuggestions } from "@/components/picky-eater-suggestions";
import { EmptyState } from "@/components/empty-state";
import { LoadingGrid } from "@/components/loading-skeleton";
import type { Recipe, SideAddOn, FilterOptions } from "@shared/schema";

const defaultFilters: FilterOptions = {
  familySize: 4,
  dietaryType: "all",
  priceLevel: "all",
  hasPickyEater: false,
  pickyEaterRestrictions: [],
};

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipesUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("familySize", filters.familySize.toString());
    if (filters.dietaryType !== "all") {
      params.set("dietaryType", filters.dietaryType);
    }
    if (filters.priceLevel !== "all") {
      params.set("priceLevel", filters.priceLevel);
    }
    return `/api/recipes?${params.toString()}`;
  }, [filters.familySize, filters.dietaryType, filters.priceLevel]);

  const { data: recipes = [], isLoading: recipesLoading } = useQuery<Recipe[]>({
    queryKey: [recipesUrl],
  });

  const addOnsUrl = useMemo(() => {
    const params = new URLSearchParams();
    filters.pickyEaterRestrictions.forEach((r) => params.append("restrictions", r));
    return `/api/addons?${params.toString()}`;
  }, [filters.pickyEaterRestrictions]);

  const { data: addOns = [] } = useQuery<SideAddOn[]>({
    queryKey: [addOnsUrl],
    enabled: filters.hasPickyEater && filters.pickyEaterRestrictions.length > 0,
  });

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-page-title">
            Find Your Perfect Dinner
          </h2>
          <p className="text-muted-foreground">
            Customize your search to find healthy meals that work for your whole family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <FilterControls filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8">
            {filters.hasPickyEater && filters.pickyEaterRestrictions.length > 0 && (
              <PickyEaterSuggestions
                addOns={addOns}
                restrictions={filters.pickyEaterRestrictions}
              />
            )}

            <div>
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <h3 className="font-semibold text-lg" data-testid="text-recipes-heading">
                  {recipesLoading
                    ? "Loading recipes..."
                    : `${recipes.length} Recipes for ${filters.familySize} People`}
                </h3>
              </div>

              {recipesLoading ? (
                <LoadingGrid />
              ) : recipes.length === 0 ? (
                <EmptyState onClearFilters={clearFilters} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="grid-recipes">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      familySize={filters.familySize}
                      onViewDetails={setSelectedRecipe}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <RecipeDetailModal
        recipe={selectedRecipe}
        familySize={filters.familySize}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <Footer />
    </div>
  );
}
