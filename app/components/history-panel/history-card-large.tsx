import { MapSnip } from "./map-snip";
import { useMap } from "@/lib/context/mapContext";
import { useMainStore } from "@/lib/store/mainStore";
import { parseInput, searchCoords } from "@/lib/helpers/search";
import { timestampToRelativeTime } from "@/lib/helpers/conversions";
import { useEffect, useState } from "react";

export default function HistoryCardLarge({ item }: { item: HistoryItem }) {
  const { handleCoordinateUpdate } = useMap();
  const { setSearchInput, clearCoordsResults } = useMainStore();
  const { setHistoryPanelOpen } = useMainStore();
  const [relativeTime, setRelativeTime] = useState(
    timestampToRelativeTime(item.timestamp)
  );

  useEffect(() => {
    // Update the relative time immediately
    setRelativeTime(timestampToRelativeTime(item.timestamp));

    // Set up an interval to update every minute
    const intervalId = setInterval(() => {
      setRelativeTime(timestampToRelativeTime(item.timestamp));
    }, 4000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [item.timestamp]);

  const handleClick = () => {
    clearCoordsResults();
    handleCoordinateUpdate(item.lat, item.lng);
    searchCoords(item.lat, item.lng, false);
    setHistoryPanelOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-background hover:brightness-95 border border-accent rounded-lg p-3 hover:cursor-pointer transition-all"
    >
      <div className="space-y-2">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm">{item.inputContent}</h3>
            <span className="text-xs text-muted-foreground/50">
              {relativeTime}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{item.resultText}</p>
        </div>
        <div className="rounded-md overflow-hidden">
          <MapSnip latitude={item.lat} longitude={item.lng} zoom={14} />
        </div>
      </div>
    </button>
  );
}
