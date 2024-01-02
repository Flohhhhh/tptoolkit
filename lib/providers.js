"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { MapProvider } from "@/app/context/mapContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute='class'>
      <MapProvider>{children}</MapProvider>
    </ThemeProvider>
  );
}
