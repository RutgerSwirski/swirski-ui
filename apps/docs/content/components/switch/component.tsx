import { Switch } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const switchComponentDoc: ComponentDoc = {
  slug: "switch",
  title: "Switch",
  description:
    "A native checkbox presented as a switch for binary preferences and settings.",
  category: "Forms",
  importCode: `import { Switch } from "@swirski/ui";`,
  usageCode: `<Switch label="Studio mode" defaultChecked />`,
  preview: (
    <Switch
      defaultChecked
      label="Studio mode"
      description="Use switch semantics without giving up native form behavior."
    />
  ),
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Visible label rendered beside the switch.",
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
      description: "Forwarded to the native switch input.",
    },
  ],
};
