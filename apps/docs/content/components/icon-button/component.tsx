import { IconButton } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const iconButtonComponentDoc: ComponentDoc = {
  slug: "icon-button",
  title: "IconButton",
  description: "A compact button for a named icon action.",
  category: "Buttons",
  importCode: 'import { IconButton } from "@swirski/ui";',
  usageCode: `<IconButton aria-label="Next image" variant="outline">
  →
</IconButton>`,
  preview: <IconButton aria-label="Next image" variant="outline">→</IconButton>,
  props: [
    { name: "aria-label / aria-labelledby", type: "string", required: true, description: "Provide either an action label or the ID of visible text that names it." },
    { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Matches Button sizing." },
    { name: "variant", type: '"solid" | "outline" | "ghost"', defaultValue: '"solid"', description: "Visual treatment." },
  ],
};
