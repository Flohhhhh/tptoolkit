"use client";

import { pushModal } from "@/components/dialogs";

const SaReference = () => {
  return (
    <button
      className="z-10 absolute top-3 left-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-100 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-500 hover:brightness-90 dark:hover:brightness-125 transition shadow active:translate-y-1"
      onClick={() => {
        pushModal("ServiceAreasReference");
      }}
    >
      Service Area Reference
    </button>
  );
};

export default SaReference;
