"use client";

import { RadioGroup } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  booleanValue,
} from "../playground-utils";

export const radioGroupPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "value",
      label: "value",
      type: "select",
      defaultValue: "blue",
      options: ["blue", "yellow", "red"],
    },
    {
      name: "disabledOption",
      label: "disabledOption",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <RadioGroup
      key={`${textValue(values, "value")}-${booleanValue(values, "disabledOption")}`}
      name="playground-tone"
      defaultValue={textValue(values, "value")}
      options={[
        {
          value: "blue",
          label: "Blue",
          description: "Sharp product surfaces.",
        },
        {
          value: "yellow",
          label: "Yellow",
          description: "Loud editorial moments.",
        },
        {
          value: "red",
          label: "Red",
          description: "Urgent launch signals.",
          disabled: booleanValue(values, "disabledOption"),
        },
      ]}
    />
  ),
  getCode: (values) => `<RadioGroup
  name="tone"
  defaultValue=${jsxString(textValue(values, "value"))}
  options={[
    { value: "blue", label: "Blue" },
    { value: "yellow", label: "Yellow" },
    { value: "red", label: "Red"${booleanValue(values, "disabledOption") ? ", disabled: true" : ""} },
  ]}
/>`,
};
