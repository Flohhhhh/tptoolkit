import { searchCoords } from "@/lib/helpers/search";
import LocationTypeIcon from "../location-type-icon";
import { useMap } from "@/lib/context/mapContext";
import { useHistoryStore } from "@/lib/store/historyStore";

export default function SearchResultCard(props: {
  inputText: string;
  location: TPLocation;
}) {
  const { inputText, location } = props;
  const { handleCoordinateUpdate } = useMap();
  const { addHistoryItem } = useHistoryStore();

  const lat = Number(location.y_old);
  const lng = Number(location.x_old);

  const handleClick = () => {
    handleCoordinateUpdate(lat, lng);
    addHistoryItem({
      id: location.id,
      inputContent: inputText,
      resultText: location.name,
      lat,
      lng,
      timestamp: Date.now(),
    });
  };

  return (
    <button
      onClick={handleClick}
      className="motion-preset-slide-down hover:bg-accent/50 bg-accent/25 border-accent border pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition"
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto">
          <LocationTypeIcon type={location.type ?? null} />
        </span>
        <div className="flex flex-col">
          <h2 className="text-xs uppercase select-none line-clamp-1 text-foreground/80  ">
            {location.name}
          </h2>
          <p className="text-xs text-muted-foreground/75 select-none">
            {location.type}
          </p>
        </div>
      </div>
    </button>
  );
}
