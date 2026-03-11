// Recipe database with full ingredients and instructions
const recipeDatabase = {
  "Spaghetti & Meat Sauce": {
    description: "Classic Italian comfort food the whole family loves.",
    prepTime: 10, cookTime: 30, servings: 4,
    ingredients: ["1 lb spaghetti", "1 lb ground beef", "1 jar marinara sauce", "1 onion, diced", "3 cloves garlic", "Italian seasoning", "Parmesan cheese"],
    instructions: ["Cook pasta according to package. Brown beef with onion and garlic. Add marinara and seasoning, simmer 15 min. Serve over pasta with Parmesan."]
  },
  "Chicken Tacos": {
    description: "Easy weeknight tacos with seasoned chicken.",
    prepTime: 10, cookTime: 20, servings: 4,
    ingredients: ["1 lb chicken breast", "Taco seasoning", "8 tortillas", "Lettuce", "Tomatoes", "Cheese", "Sour cream", "Salsa"],
    instructions: ["Cook chicken, shred and season. Warm tortillas. Assemble tacos with toppings."]
  },
  "Baked Ziti": {
    description: "Cheesy pasta bake with layers of ricotta and mozzarella.",
    prepTime: 15, cookTime: 35, servings: 6,
    ingredients: ["1 lb ziti pasta", "2 cups ricotta", "3 cups mozzarella", "1 jar marinara", "1 lb ground beef", "Italian herbs"],
    instructions: ["Cook pasta. Brown beef, add sauce. Layer pasta, ricotta, meat sauce, mozzarella. Bake 375°F 25 min."]
  },
  "Grilled Burgers": {
    description: "Classic American burgers hot off the grill.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["1.5 lb ground beef", "4 burger buns", "Lettuce", "Tomato", "Onion", "Cheese slices", "Ketchup", "Mustard"],
    instructions: ["Form patties, season. Grill 4-5 min per side. Toast buns. Assemble with toppings."]
  },
  "Chicken Nuggets & Fries": {
    description: "Kid-approved crispy chicken with golden fries.",
    prepTime: 15, cookTime: 25, servings: 4,
    ingredients: ["1 lb chicken breast", "1 cup breadcrumbs", "2 eggs", "Frozen fries", "Ketchup", "Ranch dressing"],
    instructions: ["Cut chicken into nuggets. Dip in egg, coat in breadcrumbs. Bake 400°F with fries 20-25 min."]
  },
  "Mac & Cheese": {
    description: "Creamy, cheesy comfort in every bite.",
    prepTime: 10, cookTime: 20, servings: 4,
    ingredients: ["1 lb elbow macaroni", "3 cups shredded cheddar", "2 cups milk", "3 tbsp butter", "3 tbsp flour", "Salt & pepper"],
    instructions: ["Cook pasta. Make roux with butter and flour, add milk. Stir in cheese until melted. Combine with pasta."]
  },
  "Pizza Night": {
    description: "Homemade pizza with your favorite toppings.",
    prepTime: 20, cookTime: 15, servings: 4,
    ingredients: ["Pizza dough", "Pizza sauce", "2 cups mozzarella", "Pepperoni", "Bell peppers", "Mushrooms", "Italian seasoning"],
    instructions: ["Roll dough, spread sauce. Add cheese and toppings. Bake 450°F 12-15 min until golden."]
  },
  "Hot Dogs & Tater Tots": {
    description: "Quick and easy crowd-pleaser for kids.",
    prepTime: 5, cookTime: 20, servings: 4,
    ingredients: ["8 hot dogs", "8 hot dog buns", "Frozen tater tots", "Ketchup", "Mustard", "Relish"],
    instructions: ["Bake tater tots per package. Grill or boil hot dogs. Serve in buns with condiments."]
  },
  "Meatloaf & Mashed Potatoes": {
    description: "Classic comfort dinner with savory meatloaf.",
    prepTime: 15, cookTime: 60, servings: 6,
    ingredients: ["2 lbs ground beef", "1 cup breadcrumbs", "1 egg", "Ketchup", "Onion", "4 potatoes", "Butter", "Milk"],
    instructions: ["Mix beef, breadcrumbs, egg, onion. Shape loaf, top with ketchup. Bake 350°F 1 hour. Boil potatoes, mash with butter and milk."]
  },
  "Pot Roast": {
    description: "Tender, slow-cooked beef with vegetables.",
    prepTime: 20, cookTime: 180, servings: 6,
    ingredients: ["3 lb chuck roast", "Carrots", "Potatoes", "Onion", "Beef broth", "Garlic", "Thyme", "Bay leaves"],
    instructions: ["Sear roast. Add vegetables and broth. Slow cook 3-4 hours until tender. Slice and serve with vegetables."]
  },
  "Beef Tacos": {
    description: "Ground beef tacos with all the fixings.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["1 lb ground beef", "Taco seasoning", "8 taco shells", "Lettuce", "Tomatoes", "Cheese", "Sour cream"],
    instructions: ["Brown beef, add seasoning. Fill shells with meat and toppings."]
  },
  "Quesadillas": {
    description: "Crispy tortillas stuffed with melted cheese.",
    prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ["8 flour tortillas", "3 cups shredded cheese", "Cooked chicken (optional)", "Salsa", "Sour cream", "Guacamole"],
    instructions: ["Fill tortilla with cheese (and chicken). Fold and cook in pan until golden. Serve with dips."]
  },
  "Grilled Chicken & Veggies": {
    description: "Healthy grilled chicken with seasonal vegetables.",
    prepTime: 15, cookTime: 20, servings: 4,
    ingredients: ["4 chicken breasts", "Zucchini", "Bell peppers", "Onion", "Olive oil", "Italian seasoning", "Lemon"],
    instructions: ["Marinate chicken. Chop veggies. Grill chicken 6 min/side. Grill veggies until tender."]
  },
  "Salmon & Asparagus": {
    description: "Elegant but simple sheet pan dinner.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["4 salmon fillets", "1 bunch asparagus", "Olive oil", "Lemon", "Garlic", "Dill", "Salt & pepper"],
    instructions: ["Arrange salmon and asparagus on sheet pan. Drizzle with oil, lemon, garlic. Bake 400°F 12-15 min."]
  },
  "Buddha Bowl": {
    description: "Nourishing bowl packed with grains and veggies.",
    prepTime: 15, cookTime: 30, servings: 4,
    ingredients: ["Quinoa", "Chickpeas", "Sweet potato", "Kale", "Avocado", "Tahini", "Lemon"],
    instructions: ["Cook quinoa. Roast sweet potato and chickpeas. Massage kale. Assemble bowls, drizzle tahini dressing."]
  },
  "Stir Fry Veggies": {
    description: "Colorful vegetable stir fry with savory sauce.",
    prepTime: 15, cookTime: 10, servings: 4,
    ingredients: ["Broccoli", "Bell peppers", "Snap peas", "Carrots", "Soy sauce", "Garlic", "Ginger", "Sesame oil", "Rice"],
    instructions: ["Cook rice. Stir fry vegetables in hot wok. Add sauce ingredients. Serve over rice."]
  },
  "Ramen Bowls": {
    description: "Quick homemade ramen with toppings.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["4 packs ramen noodles", "4 cups chicken broth", "Soft boiled eggs", "Green onions", "Corn", "Nori", "Soy sauce"],
    instructions: ["Heat broth, add soy sauce. Cook noodles. Prepare toppings. Assemble bowls with noodles, broth, and toppings."]
  },
  "Fried Rice": {
    description: "Quick and easy one-pan dinner.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["4 cups cooked rice", "2 eggs", "Peas", "Carrots", "Soy sauce", "Sesame oil", "Green onions", "Garlic"],
    instructions: ["Scramble eggs, set aside. Stir fry vegetables. Add rice, soy sauce, eggs. Toss until heated through."]
  },
  "Pancakes & Bacon": {
    description: "Classic breakfast-for-dinner with fluffy pancakes and crispy bacon.",
    prepTime: 10, cookTime: 20, servings: 4,
    ingredients: ["2 cups pancake mix", "1.5 cups milk", "2 eggs", "1 lb bacon", "Butter", "Maple syrup"],
    instructions: ["Cook bacon in oven at 400°F for 15-18 min. Mix pancake batter. Cook pancakes on griddle until bubbles form, flip. Serve with butter and syrup."]
  },
  "Waffles & Sausage": {
    description: "Crispy waffles with breakfast sausage links.",
    prepTime: 10, cookTime: 20, servings: 4,
    ingredients: ["2 cups waffle mix", "1.5 cups milk", "2 eggs", "1/4 cup melted butter", "1 lb breakfast sausage links", "Maple syrup", "Whipped cream"],
    instructions: ["Preheat waffle iron. Mix batter ingredients. Cook waffles until golden. Pan-fry sausage links until browned. Serve together with syrup."]
  },
  "Breakfast Burritos": {
    description: "Hearty burritos stuffed with eggs, cheese, and sausage.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["8 eggs", "4 large flour tortillas", "1 cup shredded cheese", "1/2 lb breakfast sausage", "Salsa", "Sour cream", "Bell peppers"],
    instructions: ["Brown sausage, set aside. Scramble eggs with peppers. Warm tortillas. Fill with eggs, sausage, cheese. Roll into burritos. Serve with salsa."]
  },
  "French Toast & Fruit": {
    description: "Golden French toast with fresh fruit and powdered sugar.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["8 slices thick bread", "4 eggs", "1 cup milk", "1 tsp cinnamon", "1 tsp vanilla", "Butter", "Fresh berries", "Powdered sugar", "Maple syrup"],
    instructions: ["Whisk eggs, milk, cinnamon, and vanilla. Dip bread slices in mixture. Cook in buttered pan until golden on both sides. Top with fruit, powdered sugar, and syrup."]
  },
  "Egg Scramble & Toast": {
    description: "Simple scrambled eggs with buttered toast.",
    prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ["8 eggs", "1/4 cup milk", "Butter", "Salt & pepper", "4 slices bread", "Shredded cheese"],
    instructions: ["Whisk eggs with milk, salt, and pepper. Cook in buttered pan over medium-low, stirring gently. Toast bread. Serve eggs with toast and top with cheese."]
  },
  "Biscuits & Gravy": {
    description: "Southern-style biscuits smothered in sausage gravy.",
    prepTime: 10, cookTime: 25, servings: 4,
    ingredients: ["1 can biscuits (or 2 cups biscuit mix)", "1 lb breakfast sausage", "1/4 cup flour", "2.5 cups milk", "Salt & pepper"],
    instructions: ["Bake biscuits per package directions. Brown sausage in skillet, crumble well. Sprinkle flour over sausage, stir. Add milk gradually, stirring until thick. Season. Serve gravy over split biscuits."]
  },
  "Omelettes & Hash Browns": {
    description: "Custom omelettes with crispy hash browns on the side.",
    prepTime: 10, cookTime: 20, servings: 4,
    ingredients: ["8 eggs", "Shredded cheese", "Diced ham or veggies", "Bell peppers", "Onion", "Frozen hash browns", "Butter", "Salt & pepper"],
    instructions: ["Cook hash browns in skillet until crispy. For each omelette: whisk 2 eggs, pour in buttered pan. Add fillings when set, fold. Serve with hash browns."]
  },
  "Chicken Quesadillas": {
    description: "Crispy tortillas stuffed with seasoned chicken and melted cheese.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["8 flour tortillas", "2 cups cooked shredded chicken", "3 cups shredded cheese", "Salsa", "Sour cream", "Guacamole"],
    instructions: ["Fill tortilla with chicken and cheese. Fold and cook in pan until golden and cheese is melted. Serve with salsa, sour cream, and guacamole."]
  },
  "Enchiladas": {
    description: "Rolled tortillas filled with meat and cheese, smothered in enchilada sauce.",
    prepTime: 15, cookTime: 30, servings: 6,
    ingredients: ["12 corn tortillas", "2 cups cooked shredded chicken or ground beef", "2 cups shredded cheese", "1 can enchilada sauce", "Sour cream", "Diced onion", "Cilantro"],
    instructions: ["Preheat oven to 375°F. Fill tortillas with meat and cheese, roll and place seam-down in baking dish. Pour enchilada sauce over top, sprinkle with cheese. Bake 20-25 min until bubbly. Top with sour cream and cilantro."]
  },
  "Nachos Grande": {
    description: "Loaded nachos piled high with all the toppings.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["1 bag tortilla chips", "1 lb ground beef", "Taco seasoning", "2 cups shredded cheese", "Jalapenos", "Sour cream", "Guacamole", "Salsa", "Black beans", "Diced tomatoes"],
    instructions: ["Brown beef with taco seasoning. Spread chips on sheet pan, layer with beef, beans, and cheese. Bake at 400°F 8-10 min until cheese melts. Top with jalapenos, sour cream, guacamole, salsa, and tomatoes."]
  },
  "Chicken Fried Rice": {
    description: "Quick fried rice loaded with chicken and vegetables.",
    prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ["4 cups cooked rice", "2 chicken breasts, diced", "2 eggs", "Peas", "Carrots", "Soy sauce", "Sesame oil", "Green onions", "Garlic"],
    instructions: ["Cook diced chicken until done. Scramble eggs, set aside. Stir fry vegetables. Add rice, chicken, soy sauce, eggs. Toss until heated through."]
  },
  "Chicken Stir Fry": {
    description: "Savory chicken stir fry with crisp vegetables in a ginger sauce.",
    prepTime: 15, cookTime: 15, servings: 4,
    ingredients: ["1.5 lbs chicken breast, sliced", "Broccoli", "Bell peppers", "Snap peas", "Soy sauce", "Garlic", "Ginger", "Sesame oil", "Cornstarch", "Rice"],
    instructions: ["Cook rice. Stir fry chicken until golden. Add vegetables, cook until tender-crisp. Mix soy sauce, ginger, garlic, and cornstarch for sauce. Pour over stir fry. Serve over rice."]
  }
};

const familyMeals = {
  quickeasy: [
    { name: "Chicken Nuggets & Fries", style: "kids", diet: "meat", allergens: ["gluten", "eggs"] },
    { name: "Mac & Cheese", style: "kids", diet: "vegetarian", allergens: ["gluten", "dairy"] },
    { name: "Pizza Night", style: "kids", diet: "vegetarian", allergens: ["gluten", "dairy"] },
    { name: "Hot Dogs & Tater Tots", style: "kids", diet: "meat", allergens: ["gluten"] },
    { name: "Quesadillas", style: "cheap", diet: "vegetarian", allergens: ["gluten", "dairy"] },
    { name: "Fried Rice", style: "cheap", diet: "vegetarian", allergens: ["soy", "eggs"] },
    { name: "Ramen Bowls", style: "cheap", diet: "meat", allergens: ["gluten", "soy", "eggs"] },
    { name: "Chicken Tacos", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Beef Tacos", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
  ],
  comfort: [
    { name: "Mac & Cheese", style: "kids", diet: "vegetarian", allergens: ["gluten", "dairy"] },
    { name: "Meatloaf & Mashed Potatoes", style: "family", diet: "meat", allergens: ["gluten", "eggs", "dairy"] },
    { name: "Pot Roast", style: "family", diet: "meat", allergens: [] },
    { name: "Baked Ziti", style: "family", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Spaghetti & Meat Sauce", style: "family", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Grilled Burgers", style: "family", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Ramen Bowls", style: "cheap", diet: "meat", allergens: ["gluten", "soy", "eggs"] },
  ],
  texmex: [
    { name: "Chicken Tacos", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Beef Tacos", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Quesadillas", style: "cheap", diet: "vegetarian", allergens: ["gluten", "dairy"] },
    { name: "Chicken Quesadillas", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Enchiladas", style: "family", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Breakfast Burritos", style: "cheap", diet: "meat", allergens: ["gluten", "eggs", "dairy"] },
    { name: "Nachos Grande", style: "family", diet: "meat", allergens: ["gluten", "dairy"] },
  ],
  chicken: [
    { name: "Chicken Tacos", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Chicken Nuggets & Fries", style: "kids", diet: "meat", allergens: ["gluten", "eggs"] },
    { name: "Grilled Chicken & Veggies", style: "healthy", diet: "meat", allergens: [] },
    { name: "Chicken Quesadillas", style: "cheap", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Chicken Fried Rice", style: "cheap", diet: "meat", allergens: ["soy", "eggs"] },
    { name: "Chicken Stir Fry", style: "healthy", diet: "meat", allergens: ["soy", "sesame"] },
  ],
  brinner: [
    { name: "Pancakes & Bacon", style: "family", diet: "meat", allergens: ["gluten", "eggs", "dairy"] },
    { name: "Waffles & Sausage", style: "family", diet: "meat", allergens: ["gluten", "eggs", "dairy"] },
    { name: "Breakfast Burritos", style: "cheap", diet: "meat", allergens: ["gluten", "eggs", "dairy"] },
    { name: "French Toast & Fruit", style: "family", diet: "vegetarian", allergens: ["gluten", "eggs", "dairy"] },
    { name: "Egg Scramble & Toast", style: "cheap", diet: "vegetarian", allergens: ["gluten", "eggs", "dairy"] },
    { name: "Biscuits & Gravy", style: "family", diet: "meat", allergens: ["gluten", "dairy"] },
    { name: "Omelettes & Hash Browns", style: "family", diet: "vegetarian", allergens: ["eggs", "dairy"] },
  ],
  healthy: [
    { name: "Grilled Chicken & Veggies", style: "healthy", diet: "meat", allergens: [] },
    { name: "Salmon & Asparagus", style: "healthy", diet: "seafood", allergens: ["fish"] },
    { name: "Buddha Bowl", style: "healthy", diet: "vegan", allergens: ["sesame"] },
    { name: "Stir Fry Veggies", style: "healthy", diet: "vegan", allergens: ["soy", "sesame"] },
    { name: "Chicken Stir Fry", style: "healthy", diet: "meat", allergens: ["soy", "sesame"] },
  ],
  order: [
    { name: "Pizza Delivery", style: "any", diet: "vegetarian", allergens: ["gluten", "dairy"] },
    { name: "Chinese Takeout", style: "any", diet: "meat", allergens: ["soy", "gluten"] },
    { name: "Chick-fil-A", style: "kids", diet: "meat", allergens: ["gluten"] },
    { name: "Chipotle", style: "any", diet: "meat", allergens: [] },
  ],
  grocery: [
    { name: "Rotisserie Chicken Dinner", style: "any", diet: "meat", allergens: [] },
    { name: "Deli Sandwiches", style: "cheap", diet: "meat", allergens: ["gluten"] },
  ],
  wildcard: [
    { name: "Mystery Recipe", style: "any" },
    { name: "Let the Kids Pick", style: "kids" },
  ],
  leftovers: [
    { name: "Fridge Cleanout", style: "any" },
    { name: "Leftover Remix", style: "any" },
  ],
};

const dateMeals = {
  stayin: [
    { name: "Candlelit Pasta" },
    { name: "Steak & Wine" },
    { name: "Fondue Night" },
    { name: "Homemade Sushi" },
    { name: "Breakfast for Dinner" },
  ],
  goout: [
    { name: "Italian Restaurant" },
    { name: "Steakhouse" },
    { name: "Sushi Bar" },
    { name: "Thai Restaurant" },
    { name: "French Bistro" },
  ],
  adventure: [
    { name: "Food Truck Tour" },
    { name: "Cooking Class" },
    { name: "Wine Tasting" },
    { name: "Picnic in the Park" },
  ],
  surprise: [
    { name: "Chef's Choice" },
    { name: "Mystery Date" },
  ],
};

const familySlices = [
  { label: "Quick & Easy", icon: "⚡" },
  { label: "Comfort Food", icon: "🍔" },
  { label: "Tex-Mex", icon: "🌮" },
  { label: "Chicken Night", icon: "🍗" },
  { label: "Brinner", icon: "🍳" },
  { label: "Healthy-ish", icon: "🥗" },
  { label: "Fend for Yourself", icon: "🧍‍♂️🍽️" },
];
const dateSlices = [
  { label: "Stay In", icon: "🍷" },
  { label: "Go Out", icon: "🍽️" },
  { label: "Adventure", icon: "🌮" },
  { label: "Surprise", icon: "✨" },
];

let isSpinning = false;
const isDateNight = window.location.pathname.includes("date");
const slices = isDateNight ? dateSlices : familySlices;
const meals = isDateNight ? dateMeals : familyMeals;

let cookWheel = null;
let currentWheelSegments = slices;

function getFilteredRecipes() {
  if (isDateNight) return null;

  const styleSelect = document.getElementById("style");
  const dietSelect = document.getElementById("diet");
  const allergySelect = document.getElementById("allergy");
  const selectedStyle = styleSelect ? styleSelect.value : "any";
  const selectedDiet = dietSelect ? dietSelect.value : "any";
  const selectedAllergy = allergySelect ? allergySelect.value : "none";

  const hasFilters = selectedStyle !== "any" || selectedDiet !== "any" || selectedAllergy !== "none";
  if (!hasFilters) return null;

  const seen = new Set();
  const matched = [];

  Object.values(meals).forEach(category => {
    if (!Array.isArray(category)) return;
    category.forEach(m => {
      if (seen.has(m.name)) return;

      if (selectedStyle !== "any" && m.style !== selectedStyle && m.style !== "any") return;
      if (selectedDiet !== "any") {
        if (!m.diet) { /* ok */ }
        else if (selectedDiet === "vegan" && m.diet !== "vegan") return;
        else if (selectedDiet === "vegetarian" && m.diet !== "vegetarian" && m.diet !== "vegan") return;
        else if (selectedDiet === "meat" && m.diet !== "meat") return;
        else if (selectedDiet === "seafood" && m.diet !== "seafood") return;
      }
      if (selectedAllergy !== "none" && m.allergens && m.allergens.includes(selectedAllergy)) return;

      seen.add(m.name);
      matched.push(m);
    });
  });

  return matched;
}

function buildWheelSegments() {
  if (isDateNight) return slices;

  const filtered = getFilteredRecipes();
  if (!filtered || filtered.length === 0) return slices;

  const shuffled = filtered.slice().sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, Math.min(12, shuffled.length));
  return picked.map(m => ({ label: m.name, icon: m.name.charAt(0) }));
}

function updateWheelForFilters() {
  if (!cookWheel || isSpinning) return;
  currentWheelSegments = buildWheelSegments();
  cookWheel.redraw(currentWheelSegments);
}

function initCookWheel() {
  const containerId = isDateNight ? "date-wheel-container" : "cook-wheel-container";
  const el = document.getElementById(containerId);
  if (!el || typeof createSpinWheel === "undefined") return;

  currentWheelSegments = buildWheelSegments();

  cookWheel = createSpinWheel(containerId, {
    segments: currentWheelSegments,
    size: 170,
    title: isDateNight ? "Date Night" : "Dinner Roll",
    subtitle: isDateNight ? "Spin for the vibe" : "Spin to decide dinner",
    onResult: function(winner, idx) {
      handleSpinResult(winner);
    },
    onSpin: function() {
      if (!checkPaywall()) return;
      triggerSpin();
    }
  });
}

function triggerSpin() {
  if (!cookWheel || isSpinning) return;
  isSpinning = true;

  const result = document.getElementById("result");
  if (result) result.classList.add("hidden");

  const targetIndex = Math.floor(Math.random() * currentWheelSegments.length);
  cookWheel.spin(targetIndex);
}

function handleSpinResult(winner) {
  isSpinning = false;
  const result = document.getElementById("result");

  const filtered = getFilteredRecipes();
  const isFilteredMode = filtered && filtered.length > 0;

  if (isFilteredMode) {
    const mealName = winner.label;
    launchConfetti();
    setTimeout(() => {
      document.getElementById("meal").textContent = mealName;
      if (result) result.classList.remove("hidden");
    }, 400);

    const pantryLinks = document.getElementById("pantry-links");
    if (pantryLinks) pantryLinks.classList.remove("hidden");
    return;
  }

  const sliceKey = getSliceKey(winner.label);
  const options = meals[sliceKey] || [];

  let filteredOptions = options;

  if (!isDateNight) {
    if (filteredOptions.length === 0) {
      document.getElementById("meal").textContent = "No meals match your filters";
      document.getElementById("result-message").textContent = "Try adjusting your diet or allergy settings";
      if (result) result.classList.remove("hidden");
      return;
    }
  }

  const meal = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
  const mealName = meal?.name || winner.label;

  launchConfetti();

  setTimeout(() => {
    document.getElementById("meal").textContent = mealName;
    if (result) result.classList.remove("hidden");
  }, 400);

  const pantryLinks = document.getElementById("pantry-links");
  if (pantryLinks) {
    const cookCategories = ["quickeasy", "comfort", "texmex", "chicken", "brinner", "healthy"];
    if (cookCategories.includes(sliceKey)) {
      pantryLinks.classList.remove("hidden");
    } else {
      pantryLinks.classList.add("hidden");
    }
  }
}

function renderWheelIcons() {
  initCookWheel();
}

function spin() {
  if (cookWheel && !isSpinning) {
    if (!checkPaywall()) return;
    triggerSpin();
  }
}

function getSliceKey(sliceLabel) {
  if (isDateNight) {
    const map = {
      "Stay In": "stayin",
      "Go Out": "goout",
      "Adventure": "adventure",
      "Surprise": "surprise",
    };
    return map[sliceLabel] || "stayin";
  } else {
    const map = {
      "Quick & Easy": "quickeasy",
      "Comfort Food": "comfort",
      "Tex-Mex": "texmex",
      "Chicken Night": "chicken",
      "Brinner": "brinner",
      "Healthy-ish": "healthy",
      "Fend for Yourself": "leftovers",
    };
    return map[sliceLabel] || "quickeasy";
  }
}

function launchConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  container.innerHTML = "";
  const confettiColors = ["#f0b429", "#e07b39", "#FF6B6B", "#4ECDC4", "#FFE66D", "#DDA0DD", "#95E1D3", "#fff", "#FF9F43", "#F368E0", "#48DBFB"];
  const shapes = ["square", "circle", "rect"];
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = 5 + Math.random() * 12;
    piece.style.width = shape === "rect" ? size * 0.4 + "px" : size + "px";
    piece.style.height = size + "px";
    piece.style.backgroundColor = color;
    piece.style.borderRadius = shape === "circle" ? "50%" : "2px";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDuration = (1.2 + Math.random() * 2.5) + "s";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.opacity = (0.7 + Math.random() * 0.3).toString();
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ""; }, 5000);
}

function shareMeal() {
  const mealEl = document.getElementById('meal');
  const mealName = mealEl ? mealEl.textContent : 'dinner';
  const shareText = "Tonight's dinner: " + mealName + " via DinnerRoll! dinnerroll.app";
  if (navigator.share) {
    navigator.share({ title: 'DinnerRoll', text: shareText, url: 'https://dinnerroll.app' }).catch(function() {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(function() { alert('Copied to clipboard!'); });
  }
}

function checkPaywall() {
  const FREE_SPINS = 3;
  const spinCount = parseInt(localStorage.getItem('dr_spin_count') || '0');
  const isSubscribed = localStorage.getItem('dr_subscribed') === 'true';
  if (isSubscribed) return true;
  if (sessionStorage.getItem('dr_paywall_dismissed') === 'true') return true;
  if (spinCount >= FREE_SPINS) {
    showPaywallModal();
    return false;
  }
  localStorage.setItem('dr_spin_count', String(spinCount + 1));
  return true;
}

function showPaywallModal() {
  if (document.getElementById('paywall-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'paywall-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);';
  modal.innerHTML = `
    <div style="background:#2d1810;border:2px solid #f0b429;border-radius:16px;padding:2rem;max-width:400px;width:90%;text-align:center;color:white;">
      <h2 style="font-size:1.5rem;font-weight:800;color:#f0b429;margin-bottom:0.5rem;">You're on a Roll!</h2>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:1rem;font-size:0.95rem;">You've used your 3 free rolls. Subscribe to keep rolling and unlock all features.</p>
      <div style="display:flex;gap:0.5rem;justify-content:center;margin-bottom:1rem;flex-wrap:wrap;">
        <button onclick="window.location.href='/purchase'" style="background:#f0b429;color:#2d1810;border:none;padding:0.7rem 1.5rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;">Subscribe Now</button>
        <button onclick="sessionStorage.setItem('dr_paywall_dismissed','true');document.getElementById('paywall-modal').remove()" style="background:transparent;color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.2);padding:0.7rem 1.5rem;border-radius:8px;font-weight:600;font-size:0.9rem;cursor:pointer;">Maybe Later</button>
      </div>
      <p style="color:rgba(255,255,255,0.4);font-size:0.75rem;">$4.99/month or $29.99 lifetime. Cancel anytime.</p>
    </div>
  `;
  document.body.appendChild(modal);
}

let currentMealName = null;

// Load user's pantry from localStorage (synced with my-pantry page)
function loadUserPantry() {
  try {
    return JSON.parse(localStorage.getItem("dinnerroll_my_pantry") || "[]");
  } catch {
    return [];
  }
}

// Check which ingredients the user is missing
function getMissingIngredients(recipeIngredients) {
  const pantry = loadUserPantry();
  const pantryNames = pantry.map(item => item.name.toLowerCase().trim());
  
  const missing = [];
  const have = [];
  const pantryIsEmpty = pantry.length === 0;
  
  recipeIngredients.forEach(ingredient => {
    if (pantryIsEmpty) {
      missing.push(ingredient);
      return;
    }
    
    const cleanIngredient = ingredient.toLowerCase()
      .replace(/^\d+(\.\d+)?\s*(lb|lbs|oz|cups?|tbsp|tsp|cloves?|bunch|can|jar|pack|packs?)?\s*/i, '')
      .split(',')[0]
      .replace(/\(.*?\)/g, '')
      .trim();
    
    const mainWords = cleanIngredient.split(/\s+/).filter(w => 
      w.length > 2 && !['and', 'the', 'for', 'with'].includes(w)
    );
    
    const found = pantryNames.some(pantryItem => {
      if (cleanIngredient.includes(pantryItem) || pantryItem.includes(cleanIngredient)) return true;
      return mainWords.some(word => word.length > 3 && pantryItem.includes(word));
    });
    
    if (found) {
      have.push(ingredient);
    } else {
      missing.push(ingredient);
    }
  });
  
  return { missing, have, pantryIsEmpty };
}

// Show Cook It modal with recipe details
function showCookModal(mealName) {
  const recipe = recipeDatabase[mealName];
  if (!recipe) {
    alert("Recipe details coming soon for: " + mealName);
    return;
  }
  
  const modal = document.getElementById("cook-modal");
  document.getElementById("cook-modal-title").textContent = mealName;
  document.getElementById("cook-modal-desc").textContent = recipe.description;
  document.getElementById("cook-time").textContent = `${recipe.prepTime + recipe.cookTime} min`;
  document.getElementById("cook-servings").textContent = `${recipe.servings} servings`;
  
  // Check pantry for missing ingredients
  const { missing, have, pantryIsEmpty } = getMissingIngredients(recipe.ingredients);
  
  // Show missing section
  const missingSection = document.getElementById("missing-section");
  const haveAllSection = document.getElementById("have-all-section");
  const missingList = document.getElementById("missing-list");
  
  if (pantryIsEmpty) {
    missingSection.classList.add("hidden");
    haveAllSection.classList.add("hidden");
  } else if (missing.length > 0) {
    missingSection.classList.remove("hidden");
    haveAllSection.classList.add("hidden");
    missingList.innerHTML = missing.map(ing => `<li>${ing}</li>`).join("");
    
    const searchTerms = missing.map(ing => {
      return ing.replace(/^\d+(\.\d+)?\s*(lb|lbs|oz|cups?|tbsp|tsp|cloves?|bunch|can|jar|pack|packs?)?\s*/i, '')
        .split(',')[0].trim();
    }).join(" ");
    
    document.getElementById("heb-link").href = `https://www.heb.com/search/?q=${encodeURIComponent(searchTerms)}`;
    document.getElementById("kroger-link").href = `https://www.kroger.com/search?query=${encodeURIComponent(searchTerms)}`;
    document.getElementById("favor-link").href = `https://favordelivery.com/search?q=${encodeURIComponent(searchTerms)}`;
  } else {
    missingSection.classList.add("hidden");
    haveAllSection.classList.remove("hidden");
  }
  
  // Populate ingredients list
  const ingredientsList = document.getElementById("cook-ingredients");
  if (pantryIsEmpty) {
    ingredientsList.innerHTML = recipe.ingredients.map(ing => {
      return `<li>${ing}</li>`;
    }).join("");
  } else {
    ingredientsList.innerHTML = recipe.ingredients.map(ing => {
      const isMissing = missing.includes(ing);
      return `<li class="${isMissing ? 'missing-item' : 'have-item'}">${isMissing ? '[Missing]' : '[Have]'} ${ing}</li>`;
    }).join("");
  }
  
  // Populate instructions
  const instructionsList = document.getElementById("cook-instructions");
  instructionsList.innerHTML = recipe.instructions.map(step => `<li>${step}</li>`).join("");
  
  modal.classList.remove("hidden");
}

// Show Order It modal with delivery options
function showOrderModal(mealName) {
  const modal = document.getElementById("order-modal");
  document.getElementById("order-meal-name").textContent = mealName;
  
  // Create search query for the meal
  const searchQuery = encodeURIComponent(mealName + " near me");
  
  document.getElementById("uber-order-link").href = `https://www.ubereats.com/search?q=${searchQuery}`;
  document.getElementById("doordash-order-link").href = `https://www.doordash.com/search/store/${searchQuery}`;
  document.getElementById("grubhub-order-link").href = `https://www.grubhub.com/search?queryText=${searchQuery}`;
  document.getElementById("google-order-link").href = `https://www.google.com/maps/search/${searchQuery}`;
  
  modal.classList.remove("hidden");
}

// Close modals
function closeModals() {
  document.getElementById("cook-modal")?.classList.add("hidden");
  document.getElementById("order-modal")?.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  renderWheelIcons();
  let resizeTimer;
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (cookWheel) initCookWheel(); }, 250); });
  
  const spinBtn = document.getElementById("spin");
  if (spinBtn) {
    spinBtn.addEventListener("click", spin);
  }
  
  // Cook It button
  document.getElementById("cook-it-btn")?.addEventListener("click", () => {
    const mealName = document.getElementById("meal")?.textContent;
    if (mealName) {
      currentMealName = mealName;
      showCookModal(mealName);
    }
  });
  
  // Order It button
  document.getElementById("order-it-btn")?.addEventListener("click", () => {
    const mealName = document.getElementById("meal")?.textContent;
    if (mealName) {
      currentMealName = mealName;
      showOrderModal(mealName);
    }
  });
  
  // Close modal buttons
  document.getElementById("close-cook-modal")?.addEventListener("click", closeModals);
  document.getElementById("close-order-modal")?.addEventListener("click", closeModals);
  
  // Start cooking button
  document.getElementById("start-cooking-btn")?.addEventListener("click", () => {
    closeModals();
    alert("Time to cook! Good luck with your " + currentMealName + "!");
  });
  
  // Close modals when clicking outside
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModals();
      }
    });
  });
});
