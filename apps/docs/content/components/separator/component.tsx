import { Separator } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const separatorComponentDoc: ComponentDoc = {
  slug: "separator",
  title: "Separator",
  description:
    "A small visual divider for sections, menus and dense layouts.",
  category: "Layout",
  importCode: `import { Separator } from "@swirski/ui";`,
  usageCode: `<Separator />`,
  preview: <Separator />,
  props: [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      defaultValue: '"horizontal"',
      description: "Divider direction.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the divider.",
    },
  ],
};
