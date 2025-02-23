export const CopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Dispatch a custom event after copying
  window.dispatchEvent(new CustomEvent("clipboardCopy"));
};
