# Search Panel System

## Purpose

Collects user input and routes it into coordinate search or name search flows.

## Key Files

- `app/components/search-panel/search-panel.tsx`
- `app/components/search-panel/search-result-card.tsx`
- `app/components/search-panel/magic-button.tsx`
- `lib/helpers/search.ts`
- `lib/hooks/useDebounce.ts`

## Behavior Summary

- Input is debounced (750ms) before being written to global `searchInput`.
- Input classification:
  - `coords`: valid `lat,lng` format; shows "Search near coordinates" action.
  - `numeric`: partial numeric input; suppresses name fetch.
  - `text`: triggers SWR-backed name search.
- Name search uses SWR fetcher that calls server action `searchLocationsByName`.
- Selecting a name result updates map coordinates and appends history.
- "Paste & Go" reads clipboard text and attempts immediate coord search.

## State Dependencies

- Uses `useMainStore` for input/results/loading/window state.
- Uses `useMap` for coordinate marker updates.
- Uses `useHistoryStore` for replay history writes.

## Notes

- Name search currently bypasses `/api/v2/search/name` and calls the server action directly.
- Numeric-in-progress input shows loader UI intentionally to avoid premature text matching.
