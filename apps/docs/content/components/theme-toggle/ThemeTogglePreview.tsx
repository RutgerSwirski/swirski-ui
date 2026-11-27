"use client";

import { useState } from "react";
import { SwirskiProvider, ThemeToggle, type SwirskiColorScheme } from "@swirski/ui";

export function ThemeTogglePreview() {
  const [scheme, setScheme] = useState<SwirskiColorScheme>("light");

  return (
    <SwirskiProvider colorScheme={scheme} className="p-5">
      <ThemeToggle colorScheme={scheme} onColorSchemeChange={setScheme} />
    </SwirskiProvider>
  );
}
