"use client";

import { Switch } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  booleanValue,
} from "../playground-utils";

export const switchPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "label",
      label: "label",
      type: "text",
      defaultValue: "Studio mode",
    },
    {
      name: "description",
      label: "description",
      type: "text",
      defaultValue: "Use switch semantics without giving up native forms.",
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
    <Switch
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

    return `<Switch
  ${props.join("\n  ")}
/>`;
  },
};
