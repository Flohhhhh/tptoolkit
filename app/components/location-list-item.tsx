"use client";

import { useMap } from "@/lib/context/mapContext";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import { cn } from "@/lib/utils";
import LocationTypeIcon from "./location-type-icon";
import { parseMetersToString } from "@/lib/helpers/conversions";
export default function LocationListItem(props: {
  location: TPLocation;
  distance: number;
}) {
  const { location, distance } = props;
  const { selected, updateSelected } = useMap();
  const onClick = () => {
    updateSelected(location);
    if (selected !== location) {
      const text = `@${location.name}`;
      CopyToClipboard(text);
    }
  };

  const distanceText = distance ? parseMetersToString(distance, true) : null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition custom-animate-in",
        selected === location
          ? "bg-red-500 text-white"
          : "bg-muted text-muted-foreground "
      )}
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto">
          <LocationTypeIcon type={location.type ?? null} />
        </span>
        <div className="flex flex-col items-start">
          <h2 className="text-sm uppercase select-none line-clamp-1">
            {location.name}
          </h2>
          {distanceText && (
            <p className="opacity-60 text-xs select-none">{distanceText}</p>
          )}
        </div>
      </div>
    </button>
  );
}
