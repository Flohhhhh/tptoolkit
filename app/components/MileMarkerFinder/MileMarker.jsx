import React from "react";
import toast from "react-hot-toast";
import { ClipboardCheck } from 'lucide-react'
import TypeIcon from "./TypeIcon"

const MileMarkerFactory = (props) => {
  const { data, closest } = props;
  let distance = `${(data.distance * 5280).toFixed()} ft`;

  const copyToClipboard = () => {
    const text = `@${data.Name}`;
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

  const bg = closest
    ? "bg-blue-500 text-white animate-pulse"
    : "bg-shark-50 dark:bg-shark-700 text-shark-600 dark:text-shark-300";

  return (
    <div
      onClick={() => {
        copyToClipboard();
      }}
      className={`px-4 py-2 rounded-md flex justify-between w-full hover:brightness-95 dark:hover:brightness-125 active:scale-95 transition ${bg}`}
    >
      <h1 className=' uppercase'>
        <span className="opacity-50 float-left mr-4 pt-[2px]"><TypeIcon type={data.Type}/></span>
        {data.Name}
      </h1>
      <p className='opacity-70'>{distance}</p>
    </div>
  );
};

export default MileMarkerFactory;
