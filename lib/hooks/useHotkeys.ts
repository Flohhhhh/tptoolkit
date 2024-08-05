// hooks/useHotkeys.ts
import { useEffect } from "react";

type HotkeyCallback = (event: KeyboardEvent) => void;

export const useHotkeys = (key: string, callback: HotkeyCallback) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
};
