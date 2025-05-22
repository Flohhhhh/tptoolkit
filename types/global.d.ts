import { Tables } from "./supabase";

export {};

declare global {
  type TPLocation = Tables<"locations_old"> & { distance?: number };
  type HistoryItem = {
    id: string;
    inputContent: string;
    resultText: string;
    lat: number;
    lng: number;
    timestamp: number;
  };
}
