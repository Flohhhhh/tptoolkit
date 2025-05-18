import { Tables } from "./supabase";

export {};

declare global {
  type TPLocation = Tables<"locations_old"> & { distance?: number };
  type HistoryItem = {
    id: string;
    inputContent: string;
    results: TPLocation[];
    timestamp: number;
  };
}
