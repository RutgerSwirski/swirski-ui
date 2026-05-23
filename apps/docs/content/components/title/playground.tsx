"use client";

import { Title } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  numberValue,
} from "../playground-utils";

export const titlePlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "children",
      label: "children",
      type: "text",
      defaultValue: "Build expressive interfaces.",
    },
    {
      name: "order",
      label: "order",
      type: "select",
      defaultValue: "1",
      options: ["1", "2", "3", "4", "5", "6"],
    },
    {
      name: "size",
      label: "size",
      type: "select",
      defaultValue: "display",
      options: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "default",
      options: ["default", "muted", "inverted"],
    },
  ],
  render: (values) => (
    <Title
      order={numberValue(values, "order") as 1 | 2 | 3 | 4 | 5 | 6}
      size={
        textValue(values, "size") as
          | "display"
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6"
      }
      tone={textValue(values, "tone") as "default" | "muted" | "inverted"}
      className="max-w-2xl"
    >
      {textValue(values, "children")}
    </Title>
  ),
  getCode: (values) => `<Title
  order={${numberValue(values, "order")}}
  size=${jsxString(textValue(values, "size"))}
  tone=${jsxString(textValue(values, "tone"))}
>
  ${jsxText(textValue(values, "children"))}
</Title>`,
};
