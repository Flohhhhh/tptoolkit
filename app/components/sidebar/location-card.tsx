import { useMap } from "@/lib/context/mapContext";
import { parseMetersToString } from "@/lib/helpers/conversions";
import LocationTypeIcon from "../location-type-icon";

export default function LocationCard(props: {
  location: TPLocation;
  selected: TPLocation | null;
  setSelected: (location: TPLocation) => void;
  setTab: (tab: "results" | "details") => void;
}) {
  const { location, selected, setSelected, setTab } = props;
  const { updateSelected } = useMap();

  const distance = location.distance
    ? parseMetersToString(location.distance)
    : null;
  const isSelected = selected && location.name === selected.name;

  const handleClick = () => {
    if (isSelected) {
      setTab("details");
    } else {
      setSelected(location);
      updateSelected(location);
    }
  };

  const bg = isSelected ? "bg-accent" : "bg-accent/25";

  return (
    <div
      onClick={handleClick}
      className={`${bg} border-accent border pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition animate-in`}
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto">
          <LocationTypeIcon type={location.type ?? null} />
        </span>
        <div className="flex flex-col">
          <h2 className="text-xs uppercase select-none line-clamp-1 text-foreground">
            {location.name}
          </h2>
          {distance && (
            <p className="text-xs text-muted-foreground/80 select-none">
              {distance}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
