"use client";

import { Slider } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import { numberValue } from "../playground-utils";

export const sliderPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "defaultValue",
      label: "defaultValue",
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 100,
    },
    {
      name: "max",
      label: "max",
      type: "number",
      defaultValue: 100,
      min: 10,
      max: 200,
      step: 10,
    },
  ],
  render: (values) => (
    <div className="w-full max-w-sm">
      <Slider
        key={`${numberValue(values, "defaultValue")}-${numberValue(values, "max")}`}
        defaultValue={numberValue(values, "defaultValue")}
        min={0}
        max={numberValue(values, "max")}
      />
    </div>
  ),
  getCode: (values) => `<Slider
  defaultValue={${numberValue(values, "defaultValue")}}
  min={0}
  max={${numberValue(values, "max")}}
/>`,
};
