import { toast } from "sonner";

export const CopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Dispatch a custom event after copying
  toast.success("Copied to clipboard");
  window.dispatchEvent(new CustomEvent("clipboardCopy"));
};
