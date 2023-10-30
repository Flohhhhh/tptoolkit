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

  const bg = closest ? "bg-blue-500 animate-pulse" : "bg-gray-700";

  return (
    <button
      onClick={() => {
        copyToClipboard();
      }}
      className={`${bg} px-4 py-2 rounded-md flex justify-between w-full hover:brightness-125 active:scale-95 transition`}
    >
      <h1 className='text-gray-200 uppercase'>
        {data.road} {data.roadway} MP {data.mp}
      </h1>
      <p className='text-white opacity-50'>{distance}</p>
    </button>
  );
};

export default MileMarkerFactory;
