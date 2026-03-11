import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { DietaryType, PriceLevel, CuisineType, PantryCategory } from "@shared/schema";
import { insertPantryItemSchema } from "@shared/schema";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { db } from "./db";
import { userPreferences, dinnerHistory, familyMembers, mealPlans, recipeRatings } from "@shared/schema";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import OpenAI from "openai";
import { stripeService } from "./stripeService";
import { getStripePublishableKey } from "./stripeClient";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  await setupAuth(app);
  registerAuthRoutes(app);
  
  // Auth user info endpoint for profile page
  app.get("/api/auth/user", (req: any, res) => {
    if (req.isAuthenticated() && req.user?.claims) {
      res.json({
        id: req.user.claims.sub,
        email: req.user.claims.email,
        firstName: req.user.claims.first_name,
        lastName: req.user.claims.last_name,
        profileImageUrl: req.user.claims.profile_image_url
      });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });
  
  app.get("/api/recipes", async (req, res) => {
    try {
      const familySize = req.query.familySize
        ? parseInt(req.query.familySize as string)
        : undefined;
      const dietaryType = req.query.dietaryType as DietaryType | undefined;
      const priceLevel = req.query.priceLevel as PriceLevel | undefined;

      const recipes = await storage.getRecipes({
        familySize,
        dietaryType,
        priceLevel,
      });

      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Failed to fetch recipes" });
    }
  });

  app.get("/api/recipes/seasonal", async (req, res) => {
    try {
      const seasonParam = req.query.season as string | undefined;
      let season: string;

      if (seasonParam === "current" || !seasonParam) {
        const month = new Date().getMonth() + 1;
        if (month >= 3 && month <= 5) season = "spring";
        else if (month >= 6 && month <= 8) season = "summer";
        else if (month >= 9 && month <= 11) season = "fall";
        else season = "winter";
      } else {
        season = seasonParam;
      }

      const allRecipes = await storage.getRecipes({});
      const seasonalRecipes = allRecipes.filter((r) => r.season === season);
      res.json({ season, recipes: seasonalRecipes });
    } catch (error) {
      console.error("Error fetching seasonal recipes:", error);
      res.status(500).json({ error: "Failed to fetch seasonal recipes" });
    }
  });

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const recipe = await storage.getRecipeById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Failed to fetch recipe" });
    }
  });

  app.get("/api/addons", async (req, res) => {
    try {
      const restrictions = req.query.restrictions
        ? (Array.isArray(req.query.restrictions)
            ? req.query.restrictions
            : [req.query.restrictions]) as string[]
        : [];

      const addOns = await storage.getAddOns(restrictions);
      res.json(addOns);
    } catch (error) {
      console.error("Error fetching add-ons:", error);
      res.status(500).json({ error: "Failed to fetch add-ons" });
    }
  });

  // Fast Food Endpoints
  app.get("/api/fast-food/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getFastFoodRestaurants();
      res.json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  });

  app.get("/api/fast-food/items", async (req, res) => {
    try {
      const restaurantId = req.query.restaurantId as string | undefined;
      const dietaryType = req.query.dietaryType as DietaryType | undefined;
      const healthyOnly = req.query.healthyOnly === "true";

      const items = await storage.getFastFoodItems({
        restaurantId,
        dietaryType,
        healthyOnly,
      });
      res.json(items);
    } catch (error) {
      console.error("Error fetching fast food items:", error);
      res.status(500).json({ error: "Failed to fetch fast food items" });
    }
  });

  // Pantry Endpoints
  app.get("/api/pantry/ingredients", async (req, res) => {
    try {
      const ingredients = await storage.getPantryIngredients();
      res.json(ingredients);
    } catch (error) {
      console.error("Error fetching pantry ingredients:", error);
      res.status(500).json({ error: "Failed to fetch pantry ingredients" });
    }
  });

  app.post("/api/pantry/match", async (req, res) => {
    try {
      const ingredientIds = req.body.ingredientIds as string[] || [];
      const cuisine = req.body.cuisine as CuisineType | undefined;
      const matches = await storage.getMatchingRecipes(ingredientIds, cuisine);
      res.json(matches);
    } catch (error) {
      console.error("Error matching recipes:", error);
      res.status(500).json({ error: "Failed to match recipes" });
    }
  });

  app.post("/api/pantry/spin", async (req, res) => {
    try {
      const ingredientIds = req.body.ingredientIds as string[] || [];
      const minMatchPercent = req.body.minMatchPercent || 30;
      const cuisine = req.body.cuisine as CuisineType | undefined;
      const result = await storage.getRandomRecipe(ingredientIds, minMatchPercent, cuisine);
      res.json(result);
    } catch (error) {
      console.error("Error spinning recipe:", error);
      res.status(500).json({ error: "Failed to spin recipe" });
    }
  });

  // Mystery Spin - completely random recipe without ingredient matching
  app.post("/api/pantry/mystery-spin", async (req, res) => {
    try {
      const cuisine = req.body.cuisine as CuisineType | undefined;
      const recipe = await storage.getMysteryRecipe(cuisine);
      res.json(recipe);
    } catch (error) {
      console.error("Error getting mystery recipe:", error);
      res.status(500).json({ error: "Failed to get mystery recipe" });
    }
  });

  // Get international recipes
  app.get("/api/recipes/international", async (req, res) => {
    try {
      const recipes = await storage.getInternationalRecipes();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching international recipes:", error);
      res.status(500).json({ error: "Failed to fetch international recipes" });
    }
  });

  // My Pantry Inventory Endpoints
  app.get("/api/my-pantry", async (req, res) => {
    try {
      const items = await storage.getMyPantryItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching pantry items:", error);
      res.status(500).json({ error: "Failed to fetch pantry items" });
    }
  });

  app.post("/api/my-pantry", async (req, res) => {
    try {
      const parsed = insertPantryItemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid pantry item data", details: parsed.error });
      }
      const item = await storage.addPantryItem(parsed.data);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error adding pantry item:", error);
      res.status(500).json({ error: "Failed to add pantry item" });
    }
  });

  app.patch("/api/my-pantry/:id", async (req, res) => {
    try {
      const partialSchema = insertPantryItemSchema.partial();
      const parsed = partialSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid update data", details: parsed.error });
      }
      const item = await storage.updatePantryItem(req.params.id, parsed.data);
      if (!item) {
        return res.status(404).json({ error: "Pantry item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error updating pantry item:", error);
      res.status(500).json({ error: "Failed to update pantry item" });
    }
  });

  app.delete("/api/my-pantry/:id", async (req, res) => {
    try {
      const deleted = await storage.deletePantryItem(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Pantry item not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting pantry item:", error);
      res.status(500).json({ error: "Failed to delete pantry item" });
    }
  });

  app.delete("/api/my-pantry", async (req, res) => {
    try {
      await storage.clearMyPantry();
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing pantry:", error);
      res.status(500).json({ error: "Failed to clear pantry" });
    }
  });

  // Barcode lookup endpoint
  app.get("/api/barcode/:code", async (req, res) => {
    try {
      const result = await storage.lookupBarcode(req.params.code);
      if (!result) {
        return res.status(404).json({ error: "Barcode not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error looking up barcode:", error);
      res.status(500).json({ error: "Failed to lookup barcode" });
    }
  });

  // Smart Pantry Photo Scan endpoint
  app.post("/api/my-pantry/scan-photo", async (req, res) => {
    try {
      const { image } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image data is required" });
      }
      
      // Validate image size (max 10MB base64)
      if (image.length > 10 * 1024 * 1024 * 1.37) {
        return res.status(413).json({ error: "Image too large. Maximum size is 10MB." });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a food inventory assistant. Analyze the image of a pantry, fridge, or freezer and identify all visible food items. 
            
For each item, provide:
- name: The common name of the food item
- category: One of: proteins, vegetables, grains, dairy, pantry-staples, herbs-spices
- quantity: Estimated count (default 1 if unclear)
- unit: Unit of measurement (e.g., "item", "bag", "box", "bottle", "can", "lb", "oz")

Return a JSON object with an "items" array. Example:
{
  "items": [
    {"name": "Chicken Breast", "category": "proteins", "quantity": 2, "unit": "lb"},
    {"name": "Milk", "category": "dairy", "quantity": 1, "unit": "gallon"},
    {"name": "Canned Tomatoes", "category": "pantry-staples", "quantity": 3, "unit": "can"}
  ]
}

Only include clearly visible food items. If no food is visible, return {"items": []}.`
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`,
                },
              },
              {
                type: "text",
                text: "Please identify all food items in this image and return them as a JSON list."
              }
            ],
          },
        ],
        max_tokens: 2000,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        return res.status(500).json({ error: "No response from AI" });
      }

      const parsed = JSON.parse(content);
      const items = parsed.items || [];
      
      // Validate and normalize categories
      const validCategories = ["proteins", "vegetables", "grains", "dairy", "pantry-staples", "herbs-spices"];
      const normalizedItems = items.map((item: any) => ({
        name: String(item.name || "Unknown Item"),
        category: validCategories.includes(item.category) ? item.category : "pantry-staples",
        quantity: Number(item.quantity) || 1,
        unit: String(item.unit || "item"),
      }));

      res.json({ items: normalizedItems });
    } catch (error) {
      console.error("Error scanning pantry photo:", error);
      res.status(500).json({ error: "Failed to scan photo" });
    }
  });

  // User Preferences endpoints
  app.get("/api/user/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [prefs] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
      res.json(prefs || null);
    } catch (error) {
      console.error("Error fetching preferences:", error);
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.post("/api/user/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { familySize, dietaryRestrictions, allergies, favoriteCuisines, budgetLevel } = req.body;
      
      const [existing] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
      
      if (existing) {
        const [updated] = await db.update(userPreferences)
          .set({ familySize, dietaryRestrictions, allergies, favoriteCuisines, budgetLevel, updatedAt: new Date() })
          .where(eq(userPreferences.userId, userId))
          .returning();
        res.json(updated);
      } else {
        const [created] = await db.insert(userPreferences)
          .values({ userId, familySize, dietaryRestrictions, allergies, favoriteCuisines, budgetLevel })
          .returning();
        res.json(created);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      res.status(500).json({ error: "Failed to save preferences" });
    }
  });

  app.patch("/api/user/preferences", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { notificationsEnabled, notificationTime, familySize, dietaryRestrictions, allergies, favoriteCuisines, budgetLevel } = req.body;
      
      const [existing] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
      
      if (existing) {
        const updateData: any = { updatedAt: new Date() };
        if (notificationsEnabled !== undefined) updateData.notificationsEnabled = notificationsEnabled;
        if (notificationTime !== undefined) updateData.notificationTime = notificationTime;
        if (familySize !== undefined) updateData.familySize = familySize;
        if (dietaryRestrictions !== undefined) updateData.dietaryRestrictions = dietaryRestrictions;
        if (allergies !== undefined) updateData.allergies = allergies;
        if (favoriteCuisines !== undefined) updateData.favoriteCuisines = favoriteCuisines;
        if (budgetLevel !== undefined) updateData.budgetLevel = budgetLevel;
        
        const [updated] = await db.update(userPreferences)
          .set(updateData)
          .where(eq(userPreferences.userId, userId))
          .returning();
        res.json(updated);
      } else {
        const [created] = await db.insert(userPreferences)
          .values({
            userId,
            notificationsEnabled: notificationsEnabled || false,
            notificationTime: notificationTime || "16:00",
          })
          .returning();
        res.json(created);
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });

  // Dinner History endpoints
  app.get("/api/user/history", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await db.select().from(dinnerHistory)
        .where(eq(dinnerHistory.userId, userId))
        .orderBy(dinnerHistory.cookedAt);
      res.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  app.post("/api/user/history", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { mealName, mealType, source, recipeId, cost, rating, notes, latitude, longitude } = req.body;
      
      const [entry] = await db.insert(dinnerHistory)
        .values({ userId, mealName, mealType, source, recipeId, cost, rating, notes, latitude, longitude })
        .returning();
      res.json(entry);
    } catch (error) {
      console.error("Error saving history:", error);
      res.status(500).json({ error: "Failed to save history" });
    }
  });

  app.patch("/api/user/history/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { rating, notes } = req.body;
      const [updated] = await db.update(dinnerHistory)
        .set({ rating, notes })
        .where(and(eq(dinnerHistory.id, req.params.id), eq(dinnerHistory.userId, userId)))
        .returning();
      if (!updated) return res.status(404).json({ error: "Entry not found" });
      res.json(updated);
    } catch (error) {
      console.error("Error updating history:", error);
      res.status(500).json({ error: "Failed to update history" });
    }
  });

  // Family Members endpoints
  app.get("/api/user/family", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const members = await db.select().from(familyMembers).where(eq(familyMembers.userId, userId));
      res.json(members);
    } catch (error) {
      console.error("Error fetching family:", error);
      res.status(500).json({ error: "Failed to fetch family members" });
    }
  });

  app.post("/api/user/family", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { name, age, dietaryRestrictions, allergies, dislikes } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });
      const [member] = await db.insert(familyMembers)
        .values({ userId, name, age, dietaryRestrictions, allergies, dislikes })
        .returning();
      res.json(member);
    } catch (error) {
      console.error("Error adding family member:", error);
      res.status(500).json({ error: "Failed to add family member" });
    }
  });

  app.patch("/api/user/family/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { name, age, dietaryRestrictions, allergies, dislikes } = req.body;
      const [updated] = await db.update(familyMembers)
        .set({ name, age, dietaryRestrictions, allergies, dislikes })
        .where(and(eq(familyMembers.id, req.params.id), eq(familyMembers.userId, userId)))
        .returning();
      if (!updated) return res.status(404).json({ error: "Family member not found" });
      res.json(updated);
    } catch (error) {
      console.error("Error updating family member:", error);
      res.status(500).json({ error: "Failed to update family member" });
    }
  });

  app.delete("/api/user/family/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [deleted] = await db.delete(familyMembers)
        .where(and(eq(familyMembers.id, req.params.id), eq(familyMembers.userId, userId)))
        .returning();
      if (!deleted) return res.status(404).json({ error: "Family member not found" });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting family member:", error);
      res.status(500).json({ error: "Failed to delete family member" });
    }
  });

  // Meal Planning endpoints
  app.get("/api/user/meal-plans", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      
      let query = db.select().from(mealPlans).where(eq(mealPlans.userId, userId));
      if (startDate && endDate) {
        query = db.select().from(mealPlans).where(
          and(eq(mealPlans.userId, userId), gte(mealPlans.date, startDate), lte(mealPlans.date, endDate))
        );
      }
      const plans = await query;
      res.json(plans);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      res.status(500).json({ error: "Failed to fetch meal plans" });
    }
  });

  app.post("/api/user/meal-plans", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date, mealName, recipeId, source, servings, estimatedCost } = req.body;
      if (!date || !mealName) return res.status(400).json({ error: "Date and meal name required" });
      const [plan] = await db.insert(mealPlans)
        .values({ userId, date, mealName, recipeId, source, servings, estimatedCost })
        .returning();
      res.json(plan);
    } catch (error) {
      console.error("Error creating meal plan:", error);
      res.status(500).json({ error: "Failed to create meal plan" });
    }
  });

  app.delete("/api/user/meal-plans/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [deleted] = await db.delete(mealPlans)
        .where(and(eq(mealPlans.id, req.params.id), eq(mealPlans.userId, userId)))
        .returning();
      if (!deleted) return res.status(404).json({ error: "Meal plan not found" });
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      res.status(500).json({ error: "Failed to delete meal plan" });
    }
  });

  // Recipe Ratings endpoints
  app.get("/api/recipes/:id/ratings", async (req, res) => {
    try {
      const ratings = await db.select().from(recipeRatings)
        .where(eq(recipeRatings.recipeId, req.params.id))
        .orderBy(desc(recipeRatings.createdAt));
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;
      res.json({ ratings, averageRating: Math.round(avgRating * 10) / 10, totalRatings: ratings.length });
    } catch (error) {
      console.error("Error fetching ratings:", error);
      res.status(500).json({ error: "Failed to fetch ratings" });
    }
  });

  app.post("/api/recipes/:id/ratings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recipeId = req.params.id;
      const { rating, comment } = req.body;
      if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: "Rating must be 1-5" });
      const [entry] = await db.insert(recipeRatings)
        .values({ userId, recipeId, rating, comment })
        .returning();
      res.json(entry);
    } catch (error) {
      console.error("Error saving rating:", error);
      res.status(500).json({ error: "Failed to save rating" });
    }
  });

  // Budget tracking endpoint
  app.get("/api/user/budget-summary", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const [prefs] = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
      const weeklyHistory = await db.select().from(dinnerHistory)
        .where(and(eq(dinnerHistory.userId, userId), gte(dinnerHistory.cookedAt, startOfWeek)));
      
      const totalSpent = weeklyHistory.reduce((sum, h) => sum + (Number(h.cost) || 0), 0);
      const weeklyBudget = prefs?.weeklyBudget ? Number(prefs.weeklyBudget) : 0;

      res.json({ weeklyBudget, totalSpent, mealsThisWeek: weeklyHistory.length });
    } catch (error) {
      console.error("Error fetching budget:", error);
      res.status(500).json({ error: "Failed to fetch budget summary" });
    }
  });

  // Stripe routes for DinnerRoll purchase
  
  // Get Stripe publishable key for client
  app.get("/api/stripe/config", async (req, res) => {
    try {
      const publishableKey = await getStripePublishableKey();
      res.json({ publishableKey });
    } catch (error) {
      console.error("Error getting Stripe config:", error);
      res.status(500).json({ error: "Stripe not configured" });
    }
  });

  // Get DinnerRoll product and price
  app.get("/api/stripe/products", async (req, res) => {
    try {
      const rows = await stripeService.listProductsWithPrices();
      
      // Group prices by product
      const productsMap = new Map();
      for (const row of rows as any[]) {
        if (!productsMap.has(row.product_id)) {
          productsMap.set(row.product_id, {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            active: row.product_active,
            metadata: row.product_metadata,
            prices: []
          });
        }
        if (row.price_id) {
          productsMap.get(row.product_id).prices.push({
            id: row.price_id,
            unit_amount: row.unit_amount,
            currency: row.currency,
            active: row.price_active,
          });
        }
      }

      res.json({ products: Array.from(productsMap.values()) });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/stripe/subscribe", async (req, res) => {
    try {
      const { amount, email } = req.body;
      
      const amountNum = Number(amount);
      if (!amount || !Number.isInteger(amountNum) || amountNum < 3 || amountNum > 100) {
        return res.status(400).json({ error: "Amount must be a whole number between $3 and $100" });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const session = await stripeService.createSubscriptionCheckout(
        amountNum,
        `${baseUrl}/purchase/success`,
        `${baseUrl}/purchase/cancel`,
        email
      );

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating subscription checkout:", error);
      res.status(500).json({ error: "Failed to create subscription checkout" });
    }
  });

  app.post("/api/stripe/checkout", async (req, res) => {
    try {
      const { priceId, email } = req.body;
      
      if (!priceId || typeof priceId !== 'string') {
        return res.status(400).json({ error: "Price ID is required" });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const session = await stripeService.createCheckoutByPriceId(
        priceId,
        `${baseUrl}/purchase/success`,
        `${baseUrl}/purchase/cancel`,
        email
      );

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  return httpServer;
}
