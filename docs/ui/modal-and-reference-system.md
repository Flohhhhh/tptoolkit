# Modal And Reference System

## Purpose

Provides the service-area reference lookup modal and responsive dialog/drawer container behavior.

## Key Files

- `components/dialogs/index.tsx`
- `components/dialogs/responsive.tsx`
- `components/dialogs/service-area-reference/service-areas-dialog.tsx`
- `app/components/ServiceAreaReference/ServiceAreas.tsx`
- `app/components/sidebar/service-area-button.tsx`

## Behavior Summary

- Modal registry is built with `pushmodal`.
- `ServiceAreasReference` opens as:
  - dialog on desktop,
  - drawer on mobile (`breakpoint: 640`).
- Service area rows are static data-driven.
- Clicking a row updates coordinate marker, flies the map, and closes modal.

## Related UX Utilities

- `app/components/disclaimer-toast.tsx`: persistent disclaimer until accepted.
- `app/components/sidebar/settings-menu.tsx`: theme selector.

## Notes

- Legacy modal implementation still exists at `app/components/Modals/Modal.tsx` but is not the primary modal path.
