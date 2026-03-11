# App Shell System

## Purpose

Defines the screen layout: fixed sidebar, map canvas region, and bottom history strip.

## Key Files

- `app/page.tsx`
- `app/layout.tsx`
- `lib/providers.js`

## Behavior Summary

- Left sidebar is fixed at `300px` width.
- Main map fills remaining viewport above history strip.
- History panel anchors to bottom and expands/collapses.
- Global wrappers provide theme, modal support, map context, and toasts.

## Dependencies

- `MapProvider` (`lib/context/mapContext.js`)
- `ThemeProvider`
- `ModalProvider` (pushmodal registry)
- `sonner` toast UI

## Notes

- `ThemeProvider` appears in both `app/layout.tsx` and `lib/providers.js` import set, but only the layout-level provider is currently used.
- Header/Footer components exist but are commented out in layout.
