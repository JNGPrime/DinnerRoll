import { Users, DollarSign, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOptions, DietaryType, PriceLevel, FamilySize } from "@shared/schema";

interface FilterControlsProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const familySizeOptions: FamilySize[] = [2, 3, 4, 5, 6];

const dietaryOptions: { value: DietaryType | "all"; label: string; icon?: string }[] = [
  { value: "all", label: "All Types" },
  { value: "meat", label: "With Meat" },
  { value: "no-meat", label: "No Meat" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
];

const priceOptions: { value: PriceLevel | "all"; label: string; description: string }[] = [
  { value: "all", label: "Any Budget", description: "" },
  { value: "low", label: "Budget-Friendly", description: "$" },
  { value: "medium", label: "Moderate", description: "$$" },
  { value: "high", label: "Premium", description: "$$$" },
];

const restrictionOptions = [
  "No dairy",
  "No gluten",
  "No nuts",
  "No shellfish",
  "No eggs",
  "No spicy food",
  "No fish",
  "No mushrooms",
  "No onions",
  "No tomatoes",
];

export function FilterControls({ filters, onFiltersChange }: FilterControlsProps) {
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleRestriction = (restriction: string) => {
    const current = filters.pickyEaterRestrictions;
    const updated = current.includes(restriction)
      ? current.filter((r) => r !== restriction)
      : [...current, restriction];
    updateFilter("pickyEaterRestrictions", updated);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Family Size
          </Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {familySizeOptions.map((size) => (
              <Button
                key={size}
                variant={filters.familySize === size ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("familySize", size)}
                data-testid={`button-family-size-${size}`}
                className="min-w-[3rem]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            Dietary Preference
          </Label>
          <Select
            value={filters.dietaryType}
            onValueChange={(value) => updateFilter("dietaryType", value as DietaryType | "all")}
          >
            <SelectTrigger className="w-full mt-2" data-testid="select-dietary-type">
              <SelectValue placeholder="Select dietary type" />
            </SelectTrigger>
            <SelectContent>
              {dietaryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`option-dietary-${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Budget Level
          </Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {priceOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.priceLevel === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("priceLevel", option.value)}
                data-testid={`button-price-${option.value}`}
              >
                {option.label}
                {option.description && (
                  <span className="ml-1 text-xs opacity-70">{option.description}</span>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <Label htmlFor="picky-eater" className="text-sm font-medium cursor-pointer">
                Picky Eater in the Family?
              </Label>
            </div>
            <Switch
              id="picky-eater"
              checked={filters.hasPickyEater}
              onCheckedChange={(checked) => updateFilter("hasPickyEater", checked)}
              data-testid="switch-picky-eater"
            />
          </div>

          {filters.hasPickyEater && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                Select dietary restrictions for your picky eater. We'll suggest easy add-ons so everyone gets a complete meal!
              </p>
              <div className="flex flex-wrap gap-2">
                {restrictionOptions.map((restriction) => (
                  <Badge
                    key={restriction}
                    variant={filters.pickyEaterRestrictions.includes(restriction) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleRestriction(restriction)}
                    data-testid={`badge-restriction-${restriction.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {restriction}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
