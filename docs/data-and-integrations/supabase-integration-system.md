# Supabase Integration System

## Purpose

Provide server-side and browser-side Supabase clients and RPC wrappers for location lookup.

## Key Files

- `lib/supabase/server.js`
- `lib/supabase/client.js`
- `lib/actions/search.tsx`

## Active RPCs

- `get_nearest_locations_old(p_lng, p_lat, p_max_distance, p_result_limit)`
- `get_locations_by_name_old(p_search_text, p_result_limit)`

## Runtime Requirements

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Behavior Summary

- Server client is cookie-aware (`@supabase/ssr` + `next/headers` cookies).
- Search actions return `{ data, error }` envelope for API/UI callers.
- Coordinate search action returns explicit `"No data found"` error when result is empty.

## Notes

- Primary location source is `public.locations_old`.
- Generated type definitions live in `types/supabase.ts`.
