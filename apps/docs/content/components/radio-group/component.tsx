import { RadioGroup } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const radioGroupComponentDoc: ComponentDoc = {
  slug: "radio-group",
  title: "RadioGroup",
  description: "A native radio group for choosing one option from a set.",
  category: "Forms",
  importCode: `import { RadioGroup } from "@swirski/ui";`,
  usageCode: `<RadioGroup
  name="tone"
  defaultValue="blue"
  options={[
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
  ]}
/>`,
  preview: (
    <RadioGroup
      name="docs-tone"
      defaultValue="blue"
      options={[
        {
          value: "blue",
          label: "Blue",
          description: "Sharp product surfaces.",
        },
        {
          value: "yellow",
          label: "Yellow",
          description: "Loud editorial moments.",
        },
      ]}
    />
  ),
  props: [
    {
      name: "name",
      type: "string",
      required: true,
      description: "Native radio group name.",
    },
    {
      name: "options",
      type: "RadioGroupOption[]",
      required: true,
      description: "Options rendered as radio inputs.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled selected value.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Initial selected value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Called when the selected value changes.",
    },
  ],
};
