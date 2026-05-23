"use client";

import {
  Button,
  Tooltip,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
} from "../playground-utils";

export const tooltipPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "label",
      label: "label",
      type: "text",
      defaultValue: "Hover me",
    },
    {
      name: "content",
      label: "content",
      type: "text",
      defaultValue: "Helpful context",
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "blue",
      options: ["blue", "yellow", "white"],
    },
  ],
  render: (values) => (
    <Tooltip content={textValue(values, "content")}>
      <Button tone={textValue(values, "tone") as "blue" | "yellow" | "white"}>
        {textValue(values, "label")}
      </Button>
    </Tooltip>
  ),
  getCode: (
    values,
  ) => `<Tooltip content=${jsxString(textValue(values, "content"))}>
  <Button tone=${jsxString(textValue(values, "tone"))}>
    ${jsxText(textValue(values, "label"))}
  </Button>
</Tooltip>`,
};
