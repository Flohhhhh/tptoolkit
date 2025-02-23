"use client";

import { DialogContent } from "@/components/ui/dialog";
import PaletteModal from "@/app/components/Modals/Palette/PaletteModal";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function PaletteDialog() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      {/* <PaletteModal /> */}
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem></CommandItem>
        </CommandList>
      </Command>
    </DialogContent>
  );
}
