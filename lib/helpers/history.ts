import { useHistoryStore } from "@/lib/store/historyStore";

export const addHistoryItem = (item: HistoryItem) => {
  console.log("Adding history item", item);
  const { addHistoryItem } = useHistoryStore.getState();
  addHistoryItem(item);
};

export const clearHistory = () => {
  const { clearHistory } = useHistoryStore.getState();
  clearHistory();
};
