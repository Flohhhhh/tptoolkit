"use server";

import { createClient } from "../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export const getNearestLocations = async (
  x: number, // Longitude
  y: number, // Latitude
  limit: number = 10,
  maxDistance: number = 1000 // in meters
): Promise<{
  data: Location[] | null;
  error: PostgrestError | Error | null;
}> => {
  console.log(
    `[lib/actions/search/getNearestLocations(${x}, ${y}, ${limit}, ${maxDistance})]`
  );
  // Initialize the Supabase client
  const supabase = await createClient();

  // Call the get_nearest_locations_old function via RPC
  const { data, error } = await supabase.rpc("get_nearest_locations_old", {
    p_lng: x,
    p_lat: y,
    p_max_distance: maxDistance,
    p_result_limit: limit,
  });

  // Handle any errors
  if (error) {
    console.error("Error fetching nearest locations:", error);
    return { data: null, error: error };
  }

  if (!data || data.length === 0) {
    console.error("No data found");
    return { data: null, error: new Error("No data found") };
  }

  console.log(`[lib/actions/search/getNearestLocations()] data`, data);

  // Return the data retrieved from the function
  return { data, error: null };
};
