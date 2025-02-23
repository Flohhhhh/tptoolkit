// hooks/useHotkeys.ts
import { useEffect } from "react";

type HotkeyCallback = (event: KeyboardEvent) => void;

type InputElement = HTMLInputElement | HTMLTextAreaElement;

const isInputElement = (element: HTMLElement): boolean => {
  return (
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.isContentEditable
  );
};

const isMac =
  typeof window !== "undefined" &&
  navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const useHotkeys = (
  key: string,
  callback: HotkeyCallback,
  requireCtrl = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const hasModifier = isMac ? event.metaKey : event.ctrlKey;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!requireCtrl || (requireCtrl && hasModifier)) &&
        !isInputElement(target)
      ) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, requireCtrl]);
};
