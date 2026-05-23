import { DotGrid } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const dotGridComponentDoc: ComponentDoc = {
  slug: "dot-grid",
  title: "DotGrid",
  description:
    "A configurable dot-grid background for subtle texture, halftone fields and pop-art surfaces.",
  category: "Backgrounds",
  importCode: `import { DotGrid } from "@swirski/ui";`,
  usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <DotGrid
    className="inset-0"
    color="#0B0B0C"
    opacity={0.38}
    spacing={14}
    dotSize={1.8}
    accentColor="#FF3131"
    accentEvery={5}
    accentDotSize={5}
  />
</div>`,
  preview: (
    <div className="relative h-64 overflow-hidden bg-[#FFD400]">
      <DotGrid
        className="inset-0"
        color="#0B0B0C"
        opacity={0.38}
        spacing={14}
        dotSize={1.8}
        accentColor="#FF3131"
        accentEvery={5}
        accentDotSize={5}
      />
    </div>
  ),
  props: [
    {
      name: "color",
      type: "string",
      defaultValue: '"currentColor"',
      description: "Primary dot color.",
    },
    {
      name: "opacity",
      type: "CSSProperties['opacity']",
      description: "Opacity applied to the grid layer.",
    },
    {
      name: "spacing",
      type: "number | string",
      defaultValue: "13",
      description: "Distance between dots.",
    },
    {
      name: "dotSize",
      type: "number | string",
      defaultValue: "1.2",
      description: "Primary dot radius.",
    },
    {
      name: "accentColor",
      type: "string",
      description: "Optional color for larger accent dots.",
    },
    {
      name: "accentEvery",
      type: "number",
      description:
        "Adds an accent dot every N grid cells when greater than 1.",
    },
    {
      name: "accentDotSize",
      type: "number | string",
      defaultValue: "3",
      description: "Accent dot radius.",
    },
    {
      name: "...divProps",
      type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
      description: "Forwarded to the root div.",
    },
  ],
};
