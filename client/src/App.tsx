import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotificationPrompt from "@/components/notification-prompt";
import Onboarding from "@/components/onboarding";
import NotFound from "@/pages/not-found";
import Welcome from "@/pages/welcome";
import Recipes from "@/pages/recipes";
import FastFood from "@/pages/fast-food";
import Pantry from "@/pages/pantry";
import MyPantry from "@/pages/my-pantry";
import Purchase from "@/pages/purchase";
import PurchaseSuccess from "@/pages/purchase-success";
import PurchaseCancel from "@/pages/purchase-cancel";
import Legal from "@/pages/legal";
import History from "@/pages/history";
import MealPlanner from "@/pages/meal-planner";
import FamilyProfiles from "@/pages/family-profiles";
import DinnerRoll from "@/pages/dinner-roll";

function Router() {
  return (
    <Switch>
      <Route path="/about" component={Welcome} />
      <Route path="/dinner-roll" component={DinnerRoll} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/fast-food" component={FastFood} />
      <Route path="/pantry" component={Pantry} />
      <Route path="/my-pantry" component={MyPantry} />
      <Route path="/purchase" component={Purchase} />
      <Route path="/purchase/success" component={PurchaseSuccess} />
      <Route path="/purchase/cancel" component={PurchaseCancel} />
      <Route path="/legal" component={Legal} />
      <Route path="/history" component={History} />
      <Route path="/meal-planner" component={MealPlanner} />
      <Route path="/family" component={FamilyProfiles} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <Onboarding />
        <NotificationPrompt />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
