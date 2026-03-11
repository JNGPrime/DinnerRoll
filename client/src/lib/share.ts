export interface ShareDinnerResultParams {
  mealName: string;
  source: string;
  imageUrl?: string;
}

export function canShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

export async function shareDinnerResult(
  params: ShareDinnerResultParams,
): Promise<boolean> {
  const { mealName, source, imageUrl } = params;
  const shareText = `Tonight's dinner: ${mealName} via DinnerRoll! 🍽️ dinnerroll.app`;

  try {
    // Try Web Share API first if available
    if (canShare()) {
      const shareData: ShareData = {
        title: "DinnerRoll",
        text: shareText,
        url: "https://dinnerroll.app",
      };

      // Add image if available
      if (imageUrl && navigator.canShare && navigator.canShare({})) {
        try {
          const blob = await fetch(imageUrl).then((res) => res.blob());
          const file = new File([blob], "dinner.jpg", { type: "image/jpeg" });
          shareData.files = [file];
        } catch {
          // If image fails to fetch, continue without it
        }
      }

      try {
        await navigator.share(shareData);
        return true;
      } catch (error) {
        // If sharing is cancelled or fails, fall back to clipboard
        if (error instanceof Error && error.name === "AbortError") {
          // User cancelled share, return false
          return false;
        }
        // For other errors, try clipboard fallback
      }
    }

    // Fallback to clipboard
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch (error) {
    // If clipboard fails, we can still consider it a soft failure
    // but return false to indicate sharing wasn't successful
    console.error("Share failed:", error);
    return false;
  }
}
