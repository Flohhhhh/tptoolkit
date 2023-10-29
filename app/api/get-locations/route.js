import { supabase } from "@/utils/supabase/client";

export async function GET(request) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const in_lat = searchParams.get("lat");
  const in_lng = searchParams.get("lng");
  console.log("in_lat", in_lat);
  console.log("in_lng", in_lng);

  const in_radius_miles = 2;
  const in_limit = 4;

  if (!in_lat || !in_lng) {
    return new Response("Missing lat or lng", { status: 400 });
  }

  const { data, error } = await supabase.rpc("get_nearby_locations", {
    in_lat,
    in_lng,
    in_radius_miles,
    in_limit,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!data) {
    return new Response("No data found", { status: 404 });
  }

  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}
