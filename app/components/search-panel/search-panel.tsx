"use client";

import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useMainStore } from "@/lib/store/mainStore";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { parseInput } from "@/lib/helpers/search";
import { Button } from "@/components/ui/button";
import { Loader2, SendHorizontal } from "lucide-react";
import { searchCoords } from "@/lib/helpers/search";
import useSWR from "swr";
import { searchLocationsByName } from "@/lib/actions/search";
import { useMap } from "@/lib/context/mapContext";
import SearchResultCard from "./search-result-card";

export default function SearchPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 750);
  const [showCoordsActions, setShowCoordsActions] = useState(false);
  const map = useMap();

  // Memoize parseInput result for current input
  const parsedInput = useMemo(() => {
    // console.log("parsedInput", input);
    return parseInput(input);
  }, [input]);

  const fetcher = (name: string) => searchLocationsByName(name, 10);

  const {
    searchWindowState,
    setSearchWindowState,
    searchInput,
    setSearchInput,
    searchingCoords,
    setSearchingCoords,
    nameSearchResults,
    setNameSearchResults,
    searchingByName,
    setSearchingByName,
  } = useMainStore();

  const isTextSearch = searchInput.length > 0 && parsedInput.type === "text";

  const {
    data: swrNameSearchResults,
    error: nameSearchError,
    isLoading: nameSearchLoading,
  } = useSWR(isTextSearch ? searchInput : null, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 1000,
  });

  // handle SWR results
  useLayoutEffect(() => {
    console.log("nameSearchLoading", nameSearchLoading);
    console.log("swrNameSearchResults", swrNameSearchResults);
    setSearchingByName(nameSearchLoading);
    if (nameSearchError) {
      console.error(nameSearchError);
    }
    if (swrNameSearchResults) {
      setNameSearchResults(swrNameSearchResults.data);
    }
  }, [swrNameSearchResults, nameSearchLoading, nameSearchError]);

  useClickOutside(
    panelRef,
    () => {
      setSearchWindowState("closed");
    },
    searchWindowState === "open"
  );

  const handleFocus = () => {
    if (searchInput.length > 0) {
      setSearchWindowState("open");
      if (parsedInput.type === "coords") {
        setShowCoordsActions(true);
      } else {
        setShowCoordsActions(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // console.log("parsedInput", parsedInput);
    if (parseInput(e.target.value).type === "coords") {
      // console.log("coords");
      setSearchingByName(false);
      setNameSearchResults([]);
      setShowCoordsActions(true);
    } else if (parseInput(e.target.value).type === "numeric") {
      // console.log("numeric");
      // If it's numeric, don't show coords actions or trigger text search
      setSearchingByName(false);
      setNameSearchResults([]);
      setShowCoordsActions(false);
    } else {
      // console.log("text");
      // Only trigger text search for type 'text'
      setSearchingByName(true);
      setNameSearchResults([]);
      setShowCoordsActions(false);
    }
    if (e.target.value.length > 0) {
      setSearchWindowState("open");
    } else {
      setSearchWindowState("closed");
    }
  };

  // debounce our input and push it to the stored input
  useEffect(() => {
    if (debouncedInput.length > 0) {
      // console.log(debouncedInput);
      setSearchInput(debouncedInput);
    } else {
      setSearchInput("");
    }
  }, [debouncedInput]);

  // if search input is cleared or changed
  useEffect(() => {
    if (searchInput.length === 0) {
      setInput("");
    } else {
      setInput(searchInput);
    }
  }, [searchInput]);

  // Determine panel height based on content and state
  const expandedHeight = useMemo(() => {
    if (parsedInput.type === "coords" || parsedInput.type === "numeric") {
      return "h-[110px]";
    } else if (searchingByName) {
      return "h-[300px]";
    } else if (nameSearchResults.length > 0) {
      return "min-h-[300px]";
    } else {
      return "h-[200px]";
    }
  }, [parsedInput.type, searchingByName, nameSearchResults.length]);

  return (
    <div
      ref={panelRef}
      className={cn(
        "relative overflow-x-hidden overflow-y-hidden w-[400px] bg-background rounded-lg shadow-lg flex flex-col transition-all duration-200 ease-in-out",
        searchWindowState === "open" ? `${expandedHeight} p-2` : "h-[40px] p-0"
      )}
    >
      <div className="flex items-center w-full">
        <Input
          type="text"
          placeholder="Search coordinates or location..."
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          className={cn(
            "w-full transition-all duration-200",
            searchWindowState === "open" ? "rounded-md" : "rounded-lg"
          )}
        />
      </div>
      {/* Expanded Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          searchWindowState === "open"
            ? "opacity-100 translate-y-0 mt-4"
            : "opacity-0 -translate-y-2 pointer-events-none mt-0"
        )}
      >
        {showCoordsActions ? (
          <div className="flex items-center justify-center h-full">
            <Button
              variant="default"
              icon={<SendHorizontal />}
              iconPosition="right"
              className="w-full"
              onClick={() => {
                const [lat, lng] = input
                  .split(",")
                  .map((v) => parseFloat(v.trim()));
                searchCoords(lat, lng);
              }}
            >
              Search near coordinates
            </Button>
          </div>
        ) : parsedInput.type === "numeric" ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : searchingByName ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : nameSearchResults.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No results found
          </div>
        ) : (
          <div className="h-full space-y-1">
            <div className="pointer-events-none absolute z-10 -bottom-2 w-full h-36 bg-gradient-to-t from-background to-transparent" />
            {nameSearchResults.map((result) => (
              <SearchResultCard
                key={result.id}
                inputText={searchInput.toUpperCase()}
                location={result}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
