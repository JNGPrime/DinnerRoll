import { SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2" data-testid="text-no-recipes">No recipes found</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        We couldn't find any recipes matching your current filters. Try adjusting your preferences or clear all filters to see more options.
      </p>
      <Button onClick={onClearFilters} variant="outline" data-testid="button-clear-filters">
        <RefreshCw className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
}
