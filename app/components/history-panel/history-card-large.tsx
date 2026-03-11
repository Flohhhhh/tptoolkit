import { MapSnip } from "./map-snip";
import { useMap } from "@/lib/context/mapContext";
import { useMainStore } from "@/lib/store/mainStore";
import { searchCoords } from "@/lib/helpers/search";
import { timestampToRelativeTime } from "@/lib/helpers/conversions";
import { useEffect, useState } from "react";
import { trackHistoryReplayUsed } from "@/lib/analytics/events";

export default function HistoryCardLarge({ item }: { item: HistoryItem }) {
  const { handleCoordinateUpdate } = useMap();
  const { clearCoordsResults } = useMainStore();
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
    trackHistoryReplayUsed({ card_size: "large" });
    searchCoords(item.lat, item.lng, {
      addHistory: false,
      source: "history_replay",
    });
    setHistoryPanelOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-accent/25 w-full text-left hover:bg-accent/50 border border-accent rounded-lg p-3 hover:cursor-pointer transition-all"
    >
      <div className="space-y-2">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-sm">{item.inputContent}</h3>
            <span className="text-xs text-muted-foreground/50">
              {relativeTime}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{item.resultText}</p>
        </div>
        <div className="rounded-md overflow-hidden">
          <MapSnip latitude={item.lat} longitude={item.lng} />
        </div>
      </div>
    </button>
  );
}
