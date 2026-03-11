# Search And API Domain Overview

This domain handles input classification, coordinate/name lookup execution, and API surface area.

## Core Responsibilities

- Parse and validate search input.
- Execute coordinate searches against v2 API.
- Execute name searches via Supabase RPC wrapper.
- Enforce geographic bounds and request constraints.
- Maintain legacy routes for compatibility/testing.

## Entry Points

- `lib/helpers/search.ts`
- `app/api/v2/search/coords/route.ts`
- `app/api/v2/search/name/route.ts`
- `lib/actions/search.tsx`

## Systems In This Domain

- `input-orchestration-system.md`
- `coordinate-search-system.md`
- `name-search-system.md`
- `legacy-routes-system.md`
