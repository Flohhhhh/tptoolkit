import toast from "react-hot-toast";
import { ClipboardCheck } from 'lucide-react'

export const CopyToClipboard = (text) => {
    console.log(text.toUpperCase());
    navigator.clipboard.writeText(text.toUpperCase());
    toast.custom((t) => (
      <div
        className={`flex gap-4 bg-white dark:bg-shark-700 text-shark-800 dark:text-shark-100 px-6 py-2 rounded-xl border border-shark-300 dark:border-shark-600 shadow-lg ${
          t.visible ? 'animate-enter' : 'animate-leave'
        }`}
      >
        <ClipboardCheck size={20} className="text-emerald-500 animate-pulse"/>
        <p>Copied {text.toUpperCase()}</p>
      </div>
    ));
  };