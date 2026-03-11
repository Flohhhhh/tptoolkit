# TP Toolkit

TP Toolkit is a Next.js web app for quickly resolving locations on the Garden State Parkway and New Jersey Turnpike.

It supports reverse geocoding by coordinates, location-name search, map-based lookup, and operator-friendly result/details/history views.

## What The App Does

- Finds nearby locations from latitude/longitude input.
- Searches TP locations by name with live results.
- Lets users double-click the map to search by clicked point.
- Tracks recent searches and allows replay.
- Displays detailed roadway/location metadata for selected results.
- Includes a quick service-area reference table with map jump support.

## Core User Flow

1. User enters coordinates or text in the search panel.
2. Input is classified as `coords`, `numeric`, or `text`.
3. Coordinate searches call `GET /api/v2/search/coords` and populate sidebar results.
4. Text searches call Supabase RPC via server action and show searchable suggestions.
5. Selecting a result updates map markers, details, and history.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript + JavaScript mixed codebase
- Tailwind CSS + shadcn/ui + Radix UI
- Zustand (client state)
- SWR (name-search fetch lifecycle)
- Mapbox GL JS (interactive map + static history snippets)
- Supabase (`locations_old` + RPC functions)

## Project Structure

- `app/page.tsx`: main UI layout (sidebar + map + history panel)
- `app/components/`: UI features (search, map, sidebar, history, dialogs)
- `app/api/v2/search/`: API routes for coordinate/name search
- `lib/actions/search.tsx`: Supabase RPC wrappers
- `lib/helpers/search.ts`: input parsing + coordinate search orchestration
- `lib/context/mapContext.js`: shared map instance/markers behavior
- `lib/store/`: Zustand stores for UI and history state
- `types/supabase.ts`: generated Supabase types

## Required Environment Variables

Create a local `.env` file with:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_MAPBOX_API_TOKEN=...
```

## Supabase Requirements

This app expects a Supabase table and RPC functions already provisioned:

- Table: `public.locations_old`
- RPC: `get_nearest_locations_old(p_lng, p_lat, p_max_distance, p_result_limit)`
- RPC: `get_locations_by_name_old(p_search_text, p_result_limit)`

## Local Development

Prerequisites:

- Node.js `22.x` (see `package.json` engines)
- npm

Run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build And Run Production

```bash
npm run build
npm run start
```

## API Endpoints

- `GET /api/v2/search/coords?x=<lng>&y=<lat>`
- `GET /api/v2/search/name?input=<text>`

Legacy routes still present in the repo:

- `/api/search/coords`
- `/api/search/text`
- `/api/get-locations` (returns `"This endpoint not in use."`)

## Geographic Constraints

The active coordinate endpoint enforces a New Jersey roadway bounding box before searching:

- Longitude: `-75.64` to `-73.84`
- Latitude: `38.91` to `41.36`

Coordinate search currently requests up to 10 nearest results within 300 meters.

## Notes

- This is an unofficial utility; results should be verified with official tools.
- If Mapbox or Supabase environment values are missing, map/search features will fail.
