"use client";

import { useState } from "react";
import { Button, SwirskiProvider, ThemeToggle, type SwirskiColorScheme } from "@swirski/ui";

export function ThemeTogglePreview({
  label = "Dark mode",
  disabled = false,
}: { label?: string; disabled?: boolean } = {}) {
  const [scheme, setScheme] = useState<SwirskiColorScheme>("light");

  return (
    <SwirskiProvider colorScheme={scheme} className="grid gap-4 p-5">
      <ThemeToggle label={label} disabled={disabled} colorScheme={scheme} onColorSchemeChange={setScheme} />
      <div className="flex flex-wrap gap-3">
        <Button tone="yellow">Yellow</Button>
        <Button tone="red">Red</Button>
        <Button tone="blue" variant="outline">Blue outline</Button>
      </div>
    </SwirskiProvider>
  );
}
