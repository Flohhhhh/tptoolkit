import { Tables } from "./supabase";

export {};

declare global {
  type Location = Tables<"locations_old">;
}
