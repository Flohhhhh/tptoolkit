"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { MapProvider } from "@/lib/context/mapContext";
import { SearchProvider } from "@/lib/context/searchContext";
import { ModalProvider } from "@/lib/context/modalContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem="false">
      <MapProvider>
        <ModalProvider>
          <SearchProvider>{children}</SearchProvider>
        </ModalProvider>
      </MapProvider>
    </ThemeProvider>
  );
}
