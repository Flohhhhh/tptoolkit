import { supabase } from "@/utils/supabase/client";

export async function GET(request) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const in_lat = searchParams.get("lat");
  const in_lng = searchParams.get("lng");
  console.log("in_lat", in_lat);
  console.log("in_lng", in_lng);

  const in_radius_miles = 2;
  const in_limit = 5;

  if (!in_lat || !in_lng) {
    return new Response("Missing lat or lng", { status: 400 });
  }

  const { data, error } = await supabase.rpc("get_nearby_locations", {
    in_lat,
    in_lng,
    in_radius_miles,
    in_limit,
  });

  console.log(data);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!data) {
    return new Response("No data", { status: 404 });
  }

  if (!data.length) {
    return new Response(
      "No matching locations found, provided point is more than 2 miles from any location.",
      {
        status: 200,
        statusText: "No matches found",
      }
    );
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
