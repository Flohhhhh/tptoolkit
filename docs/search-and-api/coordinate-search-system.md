# Coordinate Search System

## Purpose

Resolve nearest TP/GSP locations for a given coordinate pair.

## Key Files

- `app/api/v2/search/coords/route.ts`
- `lib/actions/search.tsx` (`getNearestLocations`)

## Request Contract

- Endpoint: `GET /api/v2/search/coords?x=<lng>&y=<lat>`
- Required query params: `x`, `y` (numeric).
- Fixed query params in route:
  - `max=10` results
  - `maxDistance=300` meters

## Validation And Constraints

- Rejects non-numeric or missing coordinates with `400`.
- Rejects outside bounds with `400`:
  - longitude: `-75.64` to `-73.84`
  - latitude: `38.91` to `41.36`

## Data Source

- Supabase RPC: `get_nearest_locations_old(p_lng, p_lat, p_max_distance, p_result_limit)`.

## Response Behavior

- `200`: JSON array of matching locations.
- `404`: no data found.
- `500`: RPC/internal error message.
