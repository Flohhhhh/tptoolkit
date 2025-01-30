"use client";

import { useContext } from "react";
import { ModalContext } from "@/lib/context/modalContext";
import { useHotkeys } from "@/lib/hooks/useHotkeys";
import PaletteModal from "./PaletteModal";
import { pushModal } from "@/components/dialogs";

export default function PaletteHandler() {
  const openPalette = () => {
    console.log("Opening palette");
    pushModal("YourModal", { foo: "bar" });
  };

  useHotkeys("/", openPalette);
}
