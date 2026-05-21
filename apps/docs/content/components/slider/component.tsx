import { Slider } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const sliderComponentDoc: ComponentDoc = {
  slug: "slider",
  title: "Slider",
  description: "A native range input for numeric controls.",
  category: "Forms",
  importCode: `import { Slider } from "@swirski/ui";`,
  usageCode: `<Slider defaultValue={64} min={0} max={100} />`,
  preview: <Slider defaultValue={64} min={0} max={100} />,
  props: [
    {
      name: "...inputProps",
      type: "InputHTMLAttributes<HTMLInputElement>",
      description: "Forwarded to the native range input.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the range input.",
    },
  ],
};
