import {
  Button,
  Tooltip,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const tooltipComponentDoc: ComponentDoc = {
  slug: "tooltip",
  title: "Tooltip",
  description: "A compact hover/focus label for icon buttons and dense UI.",
  category: "Interaction",
  importCode: `import { Tooltip } from "@swirski/ui";`,
  usageCode: `<Tooltip content="Save changes">
  <Button>Save</Button>
</Tooltip>`,
  preview: (
    <Tooltip content="Save changes">
      <Button>Save</Button>
    </Tooltip>
  ),
  props: [
    {
      name: "content",
      type: "ReactNode",
      required: true,
      description: "Tooltip label content.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Element that owns the tooltip.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the tooltip wrapper.",
    },
  ],
};
