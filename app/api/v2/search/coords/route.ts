import { NextResponse } from "next/server";
import { getNearestLocations } from "@/lib/actions/search";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const in_x = searchParams.get("x");
  const in_y = searchParams.get("y");
  const max = 12;
  const maxDistance = 1000; //max distance in meters

  // console.log("in_x", in_x);
  // console.log("in_y", in_y);

  // if either coordinate is not provided or not a number
  if (!in_x || !in_y || isNaN(Number(in_x)) || isNaN(Number(in_y))) {
    return new Response(
      JSON.stringify("Please enter a valid x and y coordinate."),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // if the coordinates are not within the bounds
  if (
    Number(in_x) < -75.64 ||
    Number(in_x) > -73.84 ||
    Number(in_y) < 38.91 ||
    Number(in_y) > 41.36
  ) {
    return new Response(
      JSON.stringify("Entered coordinates are outside of range."),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const { data, error } = await getNearestLocations(
    Number(in_x),
    Number(in_y),
    max,
    maxDistance
  );

  if (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (!data) {
    return new Response(JSON.stringify("No data found"), {
      status: 404,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
