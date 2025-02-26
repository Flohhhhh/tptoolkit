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
  const { setEnteredCoords, searchCoords, enteredCoords } = useSearchStore();

  const handlePaste = async () => {
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
      const [y, x] = text.split(",").map((s) => s.trim());
      const parsedY = parseFloat(y);
      const parsedX = parseFloat(x);

      if (isNaN(parsedX) || isNaN(parsedY)) {
        toast.error("Invalid numbers in coordinates", {
          description: "Coordinates must be valid numbers",
        });
        return;
      }

      // Basic coordinate range validation
      if (parsedY < -90 || parsedY > 90 || parsedX < -180 || parsedX > 180) {
        toast.error("Coordinates out of range", {
          description:
            "Latitude must be between -90 and 90, longitude between -180 and 180",
        });
        return;
      }

      onPaste(text);
      setEnteredCoords(text);
      await searchCoords(parsedX, parsedY);
    } catch (error) {
      toast.error("Error pasting: " + error);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handlePaste}
      icon={<ClipboardPaste className="h-4 w-4" />}
      iconPosition="right"
    >
      Paste & Go
    </Button>
  );
}
