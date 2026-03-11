# Map Context System

## Purpose

Provides shared map instance access and centralized marker/selection behaviors across components.

## Key Files

- `lib/context/mapContext.js`
- Consumers:
  - sidebar result cards
  - search result cards
  - service area dialog
  - history cards

## Provided Capabilities

- `setMap(map)`: register active map instance.
- `flyTo(lat, lng)`: animate camera to coordinate.
- `handleCoordinateUpdate(lat, lng)`: create/replace coordinate marker and fly.
- `updateSelected(item)`: manage selected location marker and selection state.
- `history` local list for selected item names.

## Marker Types

- Coordinate marker: default marker for active query/replay/reference jump.
- Selected marker: red marker tied to selected location in results/details flow.

## Notes

- `handleCoordinateUpdate(null, null)` is used to clear coordinate marker.
- Current implementation checks `!lat || !lng` in some paths, which can reject zero values.
