import type { ComponentDoc } from "../../types";
import { ThemeTogglePreview } from "./ThemeTogglePreview";

export const themeToggleComponentDoc: ComponentDoc = {
  slug: "theme-toggle",
  title: "ThemeToggle",
  description: "Switch between light and dark mode by sharing state with SwirskiProvider.",
  category: "Theming",
  importCode: `import { useState } from "react";
import { SwirskiProvider, ThemeToggle, type SwirskiColorScheme } from "@swirski/ui";`,
  usageCode: `function ThemedApp() {
  const [scheme, setScheme] = useState<SwirskiColorScheme>("light");

  return (
    <SwirskiProvider colorScheme={scheme}>
      <ThemeToggle colorScheme={scheme} onColorSchemeChange={setScheme} />
      <App />
    </SwirskiProvider>
  );
}`,
  preview: <ThemeTogglePreview />,
  props: [
    {
      name: "colorScheme",
      type: '"light" | "dark"',
      required: true,
      description: "The current application color scheme.",
    },
    {
      name: "onColorSchemeChange",
      type: "(colorScheme: SwirskiColorScheme) => void",
      required: true,
      description: "Requests a scheme change. Keep the scheme in app state to share it with the provider and persist it if needed.",
    },
    {
      name: "label",
      type: "ReactNode",
      defaultValue: '"Dark mode"',
      description: "The visible and accessible switch label.",
    },
  ],
};
