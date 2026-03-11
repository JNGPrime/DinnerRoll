import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChefHat, 
  UtensilsCrossed, 
  Users, 
  Heart, 
  Sparkles, 
  ShoppingCart,
  Clock,
  Smile,
  ArrowRight,
  Refrigerator,
  Store
} from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-stone-950 dark:to-red-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">No more dinner debates</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              What's for dinner?
              <span className="block text-primary mt-2">Let DinnerRoll decide.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              No arguing. No endless scrolling. No decision fatigue. 
              Just spin the rolls and dinner is handled.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a href="/index.html">
                <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-started">
                  Start Spinning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Link href="/purchase" data-testid="link-subscribe">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" data-testid="button-subscribe-cta">
                  Subscribe
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sound familiar?
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>"What do you want for dinner?" ... "I don't know, what do YOU want?"</p>
              <p>"We have food at home" ... but nobody knows what to make</p>
              <p>"I'm tired of deciding every single night"</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-semibold text-primary">
              DinnerRoll ends the cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Two Paths Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Two ways to solve dinner
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Order Out Card */}
            <Card className="overflow-hidden hover-elevate">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <Store className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Order Out</h3>
                <p className="text-blue-100">Let the rolls pick where to eat</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 dark:text-blue-300 text-sm font-bold">90+</span>
                    </div>
                    <span>Restaurant chains and local spots</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShoppingCart className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Direct links to Uber Eats, DoorDash & more</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Save your favorites for quick picks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cook at Home Card */}
            <Card className="overflow-hidden hover-elevate">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 text-white">
                <ChefHat className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Cook at Home</h3>
                <p className="text-amber-100">Save money with what you have</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Refrigerator className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Load your pantry with barcode scanning or photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Get recipes matched to what you have (even with 1 item missing!)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 dark:text-amber-300 text-sm font-bold">55+</span>
                    </div>
                    <span>Recipes from 17 cuisines around the world</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            For every family, every night
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-1">Family Nights</h3>
              <p className="text-sm text-muted-foreground">2-8 people, any preferences</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-semibold mb-1">Date Night</h3>
              <p className="text-sm text-muted-foreground">Romantic dinner ideas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                <Smile className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="font-semibold mb-1">Kids Love It</h3>
              <p className="text-sm text-muted-foreground">Fun slot machine spinning</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-1">New Ideas</h3>
              <p className="text-sm text-muted-foreground">Discover new favorites</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How it works
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pick your mode</h3>
                  <p className="text-muted-foreground">Order out, cook at home, or let us surprise you</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Spin the Rolls</h3>
                  <p className="text-muted-foreground">Watch the reels spin and land on tonight's dinner</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dinner is decided</h3>
                  <p className="text-muted-foreground">Order with one tap or get the recipe and start cooking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Clock className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop wasting time deciding
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Life's too short for dinner debates. Spin once. That's dinner.
            </p>
            <a href="/index.html">
              <Button size="lg" className="text-lg px-8 py-6" data-testid="button-start-spinning">
                Start Spinning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">DinnerRoll</p>
          <p className="text-sm">Dinner decisions, handled.</p>
        </div>
      </footer>
    </div>
  );
}
