// Chain restaurants
const chainRestaurants = [
  // Burgers
  { name: "McDonald's", icon: "M", cuisine: ["burger", "fast"], isChain: true },
  { name: "Wendy's", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  { name: "Five Guys", icon: "B", cuisine: ["burger"], isChain: true },
  { name: "Shake Shack", icon: "B", cuisine: ["burger"], isChain: true },
  { name: "In-N-Out", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  { name: "Whataburger", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  { name: "Culver's", icon: "B", cuisine: ["burger"], isChain: true },
  { name: "Smashburger", icon: "B", cuisine: ["burger"], isChain: true },
  { name: "Steak 'n Shake", icon: "B", cuisine: ["burger"], isChain: true },
  { name: "Carl's Jr.", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  { name: "Hardee's", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  { name: "Jack in the Box", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  { name: "Sonic", icon: "B", cuisine: ["burger", "fast"], isChain: true },
  
  // Chicken
  { name: "Chick-fil-A", icon: "C", cuisine: ["chicken", "fast"], isChain: true },
  { name: "Popeyes", icon: "W", cuisine: ["chicken", "fast"], isChain: true },
  { name: "Wingstop", icon: "W", cuisine: ["chicken"], isChain: true },
  { name: "Buffalo Wild Wings", icon: "W", cuisine: ["chicken"], isChain: true },
  { name: "KFC", icon: "W", cuisine: ["chicken", "fast"], isChain: true },
  { name: "Raising Cane's", icon: "C", cuisine: ["chicken", "fast"], isChain: true },
  { name: "Zaxby's", icon: "W", cuisine: ["chicken"], isChain: true },
  { name: "Bojangles", icon: "W", cuisine: ["chicken", "fast"], isChain: true },
  { name: "Church's Chicken", icon: "W", cuisine: ["chicken", "fast"], isChain: true },
  
  // Mexican
  { name: "Chipotle", icon: "T", cuisine: ["mexican", "healthy"], isChain: true },
  { name: "Taco Bell", icon: "T", cuisine: ["mexican", "fast"], isChain: true },
  { name: "Moe's Southwest", icon: "T", cuisine: ["mexican"], isChain: true },
  { name: "Qdoba", icon: "T", cuisine: ["mexican"], isChain: true },
  { name: "Del Taco", icon: "T", cuisine: ["mexican", "fast"], isChain: true },
  { name: "Taco Cabana", icon: "T", cuisine: ["mexican"], isChain: true },
  { name: "On The Border", icon: "T", cuisine: ["mexican"], isChain: true },
  { name: "Chuy's", icon: "T", cuisine: ["mexican"], isChain: true },
  
  // Pizza
  { name: "Domino's", icon: "P", cuisine: ["pizza", "fast"], isChain: true },
  { name: "Papa John's", icon: "P", cuisine: ["pizza"], isChain: true },
  { name: "Pizza Hut", icon: "P", cuisine: ["pizza"], isChain: true },
  { name: "Little Caesars", icon: "P", cuisine: ["pizza", "fast"], isChain: true },
  { name: "Marco's Pizza", icon: "P", cuisine: ["pizza"], isChain: true },
  { name: "Papa Murphy's", icon: "P", cuisine: ["pizza"], isChain: true },
  { name: "Blaze Pizza", icon: "P", cuisine: ["pizza"], isChain: true },
  { name: "MOD Pizza", icon: "P", cuisine: ["pizza"], isChain: true },
  
  // Asian
  { name: "Panda Express", icon: "A", cuisine: ["asian", "chinese", "fast"], isChain: true },
  { name: "P.F. Chang's", icon: "A", cuisine: ["asian", "chinese"], isChain: true },
  { name: "Pei Wei", icon: "A", cuisine: ["asian", "chinese"], isChain: true },
  { name: "Benihana", icon: "J", cuisine: ["asian", "japanese"], isChain: true },
  { name: "Genghis Grill", icon: "A", cuisine: ["asian"], isChain: true },
  { name: "Teriyaki Madness", icon: "J", cuisine: ["asian", "japanese"], isChain: true },
  
  // Subs & Sandwiches
  { name: "Subway", icon: "S", cuisine: ["healthy", "subs"], isChain: true },
  { name: "Jersey Mike's", icon: "S", cuisine: ["subs"], isChain: true },
  { name: "Jimmy John's", icon: "S", cuisine: ["subs", "fast"], isChain: true },
  { name: "Firehouse Subs", icon: "S", cuisine: ["subs"], isChain: true },
  { name: "Potbelly", icon: "S", cuisine: ["subs"], isChain: true },
  { name: "Which Wich", icon: "S", cuisine: ["subs"], isChain: true },
  { name: "Quiznos", icon: "S", cuisine: ["subs"], isChain: true },
  
  // Healthy / Salads
  { name: "Sweetgreen", icon: "H", cuisine: ["healthy"], isChain: true },
  { name: "Cava", icon: "M", cuisine: ["healthy", "mediterranean"], isChain: true },
  { name: "Noodles & Company", icon: "N", cuisine: ["healthy"], isChain: true },
  { name: "Tropical Smoothie", icon: "H", cuisine: ["healthy"], isChain: true },
  { name: "Freshii", icon: "H", cuisine: ["healthy"], isChain: true },
  
  // Italian
  { name: "Olive Garden", icon: "I", cuisine: ["italian"], isChain: true },
  { name: "Carrabba's", icon: "I", cuisine: ["italian"], isChain: true },
  { name: "Maggiano's", icon: "I", cuisine: ["italian"], isChain: true },
  { name: "Fazoli's", icon: "I", cuisine: ["italian", "fast"], isChain: true },
  
  // Casual Dining
  { name: "Cheesecake Factory", icon: "D", cuisine: ["american"], isChain: true },
  { name: "Applebee's", icon: "A", cuisine: ["american"], isChain: true },
  { name: "Chili's", icon: "D", cuisine: ["american"], isChain: true },
  { name: "TGI Friday's", icon: "D", cuisine: ["american"], isChain: true },
  { name: "Red Robin", icon: "B", cuisine: ["american", "burger"], isChain: true },
  { name: "Outback Steakhouse", icon: "S", cuisine: ["american", "steak"], isChain: true },
  { name: "LongHorn Steakhouse", icon: "S", cuisine: ["american", "steak"], isChain: true },
  { name: "Texas Roadhouse", icon: "S", cuisine: ["american", "steak"], isChain: true },
  { name: "Cracker Barrel", icon: "B", cuisine: ["american"], isChain: true },
  { name: "Denny's", icon: "B", cuisine: ["american"], isChain: true },
  { name: "IHOP", icon: "B", cuisine: ["american", "breakfast"], isChain: true },
  { name: "Waffle House", icon: "B", cuisine: ["american", "breakfast"], isChain: true },
  
  // Seafood
  { name: "Red Lobster", icon: "F", cuisine: ["seafood"], isChain: true },
  { name: "Long John Silver's", icon: "F", cuisine: ["seafood", "fast"], isChain: true },
  { name: "Captain D's", icon: "F", cuisine: ["seafood", "fast"], isChain: true },
  { name: "Joe's Crab Shack", icon: "F", cuisine: ["seafood"], isChain: true },
  
  // Coffee & Breakfast
  { name: "Starbucks", icon: "C", cuisine: ["coffee", "breakfast"], isChain: true },
  { name: "Dunkin'", icon: "D", cuisine: ["coffee", "breakfast"], isChain: true },
  { name: "Panera Bread", icon: "B", cuisine: ["healthy", "coffee", "breakfast"], isChain: true },
];

// Delivery-popular restaurants (commonly found on Uber Eats, DoorDash, Grubhub)
const deliveryRestaurants = [
  // Popular on all 3 platforms
  { name: "Wingstop", icon: "W", cuisine: ["chicken", "delivery"], isChain: true },
  { name: "Popeyes", icon: "C", cuisine: ["chicken", "delivery", "fast"], isChain: true },
  { name: "Taco Bell", icon: "T", cuisine: ["mexican", "delivery", "fast"], isChain: true },
  { name: "McDonald's", icon: "M", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Chipotle", icon: "T", cuisine: ["mexican", "delivery", "healthy"], isChain: true },
  { name: "Chick-fil-A", icon: "C", cuisine: ["chicken", "delivery", "fast"], isChain: true },
  { name: "Wendy's", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Panda Express", icon: "A", cuisine: ["asian", "chinese", "delivery", "fast"], isChain: true },
  { name: "Burger King", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Domino's", icon: "P", cuisine: ["pizza", "delivery", "fast"], isChain: true },
  { name: "Subway", icon: "S", cuisine: ["subs", "delivery", "healthy"], isChain: true },
  { name: "KFC", icon: "C", cuisine: ["chicken", "delivery", "fast"], isChain: true },
  { name: "Applebee's", icon: "A", cuisine: ["american", "delivery"], isChain: true },
  { name: "IHOP", icon: "B", cuisine: ["american", "delivery", "breakfast"], isChain: true },
  { name: "Buffalo Wild Wings", icon: "W", cuisine: ["chicken", "delivery"], isChain: true },
  { name: "Five Guys", icon: "B", cuisine: ["burger", "delivery"], isChain: true },
  { name: "Jersey Mike's", icon: "S", cuisine: ["subs", "delivery"], isChain: true },
  { name: "Raising Cane's", icon: "C", cuisine: ["chicken", "delivery", "fast"], isChain: true },
  { name: "Papa John's", icon: "P", cuisine: ["pizza", "delivery"], isChain: true },
  { name: "Pizza Hut", icon: "P", cuisine: ["pizza", "delivery"], isChain: true },
  { name: "Chili's", icon: "D", cuisine: ["american", "delivery"], isChain: true },
  { name: "Panera Bread", icon: "B", cuisine: ["healthy", "delivery", "breakfast"], isChain: true },
  { name: "Shake Shack", icon: "B", cuisine: ["burger", "delivery"], isChain: true },
  { name: "Jack in the Box", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Cheesecake Factory", icon: "D", cuisine: ["american", "delivery"], isChain: true },
  { name: "Olive Garden", icon: "I", cuisine: ["italian", "delivery"], isChain: true },
  { name: "Red Lobster", icon: "F", cuisine: ["seafood", "delivery"], isChain: true },
  { name: "Outback Steakhouse", icon: "S", cuisine: ["american", "steak", "delivery"], isChain: true },
  { name: "P.F. Chang's", icon: "A", cuisine: ["asian", "chinese", "delivery"], isChain: true },
  { name: "Sweetgreen", icon: "H", cuisine: ["healthy", "delivery"], isChain: true },
  { name: "Cava", icon: "M", cuisine: ["healthy", "mediterranean", "delivery"], isChain: true },
  { name: "Qdoba", icon: "T", cuisine: ["mexican", "delivery"], isChain: true },
  { name: "Whataburger", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Sonic", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Firehouse Subs", icon: "S", cuisine: ["subs", "delivery"], isChain: true },
  { name: "Arby's", icon: "S", cuisine: ["fast", "delivery", "subs"], isChain: true },
  { name: "Little Caesars", icon: "P", cuisine: ["pizza", "delivery", "fast"], isChain: true },
  { name: "Denny's", icon: "B", cuisine: ["american", "delivery", "breakfast"], isChain: true },
  { name: "Cracker Barrel", icon: "B", cuisine: ["american", "delivery"], isChain: true },
  { name: "Texas Roadhouse", icon: "S", cuisine: ["american", "steak", "delivery"], isChain: true },
  { name: "LongHorn Steakhouse", icon: "S", cuisine: ["american", "steak", "delivery"], isChain: true },
  { name: "Red Robin", icon: "B", cuisine: ["american", "burger", "delivery"], isChain: true },
  { name: "TGI Friday's", icon: "D", cuisine: ["american", "delivery"], isChain: true },
  { name: "Noodles & Company", icon: "N", cuisine: ["healthy", "delivery"], isChain: true },
  { name: "Tropical Smoothie", icon: "H", cuisine: ["healthy", "delivery"], isChain: true },
  { name: "Zaxby's", icon: "W", cuisine: ["chicken", "delivery"], isChain: true },
  { name: "Bojangles", icon: "C", cuisine: ["chicken", "delivery", "fast"], isChain: true },
  { name: "In-N-Out", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Culver's", icon: "B", cuisine: ["burger", "delivery"], isChain: true },
  { name: "Smashburger", icon: "B", cuisine: ["burger", "delivery"], isChain: true },
  { name: "Steak 'n Shake", icon: "B", cuisine: ["burger", "delivery"], isChain: true },
  { name: "Carl's Jr.", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Hardee's", icon: "B", cuisine: ["burger", "delivery", "fast"], isChain: true },
  { name: "Church's Chicken", icon: "C", cuisine: ["chicken", "delivery", "fast"], isChain: true },
  { name: "Moe's Southwest", icon: "T", cuisine: ["mexican", "delivery"], isChain: true },
  { name: "Del Taco", icon: "T", cuisine: ["mexican", "delivery", "fast"], isChain: true },
  { name: "Taco Cabana", icon: "T", cuisine: ["mexican", "delivery"], isChain: true },
  { name: "On The Border", icon: "T", cuisine: ["mexican", "delivery"], isChain: true },
  { name: "Chuy's", icon: "T", cuisine: ["mexican", "delivery"], isChain: true },
  { name: "Marco's Pizza", icon: "P", cuisine: ["pizza", "delivery"], isChain: true },
  { name: "Blaze Pizza", icon: "P", cuisine: ["pizza", "delivery"], isChain: true },
  { name: "MOD Pizza", icon: "P", cuisine: ["pizza", "delivery"], isChain: true },
  { name: "Pei Wei", icon: "A", cuisine: ["asian", "chinese", "delivery"], isChain: true },
  { name: "Benihana", icon: "J", cuisine: ["asian", "japanese", "delivery"], isChain: true },
  { name: "Teriyaki Madness", icon: "J", cuisine: ["asian", "japanese", "delivery"], isChain: true },
  { name: "Genghis Grill", icon: "A", cuisine: ["asian", "delivery"], isChain: true },
  { name: "Jimmy John's", icon: "S", cuisine: ["subs", "delivery", "fast"], isChain: true },
  { name: "Potbelly", icon: "S", cuisine: ["subs", "delivery"], isChain: true },
  { name: "Which Wich", icon: "S", cuisine: ["subs", "delivery"], isChain: true },
  { name: "Quiznos", icon: "S", cuisine: ["subs", "delivery"], isChain: true },
  { name: "Carrabba's", icon: "I", cuisine: ["italian", "delivery"], isChain: true },
  { name: "Maggiano's", icon: "I", cuisine: ["italian", "delivery"], isChain: true },
  { name: "Fazoli's", icon: "I", cuisine: ["italian", "delivery", "fast"], isChain: true },
  { name: "Captain D's", icon: "F", cuisine: ["seafood", "delivery", "fast"], isChain: true },
  { name: "Long John Silver's", icon: "F", cuisine: ["seafood", "delivery", "fast"], isChain: true },
  { name: "Joe's Crab Shack", icon: "F", cuisine: ["seafood", "delivery"], isChain: true },
  { name: "Starbucks", icon: "C", cuisine: ["coffee", "delivery", "breakfast"], isChain: true },
  { name: "Dunkin'", icon: "D", cuisine: ["coffee", "delivery", "breakfast"], isChain: true },
  { name: "Waffle House", icon: "B", cuisine: ["american", "delivery", "breakfast"], isChain: true },
  { name: "Freshii", icon: "H", cuisine: ["healthy", "delivery"], isChain: true },
  { name: "Waba Grill", icon: "A", cuisine: ["asian", "delivery", "healthy"], isChain: true },
  { name: "El Pollo Loco", icon: "C", cuisine: ["chicken", "mexican", "delivery"], isChain: true },
  { name: "Boston Market", icon: "D", cuisine: ["american", "delivery"], isChain: true },
  { name: "Golden Corral", icon: "D", cuisine: ["american", "delivery"], isChain: true },
  { name: "Hooters", icon: "W", cuisine: ["chicken", "american", "delivery"], isChain: true },
  { name: "Dave's Hot Chicken", icon: "C", cuisine: ["chicken", "delivery"], isChain: true },
  { name: "Portillo's", icon: "B", cuisine: ["burger", "american", "delivery"], isChain: true },
  { name: "Jollibee", icon: "C", cuisine: ["chicken", "asian", "delivery", "fast"], isChain: true },
  { name: "Bonefish Grill", icon: "F", cuisine: ["seafood", "delivery"], isChain: true },
  { name: "Bob Evans", icon: "B", cuisine: ["american", "delivery", "breakfast"], isChain: true },
  { name: "Perkins", icon: "B", cuisine: ["american", "delivery", "breakfast"], isChain: true },
];

// Load favorites from localStorage
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem("dinnerroll_favorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem("dinnerroll_favorites", JSON.stringify(favorites));
}

// Load custom restaurants from localStorage
function loadCustomRestaurants() {
  try {
    return JSON.parse(localStorage.getItem("dinnerroll_custom") || "[]");
  } catch {
    return [];
  }
}

function saveCustomRestaurants(restaurants) {
  localStorage.setItem("dinnerroll_custom", JSON.stringify(restaurants));
}

// Geolocation support for location-aware suggestions
let userLocation = null;

function requestLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      resolve(null);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        localStorage.setItem("dinnerroll_location", JSON.stringify(userLocation));
        resolve(userLocation);
      },
      (error) => {
        console.log("Geolocation error:", error.message);
        // Try to use cached location
        try {
          const cached = localStorage.getItem("dinnerroll_location");
          if (cached) {
            userLocation = JSON.parse(cached);
          }
        } catch {}
        resolve(userLocation);
      },
      { timeout: 5000, maximumAge: 300000 }
    );
  });
}

// Request location on page load
requestLocation();

// Combine all restaurants (deduplicate by name, delivery list takes priority)
function getAllRestaurants() {
  const custom = loadCustomRestaurants().map(r => ({ ...r, isCustom: true }));
  const seen = new Set();
  const all = [];
  [...custom, ...deliveryRestaurants, ...chainRestaurants].forEach(r => {
    if (!seen.has(r.name)) {
      seen.add(r.name);
      all.push(r);
    }
  });
  return all;
}

let isSpinning = false;
let currentRestaurants = [];
let lastSelectedRestaurant = null;
let orderWheel = null;

function getFilteredRestaurants() {
  const cuisine = document.getElementById("cuisine")?.value || "popular";
  const all = getAllRestaurants();
  
  if (cuisine === "any") {
    return [...all].sort(() => Math.random() - 0.5);
  }
  if (cuisine === "popular") {
    return deliveryRestaurants.slice(0, 30).sort(() => Math.random() - 0.5);
  }
  if (cuisine === "travel") {
    return [...all].sort(() => Math.random() - 0.5);
  }
  if (cuisine === "favorites") {
    const favNames = loadFavorites();
    return all.filter(r => favNames.includes(r.name));
  }
  if (cuisine === "custom") {
    return all.filter(r => r.isCustom);
  }
  return all.filter(r => r.cuisine && r.cuisine.includes(cuisine));
}

function initOrderWheel() {
  currentRestaurants = getFilteredRestaurants();
  const wheelSegments = currentRestaurants.slice(0, 12).map(r => ({
    label: r.name,
    icon: r.icon || "F",
    searchTerm: r.searchTerm,
    isLocal: r.isLocal,
    isChain: r.isChain,
    isCustom: r.isCustom
  }));

  if (wheelSegments.length === 0) return;

  orderWheel = createSpinWheel("order-wheel-container", {
    segments: wheelSegments,
    size: 170,
    title: "Dinner Roll",
    subtitle: "Where are we ordering from?",
    onResult: function(winner, idx) {
      handleOrderResult(winner);
    },
    onSpin: function() {
      if (!checkPaywall()) return;
      triggerOrderSpin();
    }
  });
}

function refreshOrderWheel() {
  currentRestaurants = getFilteredRestaurants();
  const wheelSegments = currentRestaurants.slice(0, 12).map(r => ({
    label: r.name,
    icon: r.icon || "F",
    searchTerm: r.searchTerm,
    isLocal: r.isLocal,
    isChain: r.isChain,
    isCustom: r.isCustom
  }));

  if (wheelSegments.length === 0) return;

  if (orderWheel) {
    orderWheel.redraw(wheelSegments);
  } else {
    initOrderWheel();
  }
}

function triggerOrderSpin() {
  if (!orderWheel || isSpinning) return;
  isSpinning = true;

  const result = document.getElementById("result");
  if (result) result.classList.add("hidden");

  currentRestaurants = getFilteredRestaurants();
  const displayRestaurants = currentRestaurants.slice(0, 12);
  if (displayRestaurants.length === 0) {
    isSpinning = false;
    alert("No restaurants match this filter. Try a different category!");
    return;
  }

  const targetIndex = Math.floor(Math.random() * displayRestaurants.length);
  orderWheel.spin(targetIndex);
}

function handleOrderResult(winner) {
  isSpinning = false;
  lastSelectedRestaurant = winner;

  launchConfetti();

  document.getElementById("meal").textContent = winner.label;
  updateFavoriteButton();

  const uberLink = document.getElementById("ubereats-link");
  const doordashLink = document.getElementById("doordash-link");
  const grubhubLink = document.getElementById("grubhub-link");
  const mapsLink = document.getElementById("maps-link");

  const searchTerm = winner.searchTerm || winner.label;

  let uberUrl = `https://www.ubereats.com/search?q=${encodeURIComponent(searchTerm)}`;
  let doordashUrl = `https://www.doordash.com/search/store/${encodeURIComponent(searchTerm)}`;
  let grubhubUrl = `https://www.grubhub.com/search?queryText=${encodeURIComponent(searchTerm)}`;

  let mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm + " near me")}`;
  if (userLocation) {
    mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}/@${userLocation.lat},${userLocation.lng},14z`;
  }

  uberLink.href = uberUrl;
  doordashLink.href = doordashUrl;
  if (grubhubLink) grubhubLink.href = grubhubUrl;
  if (mapsLink) mapsLink.href = mapsUrl;

  setTimeout(() => {
    const result = document.getElementById("result");
    result.classList.remove("hidden");
  }, 400);
}

function renderWheelIcons() {
  initOrderWheel();
}

function updateWheelGradient() {
  refreshOrderWheel();
}

function launchConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  container.innerHTML = "";
  const confettiColors = ["#f0b429", "#e07b39", "#FF6B6B", "#4ECDC4", "#FFE66D", "#DDA0DD", "#95E1D3", "#fff", "#FF9F43", "#F368E0", "#48DBFB"];
  const shapes = ["square", "circle", "rect"];
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = 5 + Math.random() * 12;
    piece.style.width = shape === "rect" ? size * 0.4 + "px" : size + "px";
    piece.style.height = size + "px";
    piece.style.backgroundColor = color;
    piece.style.borderRadius = shape === "circle" ? "50%" : "2px";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDuration = (1.2 + Math.random() * 2.5) + "s";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.opacity = (0.7 + Math.random() * 0.3).toString();
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ""; }, 5000);
}

function shareOrder() {
  const mealEl = document.getElementById('meal');
  const restaurantName = mealEl ? mealEl.textContent : 'somewhere';
  const shareText = "Tonight we're ordering from " + restaurantName + " via DinnerRoll! dinnerroll.app";
  if (navigator.share) {
    navigator.share({ title: 'DinnerRoll', text: shareText, url: 'https://dinnerroll.app' }).catch(function() {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(function() { alert('Copied to clipboard!'); });
  }
}

function checkPaywall() {
  const FREE_SPINS = 3;
  const spinCount = parseInt(localStorage.getItem('dr_spin_count') || '0');
  const isSubscribed = localStorage.getItem('dr_subscribed') === 'true';
  if (isSubscribed) return true;
  if (sessionStorage.getItem('dr_paywall_dismissed') === 'true') return true;
  if (spinCount >= FREE_SPINS) {
    showPaywallModal();
    return false;
  }
  localStorage.setItem('dr_spin_count', String(spinCount + 1));
  return true;
}

function showPaywallModal() {
  if (document.getElementById('paywall-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'paywall-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);';
  modal.innerHTML = `
    <div style="background:#2d1810;border:2px solid #f0b429;border-radius:16px;padding:2rem;max-width:400px;width:90%;text-align:center;color:white;">
      <h2 style="font-size:1.5rem;font-weight:800;color:#f0b429;margin-bottom:0.5rem;">You're on a Roll!</h2>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:1rem;font-size:0.95rem;">You've used your 3 free rolls. Subscribe to keep rolling and unlock all features.</p>
      <div style="display:flex;gap:0.5rem;justify-content:center;margin-bottom:1rem;flex-wrap:wrap;">
        <button onclick="window.location.href='/purchase'" style="background:#f0b429;color:#2d1810;border:none;padding:0.7rem 1.5rem;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;">Subscribe Now</button>
        <button onclick="sessionStorage.setItem('dr_paywall_dismissed','true');document.getElementById('paywall-modal').remove()" style="background:transparent;color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.2);padding:0.7rem 1.5rem;border-radius:8px;font-weight:600;font-size:0.9rem;cursor:pointer;">Maybe Later</button>
      </div>
      <p style="color:rgba(255,255,255,0.4);font-size:0.75rem;">$4.99/month or $29.99 lifetime. Cancel anytime.</p>
    </div>
  `;
  document.body.appendChild(modal);
}

async function spinOrder() {
  if (isSpinning) return;
  if (!checkPaywall()) return;

  const cuisine = document.getElementById("cuisine")?.value || "local";
  if (cuisine === "travel") {
    await requestLocation();
  }

  refreshOrderWheel();

  setTimeout(() => {
    triggerOrderSpin();
  }, 100);
}

function updateFavoriteButton() {
  const btn = document.getElementById("favorite-btn");
  if (!btn || !lastSelectedRestaurant) return;
  
  const favorites = loadFavorites();
  const name = lastSelectedRestaurant.label || lastSelectedRestaurant.name;
  const isFav = favorites.includes(name);
  
  btn.textContent = isFav ? "Favorited" : "Add to Favorites";
  btn.classList.toggle("is-favorite", isFav);
}

function toggleFavorite() {
  if (!lastSelectedRestaurant) return;
  
  const favorites = loadFavorites();
  const name = lastSelectedRestaurant.label || lastSelectedRestaurant.name;
  const index = favorites.indexOf(name);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(name);
  }
  
  saveFavorites(favorites);
  updateFavoriteButton();
  updateFavoriteCount();
}

function updateFavoriteCount() {
  const count = loadFavorites().length;
  const option = document.querySelector('option[value="favorites"]');
  if (option) {
    option.textContent = `My Favorites (${count})`;
  }
}

function showAddRestaurantModal() {
  document.getElementById("add-restaurant-modal").classList.remove("hidden");
}

function hideAddRestaurantModal() {
  document.getElementById("add-restaurant-modal").classList.add("hidden");
  document.getElementById("custom-name").value = "";
}

function addCustomRestaurant() {
  const name = document.getElementById("custom-name").value.trim();
  if (!name) return;
  
  const custom = loadCustomRestaurants();
  
  // Check if already exists
  if (custom.some(r => r.name.toLowerCase() === name.toLowerCase())) {
    alert("This restaurant is already in your list!");
    return;
  }
  
  custom.push({
    name: name,
    icon: "📍",
    cuisine: ["custom"],
    isCustom: true
  });
  
  saveCustomRestaurants(custom);
  hideAddRestaurantModal();
  renderWheelIcons();
  updateWheelGradient();
  renderCustomList();
}

function removeCustomRestaurant(name) {
  const custom = loadCustomRestaurants().filter(r => r.name !== name);
  saveCustomRestaurants(custom);
  renderWheelIcons();
  updateWheelGradient();
  renderCustomList();
}

function renderCustomList() {
  const container = document.getElementById("custom-list");
  if (!container) return;
  
  const custom = loadCustomRestaurants();
  
  if (custom.length === 0) {
    container.innerHTML = '<p class="empty-text">No custom restaurants added yet</p>';
    return;
  }
  
  container.innerHTML = custom.map(r => `
    <div class="custom-item">
      <span>📍 ${r.name}</span>
      <button onclick="removeCustomRestaurant('${r.name.replace(/'/g, "\\'")}')" class="remove-btn">✕</button>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderWheelIcons();
  updateWheelGradient();
  updateFavoriteCount();
  renderCustomList();
  window.addEventListener("resize", () => { renderWheelIcons(); updateWheelGradient(); });
  
  document.getElementById("spin")?.addEventListener("click", spinOrder);
  
  document.getElementById("cuisine")?.addEventListener("change", () => {
    renderWheelIcons();
    updateWheelGradient();
  });
  
  document.getElementById("favorite-btn")?.addEventListener("click", toggleFavorite);
  document.getElementById("add-restaurant-btn")?.addEventListener("click", showAddRestaurantModal);
  document.getElementById("cancel-add")?.addEventListener("click", hideAddRestaurantModal);
  document.getElementById("confirm-add")?.addEventListener("click", addCustomRestaurant);
});
