import React from "react";
import toast from "react-hot-toast";
import { ClipboardCheck, ClipboardCopy } from 'lucide-react'
import { useMap } from "@/app/context/mapContext";
import TypeIcon from "./TypeIcon"

const MileMarkerFactory = (props) => {
  const { data, closest } = props;
  const { selected, updateHoverMarker, updateSelected } = useMap()
  let distance = `${(data.distance * 5280).toFixed()} ft`;

  // set selected function

  const copyToClipboard = () => {
    const text = `@${data.name}`;
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
    toast.custom((t) => (
      <div
        className={`flex gap-4 bg-white dark:bg-shark-700 text-shark-800 dark:text-shark-100 px-6 py-2 rounded-xl border border-shark-300 dark:border-shark-600 shadow-lg ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        <ClipboardCheck size={20} className="text-emerald-500 animate-pulse"/>
        <p>Copied {text.toUpperCase()}</p>
      </div>
    ));
  };

  const bg = selected === data
    ? "bg-blue-500 text-white animate-pulse"
    : "bg-shark-50 dark:bg-shark-700 text-shark-600 dark:text-shark-300";

  return (
    <div
      onClick={() => {
        updateSelected(data);
        copyToClipboard(data);
        // maybe fly to it?
      }}
      // buggy, they stick on screen during fly or something? also maybe when mouse moves off map?
      // onMouseEnter={() => {
      //   updateHoverMarker(data.y, data.x)
      // }}
      // onMouseExit={() => {
      //   updateHoverMarker()
      // }}
      className={`pl-3 pr-2 py-1 rounded-md flex justify-between gap-2 items-center w-full hover:cursor-pointer hover:brightness-95 dark:hover:brightness-125 transition ${bg}`}
    >
      <div className="flex">
        <span className="w-6 opacity-50 mr-2 my-auto"><TypeIcon type={data.type}/></span>
        <div className="flex flex-col">
          <h2 className='text-sm uppercase select-none line-clamp-1'>
            {data.name}
          </h2>
          <p className='opacity-70 text-xs select-none'>{distance}</p>
        </div>
      </div>
    </div>
  );
};

export default MileMarkerFactory;
