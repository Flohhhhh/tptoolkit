import { data } from "@/public/locationData.js";

export async function GET(request) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const query = searchParams.get("query");

  // if no query is provided
  if (!query) {
    return new Response(JSON.stringify("Please enter a query."), {
      status: 400,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // remove @ from the query
  const cleanedQuery = query.replace("@", "");

  // find the entry in data where common name matches the query
  let result = data.find((entry) => entry.commonName === cleanedQuery);

  if (!result) {
    result = await data.find((entry) => entry.name === cleanedQuery);
  }

  if (!result) {
    return new Response(JSON.stringify("No results found."), {
      status: 404,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
