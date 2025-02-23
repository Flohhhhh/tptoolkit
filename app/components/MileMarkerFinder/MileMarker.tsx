import { useMap } from "@/lib/context/mapContext";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import LocationTypeIcon from "../location-type-icon";
import { parseMetersToString } from "@/lib/helpers/conversions";

interface MileMarkerProps {
  data: TPLocation & { distance?: number };
  closest?: boolean;
}

const MileMarker = ({ data, closest }: MileMarkerProps) => {
  const { selected, updateSelected } = useMap();
  const distance = data.distance ? parseMetersToString(data.distance) : null;

  const bg =
    selected === data
      ? "bg-blue-500 text-white animate-pulse"
      : "bg-zinc-50 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300";

  const handleClick = () => {
    updateSelected(data);
    const text = `@${data.name}`;
    CopyToClipboard(text);
  };

  return (
    <div
      onClick={handleClick}
      className={`pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition animate-in ${bg}`}
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto">
          <LocationTypeIcon type={data.type ?? null} />
        </span>
        <div className="flex flex-col">
          <h2 className="text-sm uppercase select-none line-clamp-1">
            {data.name}
          </h2>
          {distance && (
            <p className="opacity-70 text-xs select-none">{distance}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MileMarker;
