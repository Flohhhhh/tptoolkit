"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useMap } from "@/app/context/mapContext";

// @ts-ignore
export const SearchContext = createContext();

export const useSearch = () => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return searchContext;
};

export const SearchProvider = ({ children }) => {
  const { updateCoordsMarker, updateSelected, flyTo } = useMap();
  const [history, setHistory] = useState([]);
  const [enteredCoords, setEnteredCoords] = useState("");
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const searchCoords = async (x, y) => {
    setSearching(true);

    if (!!y && !!x) {
      // console.log("Updating marker")
      updateCoordsMarker(y, x);
      flyTo(y, x);
    }

    // console.log("Searching near", enteredCoords);

    const res = await fetch(`/api/search/coords?y=${y}&x=${x}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      // console.log(data);
      updateSelected();
      // copyToClipboard(data[0]);
      setResults(data);
      setSearching(false);
    } else {
      setResults(null);
      setSearchError(data);
      setSearching(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        enteredCoords,
        setEnteredCoords,
        searchCoords,
        results,
        searching,
        history,
        setHistory,
        searchError,
        setSearchError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
