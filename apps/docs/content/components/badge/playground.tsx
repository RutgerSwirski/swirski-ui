"use client";

import { Badge } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
} from "../playground-utils";

export const badgePlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "children",
      label: "children",
      type: "text",
      defaultValue: "New drop",
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "yellow",
      options: ["yellow", "blue", "red", "white", "black"],
    },
    {
      name: "size",
      label: "size",
      type: "select",
      defaultValue: "md",
      options: ["sm", "md"],
    },
  ],
  render: (values) => (
    <Badge
      tone={
        textValue(values, "tone") as
          | "blue"
          | "yellow"
          | "red"
          | "white"
          | "black"
      }
      size={textValue(values, "size") as "sm" | "md"}
    >
      {textValue(values, "children")}
    </Badge>
  ),
  getCode: (values) => `<Badge
  tone=${jsxString(textValue(values, "tone"))}
  size=${jsxString(textValue(values, "size"))}
>
  ${jsxText(textValue(values, "children"))}
</Badge>`,
};
