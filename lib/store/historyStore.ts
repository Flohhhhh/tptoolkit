import { create } from "zustand";

interface HistoryState {
  history: HistoryItem[];
  addHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  addHistoryItem: (item) =>
    set((state) => ({ history: [...state.history, item] })),
  clearHistory: () => set({ history: [] }),
}));
