# Data And Integrations Domain Overview

This domain covers external data dependencies and shared application data contracts/state.

## Core Responsibilities

- Manage Supabase connectivity and RPC calls.
- Define and distribute shared type contracts.
- Manage global client state (search, selection, history panel).
- Provide shared formatting/helper utilities.

## Entry Points

- `lib/supabase/*`
- `lib/actions/search.tsx`
- `lib/store/*`
- `types/*`
- `lib/helpers/*`

## Systems In This Domain

- `supabase-integration-system.md`
- `state-management-system.md`
- `types-and-helpers-system.md`
