import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { useMainStore } from "@/lib/store/mainStore";
import { searchCoords } from "@/lib/helpers/search";
import { useMap } from "@/lib/context/mapContext";
import { trackPasteGoUsed } from "@/lib/analytics/events";
import { toast } from "sonner";

export default function PasteGoButton() {
  const setSearchInput = useMainStore((s) => s.setSearchInput);
  const { handleCoordinateUpdate } = useMap();

  const handlePasteGo = async () => {
    try {
      const text = await navigator.clipboard.readText();
      console.log("paste & go", text);
      const [lat, lng] = text.split(",").map((v) => parseFloat(v.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        trackPasteGoUsed({ status: "success" });
        setSearchInput(text);
        handleCoordinateUpdate(lat, lng);
        await searchCoords(lat, lng, { source: "paste_go" });
      } else {
        trackPasteGoUsed({ status: "invalid_clipboard" });
        // Optionally show error/feedback
        toast.error("Clipboard does not contain valid coordinates.");
      }
    } catch (err) {
      trackPasteGoUsed({ status: "clipboard_error" });
      toast.error("Error: " + err);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handlePasteGo}
      title="Paste & Go"
      icon={<Clipboard className="w-4 h-4" />}
      iconPosition="right"
      className="h-9.5 mt-[1px] bg-blue-500 hover:bg-blue-600 text-white border-none"
    >
      <span className="px-2">Paste & Go</span>
    </Button>
  );
}
