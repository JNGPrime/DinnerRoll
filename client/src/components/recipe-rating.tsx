import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { RecipeRating as RecipeRatingType } from "@shared/schema";

interface RatingsResponse {
  averageRating: number;
  totalRatings: number;
  ratings: RecipeRatingType[];
}

interface RecipeRatingProps {
  recipeId: string;
  compact?: boolean;
}

export function RecipeRating({ recipeId, compact = false }: RecipeRatingProps) {
  const { data, isLoading } = useQuery<RatingsResponse>({
    queryKey: ["/api/recipes", recipeId, "ratings"],
  });

  if (isLoading) {
    return <span data-testid="rating-loading" className="text-sm text-muted-foreground">...</span>;
  }

  const averageRating = data?.averageRating ?? 0;
  const totalRatings = data?.totalRatings ?? 0;

  if (compact) {
    return (
      <span data-testid="rating-compact" className="inline-flex items-center gap-1 text-sm">
        <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
        <span data-testid="rating-average">{averageRating.toFixed(1)}</span>
        <span data-testid="rating-count" className="text-muted-foreground">({totalRatings})</span>
      </span>
    );
  }

  return (
    <div data-testid="rating-full" className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" data-testid="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(averageRating)
                ? "fill-current text-amber-400"
                : "text-stone-600"
            }`}
          />
        ))}
      </div>
      <span data-testid="rating-average" className="text-sm font-medium">
        {averageRating.toFixed(1)}
      </span>
      <span data-testid="rating-count" className="text-sm text-muted-foreground">
        ({totalRatings})
      </span>
    </div>
  );
}
