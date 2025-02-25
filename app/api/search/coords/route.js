import { data } from "@/public/locationData.js";

export async function GET(request) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const in_x = searchParams.get("x");
  const in_y = searchParams.get("y");
  const max = 12;
  const maxDistance = 0.2; //max distance in miles

  // console.log("in_x", in_x);
  // console.log("in_y", in_y);

  // if either coordinate is not provided or not a number
  if (!in_x || !in_y || isNaN(in_x) || isNaN(in_y)) {
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
  if (in_x < -75.64 || in_x > -73.84 || in_y < 38.91 || in_y > 41.36) {
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

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // function to calculate distance between two sets of coordinates in feet
  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth's radius in miles

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance; //miles
  }

  // x greater than -75.64 less than -73.84
  // y greater than 38.91 less than 41.36

  // function to find the 12 closest locations to a given point at max distance
  function findClosest(x, y) {
    let closest = [];
    for (let i = 0; i < data.length; i++) {
      let dist = haversineDistance(x, y, data[i].x, data[i].y);

      if (dist < maxDistance) {
        // add the location to the array if it is within the max distance and add distance to the object
        let obj = data[i];
        obj.distance = dist;
        closest.push(obj);
      }
    }
    // order the array by distance
    closest.sort((a, b) => {
      return a.distance - b.distance;
    });

    return closest.slice(0, max);
  }

  return new Response(JSON.stringify(findClosest(in_x, in_y)), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
