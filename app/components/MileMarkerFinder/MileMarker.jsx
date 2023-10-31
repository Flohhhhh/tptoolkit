import React from "react";
import toast from "react-hot-toast";

const MileMarkerFactory = (props) => {
  const { data, closest } = props;
  let distance = `${(data.distance * 5280).toFixed()} ft`;

  const copyToClipboard = () => {
    const text = `@${data.road} ${data.roadway} MP ${data.mp}`;
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
    <button
      onClick={() => {
        copyToClipboard();
      }}
      className={`px-4 py-2 rounded-md flex justify-between w-full hover:brightness-125 active:scale-95 transition ${bg}`}
    >
      <h1 className=' dark:text-gray-200 uppercase'>
        {data.road} {data.roadway} MP {data.mp}
      </h1>
      <p className='opacity-70'>{distance}</p>
    </button>
  );
};

export default MileMarkerFactory;
