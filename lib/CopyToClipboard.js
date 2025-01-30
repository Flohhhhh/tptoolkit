import { toast } from "sonner";
import { ClipboardCheck } from "lucide-react";

export const CopyToClipboard = (text) => {
  console.log(text.toUpperCase());
  navigator.clipboard.writeText(text.toUpperCase());
  toast.success("Copied to clipboard", {
    description: text.toUpperCase(),
  });
};
