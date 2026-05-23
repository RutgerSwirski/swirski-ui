"use client";

import { Select } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  booleanValue,
} from "../playground-utils";

export const selectPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "value",
      label: "value",
      type: "select",
      defaultValue: "yellow",
      options: ["yellow", "blue", "red", "white"],
    },
    {
      name: "placeholder",
      label: "placeholder",
      type: "text",
      defaultValue: "Pick a tone",
    },
    {
      name: "disabled",
      label: "disabled",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <div className="max-w-sm">
      <Select
        key={textValue(values, "value")}
        defaultValue={textValue(values, "value")}
        disabled={booleanValue(values, "disabled")}
        options={[
          { value: "yellow", label: "Yellow" },
          { value: "blue", label: "Blue" },
          { value: "red", label: "Red" },
          { value: "white", label: "White" },
        ]}
        placeholder={textValue(values, "placeholder")}
      />
    </div>
  ),
  getCode: (values) => {
    const props = [
      `placeholder=${jsxString(textValue(values, "placeholder"))}`,
      `defaultValue=${jsxString(textValue(values, "value"))}`,
      booleanValue(values, "disabled") ? "disabled" : null,
    ].filter(Boolean);

    return `<Select
  ${props.join("\n  ")}
  options={[
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
  ]}
/>`;
  },
};
