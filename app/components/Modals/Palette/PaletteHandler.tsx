"use client";

import { replaceWithModal } from "@/components/dialogs";
import { useHotkeys } from "@/lib/hooks/useHotkeys";

export default function PaletteHandler() {
  useHotkeys("k", () => replaceWithModal("PaletteDialog", { foo: "bar" }));
  return null;
}
