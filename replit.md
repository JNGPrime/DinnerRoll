# DinnerRoll

## Overview

DinnerRoll is an interactive web application designed to simplify dinner decision-making for families. It features a spinning wheel interface to help users choose between cooking at home, ordering out, or getting a surprise meal suggestion. The app aims to provide a comprehensive solution for meal planning, recipe discovery, and food ordering, integrating with pantry management and nutritional information. Its vision is to become the go-to platform for effortless and enjoyable dinner experiences, catering to various dietary needs, family sizes, and budgets.

## User Preferences

I prefer iterative development, with a focus on delivering functional components that can be tested and reviewed. I value clear and concise communication, so please provide explanations that are easy to understand without overly technical jargon. Before making any major architectural changes or introducing new third-party libraries, please ask for my approval. When implementing new features, prioritize user experience and intuitive design.

## System Architecture

DinnerRoll utilizes a hybrid architecture combining static HTML pages for core navigation and a React application for dynamic, interactive sections.

**UI/UX Decisions:**
- **Theme:** A warm, dark brown theme with accent colors (green, blue, red) for mode cards.
- **Spinning Wheels:** Central to the user experience, providing an engaging way to make choices.
- **Responsiveness:** Designed to work across desktop, tablet, and mobile devices.
- **PWA:** The application is a Progressive Web App, allowing for installation and offline capabilities.

**Technical Implementations:**
- **Frontend:** React with TypeScript, Tailwind CSS for styling, and Shadcn UI components for a consistent design system. Wouter is used for client-side routing within the React app.
- **Backend:** Express.js powers the API, utilizing in-memory storage for data.
- **Data Fetching:** TanStack Query (React Query) is used for efficient data management and caching.

**Feature Specifications:**

- **Home Page:** Features three primary modes: "Cook at Home," "Order Out," and "Dinner Roll Surprise Me!" along with a "Stock My Pantry" button.
- **Home Cooking Section:**
    - Provides 55+ recipes with filters for cooking methods, family size (2-6 people), dietary preferences (Meat, No Meat, Vegetarian, Vegan), and budget (Low, Medium, High).
    - Includes full nutritional information and picky eater support with add-on suggestions.
    - Features categories like One-Pot Meals, Grilled Meats, Stovetop, Oven-Baked, and International cuisines.
- **Order Out Section:**
    - Spinning wheel with 90+ restaurant chains and 16 local categories.
    - Filters for cuisine type and local restaurants.
    - Allows users to favorite restaurants and add custom ones.
    - Direct links for Uber Eats and DoorDash delivery.
- **Fast Food Section (React):**
    - Filters for 14 popular fast-food restaurants and dietary options.
    - Toggle for healthy menu items and full nutritional breakdown.
    - Direct delivery links to DoorDash or Uber Eats.
- **Pantry Section:**
    - Suggests recipes based on 70+ ingredients across various categories.
    - Features "Recipe Roulette" and "Mystery Spin" for random recipe discovery.
    - Cuisine filtering for recipes and a display of missing ingredients for selected recipes.
- **My Pantry (Scanner):**
    - Barcode scanner for adding pantry items.
    - Manual item addition and inventory management.
    - Categorization of items for easy organization.
    - Integrates with recipe suggestions based on available ingredients.
- **User Authentication (Planned):** Support for user-specific features like dinner history, meal planning, family profiles, grocery lists, and recipe ratings.

## External Dependencies

- **Uber Eats:** For direct ordering and search integration.
- **DoorDash:** For direct ordering and search integration.
- **Grubhub:** For direct ordering and search integration.
- **Google Maps:** For local restaurant search and navigation.
- **H-E-B:** For grocery delivery integration.
- **Kroger:** For grocery delivery integration.
- **Instacart:** For grocery delivery integration.
- **Favor:** For grocery delivery integration.
- **OpenAI GPT-4o:** Used for AI Vision in the Smart Pantry Photo Scanning feature.
- **Stripe:** For custom monthly subscription payments.