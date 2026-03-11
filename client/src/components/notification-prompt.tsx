import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

export default function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkNotificationSupport = async () => {
      const isDismissed = localStorage.getItem("dr_notifications_dismissed");
      const isEnabled = localStorage.getItem("dr_notifications_enabled");

      if (!isDismissed && !isEnabled && "Notification" in window) {
        setShow(true);
      }
    };

    checkNotificationSupport();
  }, []);

  const handleEnable = async () => {
    if (!("Notification" in window)) {
      return;
    }

    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        localStorage.setItem("dr_notifications_enabled", "true");

        try {
          await apiRequest("PATCH", "/api/user/preferences", {
            notificationsEnabled: true,
            notificationTime: "16:00",
          });
        } catch (error) {
          console.error("Failed to update preferences:", error);
        }

        setShow(false);
      }
    } catch (error) {
      console.error("Notification request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("dr_notifications_dismissed", "true");
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-stone-800 border-t border-stone-700 text-white p-4 flex items-center justify-between gap-4"
      data-testid="notification-prompt-bar"
    >
      <div className="flex items-center gap-3 flex-1">
        <Bell className="h-5 w-5 flex-shrink-0" data-testid="icon-bell" />
        <span data-testid="text-prompt-message">Get daily dinner reminders</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          onClick={handleEnable}
          disabled={isLoading}
          size="sm"
          data-testid="button-enable-notifications"
        >
          {isLoading ? "Enabling..." : "Remind me at dinner time"}
        </Button>
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          data-testid="button-dismiss-notifications"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
