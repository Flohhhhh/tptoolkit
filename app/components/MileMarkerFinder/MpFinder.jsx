"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMap } from "@/app/context/mapContext";
import MileMarker from "./MileMarker";
import { Map, ClipboardCheck, MousePointerClick } from "lucide-react";

import { turnpikeData, parkwayData } from "@/lib/parsedData.js";
import { create } from "domain";

const MpFinder = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const { flyTo, createMarker } = useMap();

  // console.log(turnpikeData)
  // console.log(parkwayData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorDisplay(null);

    const { coordinates } = e.target.elements;
    const [y, x] = coordinates.value.split(",");
    console.log("Searching near", coordinates.value);

    const res = await fetch(`/api/search/coords?y=${y}&x=${x}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      parseData(data);
      setLoading(false);
    } else {
      setData(null);
      setErrorDisplay(data);
      setLoading(false);
    }
  };

  const parseData = (data) => {
    copyToClipboard(data[0]);
    flyTo(data[0].y, data[0].x);
    createMarker(data[0].y, data[0].x);
    setData(data);
  };

  const copyToClipboard = (data) => {
    const text = `@${data.name}`;
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
    // toast.success(`Copied ${text.toUpperCase()} to clipboard`, {
    //   position: "bottom-center",
    // });
    toast.custom((t) => (
      <div
        className={`flex gap-4 bg-white dark:bg-shark-700 text-shark-800 dark:text-shark-100 px-6 py-2 rounded-xl border border-shark-300 dark:border-shark-600 shadow-lg ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <ClipboardCheck size={20} className='text-emerald-500 animate-pulse' />
        <p>Copied {text.toUpperCase()}</p>
      </div>
    ));
  };

  // map data to MileMarker components
  const Locations = data?.map((data, index) => (
    <MileMarker key={index} data={data} closest={index == 0} />
  ));

  return (
    <div className='absolute top-12 bottom-0 p-2 w-96 z-10'>
      <div className='h-full shadow-lg shadow-black/20 dark:shadow-shark-800/75 col-span-3 self-start w-full bg-white dark:bg-shark-800 rounded-lg p-4 border border-shark-200 dark:border-shark-600'>
        {/* TODO add switch for copy to automatic copy-to-clipboard */}
        <h1 className='text-2xl font-bold mb-4 text-shark-800 dark:text-shark-300'>
          Location Lookup
        </h1>
        <p className='text-xs text-shark-800 dark:text-shark-200 mb-4'>
          This tool is a reverse geocoder for the mile markers, exits, and other
          geography along the Garden State Parkway and New Jersey Turnpike.
          <button
            className='flex items-center gap-3 px-3 py-2 my-4 bg-shark-100 text-shark-600 dark:text-shark-100 dark:bg-shark-700 rounded-xl hover:brightness-95 dark:hover:brightness-125 active:scale-95 transition select'
            onClick={() => {
              let e = {
                preventDefault: () => {},
                target: {
                  elements: {
                    coordinates: {
                      value: "40.486006, -74.302666",
                    },
                  },
                },
              };
              handleSubmit(e);
            }}
          >
            <MousePointerClick size={18} /> Try this example!{" "}
            <span className='opacity-50 font-light'>40.486006, -74.302666</span>
          </button>
          To use the tool enter coordinates in the search box and click find.
          The nearest mile markers will be displayed, and the closest one will
          be automatically copied to your clipboard!
        </p>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col sm:flex-row gap-2'>
            <input
              type='text'
              name='coordinates'
              id='coordinates'
              className='block w-full rounded-md border-0 py-1.5 bg-shark-50 dark:bg-shark-700 text-shark-900 dark:text-shark-50 shadow-sm ring-1 ring-inset ring-shark-300 ring:blue-500 placeholder:text-shark-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
              placeholder='Coordinates'
              autoComplete='off'
              pattern='^\s*-?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$'
              onChange={(e) => {
                setErrorDisplay(null);
                setX(e.target.value.split(",")[1]);
                setY(e.target.value.split(",")[0]);
              }}
            />
            <label htmlFor='coordinates' className='sr-only'>
              Coordinates
            </label>
            <div className='flex gap-2 grow'>
              <button
                type='button'
                disabled={x && y ? false : true}
                onClick={() => {
                  // open google maps with data[0] with router
                  const url = `https://www.google.com/maps/search/?api=1&query=${y},${x}`;
                  window.open(url, "_blank");
                }}
                className='flex items-center justify-center p-3 h-full aspect-square bg-blue-500 animate-pulse rounded-md enabled:hover:brightness-125 transition disabled:bg-shark-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Map size={20} />
              </button>
              <button
                type='submit'
                className='bg-blue-500 rounded-md px-12 py-2 w-full hover:brightness-125 active:scale-95 transition'
              >
                Find
              </button>
            </div>
          </div>
        </form>
        <div className='h-[540px] flex flex-col items-center justify-center'>
          {data === null && !loading ? (
            <p className='font-bold text-shark-100 dark:text-shark-500'>
              Input coordinates to see nearby markers & landmarks!
            </p>
          ) : null}
          {errorDisplay ? (
            <p className='text-center text-red-400 bg-shark-700 px-4 py-2 rounded-md'>
              {errorDisplay}
            </p>
          ) : null}
          {loading ? (
            // spinner
            <div role='status'>
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
            data && (
              <div className='w-full h-full flex flex-col gap-1 mt-4 overflow-y-auto'>
                {Locations}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MpFinder;
