"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MapProvider } from "@/lib/context/mapContext";
import { ModalProvider } from "@/components/dialogs";

export default function Providers({ children }) {
  return (
    <MapProvider>
      <ModalProvider />
      {children}
    </MapProvider>
  );
}
