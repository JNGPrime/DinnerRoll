import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Utensils, Camera, ChefHat, Check, Crown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const MONTHLY_PRICE_ID = "price_1T31iP7GwhX3AnKuZD0H6A9q";
const LIFETIME_PRICE_ID = "price_1T31iP7GwhX3AnKue9F5cCen";

export default function PurchasePage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "lifetime">("lifetime");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const checkoutMutation = useMutation({
    mutationFn: async (priceId: string) => {
      const response = await apiRequest("POST", "/api/stripe/checkout", { priceId });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        localStorage.setItem('dr_subscribed', 'true');
        window.location.href = data.url;
      } else {
        setIsCheckingOut(false);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again or contact support if the issue persists.",
        });
      }
    },
    onError: (error) => {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: "There was a problem starting checkout. Please try again.",
      });
    },
  });

  const handleCheckout = () => {
    setIsCheckingOut(true);
    const priceId = selectedPlan === "monthly" ? MONTHLY_PRICE_ID : LIFETIME_PRICE_ID;
    checkoutMutation.mutate(priceId);
  };

  const features = [
    { icon: Utensils, text: "Unlimited Cook at Home spins" },
    { icon: ChefHat, text: "55+ recipes with full details and nutrition" },
    { icon: Camera, text: "AI-powered pantry photo scanning" },
    { icon: Utensils, text: "Smart recipe matching from your pantry" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900">
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <div className="space-y-6">
          <div className="text-center">
            <a href="/" className="inline-flex items-center gap-2 mb-6 text-amber-200 transition-colors" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg" data-testid="text-page-title">
              Unlock Cook at Home
            </h1>
            <p className="text-amber-200 text-lg">
              Stock your pantry. Spin for recipes. Cook tonight.
            </p>
          </div>

          <ul className="space-y-3 px-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-sm text-white/90">{feature.text}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedPlan("lifetime")}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                selectedPlan === "lifetime"
                  ? "border-amber-400 bg-amber-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
              data-testid="button-plan-lifetime"
            >
              <div className="absolute -top-3 left-4 bg-amber-500 text-amber-950 text-xs font-bold px-2 py-0.5 rounded-full">
                BEST VALUE
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-400" />
                    <span className="font-bold text-white text-lg">Lifetime Access</span>
                  </div>
                  <p className="text-white/50 text-sm mt-1">Pay once, cook forever</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">$29.99</span>
                  <p className="text-white/40 text-xs">one time</p>
                </div>
              </div>
              {selectedPlan === "lifetime" && (
                <div className="absolute top-4 right-4">
                  <Check className="h-5 w-5 text-amber-400" />
                </div>
              )}
            </button>

            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                selectedPlan === "monthly"
                  ? "border-amber-400 bg-amber-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
              data-testid="button-plan-monthly"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-lg">Monthly</span>
                  <p className="text-white/50 text-sm mt-1">Cancel anytime</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">$4.99</span>
                  <p className="text-white/40 text-xs">per month</p>
                </div>
              </div>
              {selectedPlan === "monthly" && (
                <div className="absolute top-4 right-4">
                  <Check className="h-5 w-5 text-amber-400" />
                </div>
              )}
            </button>
          </div>

          <Button
            className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-lg py-6"
            size="lg"
            onClick={handleCheckout}
            disabled={isCheckingOut || checkoutMutation.isPending}
            data-testid="button-checkout"
          >
            {isCheckingOut || checkoutMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : selectedPlan === "lifetime" ? (
              "Get Lifetime Access - $29.99"
            ) : (
              "Subscribe - $4.99/month"
            )}
          </Button>

          <p className="text-xs text-center text-amber-200/50">
            Secure payment powered by Stripe. {selectedPlan === "monthly" ? "Cancel anytime." : "One-time payment."}
          </p>
        </div>
      </main>
    </div>
  );
}
