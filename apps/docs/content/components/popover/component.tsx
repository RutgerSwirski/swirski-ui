import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const popoverComponentDoc: ComponentDoc = {
  slug: "popover",
  title: "Popover",
  description:
    "A floating panel for filters, quick settings and small editable surfaces.",
  category: "Interaction",
  importCode: `import { Popover, PopoverContent, PopoverTrigger } from "@swirski/ui";`,
  usageCode: `<Popover>
  <PopoverTrigger>Filters</PopoverTrigger>
  <PopoverContent>Quick controls live here.</PopoverContent>
</Popover>`,
  compositionCode: `Popover
|-- PopoverTrigger
\`-- PopoverContent`,
  preview: (
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent>
        <Text size="sm" weight="bold" tone="muted">
          Quick controls live here.
        </Text>
      </PopoverContent>
    </Popover>
  ),
  props: [
    { name: "open", type: "boolean", description: "Controlled open state." },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial uncontrolled open state.",
    },
    {
      name: "align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Aligns the content to the trigger.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to root, trigger or content slots.",
    },
  ],
};
