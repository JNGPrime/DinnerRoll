import { z } from "zod";

export * from "./models/auth";
export * from "./models/userPreferences";
export * from "./models/chat";

export const dietaryTypes = ["meat", "no-meat", "vegetarian", "vegan"] as const;
export type DietaryType = typeof dietaryTypes[number];

export const pricelevels = ["low", "medium", "high"] as const;
export type PriceLevel = typeof pricelevels[number];

export const familySizes = [2, 3, 4, 5, 6] as const;
export type FamilySize = typeof familySizes[number];

export const cuisineTypes = [
  "all",
  "american",
  "italian",
  "greek",
  "indian",
  "mexican",
  "chinese",
  "japanese",
  "thai",
  "vietnamese",
  "korean",
  "mediterranean",
  "middle-eastern",
  "african",
  "caribbean",
  "south-american",
  "soul-food"
] as const;
export type CuisineType = typeof cuisineTypes[number];

export const cuisineLabels: Record<CuisineType, string> = {
  "all": "All Cuisines",
  "american": "American",
  "italian": "Italian",
  "greek": "Greek",
  "indian": "Indian",
  "mexican": "Mexican",
  "chinese": "Chinese",
  "japanese": "Japanese",
  "thai": "Thai",
  "vietnamese": "Vietnamese",
  "korean": "Korean",
  "mediterranean": "Mediterranean",
  "middle-eastern": "Middle Eastern",
  "african": "African",
  "caribbean": "Caribbean",
  "south-american": "South American",
  "soul-food": "Soul Food"
};

export const cookingMethods = ["grill", "stovetop", "oven", "crockpot", "one-pot", "instant-pot", "air-fryer", "no-cook"] as const;
export type CookingMethod = typeof cookingMethods[number];

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  dietaryType: DietaryType;
  priceLevel: PriceLevel;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  instructions: string[];
  nutritionHighlights: string[];
  imageUrl: string;
  origin?: string; // Country/region of origin for international recipes
  cuisine?: CuisineType; // Cuisine type for filtering
  cookingMethod?: CookingMethod; // How the dish is cooked
  nutrition?: RecipeNutrition; // Full nutrition info per serving
  season?: string; // "winter", "summer", "spring", "fall", or undefined (year-round)
  holiday?: string; // "thanksgiving", "christmas", "valentines", "july4th", "easter", or undefined
}

export interface SideAddOn {
  id: string;
  name: string;
  description: string;
  dietaryType: DietaryType;
  priceLevel: PriceLevel;
  prepTime: number;
  forPickyEaters: string[];
}

export interface FilterOptions {
  familySize: FamilySize;
  dietaryType: DietaryType | "all";
  priceLevel: PriceLevel | "all";
  hasPickyEater: boolean;
  pickyEaterRestrictions: string[];
}

export const filterOptionsSchema = z.object({
  familySize: z.number().min(2).max(6),
  dietaryType: z.enum([...dietaryTypes, "all"]),
  priceLevel: z.enum([...pricelevels, "all"]),
  hasPickyEater: z.boolean(),
  pickyEaterRestrictions: z.array(z.string()),
});

// User types are now in models/auth.ts for Replit Auth

// Fast Food Section
export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
  fiber: number;
}

export interface FastFoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  category: "bowl" | "sandwich" | "salad" | "wrap" | "other";
  nutrition: NutritionInfo;
  isHealthyChoice: boolean;
  dietaryType: DietaryType;
  priceRange: "$" | "$$" | "$$$";
  imageUrl: string;
}

export interface FastFoodRestaurant {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  doordashUrl: string;
  ubereatsUrl: string;
}

// Pantry Section
export const pantryCategories = ["proteins", "vegetables", "grains", "dairy", "pantry-staples", "herbs-spices"] as const;
export type PantryCategory = typeof pantryCategories[number];

export interface PantryIngredient {
  id: string;
  name: string;
  category: PantryCategory;
}

export interface RecipeMatch {
  recipe: Recipe;
  matchingIngredients: string[];
  missingIngredients: string[];
  matchPercentage: number;
}

// My Pantry Inventory (scanned/added items)
export interface PantryItem {
  id: string;
  name: string;
  barcode?: string;
  category: PantryCategory;
  quantity: number;
  unit: string;
  addedAt: string;
  expiresAt?: string;
}

export const insertPantryItemSchema = z.object({
  name: z.string().min(1),
  barcode: z.string().optional(),
  category: z.enum(pantryCategories),
  quantity: z.number().min(0).default(1),
  unit: z.string().default("item"),
  expiresAt: z.string().optional(),
});

export type InsertPantryItem = z.infer<typeof insertPantryItemSchema>;
