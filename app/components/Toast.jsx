import { ClipboardCheck } from "lucide-react";

export const Toast = (props) => {
  const { text, visible } = props;

  return (
    <div
      className={`flex gap-4 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 px-6 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 shadow-lg ${
        visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <ClipboardCheck size={20} className="text-emerald-500 animate-pulse" />
      <p>Copied {text.toUpperCase()}</p>
    </div>
  );
};
