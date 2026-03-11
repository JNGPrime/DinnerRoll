import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PurchaseCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Purchase Canceled</h1>
          <p className="text-muted-foreground mb-6">
            No worries! Your payment was not processed. You can try again whenever you're ready.
          </p>
          <div className="space-y-3">
            <Link href="/purchase">
              <Button className="w-full" data-testid="button-try-again">
                Try Again
              </Button>
            </Link>
            <a href="/">
              <Button variant="outline" className="w-full" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
