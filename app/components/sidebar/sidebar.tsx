"use client";
import { useMainStore } from "@/lib/store/mainStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationCard from "./location-card";
import { Loader2, X, HelpCircle } from "lucide-react";
import DetailsPanel from "./details-panel";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMap } from "@/lib/context/mapContext";
import { SettingsMenu } from "./settings-menu";
import ServiceAreaButton from "./service-area-button";

export default function Sidebar() {
  const {
    searchingCoords,
    coordsResults,
    clearCoordsResults,
    sidebarTab,
    setSidebarTab,
    selectedLocation,
    setSelectedLocation,
  } = useMainStore();

  const { updateSelected, handleCoordinateUpdate } = useMap();

  return (
    <div className="py-2 w-full border-r border-border h-full px-2 relative isolate flex flex-col justify-between">
      <div>
        <h1 className="text-lg font-bold px-1 pb-2">TP Toolkit</h1>
        <Tabs
          defaultValue="results"
          value={sidebarTab}
          onValueChange={(value) =>
            setSidebarTab(value as "results" | "details")
          }
        >
          <TabsList className="w-full dark:bg-black/50">
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedLocation}>
              Details
            </TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            {searchingCoords ? (
              <div className="flex justify-center items-center py-12 animate-in">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : coordsResults.length > 0 ? (
              <div className="space-y-1.5">
                {coordsResults.map((result) => (
                  <LocationCard
                    key={result.id}
                    location={result}
                    selected={selectedLocation}
                    setSelected={setSelectedLocation}
                    setTab={setSidebarTab}
                  />
                ))}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  icon={<X className="size-4" />}
                  onClick={() => {
                    handleCoordinateUpdate(null, null);
                    updateSelected(null);
                    clearCoordsResults();
                    setSelectedLocation(null);
                  }}
                >
                  Clear Results
                </Button>
                <p className="text-xs text-muted-foreground mt-2 px-2">
                  Results are only approximate suggestions. Always verify the
                  roadway and location with your caller. The first result is not
                  always the correct choice!
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center py-12 animate-in">
                <div className="flex flex-col gap-2 p-4 items-center text-center">
                  <h2 className="text-muted-foreground text-sm font-bold">
                    No results
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Use the search bar to enter coords, search a location, or
                    double click a location on the map to see nearby results.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="details">
            <DetailsPanel location={selectedLocation || undefined} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-1">
        <SettingsMenu />
        <ServiceAreaButton />
        <Button
          disabled
          variant="outline"
          className="w-full justify-start"
          icon={<HelpCircle className="size-4 text-muted-foreground" />}
        >
          Help
        </Button>
      </div>
    </div>
  );
}
