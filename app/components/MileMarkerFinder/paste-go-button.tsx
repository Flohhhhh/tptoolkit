"use client";

import { Button } from "@/components/ui/button";
import { ClipboardPaste } from "lucide-react";
import { toast } from "sonner";
import { useSearchStore } from "@/lib/store/searchStore";

const COORDS_REGEX = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/;

interface PasteGoButtonProps {
  onPaste: (text: string) => void;
}

export function PasteGoButton({ onPaste }: PasteGoButtonProps) {
  const { setEnteredCoords, startSearch, searchCoords, enteredCoords } =
    useSearchStore();

  const handlePasteAndGo = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (!text) {
        toast.error("Clipboard is empty");
        return;
      }

      // Show the actual content if it's not in the right format
      if (!COORDS_REGEX.test(text)) {
        toast.error("Invalid coordinate format", {
          description: `"${text}" is not valid. Expected format: latitude, longitude (e.g. "30.123, -97.456")`,
        });
        return;
      }

      // Check if coordinates are the same
      if (text.replace(/\s+/g, "") === enteredCoords.replace(/\s+/g, "")) {
        toast("These coordinates are already entered");
        return;
      }

      // Validate the numeric ranges
      const [y, x] = text.split(",").map(Number);
      if (isNaN(x) || isNaN(y)) {
        toast.error("Invalid numbers in coordinates", {
          description: "Coordinates must be valid numbers",
        });
        return;
      }

      // Basic coordinate range validation
      if (y < -90 || y > 90 || x < -180 || x > 180) {
        toast.error("Coordinates out of range", {
          description:
            "Latitude must be between -90 and 90, longitude between -180 and 180",
        });
        return;
      }

      startSearch();
      onPaste(text);
      setEnteredCoords(text);
      await searchCoords(x, y);
    } catch (error) {
      toast.error("Error pasting: " + error);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handlePasteAndGo}
      icon={<ClipboardPaste className="h-4 w-4" />}
      iconPosition="right"
    >
      Paste & Go
    </Button>
  );
}
