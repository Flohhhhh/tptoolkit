"use client";
import { useMainStore } from "@/lib/store/mainStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationCard from "./location-card";
import { Loader2 } from "lucide-react";

export default function Sidebar() {
  const { searchingCoords, coordsResults } = useMainStore();
  return (
    <div className="w-full border-r border-border z-10 h-full px-2">
      <h1 className="text-lg font-bold py-2">TP Toolkit</h1>
      <Tabs defaultValue="results">
        <TabsList className="w-full dark:bg-black/50">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="results" className="space-y-1">
          {searchingCoords && (
            <div className="flex justify-center items-center py-12 animate-in">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}
          {coordsResults.map((result) => (
            <LocationCard key={result.id} location={result} />
          ))}
        </TabsContent>
        <TabsContent value="details">
          <div>Details</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
