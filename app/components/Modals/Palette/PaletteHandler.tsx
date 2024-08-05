"use client";

import { useContext } from "react";
import { ModalContext } from "@/lib/context/modalContext";
import { useHotkeys } from "@/lib/hooks/useHotkeys";
import PaletteModal from "./PaletteModal";

export default function PaletteHandler() {
  const { openModal } = useContext(ModalContext);

  const openPalette = () => {
    console.log("Opening palette");
    openModal(<PaletteModal />);
  };

  useHotkeys("/", openPalette);
}
