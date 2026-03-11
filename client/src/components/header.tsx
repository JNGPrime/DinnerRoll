import { Salad, Flame, Package, ScanLine, Home, ChefHat, ShoppingBag, User, Calendar, Users, History } from "lucide-react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-[999] w-full flex items-center justify-between gap-4 h-14 px-4 border-b border-amber-900/30 bg-[rgba(45,24,16,0.95)] backdrop-blur-md">
      <a
        href="/"
        className="font-extrabold text-lg tracking-wide whitespace-nowrap text-amber-400 flex items-center gap-1.5"
        data-testid="link-nav-home"
      >
        <img src="/icons/icon-192.png" alt="" className="w-7 h-7 rounded-md" />
        DinnerRoll
      </a>

      <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
        <a href="/" className="nav-chip" data-testid="link-nav-home-page">
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </a>
        <a href="/family.html" className="nav-chip" data-testid="link-nav-cook">
          <ChefHat className="h-4 w-4" />
          <span className="hidden sm:inline">Cook</span>
        </a>
        <a href="/order.html" className="nav-chip" data-testid="link-nav-order">
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Order</span>
        </a>
        <Link
          href="/my-pantry"
          className={`nav-chip ${location === "/my-pantry" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-pantry"
        >
          <ScanLine className="h-4 w-4" />
          <span className="hidden sm:inline">My Pantry</span>
        </Link>
        <Link
          href="/pantry"
          className={`nav-chip ${location === "/pantry" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-recipes-pantry"
        >
          <Package className="h-4 w-4" />
          <span className="hidden sm:inline">Find Recipes</span>
        </Link>
        <Link
          href="/recipes"
          className={`nav-chip ${location === "/recipes" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-recipes"
        >
          <Salad className="h-4 w-4" />
          <span className="hidden sm:inline">Browse All</span>
        </Link>
        <Link
          href="/fast-food"
          className={`nav-chip ${location === "/fast-food" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-fast-food"
        >
          <Flame className="h-4 w-4" />
          <span className="hidden sm:inline">Fast Food</span>
        </Link>
        <Link
          href="/meal-planner"
          className={`nav-chip ${location === "/meal-planner" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-meal-planner"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Planner</span>
        </Link>
        <Link
          href="/history"
          className={`nav-chip ${location === "/history" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-history"
        >
          <History className="h-4 w-4" />
          <span className="hidden sm:inline">History</span>
        </Link>
        <Link
          href="/family"
          className={`nav-chip ${location === "/family" ? "nav-chip-active" : ""}`}
          data-testid="link-nav-family"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Family</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href="/profile.html"
          className="nav-chip-profile"
          data-testid="link-nav-profile"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Profile</span>
        </a>
      </div>
    </nav>
  );
}
