# State Management System

## Purpose

Maintain app-wide UI/search/selection state and replay history using Zustand stores.

## Key Files

- `lib/store/mainStore.ts`
- `lib/store/historyStore.ts`

## Main Store Responsibilities

- Search panel state (`searchWindowState`, `searchInput`).
- Sidebar state (`sidebarTab`, `selectedLocation`).
- Search lifecycle (`searchingCoords`, `searchingByName`, `searchError`).
- Search payloads (`coordsResults`, `nameSearchResults`).
- History panel visibility (`historyPanelOpen`).

## History Store Responsibilities

- Append-only in-memory search history list.
- Clear history action.

## Notes

- Stores are purely client-side; there is no persistence layer for history yet.
- Helper wrappers for history also exist in `lib/helpers/history.ts`.
