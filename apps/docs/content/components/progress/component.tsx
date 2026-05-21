import { Progress } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const progressComponentDoc: ComponentDoc = {
  slug: "progress",
  title: "Progress",
  description: "A simple progress meter for loading and completion states.",
  category: "Feedback",
  importCode: `import { Progress } from "@swirski/ui";`,
  usageCode: `<Progress value={64} />`,
  preview: <Progress value={64} />,
  props: [
    {
      name: "value",
      type: "number",
      defaultValue: "0",
      description: "Current progress value.",
    },
    {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Maximum progress value.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the progress track.",
    },
  ],
};
