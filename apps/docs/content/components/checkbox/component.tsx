import { Checkbox } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const checkboxComponentDoc: ComponentDoc = {
  slug: "checkbox",
  title: "Checkbox",
  description:
    "A native checkbox with a chunky Swirski mark, label and optional description.",
  category: "Forms",
  importCode: `import { Checkbox } from "@swirski/ui";`,
  usageCode: `<Checkbox
  label="Send launch updates"
  description="A compact, native checkbox with a custom Swirski mark."
/>`,
  preview: (
    <Checkbox
      defaultChecked
      label="Send launch updates"
      description="A compact, native checkbox with a custom Swirski mark."
    />
  ),
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Visible label rendered beside the checkbox.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Optional supporting text below the label.",
    },
    {
      name: "containerClassName",
      type: "string",
      description: "Adds classes to the root label wrapper.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the hidden native checkbox input.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables interaction and dims the wrapper.",
    },
    {
      name: "...inputProps",
      type: 'Omit<InputHTMLAttributes<HTMLInputElement>, "type">',
      description: "Forwarded to the native checkbox input.",
    },
  ],
};
