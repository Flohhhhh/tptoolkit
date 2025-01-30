"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MapProvider } from "@/lib/context/mapContext";
import { SearchProvider } from "@/lib/context/searchContext";
import { ModalProvider } from "@/components/dialogs";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <MapProvider>
        <SearchProvider>{children}</SearchProvider>
      </MapProvider>
    </ThemeProvider>
  );
}
