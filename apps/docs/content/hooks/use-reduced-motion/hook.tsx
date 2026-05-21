import { Badge } from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useReducedMotionHookDoc: HookDoc = {
  slug: "use-reduced-motion",
  title: "useReducedMotion",
  description: "Reads the user preference for reduced motion.",
  category: "Hooks",
  importCode: `import { useReducedMotion } from "@swirski/ui";`,
  usageCode: `const reducedMotion = useReducedMotion();`,
  preview: <Badge tone="yellow">Motion preference</Badge>,
  props: [
    {
      name: "initialValue",
      type: "boolean",
      defaultValue: "false",
      description: "Initial value before the media query runs.",
    },
  ],
  returns: [
    {
      name: "reducedMotion",
      type: "boolean",
      description: "True when prefers-reduced-motion is reduce.",
    },
  ],
};
