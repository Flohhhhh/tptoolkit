"use client";

import ThemeSwitcher from "./components/ThemeSwitcher";
import { useRef, useState } from "react";
import MapLayerSwitcher from "./components/Map/MapLayerSwitcher";
import { MapRenderer } from "./components/Map/MapRenderer";
import SearchPanel from "./components/search-panel/search-panel";
import HistoryPanel from "./components/history-panel/history-panel";
import Sidebar from "./components/sidebar/sidebar";
import MagicButton from "./components/search-panel/magic-button";
export default function Home() {
  const [mapStyle, setMapStyle] = useState("streets");
  const mapNode = useRef(null);

  return (
    <div className="relative h-screen bg-background">
      <div className="fixed top-0 h-screen w-[300px]">
        <Sidebar />
      </div>
      <div className="fixed top-0 left-[300px] right-0 bottom-[80px]">
        <div className="z-10 top-0 absolute w-full flex justify-between p-2">
          <div className="flex gap-1 items-start">
            <SearchPanel />
            <MagicButton />
          </div>
          <div className="flex gap-1 items-start">
            {/* <ThemeSwitcher /> */}
            <MapLayerSwitcher mapStyle={mapStyle} setMapStyle={setMapStyle} />
          </div>
        </div>
        <MapRenderer mapStyle={mapStyle} mapNode={mapNode} />
      </div>
      <div className="z-10 absolute bottom-0 left-[300px] right-0 min-h-[80px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <HistoryPanel />
      </div>
    </div>
  );
}
