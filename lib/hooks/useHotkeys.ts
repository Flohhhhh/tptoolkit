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

export const useHotkeys = (
  key: string,
  callback: HotkeyCallback,
  requireCtrl = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!requireCtrl || (requireCtrl && event.ctrlKey)) &&
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
