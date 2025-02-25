"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { SunMedium } from "lucide-react";
import { Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // if (
    //   window.matchMedia &&
    //   window.matchMedia("(prefers-color-scheme: dark)").matches
    // ) {
    //   setTheme("dark");
    // } else {
    //   setTheme("light");
    // }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      checked={theme === "dark"}
      onChange={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      <div
        className={`${
          theme === "dark" ? "bg-zinc-700" : "bg-zinc-100"
        } relative inline-flex h-6 w-11 items-center rounded-full transition border border-zinc-400 dark:border-zinc-600`}
      >
        <span
          className={`${
            theme === "dark" ? "translate-x-6" : "translate-x-1"
          }  h-4 w-4 transform rounded-full bg-white dark:bg-zinc-800 transition ease-out text-zinc-800 dark:text-zinc-200 flex items-center justify-center`}
        >
          {theme === "dark" ? <Moon size={10} /> : <SunMedium size={10} />}
        </span>
      </div>
    </Switch>
  );
};

export default ThemeSwitcher;
