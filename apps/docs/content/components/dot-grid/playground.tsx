"use client";

import { DotGrid } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  numberValue,
} from "../playground-utils";

export const dotGridPlayground: PlaygroundDefinition = {
  controls: [
    { name: "color", label: "color", type: "color", defaultValue: "#0B0B0C" },
    {
      name: "accentColor",
      label: "accentColor",
      type: "color",
      defaultValue: "#FF3131",
    },
    {
      name: "opacity",
      label: "opacity",
      type: "number",
      defaultValue: 0.38,
      min: 0.05,
      max: 1,
      step: 0.01,
    },
    {
      name: "spacing",
      label: "spacing",
      type: "number",
      defaultValue: 14,
      min: 6,
      max: 40,
    },
    {
      name: "dotSize",
      label: "dotSize",
      type: "number",
      defaultValue: 1.8,
      min: 0.5,
      max: 6,
      step: 0.1,
    },
    {
      name: "accentEvery",
      label: "accentEvery",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 10,
    },
  ],
  render: (values) => (
    <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
      <DotGrid
        className="inset-0"
        color={textValue(values, "color")}
        opacity={numberValue(values, "opacity")}
        spacing={numberValue(values, "spacing")}
        dotSize={numberValue(values, "dotSize")}
        accentColor={textValue(values, "accentColor")}
        accentEvery={numberValue(values, "accentEvery")}
        accentDotSize={5}
      />
    </div>
  ),
  getCode: (
    values,
  ) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
  <DotGrid
    className="inset-0"
    color=${jsxString(textValue(values, "color"))}
    opacity={${numberValue(values, "opacity")}}
    spacing={${numberValue(values, "spacing")}}
    dotSize={${numberValue(values, "dotSize")}}
    accentColor=${jsxString(textValue(values, "accentColor"))}
    accentEvery={${numberValue(values, "accentEvery")}}
    accentDotSize={5}
  />
</div>`,
};
