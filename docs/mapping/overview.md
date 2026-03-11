# Mapping Domain Overview

The mapping domain owns Mapbox lifecycle, map style/theme handling, and marker coordination across UI features.

## Core Responsibilities

- Initialize and dispose the Mapbox map instance.
- Handle style switching (street/satellite) and theme presets.
- Manage coordinate, selected, and temporary marker behavior.
- Support map-driven workflows (double-click search, fly-to from reference/history).

## Entry Points

- `app/components/Map/MapRenderer.jsx`
- `app/components/Map/MapLayerSwitcher.tsx`
- `lib/context/mapContext.js`

## Systems In This Domain

- `map-renderer-system.md`
- `map-context-system.md`
