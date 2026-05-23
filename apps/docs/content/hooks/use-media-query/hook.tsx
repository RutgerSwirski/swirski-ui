import { Badge } from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useMediaQueryHookDoc: HookDoc = {
  slug: "use-media-query",
  title: "useMediaQuery",
  description: "Tracks a CSS media query in React state.",
  category: "Hooks",
  importCode: `import { useMediaQuery } from "@swirski/ui";`,
  usageCode: `const isDesktop = useMediaQuery("(min-width: 1024px)");`,
  preview: <Badge tone="blue">Responsive state hook</Badge>,
  props: [
    {
      name: "query",
      type: "string",
      required: true,
      description: "CSS media query to observe.",
    },
    {
      name: "initialValue",
      type: "boolean",
      defaultValue: "false",
      description: "Initial value before the browser runs the query.",
    },
  ],
  returns: [
    {
      name: "matches",
      type: "boolean",
      description: "Whether the media query currently matches.",
    },
  ],
};
