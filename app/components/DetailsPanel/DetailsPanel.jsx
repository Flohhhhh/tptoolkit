"use client";

import { Transition } from "@headlessui/react";
import { useMap } from "@/lib/context/mapContext";

const DetailsPanel = () => {
  const { selected } = useMap();

  return (
    // TODO add x button that will clear selection
    <Transition
      as="div"
      className="z-10 absolute top-12 right-2 w-80 p-4 rounded-xl bg-white dark:bg-shark-800 border border-shark-200 dark:border-shark-600 shadow-lg"
      show={!!selected}
      enter="ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div>
        <h1 className="text-shark-800 dark:text-shark-100">Details</h1>
        <div className="flex flex-col my-2 py-1 rounded">
          {selected &&
            Object.entries(selected).map((entry, index) => {
              if (!entry[1]) return null;
              if (entry[0] === "distance") return null;
              if (entry[0] === "x" || entry[0] === "y") return null;
              if (entry[0] == "cityAbv") return null;
              if (entry[0] == "commonName") return null;
              if (entry[1] === "0.0") return null;
              return (
                <div
                  key={`${entry.name}_${index}`}
                  className="grid grid-cols-2 text-sm px-2 py-1 text-shark-700 dark:text-shark-200 odd:bg-shark-50 dark:odd:bg-shark-700/80 border-b border-shark-200 dark:border-shark-600"
                >
                  <span className="opacity-75 capitalize">{entry[0]}: </span>
                  <span className="ml-2 col-start-2">{entry[1]}</span>
                </div>
              );
            })}
        </div>
      </div>
    </Transition>
  );
};

export default DetailsPanel;
