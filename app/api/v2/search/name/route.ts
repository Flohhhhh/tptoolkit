import { searchLocationsByName } from "@/lib/actions/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("input");

  if (!name) {
    return NextResponse.json(
      { error: "Search input is required" },
      { status: 400 }
    );
  }

  const { data, error } = await searchLocationsByName(name);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
