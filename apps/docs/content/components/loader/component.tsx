import { Loader } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const loaderComponentDoc: ComponentDoc = {
  slug: "loader",
  title: "Loader",
  description: "A compact loading spinner for pending states.",
  category: "Feedback",
  importCode: `import { Loader } from "@swirski/ui";`,
  usageCode: `<Loader size="md" />`,
  preview: <Loader size="lg" />,
  props: [
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl" | "2xl"',
      defaultValue: '"md"',
      description: "Controls the spinner size.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the spinner.",
    },
  ],
};
