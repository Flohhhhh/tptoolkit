"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { ClipboardPaste, Map } from "lucide-react";
import MileMarker from "./MileMarker";
// TODO put palette into a context so it can be re-used
import PaletteModal from "@/app/components/Modals/Palette/PaletteModal";
import { pushModal } from "@/components/dialogs";
import { useSearchStore } from "@/lib/store/searchStore";

import { turnpikeData, parkwayData } from "@/lib/parsedData.js";

const MpFinder = () => {
  const {
    enteredCoords,
    setEnteredCoords,
    searchCoords,
    results,
    searchError,
    setSearchError,
    searching,
  } = useSearchStore();
  // const { openModal } = useContext(ModalContext);
  const openPalette = () => {
    console.log("Opening palette");
    pushModal("PaletteDialog");
  };

  const query = useDebounce(enteredCoords, 1000);
  const [coords, setCoords] = useState({ x: null, y: null });
  // console.log(turnpikeData)
  // console.log(parkwayData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { coordinates } = e.target.elements;
    // const [y, x] = coordinates.value.split(",");
    // searchCoords(x, y);
  };

  // map data to MileMarker components
  const Locations = results?.map((result, index) => (
    <MileMarker key={index} data={result} closest={index == 0} />
  ));

  // this is a hacky fix since MapRenderer.jsx couldn't call searchCoords properly on it's own (map was always null in mapContext), but it can call enteredCoords
  // if we're doing this, we might as well just put this code in search context and always search by setting the entered coords, but not now
  useEffect(() => {
    if (!query) return;
    const [y, x] = query.split(",");
    setCoords({ x: x, y: y });
    searchCoords(Number(x), Number(y));
  }, [query, searchCoords]);

  return (
    <div className="absolute top-10 bottom-0 w-[320px] z-10">
      <div className="h-full col-span-3 flex  flex-col justify-between self-start w-full bg-white dark:bg-zinc-800 rounded-lg p-4">
        {/* TODO add switch for copy to automatic copy-to-clipboard */}
        <div>
          <h1 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200">
            Location Lookup
          </h1>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="coordinates"
              id="coordinates"
              className="block w-full rounded-md border-0 py-2 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-zinc-200  dark:ring-zinc-500 placeholder:text-zinc-300 dark:placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Coordinates"
              autoComplete="off"
              pattern="^\s*-?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
              value={enteredCoords}
              onChange={(e) => {
                setEnteredCoords(e.target.value);
                setSearchError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <label htmlFor="coordinates" className="sr-only">
              Coordinates
            </label>
            <div className="flex gap-2 grow">
              <button
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    setEnteredCoords(text);
                  } catch (error) {
                    // Handle the error gracefully
                    setSearchError(
                      "Please allow clipboard access or paste coordinates manually."
                    );
                  }
                }}
                className="flex items-center justify-center gap-2 text-white bg-blue-500 rounded-md  py-1.5 w-full hover:brightness-125 active:scale-95 transition border-t border-blue-400"
              >
                Paste & Go <ClipboardPaste size={18} />
              </button>
              {/* <button
                type="button"
                disabled={coords.x && coords.y ? false : true}
                onClick={() => {
                  // open google maps with data[0] with router
                  const url = `https://www.google.com/maps/search/?api=1&query=${coords.y},${coords.x}`;
                  window.open(url, "_blank");
                }}
                className="flex items-center justify-center p-3 h-9 aspect-square bg-zinc-50 dark:bg-zinc-600 border-t border-zinc-50 text-zinc-500 dark:text-zinc-100 dark:border-zinc-400 rounded-md enabled:hover:brightness-95 dark:enabled:hover:brightness-125 transition  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Map size={20} />
              </button> */}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center ">
            {results === null && !searching && !searchError ? (
              <p className="text-zinc-200 dark:text-zinc-500 mt-4 custom-animate-in">
                Input coordinates to see nearby markers & landmarks!
              </p>
            ) : null}
            {searchError ? (
              <p className="mt-4 text-sm text-center text-red-400 bg-zinc-50 dark:bg-zinc-700 px-4 py-2 rounded-md custom-animate-in">
                {searchError}
              </p>
            ) : null}
            {searching ? (
              // spinner
              <div role="status" className="mt-12 custom-animate-in">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-zinc-200 animate-spin dark:text-zinc-600 fill-zinc-100"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              results && (
                <div className="w-full h-full flex flex-col gap-1 mt-4  ">
                  {Locations}
                  <p className="text-sm text-zinc-200 dark:text-zinc-500 mt-4 custom-animate-in-2">
                    These results are only approximate suggestions! Verify the
                    roadway and location with the caller!
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <button
            onClick={openPalette}
            className="w-full py-1.5 justify-between px-4 hover:brightness-95 transition duration-50 dark:hover:brightness-125 flex items-center gap-2 bg-zinc-50   dark:bg-zinc-700 rounded-md border border-zinc-100 dark:border-zinc-600 text-zinc-500 dark:text-zinc-200"
          >
            <span className="text-sm">Lookup by name </span>
            <span className="text-xs px-3 py-1 rounded border text-zinc-500 dark:text-zinc-200 bg-white dark:bg-zinc-800 border-zinc-100  dark:border-zinc-600">
              /
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MpFinder;
