import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, ScanLine } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onError?: (error: string) => void;
}

export function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanning = async () => {
    if (!containerRef.current) return;

    try {
      const scanner = new Html5Qrcode("barcode-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.5,
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {}
      );

      setIsScanning(true);
      setHasPermission(true);
    } catch (err) {
      console.error("Camera error:", err);
      setHasPermission(false);
      onError?.("Could not access camera. Please grant camera permissions.");
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        const scanner = scannerRef.current;
        scannerRef.current = null;
        if (scanner.isScanning) {
          await scanner.stop();
        }
        scanner.clear();
      } catch (err) {
        // Ignore errors during cleanup - component may be unmounting
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <ScanLine className="h-5 w-5 text-primary" />
          <span className="font-medium">Barcode Scanner</span>
        </div>
        <Button
          variant={isScanning ? "destructive" : "default"}
          size="sm"
          onClick={isScanning ? stopScanning : startScanning}
          data-testid="button-toggle-scanner"
        >
          {isScanning ? (
            <>
              <CameraOff className="h-4 w-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Camera className="h-4 w-4 mr-2" />
              Scan
            </>
          )}
        </Button>
      </div>

      <div
        ref={containerRef}
        id="barcode-reader"
        className={`relative rounded-lg overflow-hidden bg-muted ${
          isScanning ? "min-h-[300px]" : "h-32 flex items-center justify-center"
        }`}
      >
        {!isScanning && (
          <div className="text-center text-muted-foreground">
            <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click Scan to open camera</p>
          </div>
        )}
      </div>

      {hasPermission === false && (
        <p className="text-sm text-destructive text-center">
          Camera access denied. Please enable camera permissions.
        </p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Point your camera at a product barcode to scan it
      </p>
    </div>
  );
}
