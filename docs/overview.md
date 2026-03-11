# TP Toolkit Documentation Overview

This folder contains lightweight architecture and system docs for the current TP Toolkit codebase.

## Domain Map

- `ui/`: App shell and operator-facing interface behavior.
- `search-and-api/`: Input parsing, request orchestration, and API routes.
- `mapping/`: Mapbox rendering and map marker/state coordination.
- `data-and-integrations/`: Supabase integration, client state, types, and shared helpers.

## Primary Request Flow

1. User enters input (or uses map double-click / Paste & Go).
2. Input is classified as coordinate, numeric-in-progress, or text.
3. Coordinate flow calls `GET /api/v2/search/coords`.
4. Name flow uses SWR + server action (`searchLocationsByName`) against Supabase RPC.
5. Results update global client state and map markers.
6. Search history records searchable/replayable events.

## Key Runtime Dependencies

- Next.js 14 App Router
- React 18
- Zustand for UI/search/history state
- Mapbox GL JS for map and marker interactions
- Supabase RPC for location lookup
- shadcn/ui + Radix + Tailwind for UI primitives

## Start Here

- Product/UI behavior: `ui/overview.md`
- Search pipeline and endpoints: `search-and-api/overview.md`
- Map behavior and marker lifecycle: `mapping/overview.md`
- Data sources and shared state/types: `data-and-integrations/overview.md`
