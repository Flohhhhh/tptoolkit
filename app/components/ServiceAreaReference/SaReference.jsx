"use client";

import { useState } from "react";
import { Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { data } from "./ServiceAreas";
import SaItem from "./SaItem";
import { pushModal } from "@/components/dialogs";

const SaReference = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tables = data.map((table, index) => {
    return (
      <div className="p-4" key={index}>
        <h2 className="mb-4 text-2xl font-bold text-shark-700  dark:text-shark-300">
          {table.title}
        </h2>
        <div
          key={index}
          className="relative overflow-x-auto rounded-lg border border-shark-200 dark:border-shark-600 mb-4"
        >
          <table className="table-auto w-full text-left shadow-lg">
            <thead className="text-shark-900 dark:text-shark-200 h-12">
              <tr>
                {table.headings.map((heading, index) => {
                  return (
                    <th className="px-4 py-2" key={index}>
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => {
                return (
                  <SaItem
                    key={`row-${index}`}
                    table={table}
                    item={row}
                    index={index}
                    setIsOpen={setIsOpen}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  });

  return (
    <>
      <button
        className="z-10 absolute top-3 left-3 px-4 py-2 text-sm text-shark-700 dark:text-shark-100 bg-white dark:bg-shark-800 rounded-xl border border-shark-500 hover:brightness-90 dark:hover:brightness-125 transition shadow active:translate-y-1"
        onClick={() => {
          pushModal("ServiceAreasDialog");
        }}
      >
        Service Area Reference
      </button>

      <Transition
        className="z-10 absolute top-12 right-0 bottom-0 left-0 pointer-events-none"
        show={isOpen}
        as="div"
      >
        <div className="w-[800px] mx-auto bg-white dark:bg-shark-800 rounded-lg border border-shark-200 dark:border-shark-600 pointer-events-auto shadow-lg">
          <div className="w-full px-2">
            <button
              className="float-right w-7 h-7 m-2 rounded-lg text-shark-800 dark:text-shark-100 hover:bg-red-500/50 flex items-center justify-center"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X size={16} />
            </button>
          </div>
          <div className="w-full h-[800px] overflow-y-scroll">{tables}</div>
        </div>
      </Transition>
    </>
  );
};

export default SaReference;
