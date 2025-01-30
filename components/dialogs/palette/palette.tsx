"use client";

import { DialogContent } from "@/components/ui/dialog";
import PaletteModal from "@/app/components/Modals/Palette/PaletteModal";

export default function PaletteDialog() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <PaletteModal />
    </DialogContent>
  );
}
