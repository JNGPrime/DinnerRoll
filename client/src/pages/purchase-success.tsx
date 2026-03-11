import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, PartyPopper } from "lucide-react";
import { Link } from "wouter";

export default function PurchaseSuccessPage() {
  useEffect(() => {
    localStorage.setItem('dr_subscribed', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-amber-600" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Welcome to DinnerRoll!</h1>
            <PartyPopper className="h-5 w-5 text-primary" />
          </div>
          <p className="text-muted-foreground mb-6">
            Your subscription is active. You now have full access to all DinnerRoll features!
          </p>
          <div className="space-y-3">
            <a href="/">
              <Button className="w-full" data-testid="button-start-rolling">
                Start Rolling
              </Button>
            </a>
            <p className="text-xs text-muted-foreground">
              A receipt has been sent to your email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
