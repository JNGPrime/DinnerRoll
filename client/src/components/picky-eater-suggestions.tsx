import { Lightbulb, Clock, Plus, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SideAddOn } from "@shared/schema";

interface PickyEaterSuggestionsProps {
  addOns: SideAddOn[];
  selectedRecipeName?: string;
  restrictions: string[];
}

export function PickyEaterSuggestions({ addOns, selectedRecipeName, restrictions }: PickyEaterSuggestionsProps) {
  if (addOns.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10">
      <CardHeader className="pb-3 gap-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <span>Picky Eater Solutions</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Quick add-ons that work alongside your main dish so everyone at the table is happy!
        </p>
        {restrictions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {restrictions.map((restriction) => (
              <Badge key={restriction} variant="outline" className="text-xs bg-background">
                {restriction}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className="p-4 rounded-md bg-background border flex flex-col sm:flex-row sm:items-center gap-3"
            data-testid={`card-addon-${addOn.id}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium" data-testid={`text-addon-name-${addOn.id}`}>{addOn.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {addOn.dietaryType === "no-meat" ? "No Meat" : addOn.dietaryType.charAt(0).toUpperCase() + addOn.dietaryType.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{addOn.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {addOn.prepTime} min prep
                </span>
                <span className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" />
                  Works for: {addOn.forPickyEaters.slice(0, 2).join(", ")}
                  {addOn.forPickyEaters.length > 2 && ` +${addOn.forPickyEaters.length - 2} more`}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0" data-testid={`button-add-addon-${addOn.id}`}>
              <Plus className="h-4 w-4 mr-1" />
              Add to Meal
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
