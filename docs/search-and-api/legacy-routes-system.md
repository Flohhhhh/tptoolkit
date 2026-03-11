# Legacy Routes System

## Purpose

Preserves older search endpoints and local-data lookup patterns that predate v2 Supabase-backed flow.

## Key Files

- `app/api/search/coords/route.js`
- `app/api/search/text/route.js`
- `app/api/get-locations/route.js`
- `public/locationData.js`

## Behavior Summary

- `/api/search/coords`:
  - searches static `public/locationData.js`,
  - uses haversine distance in miles,
  - returns up to 12 results within `0.2` miles.
- `/api/search/text`:
  - searches static data for first matching location by `commonName`/`name`.
- `/api/get-locations`:
  - currently returns `"This endpoint not in use."`.

## Notes

- v2 routes are the active path for coordinate and name search.
- Legacy routes still compile and may be useful for fallback or migration reference.
