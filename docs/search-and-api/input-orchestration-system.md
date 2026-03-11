# Input Orchestration System

## Purpose

Classifies raw input and coordinates downstream behavior for search UI and history.

## Key Files

- `lib/helpers/search.ts`
- `lib/helpers/validation.ts`
- `app/components/search-panel/search-panel.tsx`

## Classification Rules

- `coords`: strict decimal regex match for `lat,lng`.
- `numeric`: digits/punctuation only (partial coordinates).
- `text`: everything else.

## Coordinate Search Orchestration

- `searchCoords(lat, lng, addHistory=true)`:
  - clears existing coord results,
  - closes search window,
  - toggles loading state,
  - calls `/api/v2/search/coords`,
  - writes results/error to main store,
  - appends history entry when enabled.

## Notes

- `parseInput` uses a broad bounds check (38..42, -79..-71), while v2 API enforces a stricter box.
- Invalid API JSON responses are treated as empty/no-results with safe fallback messaging.
