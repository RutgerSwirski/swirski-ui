"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SwirskiProvider, ThemeToggle, type SwirskiColorScheme } from "@swirski/ui";

const storageKey = "swirski-docs-color-scheme";
const DocsThemeContext = createContext<{
  scheme: SwirskiColorScheme;
  setScheme: (scheme: SwirskiColorScheme) => void;
} | null>(null);

export function DocsTheme({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState<SwirskiColorScheme>("light");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch {
      // The system preference still works when storage is restricted.
    }
    setScheme(saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function changeScheme(next: SwirskiColorScheme) {
    setScheme(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Keep the in-memory preference for this visit.
    }
  }

  return (
    <DocsThemeContext.Provider value={{ scheme, setScheme: changeScheme }}>
      <SwirskiProvider colorScheme={scheme} className="docs-theme min-h-screen">
        {children}
      </SwirskiProvider>
    </DocsThemeContext.Provider>
  );
}

export function DocsThemeToggle() {
  const theme = useContext(DocsThemeContext);
  if (!theme) return null;

  return (
    <ThemeToggle
      colorScheme={theme.scheme}
      onColorSchemeChange={theme.setScheme}
      size="sm"
      className="whitespace-nowrap text-xs"
    />
  );
}
