"use client";

import type { PlaygroundDefinition } from "../../types";
import { booleanValue, jsxString, textValue } from "../playground-utils";
import { ThemeTogglePreview } from "./ThemeTogglePreview";

export const themeTogglePlayground: PlaygroundDefinition = {
  controls: [
    { name: "label", label: "label", type: "text", defaultValue: "Dark mode" },
    { name: "disabled", label: "disabled", type: "boolean", defaultValue: false },
  ],
  render: (values) => (
    <ThemeTogglePreview
      label={textValue(values, "label")}
      disabled={booleanValue(values, "disabled")}
    />
  ),
  getCode: (values) => `const [scheme, setScheme] = useState<SwirskiColorScheme>("light");

<SwirskiProvider colorScheme={scheme}>
  <ThemeToggle
    colorScheme={scheme}
    onColorSchemeChange={setScheme}
    label=${jsxString(textValue(values, "label"))}${booleanValue(values, "disabled") ? "\n    disabled" : ""}
  />
</SwirskiProvider>`,
};
