"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle group relative inline-flex h-9 w-[3.25rem] shrink-0 cursor-pointer items-center rounded-full border border-border bg-mist p-1 transition-all duration-500 hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      suppressHydrationWarning
    >
      <span
        className={`theme-toggle__track absolute inset-0 rounded-full transition-colors duration-500 ${
          isDark ? "bg-[#0a1628]" : "bg-gradient-to-r from-sky-100 to-amber-50"
        }`}
        aria-hidden="true"
      />

      <span
        className={`theme-toggle__thumb relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "translate-x-[calc(100%-2px)] bg-[#1e293b] shadow-[inset_0_-2px_4px_rgba(255,255,0,0.15)]"
            : "translate-x-0 bg-white shadow-[inset_0_-2px_4px_rgba(255,200,0,0.3)]"
        } ${mounted ? "" : "opacity-0"}`}
        aria-hidden="true"
      >
        {isDark ? (
          <svg
            className="h-3.5 w-3.5 text-amber-300 transition-transform duration-500 group-hover:rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 15.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM5.64 5.64a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41L5.64 7.05a1 1 0 0 1 0-1.41zm11.31 11.31a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 0 1-1.41 1.41l-1.06-1.06a1 1 0 0 1 0-1.41zM3 12a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm15.5 0a1 1 0 0 1 1-1H21a1 1 0 0 1 0 2h-1.5a1 1 0 0 1-1-1zM5.64 18.36a1 1 0 0 1 0-1.41l1.06-1.06a1 1 0 1 1 1.41 1.41l-1.06 1.06a1 1 0 0 1-1.41 0zm11.31-11.31a1 1 0 0 1 0-1.41l1.06-1.06a1 1 0 1 1 1.41 1.41l-1.06 1.06a1 1 0 0 1-1.41 0zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
          </svg>
        ) : (
          <svg
            className="h-3.5 w-3.5 text-amber-500 transition-transform duration-500 group-hover:rotate-45"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 12 2.25zM7.05 4.05a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L7.05 5.11a.75.75 0 0 1 0-1.06zm9.9 0a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0zM3.75 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H4.5A.75.75 0 0 1 3.75 12zm14.25 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zM7.05 18.95a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0zm9.9 0a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06zM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5z" />
          </svg>
        )}
      </span>

      <span className="theme-toggle__stars pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
        <span className={`theme-toggle__star theme-toggle__star--1 ${isDark ? "opacity-100" : "opacity-0"}`} />
        <span className={`theme-toggle__star theme-toggle__star--2 ${isDark ? "opacity-100" : "opacity-0"}`} />
        <span className={`theme-toggle__star theme-toggle__star--3 ${isDark ? "opacity-100" : "opacity-0"}`} />
      </span>
    </button>
  );
}
