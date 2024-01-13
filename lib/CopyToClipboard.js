import toast from "react-hot-toast";
import { Toast } from "@/app/components/Toast"

export const CopyToClipboard = (text) => {
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
    toast.custom((t) => (
      <Toast text={text} visible={t.visible}/>
    ), {duration: 99999});
  };