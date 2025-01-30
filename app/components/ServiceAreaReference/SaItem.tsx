"use client";

import { useContext } from "react";
import { MapContext } from "@/lib/context/mapContext";

export default function SaItem(props: {
  table: any;
  item: any;
  index: any;
  setIsOpen: Function;
}) {
  const { flyTo, updateCoordsMarker } = useContext(MapContext);
  const { table, item, index, setIsOpen } = props;
  return (
    <tr
      key={`sa-${index}`}
      onClick={() => {
        // console.log(item.name);
        updateCoordsMarker(item.coords[0], item.coords[1]);
        flyTo(item.coords[0], item.coords[1]);
        setIsOpen(false);
      }}
      className="text-zinc-700 dark:text-zinc-200 odd:bg-zinc-50 dark:odd:bg-zinc-700/80 border-b border-zinc-200 dark:border-zinc-600 hover:ring-2 ring-inset ring-blue-500 transition hover:cursor-pointer"
    >
      <td className="px-4 py-2 select-none">{item.name}</td>
      {item.oldName ? (
        <td className="px-4 py-2 select-none">{item.oldName}</td>
      ) : (
        table.title === "Parkway Service Areas" && <td></td>
      )}
      {item.id && <td className="px-4 py-2 select-none">{item.id}</td>}
      <td className="px-4 py-2 select-none">{item.mp}</td>
      <td className="px-4 py-2 select-none">{item.station}</td>
    </tr>
  );
}
