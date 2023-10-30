import React from "react";

const MileMarkerFactory = (props) => {
  const { data, closest } = props;
  let distance = `${(data.distance * 5280).toFixed()} ft`;

  const copyToClipboard = () => {
    const text = `@${data.road} ${data.roadway} MP ${data.mp}`;
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
  };

  const bg = closest ? "bg-blue-500" : "bg-gray-700";

  return (
    <button
      onClick={() => {
        copyToClipboard();
      }}
      className={`${bg} px-4 py-2 rounded-md flex justify-between w-full hover:brightness-150 active:scale-95 transition`}
    >
      <h1 className='uppercase'>
        {data.road} {data.roadway} MP {data.mp}
      </h1>
      <p className='opacity-75'>{distance}</p>
    </button>
  );
};

export default MileMarkerFactory;
