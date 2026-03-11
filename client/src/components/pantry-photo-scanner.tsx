import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Loader2, Check, X, ImagePlus } from "lucide-react";

interface ScannedItem {
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

interface PantryPhotoScannerProps {
  onItemsScanned: (items: ScannedItem[]) => void;
  onError?: (error: string) => void;
}

export function PantryPhotoScanner({ onItemsScanned, onError }: PantryPhotoScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      await scanImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const scanImage = async (imageData: string) => {
    setIsScanning(true);
    setShowResults(false);
    
    try {
      const response = await fetch("/api/my-pantry/scan-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error("Failed to scan image");
      }

      const data = await response.json();
      setScannedItems(data.items || []);
      setShowResults(true);
    } catch (err) {
      console.error("Scan error:", err);
      onError?.("Failed to scan the image. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddItems = () => {
    if (scannedItems.length > 0) {
      onItemsScanned(scannedItems);
      resetScanner();
    }
  };

  const resetScanner = () => {
    setPreview(null);
    setScannedItems([]);
    setShowResults(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const removeItem = (index: number) => {
    setScannedItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ImagePlus className="h-5 w-5 text-primary" />
        <span className="font-medium">Smart Photo Scan</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-file-upload"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-camera-capture"
      />

      {!preview && !isScanning && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Snap your pantry and AI finds all the food
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="default"
              className="flex-1"
              onClick={() => cameraInputRef.current?.click()}
              data-testid="button-take-photo"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
              data-testid="button-upload-photo"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      )}

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Pantry preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          {!isScanning && !showResults && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={resetScanner}
              data-testid="button-clear-preview"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {isScanning && (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Scanning for food items...</p>
        </div>
      )}

      {showResults && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-medium text-sm">
              Found {scannedItems.length} item{scannedItems.length !== 1 ? "s" : ""}
            </span>
            <Button variant="ghost" size="sm" onClick={resetScanner} data-testid="button-scan-again">
              Scan Again
            </Button>
          </div>

          {scannedItems.length > 0 ? (
            <>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {scannedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md gap-2 flex-wrap"
                    data-testid={`scanned-item-${index}`}
                  >
                    <div className="flex-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeItem(index)}
                      data-testid={`button-remove-item-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={handleAddItems}
                data-testid="button-add-all-items"
              >
                <Check className="h-4 w-4 mr-2" />
                Add All to Pantry
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No food items detected. Try taking a clearer photo.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
