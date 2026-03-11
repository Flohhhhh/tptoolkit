# History Panel System

## Purpose

Tracks recent searches and provides one-click replay from collapsed and expanded history views.

## Key Files

- `app/components/history-panel/history-panel.tsx`
- `app/components/history-panel/history-card-small.tsx`
- `app/components/history-panel/history-card-large.tsx`
- `app/components/history-panel/map-snip.tsx`
- `lib/store/historyStore.ts`

## Behavior Summary

- Collapsed mode shows up to 6 recent cards.
- Expanded mode shows a grid of full cards with static map previews.
- Clicking any history card:
  - clears current coord results,
  - updates map marker,
  - reruns `searchCoords` with `addHistory=false`.
- "Clear History" empties the Zustand history store.

## Data Model

- History item fields:
  - `id`, `inputContent`, `resultText`, `lat`, `lng`, `timestamp`.

## Notes

- Relative timestamp updates run every 4 seconds in both card variants.
- Map previews use Mapbox Static Images API via public token.
