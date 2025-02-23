// hooks/useHotkeys.ts
import { useEffect } from "react";

type HotkeyCallback = (event: KeyboardEvent) => void;

export const useHotkeys = (
  key: string,
  callback: HotkeyCallback,
  requireCtrl: boolean = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!requireCtrl || (requireCtrl && event.ctrlKey))
      ) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback, requireCtrl]);
};
