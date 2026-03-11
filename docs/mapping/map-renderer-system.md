# Map Renderer System

## Purpose

Bootstraps the Mapbox map instance and wires map events to search flows.

## Key Files

- `app/components/Map/MapRenderer.jsx`
- `app/components/Map/MapLayerSwitcher.tsx`

## Behavior Summary

- Creates map with globe projection and custom base style.
- Applies theme-aware light preset (`day`/`night`) for non-satellite style.
- Exposes style switcher between `streets` and `satellite`.
- Adds navigation and scale controls.
- On map double-click:
  - reads clicked coordinates,
  - triggers coordinate search,
  - updates coordinate marker.
- On context menu (right click), copies clicked coordinates to clipboard.

## External Requirements

- `NEXT_PUBLIC_MAPBOX_API_TOKEN` must be set.

## Notes

- Map default center/zoom targets NJ corridor.
- Component stores local `mapNode` ref and registers handlers with cleanup on unmount.
