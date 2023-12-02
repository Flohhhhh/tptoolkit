import React from "react";
import toast from "react-hot-toast";
import TypeIcon from "./TypeIcon"

const MileMarkerFactory = (props) => {
  const { data, closest } = props;
  let distance = `${(data.distance * 5280).toFixed()} ft`;

  const copyToClipboard = () => {
    const text = `@${data.Name}`;
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
    toast.success(`Copied ${text.toUpperCase()} to clipboard`, {
      position: "bottom-center",
    });
  };

  const bg = closest
    ? "bg-blue-500 text-white animate-pulse"
    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300";

  return (
    <div
      onClick={() => {
        copyToClipboard();
      }}
      className={`px-4 py-2 rounded-md flex justify-between w-full hover:brightness-125 active:scale-95 transition ${bg}`}
    >
      <h1 className=' dark:text-gray-200 uppercase'>
        <span className="opacity-50 float-left mr-4 pt-[2px]"><TypeIcon type={data.Type}/></span>
        {data.Name}
      </h1>
      <p className='opacity-70'>{distance}</p>
    </div>
  );
};

export default MileMarkerFactory;
