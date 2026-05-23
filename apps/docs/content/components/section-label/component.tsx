import {
  Label,
  SectionLabel,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const sectionLabelComponentDoc: ComponentDoc = {
  slug: "section-label",
  title: "SectionLabel",
  description:
    "A chunky rotated heading label for editorial section markers, callouts and page breaks.",
  category: "Typography",
  importCode: `import { SectionLabel } from "@swirski/ui";`,
  usageCode: `<SectionLabel tone="yellow">Featured</SectionLabel>`,
  preview: (
    <div className="flex flex-wrap items-center gap-5">
      <SectionLabel size="sm" tone="yellow">
        Featured
      </SectionLabel>
      <SectionLabel size="sm" tone="blue">
        New
      </SectionLabel>
      <SectionLabel size="sm" tone="red">
        Live
      </SectionLabel>
    </div>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Label text.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Applies the label padding and heading scale.",
    },
    {
      name: "tone",
      type: '"yellow" | "white" | "blue" | "red"',
      defaultValue: '"yellow"',
      description: "Applies the label color treatment.",
    },
    {
      name: "variant",
      type: '"default" | "flat"',
      defaultValue: '"default"',
      description: "Toggles the offset shadow treatment.",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the child as the root element.",
    },
    {
      name: "...headingProps",
      type: "HTMLAttributes<HTMLHeadingElement>",
      description: "Forwarded to the rendered heading.",
    },
  ],
};
