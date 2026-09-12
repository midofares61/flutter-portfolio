"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:opacity-80 transition-opacity"
      aria-label="Toggle theme"
    >
      <Sun size={20} style={{ display: theme === 'dark' ? 'none' : 'block' }} />
      <Moon size={20} style={{ display: theme === 'dark' ? 'block' : 'none' }} />
    </button>
  );
}
