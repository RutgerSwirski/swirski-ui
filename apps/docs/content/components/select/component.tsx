import {
  Field,
  FieldError,
  FieldHint,
  Label,
  Select,
  Text,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const selectComponentDoc: ComponentDoc = {
  slug: "select",
  title: "Select",
  description:
    "A custom dropdown picker for option sets, playground controls and compact forms.",
  category: "Forms",
  importCode: `import { Select } from "@swirski/ui";`,
  usageCode: `<Select
  placeholder="Pick a tone"
  options={[
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
  ]}
/>`,
  compositionCode: `Field
|-- Label
|-- Select
|   \`-- options[]
|       |-- value
|       \`-- label
\`-- FieldHint | FieldError`,
  preview: (
    <div className="max-w-sm">
      <Select
        defaultValue="yellow"
        options={[
          { value: "yellow", label: "Yellow" },
          { value: "blue", label: "Blue" },
          { value: "red", label: "Red" },
          { value: "white", label: "White" },
        ]}
      />
    </div>
  ),
  props: [
    {
      name: "options",
      type: "SelectOption[]",
      required: true,
      description: "Options shown in the dropdown list.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled selected option value.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Initial selected option value when uncontrolled.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Called when a new option is selected.",
    },
    {
      name: "placeholder",
      type: "string",
      defaultValue: '"Select an option"',
      description: "Text shown when no option is selected.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the trigger and prevents selection.",
    },
    {
      name: "name",
      type: "string",
      description: "Adds a hidden input for native form submission.",
    },
    {
      name: "triggerClassName",
      type: "string",
      description: "Adds classes to the dropdown trigger.",
    },
    {
      name: "contentClassName",
      type: "string",
      description: "Adds classes to the dropdown content panel.",
    },
    {
      name: "optionClassName",
      type: "string",
      description: "Adds classes to each dropdown option.",
    },
  ],
};
