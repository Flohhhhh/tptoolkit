# Types And Helpers System

## Purpose

Define shared domain types and utility functions used across UI, search, and map systems.

## Key Files

- `types/global.d.ts`
- `types/supabase.ts`
- `lib/helpers/conversions.ts`
- `lib/helpers/validation.ts`
- `lib/helpers/history.ts`
- `lib/hooks/useClickOutside.ts`
- `lib/hooks/useHotkeys.ts`

## Key Contracts

- `TPLocation`: Supabase `locations_old` row + optional `distance`.
- `HistoryItem`: replay model with coordinates + timestamp.

## Utility Coverage

- Distance/unit formatting (`parseMetersToString`).
- Direction display mapping (`N` -> `NB`, etc).
- Relative timestamp formatting.
- Coordinate format validation regex.
- Generic UI hooks for click-outside and hotkey handling.

## Notes

- `types/supabase.ts` also includes broader database objects not currently used by TP Toolkit UI.
- Some helper modules are transitional wrappers around store methods.
