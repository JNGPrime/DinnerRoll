import type { Recipe, SideAddOn, DietaryType, PriceLevel, FastFoodItem, FastFoodRestaurant, PantryIngredient, RecipeMatch, CuisineType, PantryItem, InsertPantryItem } from "@shared/schema";

export interface IStorage {
  getRecipes(filters: {
    familySize?: number;
    dietaryType?: DietaryType;
    priceLevel?: PriceLevel;
  }): Promise<Recipe[]>;
  getRecipeById(id: string): Promise<Recipe | undefined>;
  getAddOns(restrictions: string[]): Promise<SideAddOn[]>;
  getFastFoodRestaurants(): Promise<FastFoodRestaurant[]>;
  getFastFoodItems(filters?: {
    restaurantId?: string;
    dietaryType?: DietaryType;
    healthyOnly?: boolean;
  }): Promise<FastFoodItem[]>;
  getPantryIngredients(): Promise<PantryIngredient[]>;
  getMatchingRecipes(ingredientIds: string[], cuisine?: CuisineType): Promise<RecipeMatch[]>;
  getRandomRecipe(ingredientIds: string[], minMatchPercent?: number, cuisine?: CuisineType): Promise<RecipeMatch | null>;
  getMysteryRecipe(cuisine?: CuisineType): Promise<Recipe>;
  getInternationalRecipes(): Promise<Recipe[]>;
  // My Pantry Inventory
  getMyPantryItems(): Promise<PantryItem[]>;
  addPantryItem(item: InsertPantryItem): Promise<PantryItem>;
  updatePantryItem(id: string, updates: Partial<InsertPantryItem>): Promise<PantryItem | null>;
  deletePantryItem(id: string): Promise<boolean>;
  clearMyPantry(): Promise<void>;
  lookupBarcode(barcode: string): Promise<{ name: string; category: string } | null>;
}

const recipes: Recipe[] = [
  {
    id: "1",
    name: "Grilled Lemon Herb Chicken",
    description: "Tender chicken breasts marinated in fresh herbs and lemon, perfect for a healthy weeknight dinner.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    ingredients: [
      "4 boneless chicken breasts",
      "2 lemons, juiced and zested",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "1 tbsp fresh rosemary, chopped",
      "1 tbsp fresh thyme",
      "Salt and pepper to taste",
      "Steamed broccoli for serving"
    ],
    instructions: [
      "Combine lemon juice, zest, garlic, olive oil, and herbs in a bowl.",
      "Marinate chicken for at least 30 minutes or overnight.",
      "Preheat grill or grill pan to medium-high heat.",
      "Grill chicken for 6-7 minutes per side until internal temp reaches 165°F.",
      "Let rest for 5 minutes before serving with steamed vegetables."
    ],
    nutritionHighlights: ["High Protein", "Low Carb", "Vitamin C"],
    imageUrl: "/images/recipes/bbq-chicken.png",
    cuisine: "american",
    season: "summer"
  },
  {
    id: "2",
    name: "Mediterranean Quinoa Bowl",
    description: "A colorful and nutritious bowl packed with protein-rich quinoa, fresh vegetables, and tangy feta.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 20,
    ingredients: [
      "1.5 cups quinoa",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, diced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "3 tbsp olive oil",
      "2 tbsp lemon juice",
      "Fresh parsley, chopped"
    ],
    instructions: [
      "Cook quinoa according to package instructions, then cool slightly.",
      "Prepare all vegetables while quinoa cooks.",
      "Whisk olive oil, lemon juice, salt, and pepper for dressing.",
      "Combine cooled quinoa with all vegetables and olives.",
      "Top with feta and drizzle with dressing before serving."
    ],
    nutritionHighlights: ["Complete Protein", "Fiber Rich", "Heart Healthy"],
    imageUrl: "/images/recipes/quinoa-bowl.png",
    cuisine: "mediterranean",
    season: "spring"
  },
  {
    id: "3",
    name: "Teriyaki Salmon with Bok Choy",
    description: "Flaky salmon glazed with homemade teriyaki sauce, served with crispy bok choy.",
    dietaryType: "meat",
    priceLevel: "high",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "4 heads baby bok choy",
      "1/4 cup low-sodium soy sauce",
      "2 tbsp honey",
      "1 tbsp rice vinegar",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tsp fresh ginger, grated",
      "Sesame seeds for garnish"
    ],
    instructions: [
      "Mix soy sauce, honey, rice vinegar, garlic, and ginger for teriyaki sauce.",
      "Pat salmon dry and season with salt and pepper.",
      "Pan-sear salmon skin-side down for 4 minutes, flip and cook 3 more minutes.",
      "Brush with teriyaki sauce during last minute of cooking.",
      "Sauté bok choy in sesame oil until tender-crisp. Serve together."
    ],
    nutritionHighlights: ["Omega-3", "High Protein", "Low Carb"],
    imageUrl: "/images/recipes/salmon.png",
    cuisine: "japanese"
  },
  {
    id: "4",
    name: "Creamy Vegan Mushroom Pasta",
    description: "Rich and satisfying pasta with a creamy cashew-based sauce and sautéed mushrooms.",
    dietaryType: "vegan",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    ingredients: [
      "12 oz whole wheat pasta",
      "2 cups mixed mushrooms, sliced",
      "1 cup raw cashews, soaked",
      "1 cup vegetable broth",
      "3 cloves garlic, minced",
      "2 tbsp nutritional yeast",
      "1 tbsp olive oil",
      "Fresh thyme",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Soak cashews in hot water for 30 minutes, then drain.",
      "Blend cashews with vegetable broth and nutritional yeast until smooth.",
      "Cook pasta according to package directions.",
      "Sauté mushrooms and garlic in olive oil until golden.",
      "Toss pasta with cashew cream and mushrooms. Season and serve."
    ],
    nutritionHighlights: ["Plant Protein", "B Vitamins", "Fiber Rich"],
    imageUrl: "/images/recipes/spaghetti.png",
    cuisine: "italian",
    season: "fall"
  },
  {
    id: "5",
    name: "Turkey Taco Lettuce Wraps",
    description: "Light and flavorful ground turkey tacos served in crisp lettuce cups with fresh toppings.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    ingredients: [
      "1 lb ground turkey",
      "1 head butter lettuce",
      "1 cup pico de gallo",
      "1 avocado, diced",
      "1/2 cup plain Greek yogurt",
      "2 tbsp taco seasoning",
      "1 lime, juiced",
      "Fresh cilantro",
      "Hot sauce (optional)"
    ],
    instructions: [
      "Brown ground turkey in a skillet over medium-high heat.",
      "Add taco seasoning and 1/4 cup water, simmer until absorbed.",
      "Separate lettuce leaves and rinse, pat dry.",
      "Prepare all toppings while turkey cools slightly.",
      "Fill lettuce cups with turkey and top with pico, avocado, and yogurt."
    ],
    nutritionHighlights: ["Low Carb", "High Protein", "Healthy Fats"],
    imageUrl: "/images/recipes/tacos.png",
    cuisine: "mexican"
  },
  {
    id: "6",
    name: "Chickpea Curry with Spinach",
    description: "A warming, aromatic curry loaded with protein-rich chickpeas and iron-packed spinach.",
    dietaryType: "vegan",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      "2 cans chickpeas, drained",
      "4 cups fresh spinach",
      "1 can coconut milk",
      "1 can diced tomatoes",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 tbsp curry powder",
      "1 tsp cumin",
      "Brown rice for serving"
    ],
    instructions: [
      "Sauté onion until soft, add garlic and cook 1 minute.",
      "Add curry powder and cumin, toast for 30 seconds.",
      "Pour in tomatoes and coconut milk, bring to simmer.",
      "Add chickpeas and cook for 15 minutes.",
      "Stir in spinach until wilted. Serve over brown rice."
    ],
    nutritionHighlights: ["Plant Protein", "Iron Rich", "Anti-inflammatory"],
    imageUrl: "/images/recipes/curry.png",
    cuisine: "indian",
    season: "winter"
  },
  {
    id: "7",
    name: "Herb-Crusted Pork Tenderloin",
    description: "Juicy pork tenderloin with a fragrant herb crust, served with roasted vegetables.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    ingredients: [
      "1.5 lb pork tenderloin",
      "2 tbsp Dijon mustard",
      "1/4 cup fresh herbs (rosemary, thyme, parsley)",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 lb baby potatoes, halved",
      "2 cups Brussels sprouts, halved",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 400°F. Season pork with salt and pepper.",
      "Coat pork with Dijon mustard and press herb mixture onto surface.",
      "Toss potatoes and Brussels sprouts with olive oil, salt, and pepper.",
      "Roast vegetables for 15 minutes, then add pork to pan.",
      "Continue roasting until pork reaches 145°F, about 20-25 minutes. Rest before slicing."
    ],
    nutritionHighlights: ["Lean Protein", "B Vitamins", "Low Fat"],
    imageUrl: "",
    cuisine: "american",
    season: "fall"
  },
  {
    id: "8",
    name: "Stuffed Bell Peppers",
    description: "Colorful bell peppers filled with seasoned rice, beans, and cheese - a complete meal in one.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    servings: 4,
    prepTime: 20,
    cookTime: 35,
    ingredients: [
      "4 large bell peppers",
      "1.5 cups cooked brown rice",
      "1 can black beans, drained",
      "1 cup corn kernels",
      "1 cup shredded cheese",
      "1 cup salsa",
      "1 tsp cumin",
      "Fresh cilantro",
      "Sour cream for serving"
    ],
    instructions: [
      "Preheat oven to 375°F. Cut tops off peppers and remove seeds.",
      "Mix rice, beans, corn, half the cheese, salsa, and cumin.",
      "Stuff peppers with rice mixture and place in baking dish.",
      "Add 1/4 cup water to dish, cover with foil.",
      "Bake 25 minutes, uncover, top with cheese, bake 10 more minutes."
    ],
    nutritionHighlights: ["Fiber Rich", "Complete Protein", "Vitamin C"],
    imageUrl: "",
    cuisine: "mexican"
  },
  {
    id: "9",
    name: "Shrimp Stir-Fry with Vegetables",
    description: "Quick and colorful shrimp stir-fry loaded with crisp vegetables in a savory sauce.",
    dietaryType: "no-meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    ingredients: [
      "1 lb large shrimp, peeled and deveined",
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 cup snap peas",
      "3 cloves garlic, minced",
      "3 tbsp low-sodium soy sauce",
      "1 tbsp sesame oil",
      "1 tsp cornstarch",
      "Cooked jasmine rice"
    ],
    instructions: [
      "Mix soy sauce with cornstarch and set aside.",
      "Heat sesame oil in a wok over high heat.",
      "Stir-fry shrimp until pink, about 2 minutes. Remove and set aside.",
      "Stir-fry vegetables until tender-crisp, about 3-4 minutes.",
      "Return shrimp, add sauce, toss until coated. Serve over rice."
    ],
    nutritionHighlights: ["Low Calorie", "High Protein", "Vitamin A"],
    imageUrl: "",
    cuisine: "chinese"
  },
  {
    id: "10",
    name: "Eggplant Parmesan",
    description: "Classic Italian comfort food made healthier with baked eggplant and fresh marinara.",
    dietaryType: "vegetarian",
    priceLevel: "medium",
    servings: 4,
    prepTime: 25,
    cookTime: 40,
    ingredients: [
      "2 large eggplants, sliced",
      "2 cups marinara sauce",
      "1.5 cups mozzarella, shredded",
      "1/2 cup Parmesan, grated",
      "1 cup panko breadcrumbs",
      "2 eggs, beaten",
      "Fresh basil",
      "Olive oil spray"
    ],
    instructions: [
      "Salt eggplant slices and let sit 20 minutes, then pat dry.",
      "Dip eggplant in egg, then panko. Place on baking sheet.",
      "Spray with olive oil and bake at 400°F for 20 minutes, flipping halfway.",
      "Layer in baking dish: sauce, eggplant, cheeses. Repeat.",
      "Bake at 375°F for 20 minutes until bubbly. Top with fresh basil."
    ],
    nutritionHighlights: ["High Fiber", "Antioxidants", "Calcium"],
    imageUrl: "",
    cuisine: "italian"
  },
  {
    id: "11",
    name: "Beef and Broccoli Bowl",
    description: "Tender sliced beef with crisp broccoli in a savory ginger sauce over fluffy rice.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 15,
    ingredients: [
      "1 lb flank steak, thinly sliced",
      "4 cups broccoli florets",
      "1/4 cup low-sodium soy sauce",
      "2 tbsp oyster sauce",
      "1 tbsp honey",
      "1 tbsp fresh ginger, grated",
      "3 cloves garlic, minced",
      "2 tbsp vegetable oil",
      "Steamed rice"
    ],
    instructions: [
      "Mix soy sauce, oyster sauce, honey, ginger, and garlic for sauce.",
      "Heat oil in a large skillet over high heat.",
      "Sear beef quickly, about 2 minutes. Remove and set aside.",
      "Stir-fry broccoli with a splash of water until bright green.",
      "Return beef, add sauce, toss to coat. Serve over rice."
    ],
    nutritionHighlights: ["Iron Rich", "High Protein", "Vitamin C"],
    imageUrl: "",
    cuisine: "chinese"
  },
  {
    id: "12",
    name: "Buddha Bowl with Tahini Dressing",
    description: "A nourishing bowl of roasted vegetables, grains, and greens with creamy tahini.",
    dietaryType: "vegan",
    priceLevel: "low",
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    ingredients: [
      "2 cups cooked farro or quinoa",
      "1 can chickpeas, drained",
      "2 sweet potatoes, cubed",
      "4 cups mixed greens",
      "1 cup red cabbage, shredded",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "1 tbsp maple syrup",
      "2 tbsp olive oil"
    ],
    instructions: [
      "Roast sweet potatoes and chickpeas with olive oil at 400°F for 25 minutes.",
      "Whisk tahini with lemon juice, maple syrup, and water until smooth.",
      "Cook farro according to package directions.",
      "Arrange bowls with greens, grains, roasted vegetables, and cabbage.",
      "Drizzle generously with tahini dressing before serving."
    ],
    nutritionHighlights: ["Fiber Rich", "Plant Protein", "Healthy Fats"],
    imageUrl: "",
    cuisine: "middle-eastern"
  },
  {
    id: "13",
    name: "Lemon Garlic Cod with Asparagus",
    description: "Delicate white fish baked with fresh asparagus in a light lemon butter sauce.",
    dietaryType: "no-meat",
    priceLevel: "high",
    servings: 4,
    prepTime: 10,
    cookTime: 20,
    ingredients: [
      "4 cod fillets (6 oz each)",
      "1 bunch asparagus, trimmed",
      "4 tbsp butter",
      "4 cloves garlic, minced",
      "2 lemons",
      "2 tbsp fresh dill, chopped",
      "Salt and pepper",
      "Cherry tomatoes (optional)"
    ],
    instructions: [
      "Preheat oven to 400°F. Place cod and asparagus on a baking sheet.",
      "Melt butter with garlic, lemon juice, and dill.",
      "Pour lemon butter over fish and vegetables.",
      "Season with salt and pepper, add lemon slices on top.",
      "Bake for 15-18 minutes until fish flakes easily."
    ],
    nutritionHighlights: ["Lean Protein", "Omega-3", "Vitamin K"],
    imageUrl: "",
    cuisine: "mediterranean"
  },
  {
    id: "14",
    name: "BBQ Chicken Sweet Potato Bowls",
    description: "Smoky BBQ chicken over fluffy sweet potato mash with crunchy coleslaw.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 15,
    cookTime: 30,
    ingredients: [
      "1.5 lbs chicken thighs, boneless",
      "4 medium sweet potatoes",
      "1/2 cup BBQ sauce (low sugar)",
      "3 cups coleslaw mix",
      "2 tbsp apple cider vinegar",
      "1 tbsp olive oil",
      "2 green onions, sliced",
      "Salt and pepper"
    ],
    instructions: [
      "Bake sweet potatoes at 400°F for 45 minutes until tender.",
      "Season chicken and grill or bake until cooked through.",
      "Shred chicken and toss with BBQ sauce.",
      "Mix coleslaw with vinegar, oil, salt, and pepper.",
      "Split sweet potatoes, top with BBQ chicken and slaw."
    ],
    nutritionHighlights: ["High Fiber", "Vitamin A", "Lean Protein"],
    imageUrl: "",
    cuisine: "soul-food",
    season: "summer",
    holiday: "july4th"
  },
  {
    id: "15",
    name: "Vegetable Pad Thai",
    description: "Classic Thai noodles loaded with vegetables, tofu, and a tangy peanut sauce.",
    dietaryType: "vegan",
    priceLevel: "medium",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    ingredients: [
      "8 oz rice noodles",
      "1 block firm tofu, cubed",
      "2 cups bean sprouts",
      "1 red bell pepper, sliced",
      "3 green onions, chopped",
      "1/4 cup peanut butter",
      "3 tbsp soy sauce",
      "2 tbsp rice vinegar",
      "1 tbsp maple syrup",
      "Crushed peanuts and lime wedges"
    ],
    instructions: [
      "Soak rice noodles in hot water until soft, drain.",
      "Press and cube tofu, then pan-fry until golden.",
      "Whisk peanut butter, soy sauce, rice vinegar, and maple syrup.",
      "Stir-fry vegetables briefly, add noodles and sauce.",
      "Toss with tofu, top with peanuts, bean sprouts, and lime."
    ],
    nutritionHighlights: ["Plant Protein", "Gluten-Free Option", "Healthy Fats"],
    imageUrl: "",
    cuisine: "thai"
  },
  {
    id: "16",
    name: "Greek Chicken Sheet Pan Dinner",
    description: "One-pan dinner with seasoned chicken, potatoes, and Mediterranean vegetables.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 40,
    ingredients: [
      "4 chicken thighs, bone-in",
      "1 lb baby potatoes, halved",
      "1 zucchini, sliced",
      "1 red onion, wedged",
      "1 cup cherry tomatoes",
      "2 tbsp Greek seasoning",
      "3 tbsp olive oil",
      "Feta cheese for topping",
      "Fresh oregano"
    ],
    instructions: [
      "Preheat oven to 425°F. Toss vegetables with olive oil and half the seasoning.",
      "Season chicken with remaining seasoning.",
      "Arrange potatoes on sheet pan, roast 15 minutes.",
      "Add chicken and remaining vegetables, roast 25 minutes more.",
      "Top with crumbled feta and fresh oregano before serving."
    ],
    nutritionHighlights: ["High Protein", "Low Prep", "Vitamin Rich"],
    imageUrl: "",
    cuisine: "greek"
  },
  {
    id: "17",
    name: "Black Bean Tacos with Mango Salsa",
    description: "Flavorful spiced black beans in corn tortillas topped with fresh tropical salsa.",
    dietaryType: "vegan",
    priceLevel: "low",
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    ingredients: [
      "2 cans black beans, drained",
      "8 corn tortillas",
      "1 ripe mango, diced",
      "1 jalapeño, minced",
      "1/2 red onion, diced",
      "1 lime, juiced",
      "1 tsp cumin",
      "1 tsp smoked paprika",
      "Fresh cilantro",
      "Avocado slices"
    ],
    instructions: [
      "Heat black beans with cumin, paprika, and a splash of water.",
      "Mash slightly for texture, keep warm.",
      "Mix mango, jalapeño, onion, lime juice, and cilantro for salsa.",
      "Warm tortillas in a dry pan or microwave.",
      "Fill tortillas with beans, top with mango salsa and avocado."
    ],
    nutritionHighlights: ["High Fiber", "Vitamin C", "Plant Protein"],
    imageUrl: "",
    cuisine: "mexican",
    season: "summer"
  },
  {
    id: "18",
    name: "Caprese Chicken with Balsamic Glaze",
    description: "Elegant chicken breasts topped with fresh mozzarella, tomatoes, and basil.",
    dietaryType: "meat",
    priceLevel: "high",
    servings: 4,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      "4 chicken breasts",
      "8 oz fresh mozzarella, sliced",
      "2 large tomatoes, sliced",
      "Fresh basil leaves",
      "1/4 cup balsamic glaze",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 400°F. Season chicken with salt, pepper, and garlic.",
      "Sear chicken in olive oil until golden, about 3 minutes per side.",
      "Transfer to baking dish, top with tomato and mozzarella slices.",
      "Bake 15-18 minutes until chicken is cooked through and cheese melts.",
      "Top with fresh basil and drizzle with balsamic glaze."
    ],
    nutritionHighlights: ["High Protein", "Calcium", "Lycopene"],
    imageUrl: "",
    origin: "Italy",
    cuisine: "italian"
  },
  // International Recipes from Around the World
  {
    id: "19",
    name: "Japanese Chicken Katsu Curry",
    description: "Crispy breaded chicken cutlet served over rice with a rich, aromatic Japanese curry sauce.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 20,
    cookTime: 30,
    ingredients: [
      "4 boneless chicken breasts",
      "1 cup panko breadcrumbs",
      "2 eggs, beaten",
      "1/2 cup flour",
      "2 carrots, diced",
      "1 onion, diced",
      "2 potatoes, cubed",
      "4 tbsp Japanese curry roux",
      "3 cups water",
      "Steamed rice for serving"
    ],
    instructions: [
      "Pound chicken breasts thin, season with salt and pepper.",
      "Dredge in flour, dip in egg, coat with panko.",
      "Sauté onion and carrots, add potatoes and water, simmer 15 minutes.",
      "Stir in curry roux until thickened.",
      "Pan-fry chicken until golden and cooked through. Slice and serve over rice with curry."
    ],
    nutritionHighlights: ["High Protein", "Comfort Food", "Iron Rich"],
    imageUrl: "",
    origin: "Japan",
    cuisine: "japanese"
  },
  {
    id: "20",
    name: "Moroccan Vegetable Tagine",
    description: "Fragrant slow-cooked vegetables with warm spices, dried apricots, and chickpeas.",
    dietaryType: "vegan",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 45,
    ingredients: [
      "2 cans chickpeas, drained",
      "2 sweet potatoes, cubed",
      "2 zucchini, sliced",
      "1 cup dried apricots",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 tsp cumin",
      "1 tsp cinnamon",
      "1 tsp turmeric",
      "2 cups vegetable broth",
      "Couscous for serving"
    ],
    instructions: [
      "Sauté onion and garlic until fragrant.",
      "Add spices and toast for 30 seconds.",
      "Add sweet potatoes, broth, and apricots. Simmer 20 minutes.",
      "Add zucchini and chickpeas, cook 15 more minutes.",
      "Serve over fluffy couscous with fresh cilantro."
    ],
    nutritionHighlights: ["Fiber Rich", "Antioxidants", "Plant Protein"],
    imageUrl: "",
    origin: "Morocco",
    cuisine: "african"
  },
  {
    id: "21",
    name: "Korean Bibimbap Bowl",
    description: "Colorful rice bowl topped with sautéed vegetables, beef, and a spicy gochujang sauce.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 25,
    cookTime: 20,
    ingredients: [
      "1 lb beef sirloin, sliced thin",
      "4 cups cooked rice",
      "2 cups spinach",
      "2 carrots, julienned",
      "1 zucchini, sliced",
      "4 eggs",
      "3 tbsp gochujang paste",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "Sesame seeds"
    ],
    instructions: [
      "Marinate beef in soy sauce and sesame oil for 15 minutes.",
      "Sauté each vegetable separately until tender.",
      "Pan-fry beef until cooked through.",
      "Fry eggs sunny-side up.",
      "Arrange rice in bowls, top with vegetables, beef, and egg. Drizzle with gochujang."
    ],
    nutritionHighlights: ["High Protein", "Iron Rich", "Vitamin A"],
    imageUrl: "",
    origin: "Korea",
    cuisine: "korean"
  },
  {
    id: "22",
    name: "Vietnamese Pho Ga",
    description: "Aromatic chicken noodle soup with rice noodles, fresh herbs, and warming spices.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 15,
    cookTime: 40,
    ingredients: [
      "1 lb chicken thighs",
      "8 oz rice noodles",
      "8 cups chicken broth",
      "2 star anise",
      "1 cinnamon stick",
      "2 inch ginger, sliced",
      "1 onion, halved",
      "Fish sauce to taste",
      "Bean sprouts, basil, lime for serving"
    ],
    instructions: [
      "Char onion and ginger under broiler until fragrant.",
      "Simmer broth with star anise, cinnamon, ginger, and onion for 30 minutes.",
      "Add chicken and poach until cooked, about 15 minutes. Shred.",
      "Cook rice noodles according to package.",
      "Strain broth, season with fish sauce. Serve with noodles, chicken, and fresh herbs."
    ],
    nutritionHighlights: ["Low Fat", "Hydrating", "High Protein"],
    imageUrl: "",
    origin: "Vietnam",
    cuisine: "vietnamese",
    season: "winter"
  },
  {
    id: "23",
    name: "Indian Butter Chicken",
    description: "Tender chicken in a creamy, mildly spiced tomato sauce - a beloved Indian classic.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 20,
    cookTime: 30,
    ingredients: [
      "1.5 lbs chicken thighs, cubed",
      "1 cup plain yogurt",
      "2 tbsp garam masala",
      "1 can crushed tomatoes",
      "1 cup heavy cream",
      "3 tbsp butter",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "1 inch ginger, grated",
      "Basmati rice and naan for serving"
    ],
    instructions: [
      "Marinate chicken in yogurt and half the garam masala for 30 minutes.",
      "Sauté onion, garlic, and ginger in butter until soft.",
      "Add tomatoes and remaining spices, simmer 10 minutes.",
      "Grill or pan-fry chicken until charred, add to sauce.",
      "Stir in cream and simmer 10 minutes. Serve with rice and naan."
    ],
    nutritionHighlights: ["High Protein", "Calcium", "Iron Rich"],
    imageUrl: "",
    origin: "India",
    cuisine: "indian",
    season: "winter"
  },
  {
    id: "24",
    name: "Thai Green Curry",
    description: "Creamy coconut curry with vegetables and your choice of protein, fragrant with Thai basil.",
    dietaryType: "vegan",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 25,
    ingredients: [
      "1 block firm tofu, cubed",
      "1 can coconut milk",
      "3 tbsp green curry paste",
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 zucchini, sliced",
      "1 cup snap peas",
      "2 tbsp soy sauce",
      "Fresh Thai basil",
      "Jasmine rice for serving"
    ],
    instructions: [
      "Fry curry paste in a bit of coconut cream until fragrant.",
      "Add coconut milk and bring to simmer.",
      "Add tofu and harder vegetables first, cook 10 minutes.",
      "Add softer vegetables, cook 5 more minutes.",
      "Season with soy sauce, serve over jasmine rice with fresh basil."
    ],
    nutritionHighlights: ["Plant Protein", "Anti-inflammatory", "Vitamin C"],
    imageUrl: "",
    origin: "Thailand",
    cuisine: "thai"
  },
  {
    id: "25",
    name: "Mexican Pozole Rojo",
    description: "Hearty traditional Mexican stew with hominy, pork, and dried chilies.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 6,
    prepTime: 20,
    cookTime: 60,
    ingredients: [
      "2 lbs pork shoulder, cubed",
      "2 cans hominy, drained",
      "4 dried guajillo chilies",
      "2 dried ancho chilies",
      "1 onion, quartered",
      "6 cloves garlic",
      "1 tsp oregano",
      "Cabbage, radish, lime for garnish"
    ],
    instructions: [
      "Boil pork in salted water until tender, about 45 minutes. Reserve broth.",
      "Toast and rehydrate dried chilies, blend with garlic and onion.",
      "Strain chili sauce into broth, add hominy and pork.",
      "Simmer 20 minutes, season with oregano and salt.",
      "Serve with shredded cabbage, sliced radish, and lime."
    ],
    nutritionHighlights: ["High Protein", "Fiber Rich", "Vitamin C"],
    imageUrl: "",
    origin: "Mexico",
    cuisine: "mexican",
    season: "winter"
  },
  {
    id: "26",
    name: "Greek Moussaka",
    description: "Layered eggplant and spiced meat casserole topped with creamy béchamel sauce.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 6,
    prepTime: 30,
    cookTime: 50,
    ingredients: [
      "2 large eggplants, sliced",
      "1 lb ground lamb or beef",
      "1 onion, diced",
      "1 can crushed tomatoes",
      "1 tsp cinnamon",
      "3 tbsp butter",
      "3 tbsp flour",
      "2 cups milk",
      "1/2 cup Parmesan, grated",
      "1 egg yolk"
    ],
    instructions: [
      "Salt and roast eggplant slices until tender.",
      "Brown meat with onion, add tomatoes and cinnamon, simmer 15 minutes.",
      "Make béchamel: melt butter, whisk in flour, add milk, stir until thick. Add egg yolk and cheese.",
      "Layer eggplant and meat in baking dish, top with béchamel.",
      "Bake at 375°F for 40 minutes until golden and bubbly."
    ],
    nutritionHighlights: ["High Protein", "Calcium", "Fiber"],
    imageUrl: "",
    origin: "Greece",
    cuisine: "greek",
    season: "fall"
  },
  {
    id: "27",
    name: "Ethiopian Lentil Stew (Misir Wot)",
    description: "Spiced red lentil stew with berbere seasoning - warming and protein-packed.",
    dietaryType: "vegan",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 35,
    ingredients: [
      "2 cups red lentils",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "2 tbsp berbere spice blend",
      "2 tbsp tomato paste",
      "4 cups water",
      "3 tbsp olive oil",
      "Salt to taste",
      "Injera or rice for serving"
    ],
    instructions: [
      "Sauté onion in oil until deeply caramelized, about 15 minutes.",
      "Add garlic and berbere, cook 1 minute.",
      "Stir in tomato paste and lentils, add water.",
      "Simmer until lentils are tender and stew is thick, about 20 minutes.",
      "Season with salt and serve with injera bread or rice."
    ],
    nutritionHighlights: ["Plant Protein", "Fiber Rich", "Iron Rich"],
    imageUrl: "",
    origin: "Ethiopia",
    cuisine: "african",
    season: "winter"
  },
  {
    id: "28",
    name: "Spanish Seafood Paella",
    description: "Saffron-infused rice with shrimp, mussels, and chorizo - a festive Spanish classic.",
    dietaryType: "meat",
    priceLevel: "high",
    servings: 6,
    prepTime: 20,
    cookTime: 40,
    ingredients: [
      "2 cups bomba or short-grain rice",
      "1 lb shrimp, peeled",
      "1 lb mussels, cleaned",
      "4 oz chorizo, sliced",
      "1 red bell pepper, diced",
      "4 cups fish or chicken broth",
      "1/2 tsp saffron threads",
      "1 cup frozen peas",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Bloom saffron in warm broth for 10 minutes.",
      "Cook chorizo and pepper in paella pan, remove. Sauté rice in the fat.",
      "Add saffron broth, arrange rice evenly. Cook without stirring 15 minutes.",
      "Nestle shrimp and mussels into rice, add peas and chorizo.",
      "Cover and cook until mussels open and rice has socarrat. Serve with lemon."
    ],
    nutritionHighlights: ["Omega-3", "High Protein", "Iron Rich"],
    imageUrl: "",
    origin: "Spain",
    cuisine: "mediterranean"
  },
  {
    id: "29",
    name: "Chinese Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, chilies, and a savory-sweet sauce.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 15,
    ingredients: [
      "1.5 lbs chicken breast, cubed",
      "1/2 cup roasted peanuts",
      "8 dried red chilies",
      "3 green onions, chopped",
      "3 cloves garlic, minced",
      "3 tbsp soy sauce",
      "2 tbsp rice vinegar",
      "1 tbsp hoisin sauce",
      "1 tsp cornstarch",
      "Steamed rice for serving"
    ],
    instructions: [
      "Mix soy sauce, rice vinegar, hoisin, and cornstarch for sauce.",
      "Stir-fry chicken over high heat until golden, remove.",
      "Fry dried chilies and garlic until fragrant.",
      "Return chicken, add sauce and peanuts, toss until glazed.",
      "Garnish with green onions, serve over steamed rice."
    ],
    nutritionHighlights: ["High Protein", "Healthy Fats", "B Vitamins"],
    imageUrl: "",
    origin: "China",
    cuisine: "chinese"
  },
  {
    id: "30",
    name: "Brazilian Black Bean Stew (Feijoada)",
    description: "Rich and hearty black bean stew with smoked meats - Brazil's national dish.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 6,
    prepTime: 20,
    cookTime: 90,
    ingredients: [
      "1 lb dried black beans, soaked overnight",
      "8 oz smoked sausage, sliced",
      "8 oz bacon, diced",
      "1 lb pork shoulder, cubed",
      "1 onion, diced",
      "6 cloves garlic, minced",
      "2 bay leaves",
      "Orange slices, rice, and collard greens for serving"
    ],
    instructions: [
      "Cook soaked beans in fresh water with bay leaves until almost tender, about 1 hour.",
      "Brown bacon and sausage, add to beans.",
      "Sauté onion and garlic, add pork and brown. Add to beans.",
      "Simmer everything together until beans are creamy and meat is tender.",
      "Serve with rice, sautéed collard greens, and orange slices."
    ],
    nutritionHighlights: ["High Protein", "Iron Rich", "Fiber"],
    imageUrl: "",
    origin: "Brazil",
    cuisine: "south-american"
  },
  {
    id: "31",
    name: "Lebanese Falafel Wrap",
    description: "Crispy chickpea fritters with tahini sauce, pickles, and fresh vegetables in warm pita.",
    dietaryType: "vegan",
    priceLevel: "low",
    servings: 4,
    prepTime: 20,
    cookTime: 15,
    ingredients: [
      "2 cans chickpeas, drained",
      "1 onion, quartered",
      "4 cloves garlic",
      "1 cup fresh parsley",
      "1 tsp cumin",
      "1/2 tsp baking powder",
      "4 pita breads",
      "Tahini sauce",
      "Pickled turnips and cucumbers",
      "Tomatoes and lettuce"
    ],
    instructions: [
      "Pulse chickpeas, onion, garlic, parsley, and cumin in food processor until coarse.",
      "Add baking powder, refrigerate 30 minutes.",
      "Form into patties, pan-fry or bake until golden and crispy.",
      "Warm pita, fill with falafel, vegetables, and pickles.",
      "Drizzle generously with tahini sauce."
    ],
    nutritionHighlights: ["Plant Protein", "Fiber Rich", "Iron"],
    imageUrl: "",
    origin: "Lebanon",
    cuisine: "middle-eastern"
  },
  {
    id: "32",
    name: "Italian Risotto ai Funghi",
    description: "Creamy Arborio rice slowly cooked with porcini mushrooms and Parmesan cheese.",
    dietaryType: "vegetarian",
    priceLevel: "medium",
    servings: 4,
    prepTime: 10,
    cookTime: 35,
    ingredients: [
      "1.5 cups Arborio rice",
      "1 oz dried porcini mushrooms",
      "8 oz fresh mushrooms, sliced",
      "1 onion, diced",
      "1/2 cup white wine",
      "4 cups vegetable broth, warm",
      "1/2 cup Parmesan, grated",
      "3 tbsp butter",
      "Fresh thyme"
    ],
    instructions: [
      "Rehydrate porcini in warm water, reserve liquid. Chop mushrooms.",
      "Sauté onion in butter, add rice and toast 2 minutes.",
      "Add wine, stir until absorbed. Begin adding broth one ladle at a time.",
      "Stir constantly, adding broth as absorbed. Add mushrooms halfway through.",
      "Finish with butter and Parmesan. Serve immediately with fresh thyme."
    ],
    nutritionHighlights: ["B Vitamins", "Calcium", "Fiber"],
    imageUrl: "",
    origin: "Italy",
    cuisine: "italian"
  },
  {
    id: "33",
    name: "Jamaican Jerk Chicken",
    description: "Spicy, smoky grilled chicken marinated in traditional jerk seasoning with scotch bonnets.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 20,
    cookTime: 40,
    ingredients: [
      "8 chicken thighs, bone-in",
      "4 green onions",
      "4 cloves garlic",
      "2 scotch bonnet peppers",
      "2 tbsp allspice",
      "1 tbsp thyme",
      "1/4 cup soy sauce",
      "2 tbsp lime juice",
      "Rice and beans for serving"
    ],
    instructions: [
      "Blend green onions, garlic, peppers, allspice, thyme, soy sauce, and lime into paste.",
      "Score chicken and coat generously with marinade. Refrigerate 4+ hours.",
      "Grill over medium heat for 35-40 minutes, turning occasionally.",
      "Let rest 5 minutes before serving.",
      "Serve with rice and peas and fried plantains."
    ],
    nutritionHighlights: ["High Protein", "Low Carb", "Metabolism Boost"],
    imageUrl: "",
    origin: "Jamaica",
    cuisine: "caribbean",
    season: "summer"
  },
  {
    id: "34",
    name: "Turkish Imam Bayildi",
    description: "Stuffed eggplant braised in olive oil with tomatoes, onions, and garlic - a vegetarian masterpiece.",
    dietaryType: "vegan",
    priceLevel: "low",
    servings: 4,
    prepTime: 20,
    cookTime: 50,
    ingredients: [
      "4 medium eggplants",
      "3 onions, sliced",
      "6 cloves garlic, sliced",
      "4 tomatoes, diced",
      "1/2 cup olive oil",
      "1/4 cup fresh parsley",
      "1 tsp sugar",
      "Salt and pepper",
      "Crusty bread for serving"
    ],
    instructions: [
      "Peel eggplants in stripes, cut a deep slit lengthwise.",
      "Salt and let drain 30 minutes, then rinse and dry.",
      "Sauté onions in olive oil until soft, add garlic and tomatoes.",
      "Stuff eggplants with mixture, place in baking dish with remaining oil and water.",
      "Cover and braise at 350°F for 45 minutes. Serve warm or cold."
    ],
    nutritionHighlights: ["Heart Healthy", "Fiber Rich", "Antioxidants"],
    imageUrl: "",
    origin: "Turkey",
    cuisine: "middle-eastern"
  },
  {
    id: "35",
    name: "Peruvian Lomo Saltado",
    description: "Stir-fried beef with tomatoes and onions served over french fries and rice.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    ingredients: [
      "1.5 lbs beef sirloin, sliced",
      "2 tomatoes, wedged",
      "1 red onion, sliced",
      "3 tbsp soy sauce",
      "2 tbsp red wine vinegar",
      "1 jalapeño, sliced",
      "French fries",
      "Steamed rice",
      "Fresh cilantro"
    ],
    instructions: [
      "Sear beef over very high heat until browned, remove.",
      "Stir-fry onion until slightly charred, add tomatoes and jalapeño.",
      "Return beef, add soy sauce and vinegar, toss quickly.",
      "Don't overcook - vegetables should stay slightly crisp.",
      "Serve immediately over rice with fries on the side."
    ],
    nutritionHighlights: ["High Protein", "Iron Rich", "Vitamin C"],
    imageUrl: "",
    origin: "Peru",
    cuisine: "south-american"
  },
  // One-Pot Meals
  {
    id: "36",
    name: "Slow Cooker Beef Stew",
    description: "Tender chunks of beef with potatoes, carrots, and herbs slow-cooked to perfection in your crockpot.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 6,
    prepTime: 20,
    cookTime: 480,
    ingredients: [
      "2 lbs beef chuck, cubed",
      "4 potatoes, cubed",
      "4 carrots, sliced",
      "1 onion, diced",
      "4 cups beef broth",
      "2 tbsp tomato paste",
      "3 cloves garlic, minced",
      "2 bay leaves",
      "1 tsp thyme",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season beef cubes with salt and pepper.",
      "Add all ingredients to slow cooker, beef on bottom.",
      "Cook on LOW for 8 hours or HIGH for 4-5 hours.",
      "Remove bay leaves before serving.",
      "Serve hot with crusty bread."
    ],
    nutritionHighlights: ["High Protein", "Iron Rich", "Comfort Food"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "crockpot",
    nutrition: { calories: 385, protein: 32, carbs: 28, fat: 16, fiber: 4, sodium: 680 },
    season: "winter"
  },
  {
    id: "37",
    name: "One-Pot Chicken and Rice",
    description: "Easy weeknight dinner with juicy chicken thighs and fluffy rice cooked together in one pot.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 35,
    ingredients: [
      "4 bone-in chicken thighs",
      "1.5 cups long grain rice",
      "2.5 cups chicken broth",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tsp paprika",
      "1/2 tsp cumin",
      "2 tbsp olive oil",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Season chicken with paprika, cumin, salt, and pepper.",
      "Brown chicken skin-side down in olive oil, 5 minutes per side. Remove.",
      "Sauté onion and garlic until fragrant.",
      "Add rice and toast for 1 minute, then add broth.",
      "Place chicken on top, cover, and simmer 25 minutes until rice is cooked."
    ],
    nutritionHighlights: ["Complete Meal", "High Protein", "Budget Friendly"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "one-pot",
    nutrition: { calories: 445, protein: 28, carbs: 42, fat: 18, fiber: 1, sodium: 520 }
  },
  {
    id: "38",
    name: "Crockpot Pulled Pork",
    description: "Fork-tender pulled pork slow-cooked with smoky BBQ flavors, perfect for sandwiches.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 8,
    prepTime: 15,
    cookTime: 480,
    ingredients: [
      "4 lb pork shoulder",
      "1 cup BBQ sauce",
      "1/2 cup apple cider vinegar",
      "1 onion, sliced",
      "4 cloves garlic, minced",
      "2 tbsp brown sugar",
      "1 tbsp paprika",
      "1 tsp cumin",
      "Hamburger buns for serving"
    ],
    instructions: [
      "Rub pork with paprika, cumin, salt, and pepper.",
      "Place onion and garlic in bottom of slow cooker.",
      "Add pork, pour vinegar over the top.",
      "Cook on LOW for 8-10 hours until fork-tender.",
      "Shred pork, mix with BBQ sauce, and serve on buns."
    ],
    nutritionHighlights: ["High Protein", "Crowd Pleaser", "Make Ahead"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "crockpot",
    nutrition: { calories: 420, protein: 35, carbs: 22, fat: 22, fiber: 1, sodium: 680 }
  },
  {
    id: "39",
    name: "One-Pot Creamy Tuscan Chicken",
    description: "Creamy garlic chicken with sun-dried tomatoes and spinach in a rich parmesan sauce.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      "4 chicken breasts",
      "1 cup heavy cream",
      "1/2 cup sun-dried tomatoes",
      "2 cups fresh spinach",
      "1/2 cup parmesan, grated",
      "4 cloves garlic, minced",
      "1 tsp Italian seasoning",
      "2 tbsp olive oil",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Season chicken with Italian seasoning, salt, and pepper.",
      "Sear chicken in olive oil until golden, 5 min per side. Remove.",
      "Sauté garlic, add cream, parmesan, and sun-dried tomatoes.",
      "Simmer until slightly thickened, stir in spinach.",
      "Return chicken to pan, simmer 5 more minutes. Garnish with basil."
    ],
    nutritionHighlights: ["High Protein", "Keto Friendly", "Restaurant Quality"],
    imageUrl: "",
    cuisine: "italian",
    cookingMethod: "one-pot",
    nutrition: { calories: 485, protein: 38, carbs: 8, fat: 34, fiber: 2, sodium: 620 }
  },
  {
    id: "40",
    name: "Oven Baked Pot Roast",
    description: "Classic Sunday pot roast with vegetables, slow-roasted in the oven until melt-in-your-mouth tender.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 6,
    prepTime: 20,
    cookTime: 240,
    ingredients: [
      "3 lb beef chuck roast",
      "1 lb baby potatoes",
      "4 carrots, chunked",
      "1 onion, quartered",
      "2 cups beef broth",
      "2 tbsp Worcestershire sauce",
      "4 cloves garlic",
      "2 sprigs rosemary",
      "2 tbsp olive oil"
    ],
    instructions: [
      "Preheat oven to 275°F. Season roast generously.",
      "Sear roast in Dutch oven until browned on all sides.",
      "Add broth, Worcestershire, garlic, and rosemary.",
      "Cover and roast for 3 hours, add vegetables, roast 1 more hour.",
      "Let rest 10 minutes before slicing. Serve with pan juices."
    ],
    nutritionHighlights: ["High Protein", "Iron Rich", "Sunday Dinner"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "oven",
    nutrition: { calories: 410, protein: 36, carbs: 22, fat: 20, fiber: 3, sodium: 580 }
  },
  // Grilled Meats
  {
    id: "41",
    name: "Classic Grilled Hamburgers",
    description: "Juicy, perfectly seasoned beef burgers grilled to your liking with all the classic toppings.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 15,
    cookTime: 10,
    ingredients: [
      "1.5 lbs ground beef (80/20)",
      "1 tsp garlic powder",
      "1 tsp onion powder",
      "4 hamburger buns",
      "4 slices cheddar cheese",
      "Lettuce, tomato, onion",
      "Pickles, ketchup, mustard",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Mix ground beef with garlic powder, onion powder, salt, and pepper.",
      "Form into 4 patties, make a small indent in center of each.",
      "Grill over medium-high heat, 4-5 minutes per side for medium.",
      "Add cheese in last minute of cooking.",
      "Toast buns on grill, assemble burgers with toppings."
    ],
    nutritionHighlights: ["High Protein", "Crowd Favorite", "Quick Meal"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "grill",
    nutrition: { calories: 520, protein: 32, carbs: 28, fat: 32, fiber: 2, sodium: 680 }
  },
  {
    id: "42",
    name: "Stovetop Smash Burgers",
    description: "Crispy-edged smash burgers cooked in a cast iron skillet for maximum flavor.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 8,
    ingredients: [
      "1 lb ground beef",
      "4 brioche buns",
      "4 slices American cheese",
      "1 onion, thinly sliced",
      "Pickles",
      "Special sauce (mayo, ketchup, relish)",
      "Salt and pepper"
    ],
    instructions: [
      "Form beef into 4 loose balls. Heat cast iron skillet to high.",
      "Place balls on skillet, smash flat with spatula immediately.",
      "Season generously with salt and pepper.",
      "Cook 2-3 minutes until edges are crispy, flip.",
      "Add cheese, cook 1 more minute. Serve on toasted buns."
    ],
    nutritionHighlights: ["High Protein", "Crispy Texture", "Diner Style"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "stovetop",
    nutrition: { calories: 480, protein: 28, carbs: 32, fat: 28, fiber: 1, sodium: 720 }
  },
  {
    id: "43",
    name: "Grilled Ribeye Steak",
    description: "Restaurant-quality ribeye steak with a perfect sear and herb butter finish.",
    dietaryType: "meat",
    priceLevel: "high",
    servings: 2,
    prepTime: 10,
    cookTime: 12,
    ingredients: [
      "2 ribeye steaks (12 oz each)",
      "4 tbsp butter, softened",
      "2 cloves garlic, minced",
      "1 tbsp fresh rosemary, chopped",
      "1 tbsp fresh thyme",
      "2 tbsp olive oil",
      "Coarse salt and black pepper"
    ],
    instructions: [
      "Let steaks come to room temperature, 30 minutes.",
      "Make herb butter by mixing butter, garlic, rosemary, and thyme.",
      "Coat steaks with olive oil, season generously with salt and pepper.",
      "Grill over high heat, 4-5 minutes per side for medium-rare.",
      "Rest 5 minutes, top with herb butter before serving."
    ],
    nutritionHighlights: ["High Protein", "Iron Rich", "Keto Friendly"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "grill",
    nutrition: { calories: 650, protein: 48, carbs: 1, fat: 52, fiber: 0, sodium: 420 }
  },
  {
    id: "44",
    name: "Pan-Seared NY Strip Steak",
    description: "Perfect stovetop steak with a golden crust and juicy interior, finished with garlic butter.",
    dietaryType: "meat",
    priceLevel: "high",
    servings: 2,
    prepTime: 10,
    cookTime: 10,
    ingredients: [
      "2 NY strip steaks (10 oz each)",
      "3 tbsp butter",
      "3 cloves garlic, crushed",
      "Fresh thyme sprigs",
      "2 tbsp vegetable oil",
      "Flaky sea salt",
      "Cracked black pepper"
    ],
    instructions: [
      "Pat steaks very dry, season generously with salt and pepper.",
      "Heat oil in cast iron until smoking.",
      "Sear steaks 3-4 minutes per side for medium-rare.",
      "Add butter, garlic, and thyme. Baste steaks with butter.",
      "Rest 5 minutes before slicing against the grain."
    ],
    nutritionHighlights: ["High Protein", "Low Carb", "Premium Cut"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "stovetop",
    nutrition: { calories: 580, protein: 44, carbs: 1, fat: 44, fiber: 0, sodium: 380 }
  },
  {
    id: "45",
    name: "Oven-Baked Steak",
    description: "Reverse-sear method for perfect edge-to-edge medium-rare steak every time.",
    dietaryType: "meat",
    priceLevel: "high",
    servings: 2,
    prepTime: 5,
    cookTime: 45,
    ingredients: [
      "2 thick-cut ribeye steaks (1.5 inch)",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "Fresh rosemary",
      "Garlic powder",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 250°F. Season steaks generously.",
      "Place on wire rack over baking sheet, bake 35-40 minutes until 115°F internal.",
      "Heat cast iron to smoking hot with olive oil.",
      "Sear steaks 1 minute per side for crust.",
      "Top with butter and rosemary, rest 5 minutes."
    ],
    nutritionHighlights: ["High Protein", "Perfect Doneness", "Restaurant Method"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "oven",
    nutrition: { calories: 620, protein: 46, carbs: 0, fat: 48, fiber: 0, sodium: 400 }
  },
  {
    id: "46",
    name: "Grilled Bone-In Pork Chops",
    description: "Thick-cut pork chops with a sweet and savory glaze, grilled to juicy perfection.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    ingredients: [
      "4 bone-in pork chops (1 inch thick)",
      "3 tbsp honey",
      "2 tbsp Dijon mustard",
      "2 tbsp apple cider vinegar",
      "2 cloves garlic, minced",
      "1 tsp smoked paprika",
      "2 tbsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Mix honey, mustard, vinegar, garlic, and paprika for glaze.",
      "Season pork chops with oil, salt, pepper, and paprika.",
      "Grill over medium-high heat, 5-6 minutes per side.",
      "Brush with glaze during last 2 minutes of cooking.",
      "Rest 5 minutes before serving. Internal temp should reach 145°F."
    ],
    nutritionHighlights: ["High Protein", "Lean Meat", "Quick Dinner"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "grill",
    nutrition: { calories: 380, protein: 36, carbs: 14, fat: 20, fiber: 0, sodium: 320 }
  },
  {
    id: "47",
    name: "Pan-Fried Pork Chops",
    description: "Golden and crispy pork chops cooked on the stovetop with a simple pan sauce.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 15,
    ingredients: [
      "4 boneless pork chops",
      "1/2 cup flour",
      "1 tsp garlic powder",
      "1 tsp onion powder",
      "1/2 tsp paprika",
      "3 tbsp butter",
      "2 tbsp olive oil",
      "Fresh thyme",
      "Salt and pepper"
    ],
    instructions: [
      "Mix flour with garlic powder, onion powder, paprika, salt, and pepper.",
      "Dredge pork chops in seasoned flour, shaking off excess.",
      "Heat butter and oil in large skillet over medium-high.",
      "Cook pork chops 4-5 minutes per side until golden and cooked through.",
      "Add thyme to pan, spoon browned butter over chops before serving."
    ],
    nutritionHighlights: ["High Protein", "Crispy Coating", "Budget Friendly"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "stovetop",
    nutrition: { calories: 365, protein: 32, carbs: 12, fat: 22, fiber: 0, sodium: 340 }
  },
  {
    id: "48",
    name: "Oven-Baked Pork Chops",
    description: "Tender baked pork chops with a savory herb crust, perfect for a hands-off dinner.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      "4 bone-in pork chops",
      "1/4 cup breadcrumbs",
      "2 tbsp parmesan, grated",
      "1 tsp Italian seasoning",
      "1/2 tsp garlic powder",
      "2 tbsp olive oil",
      "1 tbsp Dijon mustard",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 400°F. Line baking sheet with parchment.",
      "Mix breadcrumbs, parmesan, Italian seasoning, and garlic powder.",
      "Brush pork chops with mustard and olive oil.",
      "Press breadcrumb mixture onto both sides of chops.",
      "Bake 20-25 minutes until internal temp reaches 145°F."
    ],
    nutritionHighlights: ["High Protein", "Lean", "Easy Cleanup"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "oven",
    nutrition: { calories: 340, protein: 34, carbs: 8, fat: 18, fiber: 0, sodium: 380 }
  },
  {
    id: "49",
    name: "BBQ Grilled Chicken",
    description: "Smoky, charred chicken pieces with homemade BBQ sauce glaze hot off the grill.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 6,
    prepTime: 15,
    cookTime: 35,
    ingredients: [
      "3 lbs chicken pieces (thighs and drumsticks)",
      "1 cup BBQ sauce",
      "2 tbsp olive oil",
      "1 tsp smoked paprika",
      "1 tsp garlic powder",
      "1/2 tsp cayenne",
      "Salt and pepper"
    ],
    instructions: [
      "Toss chicken with oil, paprika, garlic powder, cayenne, salt, and pepper.",
      "Grill over medium heat, turning occasionally, 25-30 minutes.",
      "Start basting with BBQ sauce during last 10 minutes.",
      "Chicken is done when internal temp reaches 165°F.",
      "Let rest 5 minutes before serving."
    ],
    nutritionHighlights: ["High Protein", "Crowd Pleaser", "Summer Classic"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "grill",
    nutrition: { calories: 380, protein: 32, carbs: 16, fat: 20, fiber: 0, sodium: 580 }
  },
  {
    id: "50",
    name: "Stovetop Chicken Thighs",
    description: "Crispy-skinned chicken thighs with a lemon garlic pan sauce, ready in 30 minutes.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 4,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      "4 bone-in, skin-on chicken thighs",
      "4 cloves garlic, smashed",
      "1 lemon, juiced and zested",
      "1/2 cup chicken broth",
      "3 tbsp butter",
      "Fresh thyme",
      "2 tbsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Pat chicken very dry, season generously with salt and pepper.",
      "Heat oil in skillet, place chicken skin-side down.",
      "Cook 10-12 minutes without moving until skin is golden and crispy.",
      "Flip, add garlic and thyme, cook 8 more minutes.",
      "Add broth, lemon juice, and butter. Spoon sauce over chicken."
    ],
    nutritionHighlights: ["High Protein", "Crispy Skin", "One Pan"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "stovetop",
    nutrition: { calories: 420, protein: 28, carbs: 3, fat: 32, fiber: 0, sodium: 380 }
  },
  {
    id: "51",
    name: "Oven-Roasted Whole Chicken",
    description: "Classic roast chicken with crispy skin and juicy meat, perfect for Sunday dinner.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 6,
    prepTime: 15,
    cookTime: 75,
    ingredients: [
      "1 whole chicken (4-5 lbs)",
      "4 tbsp butter, softened",
      "1 lemon, halved",
      "1 head garlic, halved",
      "Fresh rosemary and thyme",
      "2 tbsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 425°F. Pat chicken dry inside and out.",
      "Rub butter under and over the skin.",
      "Stuff cavity with lemon, garlic, and herbs.",
      "Truss legs, rub with oil, season generously.",
      "Roast 1 hour 15 minutes until thigh reaches 165°F. Rest 15 minutes."
    ],
    nutritionHighlights: ["High Protein", "Classic Comfort", "Meal Prep Friendly"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "oven",
    nutrition: { calories: 350, protein: 30, carbs: 2, fat: 24, fiber: 0, sodium: 320 }
  },
  {
    id: "52",
    name: "Crockpot Chicken Tortilla Soup",
    description: "Warm and comforting Mexican-inspired soup with shredded chicken, beans, and all the toppings.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 8,
    prepTime: 15,
    cookTime: 360,
    ingredients: [
      "2 lbs chicken breasts",
      "1 can black beans, drained",
      "1 can corn, drained",
      "1 can diced tomatoes with chiles",
      "4 cups chicken broth",
      "1 onion, diced",
      "2 tsp cumin",
      "1 tsp chili powder",
      "Tortilla strips, avocado, sour cream, cheese for topping"
    ],
    instructions: [
      "Add chicken, beans, corn, tomatoes, broth, onion, and spices to slow cooker.",
      "Cook on LOW for 6-8 hours or HIGH for 3-4 hours.",
      "Remove chicken and shred with two forks.",
      "Return chicken to soup, stir to combine.",
      "Serve with tortilla strips, avocado, sour cream, and cheese."
    ],
    nutritionHighlights: ["High Protein", "Fiber Rich", "Freezer Friendly"],
    imageUrl: "",
    cuisine: "mexican",
    cookingMethod: "crockpot",
    nutrition: { calories: 285, protein: 28, carbs: 22, fat: 10, fiber: 6, sodium: 680 }
  },
  {
    id: "53",
    name: "One-Pot Spaghetti",
    description: "Everything cooks together in one pot - pasta, meat sauce, and all! Minimal cleanup.",
    dietaryType: "meat",
    priceLevel: "low",
    servings: 6,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      "1 lb ground beef",
      "12 oz spaghetti",
      "1 jar marinara sauce (24 oz)",
      "3 cups water",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tsp Italian seasoning",
      "Parmesan for serving",
      "Fresh basil"
    ],
    instructions: [
      "Brown ground beef with onion in large pot, drain excess fat.",
      "Add garlic and Italian seasoning, cook 1 minute.",
      "Add marinara, water, and break spaghetti in half to fit.",
      "Bring to boil, reduce heat, cover and simmer 15-18 minutes, stirring occasionally.",
      "Pasta is done when tender and sauce has thickened. Top with parmesan."
    ],
    nutritionHighlights: ["Complete Meal", "Kid Favorite", "Budget Friendly"],
    imageUrl: "",
    cuisine: "italian",
    cookingMethod: "one-pot",
    nutrition: { calories: 420, protein: 24, carbs: 52, fat: 14, fiber: 4, sodium: 680 }
  },
  {
    id: "54",
    name: "Crockpot Mississippi Pot Roast",
    description: "Ultra-tender, tangy, and buttery pot roast with pepperoncini peppers and ranch seasoning.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 8,
    prepTime: 10,
    cookTime: 480,
    ingredients: [
      "3.5 lb chuck roast",
      "1 packet ranch seasoning mix",
      "1 packet au jus gravy mix",
      "1/2 cup butter",
      "6 pepperoncini peppers",
      "Salt and pepper"
    ],
    instructions: [
      "Place roast in slow cooker, season with salt and pepper.",
      "Sprinkle both seasoning packets over the roast.",
      "Place butter on top, scatter pepperoncini around.",
      "Cook on LOW for 8 hours or until fall-apart tender.",
      "Shred meat in the juices, serve over mashed potatoes or in sandwiches."
    ],
    nutritionHighlights: ["High Protein", "Comfort Food", "Make Ahead"],
    imageUrl: "",
    cuisine: "american",
    cookingMethod: "crockpot",
    nutrition: { calories: 445, protein: 38, carbs: 4, fat: 32, fiber: 0, sodium: 820 }
  },
  {
    id: "55",
    name: "One-Pot Jambalaya",
    description: "Spicy Louisiana classic with chicken, sausage, and shrimp all cooked together with rice.",
    dietaryType: "meat",
    priceLevel: "medium",
    servings: 6,
    prepTime: 20,
    cookTime: 35,
    ingredients: [
      "1 lb chicken thighs, cubed",
      "1 lb andouille sausage, sliced",
      "1 lb shrimp, peeled",
      "1.5 cups long grain rice",
      "1 can diced tomatoes",
      "3 cups chicken broth",
      "1 onion, 1 bell pepper, 3 celery stalks (trinity), diced",
      "Cajun seasoning to taste"
    ],
    instructions: [
      "Brown chicken and sausage in large pot, remove.",
      "Sauté trinity vegetables until soft.",
      "Add rice, tomatoes, broth, and Cajun seasoning.",
      "Return chicken and sausage, bring to boil.",
      "Cover, simmer 20 minutes. Add shrimp last 5 minutes until pink."
    ],
    nutritionHighlights: ["High Protein", "Complete Meal", "Cajun Classic"],
    imageUrl: "",
    cuisine: "soul-food",
    cookingMethod: "one-pot",
    nutrition: { calories: 485, protein: 38, carbs: 38, fat: 20, fiber: 2, sodium: 920 }
  }
];

const sideAddOns: SideAddOn[] = [
  {
    id: "addon-1",
    name: "Simple Cheese Quesadilla",
    description: "Quick and easy cheesy quesadilla that kids love - mild and satisfying.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 5,
    forPickyEaters: ["No spicy food", "No vegetables preferred", "No fish", "No shellfish"]
  },
  {
    id: "addon-2",
    name: "Plain Buttered Pasta",
    description: "Simple pasta with butter and Parmesan - a foolproof crowd-pleaser.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 10,
    forPickyEaters: ["No spicy food", "No vegetables preferred", "No fish", "No shellfish", "No eggs"]
  },
  {
    id: "addon-3",
    name: "Steamed Rice with Soy Sauce",
    description: "Plain steamed rice with a drizzle of soy sauce - simple and filling.",
    dietaryType: "vegan",
    priceLevel: "low",
    prepTime: 5,
    forPickyEaters: ["No dairy", "No gluten", "No nuts", "No eggs", "No spicy food"]
  },
  {
    id: "addon-4",
    name: "Grilled Cheese Sandwich",
    description: "Classic comfort food - melty cheese between toasted bread.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 8,
    forPickyEaters: ["No spicy food", "No vegetables preferred", "No fish", "No shellfish", "No eggs"]
  },
  {
    id: "addon-5",
    name: "Fresh Fruit Plate",
    description: "Assorted fresh fruits - great for those avoiding certain foods.",
    dietaryType: "vegan",
    priceLevel: "low",
    prepTime: 5,
    forPickyEaters: ["No dairy", "No gluten", "No nuts", "No eggs", "No spicy food", "No onions", "No mushrooms"]
  },
  {
    id: "addon-6",
    name: "Hummus with Pita",
    description: "Creamy hummus with soft pita bread - protein-rich and mild.",
    dietaryType: "vegan",
    priceLevel: "low",
    prepTime: 2,
    forPickyEaters: ["No dairy", "No eggs", "No spicy food", "No mushrooms"]
  },
  {
    id: "addon-7",
    name: "Baked Potato Bar",
    description: "Fluffy baked potato with choice of toppings - customizable for everyone.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 5,
    forPickyEaters: ["No gluten", "No nuts", "No spicy food", "No fish", "No shellfish"]
  },
  {
    id: "addon-8",
    name: "Avocado Toast",
    description: "Simple mashed avocado on toast - healthy and satisfying.",
    dietaryType: "vegan",
    priceLevel: "low",
    prepTime: 5,
    forPickyEaters: ["No dairy", "No eggs", "No spicy food", "No mushrooms", "No onions"]
  },
  {
    id: "addon-9",
    name: "Chicken Tenders",
    description: "Baked crispy chicken strips - a kid-friendly protein option.",
    dietaryType: "meat",
    priceLevel: "medium",
    prepTime: 15,
    forPickyEaters: ["No dairy", "No spicy food", "No fish", "No shellfish", "No vegetables preferred"]
  },
  {
    id: "addon-10",
    name: "Mac and Cheese Cups",
    description: "Individual portions of creamy mac and cheese - comfort food classic.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 12,
    forPickyEaters: ["No spicy food", "No vegetables preferred", "No fish", "No shellfish", "No nuts"]
  },
  {
    id: "addon-11",
    name: "Veggie Sticks with Ranch",
    description: "Crunchy carrots, celery, and cucumber with creamy ranch dip.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 5,
    forPickyEaters: ["No gluten", "No nuts", "No spicy food", "No fish", "No shellfish"]
  },
  {
    id: "addon-12",
    name: "Peanut Butter Banana Toast",
    description: "Toast topped with peanut butter and banana slices - sweet and filling.",
    dietaryType: "vegan",
    priceLevel: "low",
    prepTime: 3,
    forPickyEaters: ["No dairy", "No eggs", "No spicy food", "No fish", "No shellfish"]
  },
  {
    id: "addon-13",
    name: "Sunflower Seed Butter Toast",
    description: "Nut-free alternative with sunflower seed butter - safe for allergies.",
    dietaryType: "vegan",
    priceLevel: "low",
    prepTime: 3,
    forPickyEaters: ["No dairy", "No eggs", "No nuts", "No spicy food", "No fish", "No shellfish"]
  },
  {
    id: "addon-14",
    name: "Gluten-Free Rice Crackers",
    description: "Light and crispy rice crackers with mild cheese.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 2,
    forPickyEaters: ["No gluten", "No nuts", "No eggs", "No spicy food"]
  },
  {
    id: "addon-15",
    name: "Mini Pizza Bagels",
    description: "Bite-sized pizza treats on mini bagels - fun and easy.",
    dietaryType: "vegetarian",
    priceLevel: "low",
    prepTime: 10,
    forPickyEaters: ["No spicy food", "No fish", "No shellfish", "No nuts"]
  }
];

const fastFoodRestaurants: FastFoodRestaurant[] = [
  {
    id: "chipotle",
    name: "Chipotle",
    logoUrl: "",
    description: "Fresh Mexican-inspired bowls, burritos, and tacos with customizable ingredients.",
    doordashUrl: "https://www.doordash.com/search/store/chipotle/",
    ubereatsUrl: "https://www.ubereats.com/search?q=chipotle"
  },
  {
    id: "chickfila",
    name: "Chick-fil-A",
    logoUrl: "",
    description: "Quality chicken sandwiches, nuggets, and salads with signature sauces.",
    doordashUrl: "https://www.doordash.com/search/store/chick-fil-a/",
    ubereatsUrl: "https://www.ubereats.com/search?q=chick-fil-a"
  },
  {
    id: "subway",
    name: "Subway",
    logoUrl: "",
    description: "Build-your-own sandwiches and salads with fresh vegetables and lean proteins.",
    doordashUrl: "https://www.doordash.com/search/store/subway/",
    ubereatsUrl: "https://www.ubereats.com/search?q=subway"
  },
  {
    id: "panera",
    name: "Panera Bread",
    logoUrl: "",
    description: "Fresh soups, salads, and sandwiches made with clean ingredients.",
    doordashUrl: "https://www.doordash.com/search/store/panera%20bread/",
    ubereatsUrl: "https://www.ubereats.com/search?q=panera%20bread"
  },
  {
    id: "sweetgreen",
    name: "Sweetgreen",
    logoUrl: "",
    description: "Seasonal salads and warm bowls made with locally-sourced ingredients.",
    doordashUrl: "https://www.doordash.com/search/store/sweetgreen/",
    ubereatsUrl: "https://www.ubereats.com/search?q=sweetgreen"
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    logoUrl: "",
    description: "Classic American fast food with burgers, fries, and breakfast favorites.",
    doordashUrl: "https://www.doordash.com/search/store/mcdonalds/",
    ubereatsUrl: "https://www.ubereats.com/search?q=mcdonalds"
  },
  {
    id: "wendys",
    name: "Wendy's",
    logoUrl: "",
    description: "Fresh, never frozen beef burgers, chicken sandwiches, and signature Frosty.",
    doordashUrl: "https://www.doordash.com/search/store/wendys/",
    ubereatsUrl: "https://www.ubereats.com/search?q=wendys"
  },
  {
    id: "tacobell",
    name: "Taco Bell",
    logoUrl: "",
    description: "Mexican-inspired fast food with tacos, burritos, and customizable options.",
    doordashUrl: "https://www.doordash.com/search/store/taco-bell/",
    ubereatsUrl: "https://www.ubereats.com/search?q=taco-bell"
  },
  {
    id: "pandaexpress",
    name: "Panda Express",
    logoUrl: "",
    description: "American Chinese cuisine featuring wok-cooked dishes and signature orange chicken.",
    doordashUrl: "https://www.doordash.com/search/store/panda-express/",
    ubereatsUrl: "https://www.ubereats.com/search?q=panda-express"
  },
  {
    id: "wingstop",
    name: "Wingstop",
    logoUrl: "",
    description: "Crispy chicken wings in bold flavors from classic to atomic hot.",
    doordashUrl: "https://www.doordash.com/search/store/wingstop/",
    ubereatsUrl: "https://www.ubereats.com/search?q=wingstop"
  },
  {
    id: "jerseymikes",
    name: "Jersey Mike's",
    logoUrl: "",
    description: "Fresh sliced premium subs made with quality meats and cheeses.",
    doordashUrl: "https://www.doordash.com/search/store/jersey-mikes/",
    ubereatsUrl: "https://www.ubereats.com/search?q=jersey-mikes"
  },
  {
    id: "fiveguys",
    name: "Five Guys",
    logoUrl: "",
    description: "Hand-crafted burgers and fresh-cut fries with unlimited free toppings.",
    doordashUrl: "https://www.doordash.com/search/store/five-guys/",
    ubereatsUrl: "https://www.ubereats.com/search?q=five-guys"
  },
  {
    id: "popeyes",
    name: "Popeyes",
    logoUrl: "",
    description: "Louisiana-style fried chicken, spicy tenders, and Cajun sides.",
    doordashUrl: "https://www.doordash.com/search/store/popeyes/",
    ubereatsUrl: "https://www.ubereats.com/search?q=popeyes"
  },
  {
    id: "shakeshack",
    name: "Shake Shack",
    logoUrl: "",
    description: "Premium burgers, crinkle-cut fries, and hand-spun milkshakes.",
    doordashUrl: "https://www.doordash.com/search/store/shake-shack/",
    ubereatsUrl: "https://www.ubereats.com/search?q=shake-shack"
  }
];

const fastFoodItems: FastFoodItem[] = [
  // Chipotle Items
  {
    id: "ff-1",
    restaurantId: "chipotle",
    name: "Chicken Burrito Bowl",
    description: "Grilled chicken with cilantro-lime rice, black beans, fajita veggies, salsa, and guacamole.",
    category: "bowl",
    nutrition: { calories: 665, protein: 53, carbs: 55, fat: 23, sodium: 1680, fiber: 13 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-2",
    restaurantId: "chipotle",
    name: "Sofritas Bowl",
    description: "Organic tofu braised with peppers and spices, served with rice, beans, and fresh salsa.",
    category: "bowl",
    nutrition: { calories: 545, protein: 17, carbs: 68, fat: 21, sodium: 1420, fiber: 14 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-3",
    restaurantId: "chipotle",
    name: "Veggie Salad Bowl",
    description: "Fresh salad with guacamole, black beans, fajita veggies, corn salsa, and vinaigrette.",
    category: "salad",
    nutrition: { calories: 420, protein: 12, carbs: 45, fat: 24, sodium: 980, fiber: 15 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$$",
    imageUrl: ""
  },
  // Chick-fil-A Items
  {
    id: "ff-4",
    restaurantId: "chickfila",
    name: "Grilled Chicken Sandwich",
    description: "Boneless chicken breast grilled with a blend of seasonings, served on a multigrain bun.",
    category: "sandwich",
    nutrition: { calories: 320, protein: 28, carbs: 40, fat: 6, sodium: 800, fiber: 3 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-5",
    restaurantId: "chickfila",
    name: "Grilled Nuggets (12 count)",
    description: "Bite-sized pieces of grilled chicken breast, marinated in a special blend of seasonings.",
    category: "other",
    nutrition: { calories: 200, protein: 38, carbs: 2, fat: 4, sodium: 660, fiber: 0 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-6",
    restaurantId: "chickfila",
    name: "Market Salad",
    description: "Mixed greens with grilled chicken, berries, apples, blue cheese, and granola.",
    category: "salad",
    nutrition: { calories: 340, protein: 28, carbs: 27, fat: 14, sodium: 840, fiber: 5 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  // Subway Items
  {
    id: "ff-7",
    restaurantId: "subway",
    name: "Turkey Breast Sub (6-inch)",
    description: "Lean turkey breast with your choice of fresh vegetables on wheat bread.",
    category: "sandwich",
    nutrition: { calories: 280, protein: 18, carbs: 46, fat: 3, sodium: 710, fiber: 5 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-8",
    restaurantId: "subway",
    name: "Veggie Delite Salad",
    description: "Fresh vegetables including lettuce, tomatoes, cucumbers, peppers, and onions.",
    category: "salad",
    nutrition: { calories: 60, protein: 3, carbs: 11, fat: 1, sodium: 310, fiber: 4 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-9",
    restaurantId: "subway",
    name: "Grilled Chicken Wrap",
    description: "Grilled chicken with fresh vegetables wrapped in a spinach tortilla.",
    category: "wrap",
    nutrition: { calories: 340, protein: 24, carbs: 43, fat: 7, sodium: 950, fiber: 3 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$",
    imageUrl: ""
  },
  // Panera Items
  {
    id: "ff-10",
    restaurantId: "panera",
    name: "Mediterranean Veggie Sandwich",
    description: "Peppadew peppers, feta, cucumbers, lettuce, tomatoes, and hummus on tomato basil bread.",
    category: "sandwich",
    nutrition: { calories: 520, protein: 16, carbs: 62, fat: 23, sodium: 1240, fiber: 4 },
    isHealthyChoice: false,
    dietaryType: "vegetarian",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-11",
    restaurantId: "panera",
    name: "Green Goddess Cobb Salad",
    description: "Chicken, avocado, bacon, tomatoes, and eggs with green goddess dressing.",
    category: "salad",
    nutrition: { calories: 550, protein: 44, carbs: 18, fat: 35, sodium: 940, fiber: 6 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-12",
    restaurantId: "panera",
    name: "Ten Vegetable Soup (bowl)",
    description: "Hearty vegetable soup with tomatoes, carrots, celery, and nine other vegetables.",
    category: "other",
    nutrition: { calories: 160, protein: 5, carbs: 29, fat: 3, sodium: 1010, fiber: 5 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$",
    imageUrl: ""
  },
  // Sweetgreen Items
  {
    id: "ff-13",
    restaurantId: "sweetgreen",
    name: "Harvest Bowl",
    description: "Wild rice, kale, roasted chicken, apples, sweet potatoes, and balsamic vinaigrette.",
    category: "bowl",
    nutrition: { calories: 555, protein: 33, carbs: 50, fat: 25, sodium: 680, fiber: 8 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$$",
    imageUrl: ""
  },
  {
    id: "ff-14",
    restaurantId: "sweetgreen",
    name: "Kale Caesar",
    description: "Organic kale, parmesan, shaved cabbage, lemon, and creamy caesar dressing.",
    category: "salad",
    nutrition: { calories: 290, protein: 10, carbs: 22, fat: 18, sodium: 520, fiber: 4 },
    isHealthyChoice: true,
    dietaryType: "vegetarian",
    priceRange: "$$$",
    imageUrl: ""
  },
  {
    id: "ff-15",
    restaurantId: "sweetgreen",
    name: "Super Green Goddess",
    description: "Blackened chicken, organic spinach, avocado, cucumbers, and green goddess dressing.",
    category: "salad",
    nutrition: { calories: 480, protein: 38, carbs: 20, fat: 28, sodium: 720, fiber: 7 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$$",
    imageUrl: ""
  },
  // McDonald's Items
  {
    id: "ff-16",
    restaurantId: "mcdonalds",
    name: "McChicken",
    description: "Crispy chicken patty with shredded lettuce and mayonnaise on a toasted bun.",
    category: "sandwich",
    nutrition: { calories: 400, protein: 14, carbs: 40, fat: 21, sodium: 560, fiber: 2 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-17",
    restaurantId: "mcdonalds",
    name: "Egg McMuffin",
    description: "Freshly cracked egg, Canadian bacon, and American cheese on a toasted English muffin.",
    category: "sandwich",
    nutrition: { calories: 310, protein: 17, carbs: 30, fat: 13, sodium: 770, fiber: 2 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-18",
    restaurantId: "mcdonalds",
    name: "Southwest Salad with Grilled Chicken",
    description: "Grilled chicken, black beans, corn, tomatoes, and poblano peppers with cilantro lime dressing.",
    category: "salad",
    nutrition: { calories: 350, protein: 37, carbs: 27, fat: 11, sodium: 960, fiber: 6 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  // Wendy's Items
  {
    id: "ff-19",
    restaurantId: "wendys",
    name: "Grilled Chicken Sandwich",
    description: "Juicy grilled chicken breast with lettuce, tomato, and honey mustard on a toasted bun.",
    category: "sandwich",
    nutrition: { calories: 370, protein: 34, carbs: 36, fat: 10, sodium: 820, fiber: 2 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-20",
    restaurantId: "wendys",
    name: "Apple Pecan Salad",
    description: "Mixed greens with grilled chicken, apples, cranberries, pecans, and pomegranate vinaigrette.",
    category: "salad",
    nutrition: { calories: 560, protein: 43, carbs: 32, fat: 29, sodium: 1100, fiber: 5 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-21",
    restaurantId: "wendys",
    name: "Jr. Cheeseburger",
    description: "Fresh beef patty with American cheese, pickles, onions, ketchup, and mustard.",
    category: "sandwich",
    nutrition: { calories: 290, protein: 16, carbs: 26, fat: 14, sodium: 600, fiber: 1 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$",
    imageUrl: ""
  },
  // Taco Bell Items
  {
    id: "ff-22",
    restaurantId: "tacobell",
    name: "Power Menu Bowl - Veggie",
    description: "Seasoned rice, black beans, guacamole, lettuce, pico de gallo, and creamy jalapeño sauce.",
    category: "bowl",
    nutrition: { calories: 430, protein: 12, carbs: 57, fat: 18, sodium: 1050, fiber: 9 },
    isHealthyChoice: true,
    dietaryType: "vegetarian",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-23",
    restaurantId: "tacobell",
    name: "Chicken Soft Taco Fresco",
    description: "Seasoned chicken with fresh pico de gallo in a soft flour tortilla.",
    category: "other",
    nutrition: { calories: 140, protein: 11, carbs: 16, fat: 4, sodium: 470, fiber: 2 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-24",
    restaurantId: "tacobell",
    name: "Black Bean Crunchwrap Supreme",
    description: "Seasoned black beans, nacho cheese, lettuce, tomatoes, and sour cream in a grilled tortilla.",
    category: "wrap",
    nutrition: { calories: 510, protein: 13, carbs: 71, fat: 18, sodium: 1180, fiber: 8 },
    isHealthyChoice: false,
    dietaryType: "vegetarian",
    priceRange: "$",
    imageUrl: ""
  },
  // Panda Express Items
  {
    id: "ff-25",
    restaurantId: "pandaexpress",
    name: "Grilled Teriyaki Chicken",
    description: "Wok-grilled chicken thigh hand-sliced to order with teriyaki sauce.",
    category: "other",
    nutrition: { calories: 300, protein: 36, carbs: 8, fat: 13, sodium: 530, fiber: 0 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-26",
    restaurantId: "pandaexpress",
    name: "Super Greens",
    description: "A healthy mix of broccoli, kale, and cabbage.",
    category: "other",
    nutrition: { calories: 90, protein: 6, carbs: 10, fat: 3, sodium: 260, fiber: 5 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$",
    imageUrl: ""
  },
  {
    id: "ff-27",
    restaurantId: "pandaexpress",
    name: "String Bean Chicken Breast",
    description: "Chicken breast wok-tossed with string beans and onions in a mild ginger soy sauce.",
    category: "other",
    nutrition: { calories: 190, protein: 14, carbs: 13, fat: 9, sodium: 540, fiber: 2 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  // Wingstop Items
  {
    id: "ff-28",
    restaurantId: "wingstop",
    name: "Classic Wings (10pc) - Lemon Pepper",
    description: "Crispy bone-in wings tossed in zesty lemon pepper seasoning.",
    category: "other",
    nutrition: { calories: 700, protein: 54, carbs: 4, fat: 52, sodium: 2200, fiber: 0 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-29",
    restaurantId: "wingstop",
    name: "Boneless Wings (10pc) - Garlic Parmesan",
    description: "Crispy boneless wings coated in creamy garlic parmesan sauce.",
    category: "other",
    nutrition: { calories: 830, protein: 48, carbs: 44, fat: 50, sodium: 2400, fiber: 2 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-30",
    restaurantId: "wingstop",
    name: "Chicken Thigh Bites",
    description: "Tender thigh meat seasoned and fried to perfection.",
    category: "other",
    nutrition: { calories: 360, protein: 28, carbs: 18, fat: 20, sodium: 980, fiber: 1 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  // Jersey Mike's Items
  {
    id: "ff-31",
    restaurantId: "jerseymikes",
    name: "Turkey & Provolone Sub (Regular)",
    description: "Fresh-sliced turkey with provolone cheese, lettuce, tomatoes, onions, and oil & vinegar.",
    category: "sandwich",
    nutrition: { calories: 580, protein: 35, carbs: 52, fat: 24, sodium: 1650, fiber: 3 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-32",
    restaurantId: "jerseymikes",
    name: "Veggie Sub (Regular)",
    description: "Swiss cheese, provolone, green peppers, onions, lettuce, tomatoes, and olive oil blend.",
    category: "sandwich",
    nutrition: { calories: 520, protein: 22, carbs: 56, fat: 24, sodium: 1320, fiber: 4 },
    isHealthyChoice: false,
    dietaryType: "vegetarian",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-33",
    restaurantId: "jerseymikes",
    name: "Chicken Philly Sub in a Tub",
    description: "Grilled chicken with peppers, onions, and cheese served as a salad bowl - no bread.",
    category: "salad",
    nutrition: { calories: 380, protein: 38, carbs: 12, fat: 20, sodium: 1100, fiber: 2 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  // Five Guys Items
  {
    id: "ff-34",
    restaurantId: "fiveguys",
    name: "Little Hamburger",
    description: "Single patty with your choice of free toppings on a toasted sesame seed bun.",
    category: "sandwich",
    nutrition: { calories: 540, protein: 27, carbs: 39, fat: 30, sodium: 380, fiber: 2 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-35",
    restaurantId: "fiveguys",
    name: "Lettuce Wrap Burger",
    description: "Fresh beef patty wrapped in crisp lettuce with your choice of toppings.",
    category: "sandwich",
    nutrition: { calories: 360, protein: 26, carbs: 4, fat: 28, sodium: 320, fiber: 1 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-36",
    restaurantId: "fiveguys",
    name: "Veggie Sandwich",
    description: "Fresh grilled vegetables including mushrooms, peppers, onions, and tomatoes.",
    category: "sandwich",
    nutrition: { calories: 280, protein: 8, carbs: 42, fat: 10, sodium: 420, fiber: 4 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$$",
    imageUrl: ""
  },
  // Popeyes Items
  {
    id: "ff-37",
    restaurantId: "popeyes",
    name: "Blackened Chicken Tenders (5pc)",
    description: "Juicy chicken tenders seasoned with Cajun blackening spices, not fried.",
    category: "other",
    nutrition: { calories: 340, protein: 54, carbs: 4, fat: 12, sodium: 1340, fiber: 0 },
    isHealthyChoice: true,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-38",
    restaurantId: "popeyes",
    name: "Classic Chicken Sandwich",
    description: "Crispy buttermilk-battered chicken breast with pickles and mayo on a brioche bun.",
    category: "sandwich",
    nutrition: { calories: 700, protein: 28, carbs: 50, fat: 42, sodium: 1440, fiber: 2 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$",
    imageUrl: ""
  },
  {
    id: "ff-39",
    restaurantId: "popeyes",
    name: "Green Beans (Regular)",
    description: "Tender green beans slow-cooked with Cajun spices.",
    category: "other",
    nutrition: { calories: 60, protein: 2, carbs: 8, fat: 2, sodium: 560, fiber: 3 },
    isHealthyChoice: true,
    dietaryType: "vegan",
    priceRange: "$",
    imageUrl: ""
  },
  // Shake Shack Items
  {
    id: "ff-40",
    restaurantId: "shakeshack",
    name: "ShackBurger",
    description: "Angus beef cheeseburger topped with lettuce, tomato, and ShackSauce.",
    category: "sandwich",
    nutrition: { calories: 530, protein: 29, carbs: 26, fat: 35, sodium: 1190, fiber: 2 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$$",
    imageUrl: ""
  },
  {
    id: "ff-41",
    restaurantId: "shakeshack",
    name: "Shroom Burger",
    description: "Crisp-fried portobello mushroom filled with melted cheese on a toasted bun.",
    category: "sandwich",
    nutrition: { calories: 570, protein: 17, carbs: 44, fat: 36, sodium: 860, fiber: 3 },
    isHealthyChoice: false,
    dietaryType: "vegetarian",
    priceRange: "$$$",
    imageUrl: ""
  },
  {
    id: "ff-42",
    restaurantId: "shakeshack",
    name: "Chicken Shack",
    description: "Crispy chicken breast with lettuce, pickles, and buttermilk herb mayo.",
    category: "sandwich",
    nutrition: { calories: 580, protein: 28, carbs: 50, fat: 30, sodium: 1370, fiber: 2 },
    isHealthyChoice: false,
    dietaryType: "meat",
    priceRange: "$$$",
    imageUrl: ""
  }
];

const pantryIngredients: PantryIngredient[] = [
  // Proteins
  { id: "chicken", name: "Chicken", category: "proteins" },
  { id: "beef", name: "Beef", category: "proteins" },
  { id: "pork", name: "Pork", category: "proteins" },
  { id: "turkey", name: "Turkey", category: "proteins" },
  { id: "salmon", name: "Salmon", category: "proteins" },
  { id: "shrimp", name: "Shrimp", category: "proteins" },
  { id: "cod", name: "Cod/White Fish", category: "proteins" },
  { id: "tofu", name: "Tofu", category: "proteins" },
  { id: "eggs", name: "Eggs", category: "proteins" },
  { id: "chickpeas", name: "Chickpeas", category: "proteins" },
  { id: "black-beans", name: "Black Beans", category: "proteins" },
  
  // Vegetables
  { id: "broccoli", name: "Broccoli", category: "vegetables" },
  { id: "spinach", name: "Spinach", category: "vegetables" },
  { id: "bell-peppers", name: "Bell Peppers", category: "vegetables" },
  { id: "tomatoes", name: "Tomatoes", category: "vegetables" },
  { id: "onions", name: "Onions", category: "vegetables" },
  { id: "garlic", name: "Garlic", category: "vegetables" },
  { id: "mushrooms", name: "Mushrooms", category: "vegetables" },
  { id: "zucchini", name: "Zucchini", category: "vegetables" },
  { id: "asparagus", name: "Asparagus", category: "vegetables" },
  { id: "bok-choy", name: "Bok Choy", category: "vegetables" },
  { id: "sweet-potatoes", name: "Sweet Potatoes", category: "vegetables" },
  { id: "potatoes", name: "Potatoes", category: "vegetables" },
  { id: "lettuce", name: "Lettuce", category: "vegetables" },
  { id: "cucumber", name: "Cucumber", category: "vegetables" },
  { id: "eggplant", name: "Eggplant", category: "vegetables" },
  { id: "brussels-sprouts", name: "Brussels Sprouts", category: "vegetables" },
  { id: "corn", name: "Corn", category: "vegetables" },
  { id: "cabbage", name: "Cabbage", category: "vegetables" },
  
  // Grains
  { id: "rice", name: "Rice", category: "grains" },
  { id: "pasta", name: "Pasta", category: "grains" },
  { id: "quinoa", name: "Quinoa", category: "grains" },
  { id: "bread", name: "Bread", category: "grains" },
  { id: "tortillas", name: "Tortillas", category: "grains" },
  { id: "rice-noodles", name: "Rice Noodles", category: "grains" },
  { id: "farro", name: "Farro", category: "grains" },
  
  // Dairy
  { id: "cheese", name: "Cheese", category: "dairy" },
  { id: "mozzarella", name: "Mozzarella", category: "dairy" },
  { id: "feta", name: "Feta Cheese", category: "dairy" },
  { id: "parmesan", name: "Parmesan", category: "dairy" },
  { id: "butter", name: "Butter", category: "dairy" },
  { id: "greek-yogurt", name: "Greek Yogurt", category: "dairy" },
  { id: "milk", name: "Milk", category: "dairy" },
  
  // Pantry Staples
  { id: "olive-oil", name: "Olive Oil", category: "pantry-staples" },
  { id: "soy-sauce", name: "Soy Sauce", category: "pantry-staples" },
  { id: "honey", name: "Honey", category: "pantry-staples" },
  { id: "lemon", name: "Lemon", category: "pantry-staples" },
  { id: "lime", name: "Lime", category: "pantry-staples" },
  { id: "vinegar", name: "Vinegar", category: "pantry-staples" },
  { id: "coconut-milk", name: "Coconut Milk", category: "pantry-staples" },
  { id: "peanut-butter", name: "Peanut Butter", category: "pantry-staples" },
  { id: "tahini", name: "Tahini", category: "pantry-staples" },
  { id: "cashews", name: "Cashews", category: "pantry-staples" },
  { id: "olives", name: "Olives", category: "pantry-staples" },
  { id: "bbq-sauce", name: "BBQ Sauce", category: "pantry-staples" },
  { id: "salsa", name: "Salsa", category: "pantry-staples" },
  { id: "marinara", name: "Marinara Sauce", category: "pantry-staples" },
  { id: "balsamic", name: "Balsamic Glaze", category: "pantry-staples" },
  
  // Herbs & Spices
  { id: "basil", name: "Basil", category: "herbs-spices" },
  { id: "cilantro", name: "Cilantro", category: "herbs-spices" },
  { id: "rosemary", name: "Rosemary", category: "herbs-spices" },
  { id: "thyme", name: "Thyme", category: "herbs-spices" },
  { id: "dill", name: "Dill", category: "herbs-spices" },
  { id: "parsley", name: "Parsley", category: "herbs-spices" },
  { id: "ginger", name: "Ginger", category: "herbs-spices" },
  { id: "curry-powder", name: "Curry Powder", category: "herbs-spices" },
  { id: "cumin", name: "Cumin", category: "herbs-spices" },
  { id: "paprika", name: "Paprika", category: "herbs-spices" },
  { id: "taco-seasoning", name: "Taco Seasoning", category: "herbs-spices" },
  { id: "greek-seasoning", name: "Greek Seasoning", category: "herbs-spices" },
];

// Map recipes to their key ingredients for matching
const recipeIngredientMap: Record<string, string[]> = {
  "1": ["chicken", "lemon", "garlic", "olive-oil", "rosemary", "thyme", "broccoli"], // Grilled Lemon Herb Chicken
  "2": ["quinoa", "cucumber", "tomatoes", "onions", "olives", "feta", "olive-oil", "lemon", "parsley"], // Mediterranean Quinoa Bowl
  "3": ["salmon", "bok-choy", "soy-sauce", "honey", "ginger", "garlic"], // Teriyaki Salmon
  "4": ["pasta", "mushrooms", "cashews", "garlic", "thyme", "olive-oil"], // Creamy Vegan Mushroom Pasta
  "5": ["turkey", "lettuce", "tomatoes", "greek-yogurt", "taco-seasoning", "lime", "cilantro"], // Turkey Taco Lettuce Wraps
  "6": ["chickpeas", "spinach", "coconut-milk", "tomatoes", "onions", "garlic", "curry-powder", "cumin", "rice"], // Chickpea Curry
  "7": ["pork", "potatoes", "brussels-sprouts", "rosemary", "thyme", "parsley", "olive-oil", "garlic"], // Herb-Crusted Pork Tenderloin
  "8": ["bell-peppers", "rice", "black-beans", "corn", "cheese", "salsa", "cumin", "cilantro"], // Stuffed Bell Peppers
  "9": ["shrimp", "broccoli", "bell-peppers", "garlic", "soy-sauce", "rice"], // Shrimp Stir-Fry
  "10": ["eggplant", "marinara", "mozzarella", "parmesan", "eggs", "basil", "olive-oil"], // Eggplant Parmesan
  "11": ["beef", "broccoli", "soy-sauce", "honey", "ginger", "garlic", "rice"], // Beef and Broccoli Bowl
  "12": ["quinoa", "chickpeas", "sweet-potatoes", "spinach", "cabbage", "tahini", "lemon", "olive-oil"], // Buddha Bowl
  "13": ["cod", "asparagus", "butter", "garlic", "lemon", "dill", "tomatoes"], // Lemon Garlic Cod
  "14": ["chicken", "sweet-potatoes", "bbq-sauce", "cabbage", "vinegar", "olive-oil"], // BBQ Chicken Sweet Potato Bowls
  "15": ["tofu", "rice-noodles", "bell-peppers", "peanut-butter", "soy-sauce", "lime", "vinegar"], // Vegetable Pad Thai
  "16": ["chicken", "potatoes", "zucchini", "onions", "tomatoes", "feta", "olive-oil", "greek-seasoning"], // Greek Chicken Sheet Pan
  "17": ["black-beans", "tortillas", "lime", "onions", "cilantro", "cumin", "paprika"], // Black Bean Tacos with Mango Salsa
  "18": ["chicken", "mozzarella", "tomatoes", "basil", "balsamic", "olive-oil", "garlic"], // Caprese Chicken
  // International Recipes
  "19": ["chicken", "panko", "eggs", "flour", "carrots", "onions", "potatoes", "curry-powder", "rice"], // Japanese Chicken Katsu Curry
  "20": ["chickpeas", "sweet-potatoes", "zucchini", "onions", "garlic", "cumin", "cinnamon", "turmeric"], // Moroccan Vegetable Tagine
  "21": ["beef", "rice", "spinach", "carrots", "zucchini", "eggs", "gochujang", "soy-sauce", "sesame-oil"], // Korean Bibimbap Bowl
  "22": ["chicken", "rice-noodles", "ginger", "onions", "fish-sauce", "star-anise", "cinnamon"], // Vietnamese Pho Ga
  "23": ["chicken", "greek-yogurt", "garam-masala", "tomatoes", "cream", "butter", "onions", "garlic", "ginger", "rice"], // Indian Butter Chicken
  "24": ["tofu", "coconut-milk", "green-curry-paste", "broccoli", "bell-peppers", "zucchini", "soy-sauce", "basil", "rice"], // Thai Green Curry
  "25": ["pork", "hominy", "guajillo", "ancho", "onions", "garlic", "oregano", "cabbage", "lime"], // Mexican Pozole Rojo
  "26": ["eggplant", "beef", "onions", "tomatoes", "cinnamon", "butter", "flour", "milk", "parmesan", "eggs"], // Greek Moussaka
  "27": ["red-lentils", "onions", "garlic", "berbere", "tomato-paste", "olive-oil"], // Ethiopian Lentil Stew
  "28": ["rice", "shrimp", "mussels", "chorizo", "bell-peppers", "saffron", "peas", "lemon"], // Spanish Seafood Paella
  "29": ["chicken", "peanuts", "dried-chilies", "garlic", "soy-sauce", "vinegar", "hoisin", "rice"], // Chinese Kung Pao Chicken
  "30": ["black-beans", "sausage", "bacon", "pork", "onions", "garlic", "bay-leaves", "rice", "collard-greens"], // Brazilian Feijoada
  "31": ["chickpeas", "onions", "garlic", "parsley", "cumin", "pita", "tahini", "tomatoes", "lettuce"], // Lebanese Falafel Wrap
  "32": ["rice", "porcini", "mushrooms", "onions", "white-wine", "parmesan", "butter", "thyme"], // Italian Risotto ai Funghi
  "33": ["chicken", "scotch-bonnet", "allspice", "thyme", "soy-sauce", "lime", "rice", "beans"], // Jamaican Jerk Chicken
  "34": ["eggplant", "onions", "garlic", "tomatoes", "olive-oil", "parsley"], // Turkish Imam Bayildi
  "35": ["beef", "tomatoes", "onions", "soy-sauce", "vinegar", "potatoes", "rice", "cilantro"], // Peruvian Lomo Saltado
};

// My Pantry inventory storage
let myPantryItems: PantryItem[] = [];
let pantryItemIdCounter = 1;

// Common barcode database for grocery items
const barcodeDatabase: Record<string, { name: string; category: string }> = {
  // Proteins
  "041130000614": { name: "Chicken Breast", category: "proteins" },
  "041130003271": { name: "Ground Beef", category: "proteins" },
  "041303007068": { name: "Salmon Fillet", category: "proteins" },
  "041303010556": { name: "Shrimp", category: "proteins" },
  "030000061398": { name: "Eggs", category: "proteins" },
  "021130060405": { name: "Bacon", category: "proteins" },
  "041130001130": { name: "Turkey", category: "proteins" },
  "025317102001": { name: "Tofu", category: "proteins" },
  // Vegetables
  "033383001166": { name: "Broccoli", category: "vegetables" },
  "033383002125": { name: "Spinach", category: "vegetables" },
  "033383001203": { name: "Bell Peppers", category: "vegetables" },
  "070470003016": { name: "Tomatoes", category: "vegetables" },
  "070470003078": { name: "Onions", category: "vegetables" },
  "070470003085": { name: "Garlic", category: "vegetables" },
  "070470003092": { name: "Mushrooms", category: "vegetables" },
  "070470003139": { name: "Zucchini", category: "vegetables" },
  "070470003146": { name: "Carrots", category: "vegetables" },
  "070470003153": { name: "Celery", category: "vegetables" },
  "070470003160": { name: "Potatoes", category: "vegetables" },
  "070470003177": { name: "Sweet Potatoes", category: "vegetables" },
  "070470003184": { name: "Lettuce", category: "vegetables" },
  "070470003191": { name: "Cucumber", category: "vegetables" },
  // Grains
  "041224720879": { name: "Rice", category: "grains" },
  "021000616671": { name: "Pasta", category: "grains" },
  "041303055533": { name: "Quinoa", category: "grains" },
  "073410002019": { name: "Bread", category: "grains" },
  "074265001171": { name: "Tortillas", category: "grains" },
  "041196010299": { name: "Oatmeal", category: "grains" },
  // Dairy
  "021130340781": { name: "Milk", category: "dairy" },
  "049022700451": { name: "Butter", category: "dairy" },
  "021130421381": { name: "Cheese", category: "dairy" },
  "036632036100": { name: "Greek Yogurt", category: "dairy" },
  "049022706439": { name: "Sour Cream", category: "dairy" },
  "021130421398": { name: "Mozzarella", category: "dairy" },
  "021130421404": { name: "Parmesan", category: "dairy" },
  // Pantry Staples
  "041224721562": { name: "Olive Oil", category: "pantry-staples" },
  "024600010061": { name: "Soy Sauce", category: "pantry-staples" },
  "052100027494": { name: "Chicken Broth", category: "pantry-staples" },
  "068134100066": { name: "Black Beans", category: "pantry-staples" },
  "028000517106": { name: "Chickpeas", category: "pantry-staples" },
  "024600015851": { name: "Rice Vinegar", category: "pantry-staples" },
  "048001211759": { name: "Honey", category: "pantry-staples" },
  "052100022406": { name: "Vegetable Broth", category: "pantry-staples" },
  "070718001293": { name: "Coconut Milk", category: "pantry-staples" },
  "070718001309": { name: "Diced Tomatoes", category: "pantry-staples" },
  // Herbs & Spices
  "052100025247": { name: "Salt", category: "herbs-spices" },
  "052100025254": { name: "Black Pepper", category: "herbs-spices" },
  "052100025261": { name: "Garlic Powder", category: "herbs-spices" },
  "052100025278": { name: "Cumin", category: "herbs-spices" },
  "052100025285": { name: "Paprika", category: "herbs-spices" },
  "052100025292": { name: "Curry Powder", category: "herbs-spices" },
  "052100025308": { name: "Oregano", category: "herbs-spices" },
  "052100025315": { name: "Thyme", category: "herbs-spices" },
  "052100025322": { name: "Rosemary", category: "herbs-spices" },
  "052100025339": { name: "Basil", category: "herbs-spices" },
  "052100025346": { name: "Ginger", category: "herbs-spices" },
  "052100025353": { name: "Cinnamon", category: "herbs-spices" },
};

import type { PantryCategory } from "@shared/schema";

export class MemStorage implements IStorage {
  async getRecipes(filters: {
    familySize?: number;
    dietaryType?: DietaryType;
    priceLevel?: PriceLevel;
  }): Promise<Recipe[]> {
    let result = recipes;

    if (filters.dietaryType) {
      result = result.filter((r) => r.dietaryType === filters.dietaryType);
    }

    if (filters.priceLevel) {
      result = result.filter((r) => r.priceLevel === filters.priceLevel);
    }

    return result;
  }

  async getRecipeById(id: string): Promise<Recipe | undefined> {
    return recipes.find((r) => r.id === id);
  }

  async getAddOns(restrictions: string[]): Promise<SideAddOn[]> {
    if (restrictions.length === 0) {
      return sideAddOns.slice(0, 5);
    }

    const matching = sideAddOns.filter((addOn) =>
      restrictions.some((restriction) =>
        addOn.forPickyEaters.includes(restriction)
      )
    );

    return matching.slice(0, 6);
  }

  async getFastFoodRestaurants(): Promise<FastFoodRestaurant[]> {
    return fastFoodRestaurants;
  }

  async getFastFoodItems(filters?: {
    restaurantId?: string;
    dietaryType?: DietaryType;
    healthyOnly?: boolean;
  }): Promise<FastFoodItem[]> {
    let result = fastFoodItems;

    if (filters?.restaurantId) {
      result = result.filter((item) => item.restaurantId === filters.restaurantId);
    }

    if (filters?.dietaryType) {
      result = result.filter((item) => item.dietaryType === filters.dietaryType);
    }

    if (filters?.healthyOnly) {
      result = result.filter((item) => item.isHealthyChoice);
    }

    return result;
  }

  async getPantryIngredients(): Promise<PantryIngredient[]> {
    return pantryIngredients;
  }

  async getMatchingRecipes(ingredientIds: string[], cuisine?: CuisineType): Promise<RecipeMatch[]> {
    if (ingredientIds.length === 0) {
      return [];
    }

    const ingredientSet = new Set(ingredientIds);
    const matches: RecipeMatch[] = [];

    // Filter recipes by cuisine if specified
    const filteredRecipes = cuisine && cuisine !== "all" 
      ? recipes.filter(r => r.cuisine === cuisine)
      : recipes;

    for (const recipe of filteredRecipes) {
      const recipeIngredients = recipeIngredientMap[recipe.id] || [];
      if (recipeIngredients.length === 0) continue;

      const matching = recipeIngredients.filter(ing => ingredientSet.has(ing));
      const missing = recipeIngredients.filter(ing => !ingredientSet.has(ing));
      const matchPercentage = Math.round((matching.length / recipeIngredients.length) * 100);

      if (matching.length > 0) {
        matches.push({
          recipe,
          matchingIngredients: matching,
          missingIngredients: missing,
          matchPercentage,
        });
      }
    }

    // Sort by match percentage (highest first)
    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  async getRandomRecipe(ingredientIds: string[], minMatchPercent: number = 30, cuisine?: CuisineType): Promise<RecipeMatch | null> {
    const matches = await this.getMatchingRecipes(ingredientIds, cuisine);
    const eligible = matches.filter(m => m.matchPercentage >= minMatchPercent);
    
    if (eligible.length === 0) {
      // If no matches meet the minimum, return any match
      if (matches.length > 0) {
        return matches[Math.floor(Math.random() * matches.length)];
      }
      return null;
    }

    // Russian roulette - pick a random one from eligible matches
    return eligible[Math.floor(Math.random() * eligible.length)];
  }

  async getMysteryRecipe(cuisine?: CuisineType): Promise<Recipe> {
    // Filter recipes by cuisine if specified
    const filteredRecipes = cuisine && cuisine !== "all" 
      ? recipes.filter(r => r.cuisine === cuisine)
      : recipes;
    
    // Pick a completely random recipe - no ingredient matching needed
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    return filteredRecipes[randomIndex];
  }

  async getInternationalRecipes(): Promise<Recipe[]> {
    // Get all recipes that have an origin field (international recipes)
    return recipes.filter(r => r.origin);
  }

  // My Pantry Inventory Methods
  async getMyPantryItems(): Promise<PantryItem[]> {
    return myPantryItems.sort((a, b) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  }

  async addPantryItem(item: InsertPantryItem): Promise<PantryItem> {
    const newItem: PantryItem = {
      id: String(pantryItemIdCounter++),
      name: item.name,
      barcode: item.barcode,
      category: item.category,
      quantity: item.quantity ?? 1,
      unit: item.unit ?? "item",
      addedAt: new Date().toISOString(),
      expiresAt: item.expiresAt,
    };
    myPantryItems.push(newItem);
    return newItem;
  }

  async updatePantryItem(id: string, updates: Partial<InsertPantryItem>): Promise<PantryItem | null> {
    const index = myPantryItems.findIndex(item => item.id === id);
    if (index === -1) return null;

    myPantryItems[index] = {
      ...myPantryItems[index],
      ...updates,
    };
    return myPantryItems[index];
  }

  async deletePantryItem(id: string): Promise<boolean> {
    const index = myPantryItems.findIndex(item => item.id === id);
    if (index === -1) return false;
    myPantryItems.splice(index, 1);
    return true;
  }

  async clearMyPantry(): Promise<void> {
    myPantryItems = [];
  }

  async lookupBarcode(barcode: string): Promise<{ name: string; category: string } | null> {
    return barcodeDatabase[barcode] || null;
  }
}

export const storage = new MemStorage();
