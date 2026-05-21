import { DiagonalLines } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const diagonalLinesComponentDoc: ComponentDoc = {
  slug: "diagonal-lines",
  title: "DiagonalLines",
  description:
    "A configurable diagonal stripe background for punchy poster and pop-art compositions.",
  category: "Backgrounds",
  importCode: `import { DiagonalLines } from "@swirski/ui";`,
  usageCode: `<div className="relative h-64 overflow-hidden bg-[#FFD400]">
  <DiagonalLines
    className="inset-0"
    angle={-35}
    color="#0B0B0C"
    opacity={0.3}
    spacing={18}
    thickness={2}
    accentColor="#FF3131"
    accentEvery={6}
    accentThickness={8}
  />
</div>`,
  preview: (
    <div className="relative h-64 overflow-hidden bg-[#FFD400]">
      <DiagonalLines
        className="inset-0"
        angle={-35}
        color="#0B0B0C"
        opacity={0.3}
        spacing={18}
        thickness={2}
        accentColor="#FF3131"
        accentEvery={6}
        accentThickness={8}
      />
    </div>
  ),
  props: [
    {
      name: "angle",
      type: "number | string",
      defaultValue: "-45",
      description: "Line angle in degrees or any CSS angle value.",
    },
    {
      name: "color",
      type: "string",
      defaultValue: '"#0B0B0C"',
      description: "Primary stripe color.",
    },
    {
      name: "opacity",
      type: "CSSProperties['opacity']",
      defaultValue: "0.2",
      description: "Opacity applied to the stripe layer.",
    },
    {
      name: "spacing",
      type: "number | string",
      defaultValue: "18",
      description: "Distance before the pattern repeats.",
    },
    {
      name: "thickness",
      type: "number | string",
      defaultValue: "2",
      description: "Primary stripe thickness.",
    },
    {
      name: "accentColor",
      type: "string",
      description: "Optional color for heavier accent stripes.",
    },
    {
      name: "accentEvery",
      type: "number",
      description: "Adds accent stripes every N repeats when greater than 1.",
    },
    {
      name: "accentThickness",
      type: "number | string",
      defaultValue: "5",
      description: "Thickness for accent stripes.",
    },
    {
      name: "...divProps",
      type: 'Omit<HTMLAttributes<HTMLDivElement>, "color">',
      description: "Forwarded to the root div.",
    },
  ],
};
