import { sql } from "drizzle-orm";
import { pgTable, varchar, timestamp, text, integer, boolean, date, numeric } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  familySize: integer("family_size").default(4),
  dietaryRestrictions: text("dietary_restrictions").array(),
  allergies: text("allergies").array(),
  favoriteCuisines: text("favorite_cuisines").array(),
  budgetLevel: varchar("budget_level").default("medium"),
  weeklyBudget: numeric("weekly_budget"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  notificationsEnabled: boolean("notifications_enabled").default(false),
  notificationTime: varchar("notification_time").default("16:00"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dinnerHistory = pgTable("dinner_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  mealName: varchar("meal_name").notNull(),
  mealType: varchar("meal_type").notNull(),
  source: varchar("source"),
  recipeId: varchar("recipe_id"),
  cost: numeric("cost"),
  cookedAt: timestamp("cooked_at").defaultNow(),
  rating: integer("rating"),
  notes: text("notes"),
  latitude: varchar("latitude"),
  longitude: varchar("longitude"),
});

export const familyMembers = pgTable("family_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  age: integer("age"),
  dietaryRestrictions: text("dietary_restrictions").array(),
  allergies: text("allergies").array(),
  dislikes: text("dislikes").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const mealPlans = pgTable("meal_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  date: date("date").notNull(),
  mealName: varchar("meal_name").notNull(),
  recipeId: varchar("recipe_id"),
  source: varchar("source"),
  servings: integer("servings").default(4),
  estimatedCost: numeric("estimated_cost"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const recipeRatings = pgTable("recipe_ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  recipeId: varchar("recipe_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;
export type DinnerHistory = typeof dinnerHistory.$inferSelect;
export type InsertDinnerHistory = typeof dinnerHistory.$inferInsert;
export type FamilyMember = typeof familyMembers.$inferSelect;
export type InsertFamilyMember = typeof familyMembers.$inferInsert;
export type MealPlan = typeof mealPlans.$inferSelect;
export type InsertMealPlan = typeof mealPlans.$inferInsert;
export type RecipeRating = typeof recipeRatings.$inferSelect;
export type InsertRecipeRating = typeof recipeRatings.$inferInsert;
