import { LineGrid } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const lineGridComponentDoc: ComponentDoc = {
  slug: "line-grid",
  title: "LineGrid",
  description:
    "A configurable line grid background with optional heavier accent lines for pop-art surfaces.",
  category: "Backgrounds",
  importCode: `import { LineGrid } from "@swirski/ui";`,
  usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <LineGrid
    className="inset-0"
    horizontalColor="#0B0B0C"
    horizontalSpacing={18}
    horizontalThickness={2}
    verticalColor="#0057FF"
    verticalSpacing={26}
    verticalThickness={1}
    opacity={0.34}
    accentColor="#FF3131"
    accentEvery={4}
    accentThickness={5}
  />
</div>`,
  preview: (
    <div className="relative h-64 overflow-hidden bg-[#FFD400]">
      <LineGrid
        className="inset-0"
        horizontalColor="#0B0B0C"
        horizontalSpacing={18}
        horizontalThickness={2}
        verticalColor="#0057FF"
        verticalSpacing={26}
        verticalThickness={1}
        opacity={0.34}
        accentColor="#FF3131"
        accentEvery={4}
        accentThickness={5}
      />
    </div>
  ),
  props: [
    {
      name: "color",
      type: "string",
      defaultValue: '"#0B0B0C"',
      description: "Fallback color for horizontal and vertical lines.",
    },
    {
      name: "opacity",
      type: "CSSProperties['opacity']",
      defaultValue: "0.2",
      description: "Opacity applied to the grid layer.",
    },
    {
      name: "spacing",
      type: "number | string",
      defaultValue: "18",
      description: "Fallback spacing for both directions.",
    },
    {
      name: "thickness",
      type: "number | string",
      defaultValue: "1",
      description: "Fallback line thickness for both directions.",
    },
    {
      name: "direction",
      type: '"both" | "horizontal" | "vertical"',
      defaultValue: '"both"',
      description: "Which line directions to render.",
    },
    {
      name: "horizontalColor",
      type: "string",
      description: "Overrides the horizontal line color.",
    },
    {
      name: "verticalColor",
      type: "string",
      description: "Overrides the vertical line color.",
    },
    {
      name: "accentColor",
      type: "string",
      description: "Optional color for heavier accent lines.",
    },
    {
      name: "accentEvery",
      type: "number",
      description: "Adds accent lines every N cells when greater than 1.",
    },
    {
      name: "accentThickness",
      type: "number | string",
      defaultValue: "3",
      description: "Thickness for accent lines.",
    },
    {
      name: "...divProps",
      type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
      description: "Forwarded to the root div.",
    },
  ],
};
