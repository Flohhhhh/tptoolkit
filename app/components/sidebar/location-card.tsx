import { useMap } from "@/lib/context/mapContext";
import { parseMetersToString } from "@/lib/helpers/conversions";
import LocationTypeIcon from "../location-type-icon";

export default function LocationCard(props: { location: TPLocation }) {
  const { location } = props;
  const distance = location.distance
    ? parseMetersToString(location.distance)
    : null;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div
      onClick={handleClick}
      className={`hover:bg-accent/50 bg-accent/25 border-accent border pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition animate-in`}
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto">
          <LocationTypeIcon type={location.type ?? null} />
        </span>
        <div className="flex flex-col">
          <h2 className="text-xs uppercase select-none line-clamp-1 text-foreground/80  ">
            {location.name}
          </h2>
          {distance && (
            <p className="text-xs text-muted-foreground/75 select-none">
              {distance}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
