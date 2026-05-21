import { Badge } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const badgeComponentDoc: ComponentDoc = {
  slug: "badge",
  title: "Badge",
  description:
    "A compact high-contrast label for statuses, tags and small interface signals.",
  category: "Feedback",
  importCode: `import { Badge } from "@swirski/ui";`,
  usageCode: `<Badge tone="yellow">New drop</Badge>`,
  preview: (
    <div className="flex flex-wrap gap-3">
      <Badge>New drop</Badge>
      <Badge tone="blue">Featured</Badge>
      <Badge tone="red">Live</Badge>
      <Badge tone="black">Studio</Badge>
    </div>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Badge text or inline content.",
    },
    {
      name: "tone",
      type: '"blue" | "yellow" | "red" | "white" | "black"',
      defaultValue: '"yellow"',
      description: "Applies one of the Swirski status color treatments.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      defaultValue: '"md"',
      description: "Controls the compact badge padding and text size.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the root span.",
    },
    {
      name: "...spanProps",
      type: "HTMLAttributes<HTMLSpanElement>",
      description: "Forwarded to the root span.",
    },
  ],
};
