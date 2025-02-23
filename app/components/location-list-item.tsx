"use client";

import { useMap } from "@/lib/context/mapContext";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import { cn } from "@/lib/utils";
import LocationTypeIcon from "./location-type-icon";
import { parseMetersToString } from "@/lib/helpers/conversions";
export default function LocationListItem(props: {
  location: TPLocation;
  distance?: number;
  onClick?: () => void;
  showSelected?: boolean;
  className?: string;
  altTextType?: "distance" | "type" | "station";
}) {
  const {
    location,
    distance,
    onClick,
    showSelected = true,
    className,
    altTextType = "distance",
  } = props;
  const { selected, updateSelected } = useMap();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      updateSelected(location);
      if (selected !== location) {
        const text = `@${location.name}`;
        CopyToClipboard(text);
      }
    }
  };

  const distanceText = distance ? parseMetersToString(distance, true) : null;

  const altText = () => {
    if (altTextType === "distance") {
      return distanceText;
    }
    if (altTextType === "type") {
      return location.type;
    }
    if (altTextType === "station") {
      return location.name;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "min-h-12 pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition custom-animate-in",
        className,
        showSelected && selected === location
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
          {altText() && (
            <p className="opacity-60 text-xs select-none capitalize">
              {altText()}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
