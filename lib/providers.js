"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { MapProvider } from "@/app/context/mapContext";
import { SearchProvider } from "@/app/context/searchContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem='false'>
        <MapProvider>
          <SearchProvider>
            {children} 
          </SearchProvider>
        </MapProvider>
    </ThemeProvider>
  );
}
