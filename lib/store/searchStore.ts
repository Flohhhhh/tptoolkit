import { create } from "zustand";

interface SearchState {
  enteredCoords: string;
  results: TPLocation[] | null;
  searching: boolean;
  searchError: string | null;
  currentCoords: { lat: number | null; lng: number | null };
  setEnteredCoords: (coords: string) => void;
  setSearchError: (error: string | null) => void;
  searchCoords: (x: number, y: number) => Promise<void>;
  updateCoordsMarker: (lat: number, lng: number) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  enteredCoords: "",
  results: null,
  searching: false,
  searchError: null,
  currentCoords: { lat: null, lng: null },

  setEnteredCoords: (coords) => set({ enteredCoords: coords }),

  clearResults: () => set({ results: null, searchError: null }),

  setSearchError: (error) => set({ searchError: error, searching: false }),

  updateCoordsMarker: (lat, lng) => {
    set({ currentCoords: { lat, lng } });
  },

  searchCoords: async (x, y) => {
    console.log("[lib/store/searchStore] searchCoords", x, y);
    set({ searching: true, searchError: null });
    set({ currentCoords: { lat: y, lng: x } });

    try {
      const res = await fetch(`/api/v2/search/coords?x=${x}&y=${y}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data);
      }

      set({ results: data, searching: false });
    } catch (error) {
      console.error("[lib/store/searchStore] searchCoords error", error);
      set({
        results: null,
        searchError:
          error instanceof Error ? error.message : "An error occurred",
        searching: false,
      });
    }
  },
}));
