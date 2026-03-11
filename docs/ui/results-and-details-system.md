# Results And Details System

## Purpose

Displays nearby coordinate matches and detailed metadata for a selected location.

## Key Files

- `app/components/sidebar/sidebar.tsx`
- `app/components/sidebar/location-card.tsx`
- `app/components/sidebar/details-panel.tsx`
- `lib/helpers/conversions.ts`

## Behavior Summary

- Sidebar tabs:
  - `Results`: coordinate result list and clear action.
  - `Details`: field-based view of selected location.
- Clicking a result card selects it and updates the selected map marker.
- Clicking selected card again opens details tab.
- Details view formats and filters fields through `FIELD_CONFIG`.
- Coordinates can be copied; external links open Google Maps / what3words.

## Data Inputs

- `coordsResults` from `useMainStore`.
- `selectedLocation` from `useMainStore`.
- Marker updates via `useMap().updateSelected`.

## Notes

- UI includes an explicit caution that results are approximate and should be verified.
- Distance rendering uses meter-to-feet/miles conversion helper.
