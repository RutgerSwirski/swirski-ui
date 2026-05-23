"use client";

import { Checkbox } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  booleanValue,
} from "../playground-utils";

export const checkboxPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "label",
      label: "label",
      type: "text",
      defaultValue: "Send launch updates",
    },
    {
      name: "description",
      label: "description",
      type: "text",
      defaultValue: "A compact, native checkbox with a custom Swirski mark.",
    },
    {
      name: "checked",
      label: "checked",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "disabled",
      label: "disabled",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <Checkbox
      checked={booleanValue(values, "checked")}
      description={textValue(values, "description")}
      disabled={booleanValue(values, "disabled")}
      label={textValue(values, "label")}
      readOnly
    />
  ),
  getCode: (values) => {
    const props = [
      `label=${jsxString(textValue(values, "label"))}`,
      `description=${jsxString(textValue(values, "description"))}`,
      booleanValue(values, "checked") ? "defaultChecked" : null,
      booleanValue(values, "disabled") ? "disabled" : null,
    ].filter(Boolean);

    return `<Checkbox
  ${props.join("\n  ")}
/>`;
  },
};
