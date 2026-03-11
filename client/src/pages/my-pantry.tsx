import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BarcodeScanner } from "@/components/barcode-scanner";
import { PantryPhotoScanner } from "@/components/pantry-photo-scanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { 
  Package, Plus, Trash2, ScanLine, ShoppingBasket, ChefHat, 
  AlertCircle, Beef, Carrot, Wheat, Milk, Archive, Leaf
} from "lucide-react";
import { Link } from "wouter";
import { useLocation } from "wouter";
import type { PantryItem, PantryCategory } from "@shared/schema";

const categoryLabels: Record<PantryCategory, string> = {
  proteins: "Proteins",
  vegetables: "Vegetables",
  grains: "Grains & Starches",
  dairy: "Dairy",
  "pantry-staples": "Pantry Staples",
  "herbs-spices": "Herbs & Spices",
};

const categoryIcons: Record<PantryCategory, typeof Beef> = {
  proteins: Beef,
  vegetables: Carrot,
  grains: Wheat,
  dairy: Milk,
  "pantry-staples": Archive,
  "herbs-spices": Leaf,
};

const categoryOrder: PantryCategory[] = ["proteins", "vegetables", "grains", "dairy", "pantry-staples", "herbs-spices"];

export default function MyPantry() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "proteins" as PantryCategory,
    quantity: 1,
    unit: "item",
  });
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  const { data: pantryItems, isLoading } = useQuery<PantryItem[]>({
    queryKey: ["/api/my-pantry"],
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: typeof newItem & { barcode?: string }) => {
      return apiRequest("POST", "/api/my-pantry", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-pantry"] });
      setNewItem({ name: "", category: "proteins", quantity: 1, unit: "item" });
      setShowAddForm(false);
      setScannedBarcode(null);
      toast({ title: "Item added to your pantry!" });
    },
    onError: () => {
      toast({ title: "Failed to add item", variant: "destructive" });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/my-pantry/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-pantry"] });
      toast({ title: "Item removed from pantry" });
    },
  });

  const clearPantryMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", "/api/my-pantry");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my-pantry"] });
      toast({ title: "Pantry cleared" });
    },
  });

  const handlePhotoScanItems = async (items: { name: string; category: string; quantity: number; unit: string }[]) => {
    let addedCount = 0;
    for (const item of items) {
      try {
        await apiRequest("POST", "/api/my-pantry", {
          name: item.name,
          category: item.category as PantryCategory,
          quantity: item.quantity,
          unit: item.unit,
        });
        addedCount++;
      } catch (err) {
        console.error("Failed to add item:", item.name, err);
      }
    }
    queryClient.invalidateQueries({ queryKey: ["/api/my-pantry"] });
    toast({ 
      title: `Added ${addedCount} items to your pantry!`,
      description: addedCount < items.length ? `${items.length - addedCount} items failed to add` : undefined,
    });
  };

  const handleBarcodeScan = async (barcode: string) => {
    setScannedBarcode(barcode);
    
    try {
      const response = await fetch(`/api/barcode/${barcode}`);
      if (response.ok) {
        const data = await response.json();
        setNewItem({
          name: data.name,
          category: data.category as PantryCategory,
          quantity: 1,
          unit: "item",
        });
        setShowAddForm(true);
        toast({ title: `Found: ${data.name}` });
      } else {
        setShowAddForm(true);
        toast({ 
          title: "Barcode not recognized", 
          description: "Please enter the item details manually.",
        });
      }
    } catch {
      setShowAddForm(true);
      toast({ 
        title: "Barcode lookup failed", 
        description: "Please enter the item details manually.",
        variant: "destructive",
      });
    }
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast({ title: "Please enter an item name", variant: "destructive" });
      return;
    }
    addItemMutation.mutate({
      ...newItem,
      barcode: scannedBarcode || undefined,
    });
  };

  // Sync pantry items with localStorage for static pages (family.html)
  useEffect(() => {
    if (pantryItems) {
      localStorage.setItem("dinnerroll_my_pantry", JSON.stringify(pantryItems));
    }
  }, [pantryItems]);

  const groupedItems = pantryItems?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<PantryCategory, PantryItem[]>);

  const totalItems = pantryItems?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center py-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              My Pantry
            </h1>
            <p className="text-stone-400 text-lg">
              What's in your kitchen? Let's find out!
            </p>
            <Badge variant="secondary" className="mt-3">
              <ShoppingBasket className="h-4 w-4 mr-2" />
              {totalItems} items stocked
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <PantryPhotoScanner
                  onItemsScanned={handlePhotoScanItems}
                  onError={(error) => toast({ title: error, variant: "destructive" })}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <BarcodeScanner 
                  onScan={handleBarcodeScan}
                  onError={(error) => toast({ title: error, variant: "destructive" })}
                />
              </CardContent>
            </Card>

            <Card className="flex items-center justify-center">
              <CardContent className="p-4 w-full">
                <div className="text-center mb-3">
                  <Plus className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Know what you have?</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setShowAddForm(!showAddForm)}
                  data-testid="button-add-manual"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item Manually
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">

              {showAddForm && (
                <Card data-testid="card-add-form">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {scannedBarcode ? "Confirm Scanned Item" : "Add New Item"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scannedBarcode && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ScanLine className="h-4 w-4" />
                        Barcode: {scannedBarcode}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input
                        id="item-name"
                        placeholder="e.g., Chicken Breast"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        data-testid="input-item-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem({ ...newItem, category: value as PantryCategory })}
                      >
                        <SelectTrigger data-testid="select-category">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOrder.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {categoryLabels[cat]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min={1}
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                          data-testid="input-quantity"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input
                          id="unit"
                          placeholder="item, lb, oz..."
                          value={newItem.unit}
                          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                          data-testid="input-unit"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        className="flex-1"
                        onClick={handleAddItem}
                        disabled={addItemMutation.isPending}
                        data-testid="button-confirm-add"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {addItemMutation.isPending ? "Adding..." : "Add to Pantry"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false);
                          setScannedBarcode(null);
                          setNewItem({ name: "", category: "proteins", quantity: 1, unit: "item" });
                        }}
                        data-testid="button-cancel-add"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-stone-100">Your Items</h2>
                {totalItems > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        const itemNames = pantryItems?.map(item => item.name.toLowerCase()) || [];
                        const params = new URLSearchParams();
                        itemNames.forEach(name => params.append("item", name));
                        navigate(`/pantry?${params.toString()}`);
                      }}
                      data-testid="button-find-recipes"
                    >
                      <ChefHat className="h-4 w-4 mr-2" />
                      Find Recipes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => clearPantryMutation.mutate()}
                      disabled={clearPantryMutation.isPending}
                      data-testid="button-clear-pantry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : totalItems === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">Your pantry is empty</p>
                    <p className="text-sm text-muted-foreground">
                      Take a photo, scan a barcode, or add items manually
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {categoryOrder.map((category) => {
                    const items = groupedItems?.[category];
                    if (!items?.length) return null;

                    const CategoryIcon = categoryIcons[category];

                    return (
                      <Card key={category} data-testid={`card-category-${category}`}>
                        <CardHeader className="py-3 pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4 text-primary" />
                            {categoryLabels[category]}
                            <Badge variant="secondary" className="ml-auto">
                              {items.length}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="divide-y">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between py-2 gap-2 flex-wrap"
                                data-testid={`item-${item.id}`}
                              >
                                <div>
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-muted-foreground ml-2 text-sm">
                                    {item.quantity} {item.unit}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteItemMutation.mutate(item.id)}
                                  disabled={deleteItemMutation.isPending}
                                  data-testid={`button-delete-${item.id}`}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
