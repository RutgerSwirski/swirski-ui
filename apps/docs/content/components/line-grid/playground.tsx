"use client";

import { LineGrid } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  numberValue,
} from "../playground-utils";

export const lineGridPlayground: PlaygroundDefinition = {
  controls: [
    { name: "color", label: "color", type: "color", defaultValue: "#0B0B0C" },
    {
      name: "accentColor",
      label: "accentColor",
      type: "color",
      defaultValue: "#FF3131",
    },
    {
      name: "direction",
      label: "direction",
      type: "select",
      defaultValue: "both",
      options: ["both", "horizontal", "vertical"],
    },
    {
      name: "opacity",
      label: "opacity",
      type: "number",
      defaultValue: 0.34,
      min: 0.05,
      max: 1,
      step: 0.01,
    },
    {
      name: "spacing",
      label: "spacing",
      type: "number",
      defaultValue: 18,
      min: 6,
      max: 48,
    },
    {
      name: "thickness",
      label: "thickness",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 10,
    },
    {
      name: "accentEvery",
      label: "accentEvery",
      type: "number",
      defaultValue: 4,
      min: 0,
      max: 10,
    },
  ],
  render: (values) => (
    <div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
      <LineGrid
        className="inset-0"
        color={textValue(values, "color")}
        opacity={numberValue(values, "opacity")}
        spacing={numberValue(values, "spacing")}
        thickness={numberValue(values, "thickness")}
        direction={
          textValue(values, "direction") as "both" | "horizontal" | "vertical"
        }
        accentColor={textValue(values, "accentColor")}
        accentEvery={numberValue(values, "accentEvery")}
        accentThickness={5}
      />
    </div>
  ),
  getCode: (
    values,
  ) => `<div className="relative h-72 overflow-hidden border-4 border-black bg-[#FFD400]">
  <LineGrid
    className="inset-0"
    color=${jsxString(textValue(values, "color"))}
    opacity={${numberValue(values, "opacity")}}
    spacing={${numberValue(values, "spacing")}}
    thickness={${numberValue(values, "thickness")}}
    direction=${jsxString(textValue(values, "direction"))}
    accentColor=${jsxString(textValue(values, "accentColor"))}
    accentEvery={${numberValue(values, "accentEvery")}}
    accentThickness={5}
  />
</div>`,
};
