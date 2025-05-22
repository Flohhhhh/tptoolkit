import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { useMainStore } from "@/lib/store/mainStore";
import { searchCoords } from "@/lib/helpers/search";
import { useMap } from "@/lib/context/mapContext";
import { toast } from "sonner";

export default function PasteGoButton() {
  const setSearchInput = useMainStore((s) => s.setSearchInput);
  const map = useMap();

  const handlePasteGo = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const [lat, lng] = text.split(",").map((v) => parseFloat(v.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setSearchInput(text);
        map.flyTo(lat, lng);
        map.updateCoordsMarker(lat, lng);
        await searchCoords();
      } else {
        // Optionally show error/feedback
        toast.error("Clipboard does not contain valid coordinates.");
      }
    } catch (err) {
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
    >
      <span>Paste & Go</span>
    </Button>
  );
}
