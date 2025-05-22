import { timestampToRelativeTime } from "@/lib/helpers/conversions";
import { useEffect, useState } from "react";
import { useMap } from "@/lib/context/mapContext";
import { useMainStore } from "@/lib/store/mainStore";
import { parseInput } from "@/lib/helpers/search";
import { searchCoords } from "@/lib/helpers/search";

export default function HistoryCardSmall({ item }: { item: HistoryItem }) {
  const { handleCoordinateUpdate } = useMap();
  const { setSearchInput, clearCoordsResults } = useMainStore();
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
  };

  return (
    <button
      onClick={handleClick}
      className="w-[200px] text-left motion-preset-slide-down hover:cursor-pointer hover:bg-accent/50 flex flex-col items-start justify-between rounded-sm border border-accent px-2 py-1 transition-all duration-300 ease-in-out"
    >
      <span className="text-xs text-muted-foreground transition-all duration-300">
        {item.inputContent}
      </span>
      <span className="text-xs text-muted-foreground/50 line-clamp-1 transition-all duration-300">
        {item.resultText}
      </span>
      <span className="text-xs text-muted-foreground/50 transition-all duration-300">
        {relativeTime}
      </span>
    </button>
  );
}
