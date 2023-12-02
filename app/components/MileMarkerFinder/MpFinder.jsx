"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import MileMarker from "./MileMarker";
import { Map } from "lucide-react";

const MpFinder = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!e.target.elements.coordinates.value) {
      setData(null);
      setLoading(false);
      return;
    }

    const { coordinates } = e.target.elements;
    const [y, x] = coordinates.value.split(",");
    console.log("Searching near", coordinates.value);

    const res = await fetch(`/api/search?x=${x}&y=${y}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      if (res.statusText === "No matches found") {
        setData(null);
        setLoading(false);
      } else {
        const data = await res.json();
        console.log(data);
        parseData(data);
        setLoading(false);
      }
    }
  };

  const parseData = (data) => {
    copyToClipboard(data[0]);
    setData(data);
  };

  const copyToClipboard = (data) => {
    const text = `@${data.Name}`;
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
    toast.success(`Copied ${text.toUpperCase()} to clipboard`, {
      position: "bottom-center",
    });
  };

  // map data to MileMarker components
  const Locations = data?.map((data, index) => (
    <MileMarker key={index} data={data} closest={index == 0} />
  ));

  return (
    <div className='w-full bg-white dark:bg-shark-800 rounded-lg p-4 border border-shark-200 dark:border-shark-500'>
      {/* TODO add switch for copy to automatic copy-to-clipboard */}
      <h1 className='text-xl font-bold mb-4 text-shark-800 dark:text-shark-300'>
        Mile Post Finder
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row gap-2 h-10'>
          <input
            type='text'
            name='coordinates'
            id='coordinates'
            className='block w-full rounded-md border-0 py-1.5 bg-shark-100 dark:bg-shark-700 text-shark-900 dark:text-shark-50 shadow-sm ring-1 ring-inset ring-shark-300 dark:ring-shark-600 placeholder:text-shark-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
            placeholder='Coordinates'
            autoComplete='off'
            pattern='^\s*-?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$'
          />
          <label htmlFor='coordinates' className='sr-only'>
            Coordinates
          </label>
          <button
            type='button'
            disabled={data ? false : true}
            onClick={() => {
              // open google maps with data[0] with router
              const { x, y } = data[0];
              const url = `https://www.google.com/maps/search/?api=1&query=${y},${x}`;
              window.open(url, "_blank");
            }}
            className='flex items-center justify-center h-full aspect-square bg-blue-500 animate-pulse rounded-md enabled:hover:brightness-125 transition disabled:bg-shark-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <Map size={20} />
          </button>
          <button
            type='submit'
            className='bg-blue-500 basis-1/4 rounded-md p-2 w-full hover:brightness-125 active:scale-95 transition'
          >
            Find
          </button>
        </div>
      </form>
      <div className='min-h-[300px] flex justify-center'>
        {loading ? (
          // spinner
          <div role='status' className="self-center">
            <svg
              aria-hidden='true'
              className='w-8 h-8 mr-2 text-shark-200 animate-spin dark:text-shark-600 fill-shark-100'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <div className='w-full flex flex-col gap-1 mt-4'>{Locations}</div>
        )}
      </div>
    </div>
  );
};

export default MpFinder;
