"use client";

// path: src/modals/dynamic.tsx
import { createResponsiveWrapper } from "pushmodal";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // shadcn dialog
import { Drawer, DrawerContent } from "@/components/ui/drawer"; // shadcn drawer

export default createResponsiveWrapper({
  desktop: {
    Wrapper: Dialog,
    Content: DialogContent,
  },
  mobile: {
    Wrapper: Drawer,
    Content: DrawerContent,
  },
  breakpoint: 640,
});
