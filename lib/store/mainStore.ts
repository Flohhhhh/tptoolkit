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
  clearCoordsResults: () => void;
  nameSearchResults: TPLocation[];
  setNameSearchResults: (results: TPLocation[]) => void;
  searchingByName: boolean;
  setSearchingByName: (searching: boolean) => void;
  historyPanelOpen: boolean;
  setHistoryPanelOpen: (open: boolean) => void;
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
  clearCoordsResults: () => set({ coordsResults: [] }),
  nameSearchResults: [],
  setNameSearchResults: (results) => set({ nameSearchResults: results }),
  searchingByName: false,
  setSearchingByName: (searching) => set({ searchingByName: searching }),
  historyPanelOpen: false,
  setHistoryPanelOpen: (open) => set({ historyPanelOpen: open }),
}));
