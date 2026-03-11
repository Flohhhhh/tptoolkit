# Name Search System

## Purpose

Find locations by text match against Supabase-backed location data.

## Key Files

- `app/api/v2/search/name/route.ts`
- `lib/actions/search.tsx` (`searchLocationsByName`)
- `app/components/search-panel/search-panel.tsx`

## Request Contract

- Endpoint: `GET /api/v2/search/name?input=<text>`
- Missing `input` returns `400`.

## Data Source

- Supabase RPC: `get_locations_by_name_old(p_search_text, p_result_limit)`.

## Current UI Execution Path

- Search panel uses SWR and directly calls server action `searchLocationsByName`.
- API route remains available and returns JSON payload/error envelope.

## Response Behavior

- Successful response contains array of location rows.
- RPC errors are surfaced as `500` with error message.
