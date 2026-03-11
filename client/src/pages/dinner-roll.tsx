import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { RecipeDetailModal } from "@/components/recipe-detail-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UtensilsCrossed } from "lucide-react";
import { 
  ChefHat, 
  Truck, 
  ShoppingCart, 
  RefreshCw,
  ExternalLink,
  Dices,
  Car,
  Bike,
  Package,
  Soup,
  Store,
  Users,
  Salad,
} from "lucide-react";
import { SiUbereats, SiDoordash } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";
import type { Recipe } from "@shared/schema";

interface WheelSlice {
  id: string;
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const wheelSlices: WheelSlice[] = [
  { id: "cook", label: "Cook at Home", color: "#f0b429", Icon: ChefHat },
  { id: "ubereats", label: "Uber Eats", color: "#8b5a2b", Icon: Car },
  { id: "doordash", label: "DoorDash", color: "#c45e1a", Icon: Bike },
  { id: "grocery", label: "Grocery Run", color: "#d4a017", Icon: ShoppingCart },
  { id: "wildcard", label: "Wild Card", color: "#a0522d", Icon: Dices },
  { id: "leftovers", label: "Leftovers", color: "#6b3a2a", Icon: Soup },
];

interface GroceryStore {
  name: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const groceryStores: GroceryStore[] = [
  { name: "H-E-B", url: "https://www.heb.com/", Icon: Store, color: "#e31837" },
  { name: "Kroger", url: "https://www.kroger.com/", Icon: ShoppingCart, color: "#0033a1" },
  { name: "Favor", url: "https://favordelivery.com/", Icon: Bike, color: "#00bcd4" },
];

type FoodReality = "have" | "some" | "nothing";
type MealStyle = "any" | "family" | "kids" | "american" | "mexican" | "italian" | "asian" | "healthy";

const mealStyleLabels: Record<MealStyle, string> = {
  any: "Anything Goes",
  family: "Classic Family Favorites",
  kids: "Kids Night",
  american: "American Comfort",
  mexican: "Tex-Mex / Mexican",
  italian: "Italian",
  asian: "Asian-Inspired",
  healthy: "Healthy-ish",
};

interface MealResult {
  name: string;
  time: string;
  cost: string;
  slice: WheelSlice;
  recipe?: Recipe;
}

interface MealOption {
  name: string;
  time: string;
  cost: string;
  style: MealStyle;
}

const mealOptions: Record<string, MealOption[]> = {
  cook: [
    { name: "Spaghetti & Meat Sauce", time: "30 min", cost: "$4.20/serving", style: "family" },
    { name: "Chicken Tacos", time: "25 min", cost: "$3.80/serving", style: "mexican" },
    { name: "Baked Ziti", time: "40 min", cost: "$4.90/serving", style: "italian" },
    { name: "One-Pot Jambalaya", time: "55 min", cost: "$5.50/serving", style: "american" },
    { name: "Grilled Burgers", time: "25 min", cost: "$5.10/serving", style: "american" },
    { name: "Chicken Nuggets & Fries", time: "20 min", cost: "$4.50/serving", style: "kids" },
    { name: "Mac & Cheese", time: "25 min", cost: "$3.00/serving", style: "kids" },
    { name: "Pizza Night", time: "Instant", cost: "$$", style: "kids" },
    { name: "Meatloaf & Mashed Potatoes", time: "60 min", cost: "$5.00/serving", style: "family" },
    { name: "Pot Roast", time: "3 hrs", cost: "$6.00/serving", style: "family" },
    { name: "Beef Tacos", time: "25 min", cost: "$4.20/serving", style: "mexican" },
    { name: "Enchiladas", time: "45 min", cost: "$4.80/serving", style: "mexican" },
    { name: "Chicken Alfredo", time: "35 min", cost: "$4.90/serving", style: "italian" },
    { name: "Lasagna", time: "90 min", cost: "$5.50/serving", style: "italian" },
    { name: "Orange Chicken & Rice", time: "30 min", cost: "$4.60/serving", style: "asian" },
    { name: "Beef Stir Fry", time: "25 min", cost: "$5.20/serving", style: "asian" },
    { name: "Teriyaki Salmon", time: "30 min", cost: "$7.00/serving", style: "asian" },
    { name: "Grilled Chicken & Veggies", time: "30 min", cost: "$4.30/serving", style: "healthy" },
    { name: "Salmon & Asparagus", time: "25 min", cost: "$8.00/serving", style: "healthy" },
    { name: "Quinoa Buddha Bowl", time: "30 min", cost: "$4.00/serving", style: "healthy" },
    { name: "BBQ Ribs", time: "4 hrs", cost: "$8.00/serving", style: "american" },
    { name: "Fried Chicken", time: "45 min", cost: "$5.50/serving", style: "american" },
  ],
  ubereats: [
    { name: "Order Night", time: "30-45 min", cost: "$$", style: "any" },
  ],
  doordash: [
    { name: "Order Night", time: "30-45 min", cost: "$$", style: "any" },
  ],
  grocery: [
    { name: "Grocery Trip", time: "1-2 hrs", cost: "$$$", style: "any" },
  ],
  wildcard: [
    { name: "Mystery Recipe", time: "Varies", cost: "?", style: "any" },
  ],
  leftovers: [
    { name: "Leftovers Remix", time: "15 min", cost: "$0", style: "any" },
    { name: "Fridge Cleanout", time: "20 min", cost: "$0", style: "any" },
  ],
};

export default function DinnerRoll() {
  const [, navigate] = useLocation();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mealResult, setMealResult] = useState<MealResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  
  const [familySize, setFamilySize] = useState(4);
  const [foodReality, setFoodReality] = useState<FoodReality>("have");
  const [weeklyBudget] = useState(55);
  const [mealStyle, setMealStyle] = useState<MealStyle>("any");
  
  const wheelRef = useRef<HTMLDivElement>(null);

  const mysterySpinMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/pantry/mystery-spin", {});
      return response.json() as Promise<Recipe>;
    },
    onSuccess: (recipe) => {
      if (mealResult) {
        setMealResult({
          ...mealResult,
          name: recipe.name,
          time: "Varies",
          cost: `$${((recipe.priceLevel === "low" ? 3 : recipe.priceLevel === "medium" ? 5 : 8) * familySize).toFixed(0)}/meal`,
          recipe,
        });
      }
    },
  });

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    setMealResult(null);
    setShowRecipeModal(false);
    
    const sliceAngle = 360 / wheelSlices.length;
    let targetIndex: number;
    
    if (mealStyle !== "any") {
      targetIndex = wheelSlices.findIndex(s => s.id === "cook");
    } else {
      targetIndex = Math.floor(Math.random() * wheelSlices.length);
    }
    
    const targetAngle = targetIndex * sliceAngle + sliceAngle / 2;
    const randomOffset = (Math.random() - 0.5) * (sliceAngle * 0.6);
    const finalAngle = 360 - targetAngle + randomOffset;
    const spinAmount = 1440 + finalAngle;
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);
    
    const selected = wheelSlices[targetIndex];
    
    setTimeout(() => {
      setIsSpinning(false);
      
      const options = mealOptions[selected.id] || [];
      
      let filteredOptions = options;
      if (mealStyle !== "any" && selected.id === "cook") {
        filteredOptions = options.filter(
          (meal) => meal.style === mealStyle
        );
        if (filteredOptions.length === 0) {
          filteredOptions = options;
        }
      }
      
      const option = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
      
      const result: MealResult = {
        name: option?.name || selected.label,
        time: option?.time || "Varies",
        cost: option?.cost || "$",
        slice: selected,
      };
      
      setMealResult(result);
      setShowResult(true);
      
      if (selected.id === "wildcard") {
        mysterySpinMutation.mutate();
      }
    }, 4000);
  };

  const handleCookIt = () => {
    if (mealResult?.recipe) {
      setShowRecipeModal(true);
    } else {
      navigate("/recipes");
    }
  };

  const handleOrderIt = () => {
    if (mealResult?.slice.id === "ubereats") {
      window.open("https://www.ubereats.com", "_blank");
    } else if (mealResult?.slice.id === "doordash") {
      window.open("https://www.doordash.com", "_blank");
    } else {
      navigate("/fast-food");
    }
  };

  const spinAgain = () => {
    setShowResult(false);
    setMealResult(null);
    spin();
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const handleHealthyReset = () => {
    setMealStyle("healthy");
  };

  const getOrderLinks = (mealName: string) => {
    const query = encodeURIComponent(mealName);
    return {
      ubereats: `https://www.ubereats.com/search?q=${query}`,
      doordash: `https://www.doordash.com/search/store/${query}`,
      heb: `https://www.heb.com/search?q=${query}`,
      kroger: `https://www.kroger.com/search?query=${query}`,
      favor: `https://www.favordelivery.com/search/${query}`,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-2" data-testid="text-dinnerroll-title">
            DinnerRoll
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-tagline">No thinking. Just eat.</p>
          
          <div className="mt-4 inline-block" data-testid="budget-meter">
            <span className="text-sm text-muted-foreground font-medium">Weekly Budget</span>
            <div className="w-32 h-2.5 bg-muted rounded-full mt-1 mx-auto overflow-hidden">
              <div 
                className="h-full bg-[#f0b429] rounded-full transition-all"
                style={{ width: `${weeklyBudget}%` }}
              />
            </div>
          </div>
        </header>

        <section className="wheel-section">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <div
                ref={wheelRef}
                className="w-full h-full rounded-full shadow-2xl overflow-hidden"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)" : "none",
                  background: `conic-gradient(
                    #c45e1a 0deg 60deg,
                    #8b5a2b 60deg 120deg,
                    #f0b429 120deg 180deg,
                    #d4a017 180deg 240deg,
                    #a0522d 240deg 300deg,
                    #6b3a2a 300deg 360deg
                  )`,
                }}
                data-testid="wheel-spinner"
              >
                {wheelSlices.map((slice, i) => {
                  const SliceIcon = slice.Icon;
                  return (
                    <div
                      key={slice.id}
                      className="absolute text-white font-bold text-center"
                      style={{
                        width: "80px",
                        left: "50%",
                        top: "50%",
                        transformOrigin: "0 0",
                        transform: `rotate(${i * 60 + 30}deg) translateY(-90px) translateX(-50%)`,
                      }}
                    >
                      <SliceIcon className="h-5 w-5 mx-auto mb-1 drop-shadow" />
                      <span 
                        className="block text-xs font-semibold leading-tight"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                      >
                        {slice.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={spin}
                disabled={isSpinning}
                variant="default"
                size="lg"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                data-testid="button-spin-wheel"
              >
                {isSpinning ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <span>FEED US NOW</span>
                )}
              </Button>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground min-w-24">Family Size: {familySize}</span>
              <Slider
                value={[familySize]}
                onValueChange={(v) => setFamilySize(v[0])}
                min={2}
                max={8}
                step={1}
                className="flex-1"
                data-testid="slider-family-size"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Tonight's Style</span>
              <Select value={mealStyle} onValueChange={(v) => setMealStyle(v as MealStyle)}>
                <SelectTrigger className="flex-1" data-testid="select-meal-style">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(mealStyleLabels) as [MealStyle, string][]).map(([value, label]) => (
                    <SelectItem key={value} value={value} data-testid={`option-style-${value}`}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleHealthyReset}
                className="rounded-full"
                data-testid="button-healthy-reset"
              >
                <Salad className="h-4 w-4 mr-1" />
                Healthy Reset
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2" data-testid="reality-toggles">
              <Button
                variant={foodReality === "have" ? "default" : "secondary"}
                size="sm"
                onClick={() => setFoodReality("have")}
                className="rounded-full"
                data-testid="button-reality-have"
              >
                We Have Food
              </Button>
              <Button
                variant={foodReality === "some" ? "default" : "secondary"}
                size="sm"
                onClick={() => setFoodReality("some")}
                className="rounded-full"
                data-testid="button-reality-some"
              >
                Some Food
              </Button>
              <Button
                variant={foodReality === "nothing" ? "default" : "secondary"}
                size="sm"
                onClick={() => setFoodReality("nothing")}
                className="rounded-full"
                data-testid="button-reality-nothing"
              >
                Nothing
              </Button>
            </div>
          </div>
        </section>

        {showResult && mealResult && (
          <Card className="max-w-md mx-auto mt-6 rounded-2xl shadow-lg" data-testid="card-spin-result">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="text-meal-name">
                {mealResult.name}
              </h2>
              <p className="text-muted-foreground mb-4" data-testid="text-meal-meta">
                {mealResult.time} &bull; {mealResult.cost}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <Button
                  onClick={handleCookIt}
                  variant="default"
                  data-testid="button-cook-it"
                >
                  <ChefHat className="h-4 w-4 mr-2" />
                  Cook It
                </Button>
                <Button
                  onClick={handleOrderIt}
                  variant="secondary"
                  data-testid="button-order-it"
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Order It
                </Button>
                <Button
                  onClick={spinAgain}
                  variant="outline"
                  data-testid="button-spin-again"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Spin Again
                </Button>
              </div>

              {mealResult.slice.id === "grocery" && (
                <div className="flex flex-wrap justify-center gap-3 pt-2 border-t">
                  {groceryStores.map((store) => (
                    <a
                      key={store.name}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                      data-testid={`link-store-${store.name.toLowerCase().replace('-', '')}`}
                    >
                      {store.name}
                    </a>
                  ))}
                </div>
              )}

              {(mealResult.slice.id === "ubereats" || mealResult.slice.id === "doordash" || mealResult.slice.id === "cook") && (
                <div className="flex flex-wrap justify-center gap-3 pt-2 border-t">
                  <a
                    href={getOrderLinks(mealResult.name).ubereats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="link-delivery-ubereats"
                  >
                    Uber Eats
                  </a>
                  <a
                    href={getOrderLinks(mealResult.name).doordash}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="link-delivery-doordash"
                  >
                    DoorDash
                  </a>
                  <a
                    href={getOrderLinks(mealResult.name).heb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="link-store-heb"
                  >
                    HEB
                  </a>
                  <a
                    href={getOrderLinks(mealResult.name).kroger}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="link-store-kroger"
                  >
                    Kroger
                  </a>
                  <a
                    href={getOrderLinks(mealResult.name).favor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    data-testid="link-delivery-favor"
                  >
                    Favor
                  </a>
                </div>
              )}

              {mealResult.slice.id === "wildcard" && mealResult.recipe && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-2">The rolls chose a mystery recipe!</p>
                  <Badge variant="secondary">{mealResult.recipe.origin || "International"}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <footer className="text-center mt-8 pb-4">
          <p className="text-sm text-muted-foreground">Built for real families.</p>
        </footer>
      </main>

      {mealResult?.recipe && (
        <RecipeDetailModal
          recipe={mealResult.recipe}
          familySize={familySize}
          open={showRecipeModal}
          onClose={closeRecipeModal}
        />
      )}
    </div>
  );
}
