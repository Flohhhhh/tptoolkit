"use client";

import Search from "./components/Search/Search";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useRef, useState } from "react";
import MapLayerSwitcher from "./components/Map/MapLayerSwitcher";
import { MapRenderer } from "./components/Map/MapRenderer";

export default function Home() {
  const [mapStyle, setMapStyle] = useState("streets");
  const mapNode = useRef(null);

  return (
    <div className="relative h-screen bg-background">
      <div className="absolute z-10 top-0 left-0 right-0 p-4 w-full flex justify-between gap-2 items-center">
        <div className="flex">
          <Search />
        </div>
        <div className="flex-1 flex justify-end gap-2">
          <ThemeSwitcher />
          <MapLayerSwitcher mapStyle={mapStyle} setMapStyle={setMapStyle} />
        </div>
      </div>
      <MapRenderer mapStyle={mapStyle} mapNode={mapNode} />
    </div>
  );
}
