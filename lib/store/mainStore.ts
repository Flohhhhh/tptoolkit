import { create } from "zustand";

interface MainState {
  searchInput: string;
  setSearchInput: (input: string) => void;
  searching: boolean;
  setSearching: (searching: boolean) => void;
  searchError: string | null;
  setSearchError: (error: string | null) => void;
  searchResults: TPLocation[];
  setSearchResults: (results: TPLocation[]) => void;
  history: HistoryItem[];
  clearHistory: () => void;
  addHistoryItem: (item: HistoryItem) => void;
}

export const useMainStore = create<MainState>((set) => ({
  searchInput: "",
  setSearchInput: (input) => set({ searchInput: input }),
  searching: false,
  setSearching: (searching) => set({ searching }),
  searchError: null,
  setSearchError: (error) => set({ searchError: error }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  history: [],
  clearHistory: () => set({ history: [] }),
  addHistoryItem: (item) =>
    set((state) => ({ history: [...state.history, item] })),
}));
