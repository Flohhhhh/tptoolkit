"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export function SettingsMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use resolvedTheme for icon, fallback to 'light'
  const current =
    themeOptions.find((opt) => resolvedTheme === opt.value) || themeOptions[0];

  return (
    <div>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-full justify-start gap-2">
          {current && <current.icon className="h-4 w-4" />}
          <span>Theme</span>
        </SelectTrigger>
        <SelectContent align="start" className="z-[100]">
          {themeOptions.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="flex items-center gap-2"
            >
              <opt.icon className="mr-2 h-4 w-4" />
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
