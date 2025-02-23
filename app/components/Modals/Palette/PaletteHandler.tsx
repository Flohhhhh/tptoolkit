"use client";

import { useHotkeys } from "@/lib/hooks/useHotkeys";
import { replaceWithModal } from "@/components/dialogs";

export default function PaletteHandler() {
  const openPalette = () => {
    console.log("Opening palette");
    replaceWithModal("PaletteDialog", { foo: "bar" });
  };

  useHotkeys("k", openPalette);

  return null;
}
