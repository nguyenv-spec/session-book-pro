import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "forge-theme";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = getInitialTheme();
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground/70 transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
