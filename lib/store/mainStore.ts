import { create } from "zustand";

interface MainState {
  searchWindowState: "open" | "closed" | "clipboard";
  setSearchWindowState: (state: "open" | "closed" | "clipboard") => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
  searchingCoords: boolean;
  setSearchingCoords: (searching: boolean) => void;
  searchError: string | null;
  setSearchError: (error: string | null) => void;
  coordsResults: TPLocation[];
  setCoordsResults: (results: TPLocation[]) => void;
  nameSearchResults: TPLocation[];
  setNameSearchResults: (results: TPLocation[]) => void;
  searchingByName: boolean;
  setSearchingByName: (searching: boolean) => void;
  // history: HistoryItem[];
  // clearHistory: () => void;
  // addHistoryItem: (item: HistoryItem) => void;
}

export const useMainStore = create<MainState>((set) => ({
  searchWindowState: "closed",
  setSearchWindowState: (state) => set({ searchWindowState: state }),
  searchInput: "",
  setSearchInput: (input) => set({ searchInput: input }),
  searchingCoords: false,
  setSearchingCoords: (searching) => set({ searchingCoords: searching }),
  searchError: null,
  setSearchError: (error) => set({ searchError: error }),
  coordsResults: [],
  setCoordsResults: (results) => set({ coordsResults: results }),
  nameSearchResults: [],
  setNameSearchResults: (results) => set({ nameSearchResults: results }),
  searchingByName: false,
  setSearchingByName: (searching) => set({ searchingByName: searching }),
  // history: [],
  // clearHistory: () => set({ history: [] }),
  // addHistoryItem: (item) =>
  //   set((state) => ({ history: [...state.history, item] })),
}));
