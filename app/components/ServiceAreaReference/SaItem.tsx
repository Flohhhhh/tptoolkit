"use client";

import { useContext } from "react";
import { MapContext } from "@/app/context/mapContext";

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
      className="text-shark-700 dark:text-shark-200 odd:bg-shark-50 dark:odd:bg-shark-700/80 border-b border-shark-200 dark:border-shark-600 hover:ring-2 ring-inset ring-blue-500 transition hover:cursor-pointer"
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