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
          theme === "dark" ? "bg-shark-700" : "bg-shark-300"
        } relative inline-flex h-6 w-11 items-center rounded-full transition border border-shark-400 dark:border-shark-600`}
      >
        <span
          className={`${
            theme === "dark" ? "translate-x-6" : "translate-x-1"
          }  h-4 w-4 transform rounded-full bg-white dark:bg-shark-800 transition ease-out text-shark-800 dark:text-shark-200 flex items-center justify-center`}
        >
          {theme === "dark" ? <Moon size={10} /> : <SunMedium size={10} />}
        </span>
      </div>
    </Switch>
  );
};

export default ThemeSwitcher;
