# UI Domain Overview

The UI domain owns the interactive operator experience: search entry, map controls, results/details navigation, and history replay.

## Core Responsibilities

- Compose screen layout and panel regions.
- Handle interaction states (open/closed panels, selected items, loading states).
- Present search results and location metadata.
- Provide reference utilities (service area modal, clipboard actions, disclaimer toast).

## Entry Points

- `app/page.tsx`: Main viewport composition.
- `app/layout.tsx`: Root wrappers, theme, toast, analytics, providers.
- `app/components/**`: Feature UI components.

## Systems In This Domain

- `app-shell-system.md`
- `search-panel-system.md`
- `results-and-details-system.md`
- `history-panel-system.md`
- `modal-and-reference-system.md`
