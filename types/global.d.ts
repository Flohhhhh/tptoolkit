import { Tables } from "./supabase";

export {};

declare global {
  type TPLocation = Tables<"locations_old">;
}
