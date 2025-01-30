import { useMap } from "@/lib/context/mapContext";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import TypeIcon from "./TypeIcon";

const MileMarkerFactory = (props) => {
  const { data, closest } = props;
  const { selected, updateHoverMarker, updateSelected } = useMap();
  let distance = `${(data.distance * 5280).toFixed()} ft`;

  // set selected function

  const bg =
    selected === data
      ? "bg-blue-500 text-white animate-pulse"
      : "bg-zinc-50 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300";

  return (
    <div
      onClick={() => {
        updateSelected(data);
        const text = `@${data.name}`;
        CopyToClipboard(text);
        // maybe fly to it?
      }}
      // buggy, they stick on screen during fly or something? also maybe when mouse moves off map?
      // onMouseEnter={() => {
      //   updateHoverMarker(data.y, data.x)
      // }}
      // onMouseExit={() => {
      //   updateHoverMarker()
      // }}
      className={`pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition animate-in ${bg}`}
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto">
          <TypeIcon type={data.type} />
        </span>
        <div className="flex flex-col">
          <h2 className="text-sm uppercase select-none line-clamp-1">
            {data.name}
          </h2>
          <p className="opacity-70 text-xs select-none">{distance}</p>
        </div>
      </div>
    </div>
  );
};

export default MileMarkerFactory;
