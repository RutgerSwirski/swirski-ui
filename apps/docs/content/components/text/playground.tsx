"use client";

import { Text } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
} from "../playground-utils";

export const textPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "children",
      label: "children",
      type: "text",
      defaultValue:
        "A small UI library for expressive, editorial web interfaces.",
    },
    {
      name: "component",
      label: "component",
      type: "select",
      defaultValue: "p",
      options: ["p", "span", "div"],
    },
    {
      name: "size",
      label: "size",
      type: "select",
      defaultValue: "xl",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "muted",
      options: ["default", "muted", "subtle", "inverted"],
    },
    {
      name: "weight",
      label: "weight",
      type: "select",
      defaultValue: "bold",
      options: ["regular", "medium", "bold", "black"],
    },
  ],
  render: (values) => (
    <Text
      component={textValue(values, "component") as "p" | "span" | "div"}
      size={textValue(values, "size") as "xs" | "sm" | "md" | "lg" | "xl"}
      tone={
        textValue(values, "tone") as
          | "default"
          | "muted"
          | "subtle"
          | "inverted"
      }
      weight={
        textValue(values, "weight") as "regular" | "medium" | "bold" | "black"
      }
      className="max-w-xl"
    >
      {textValue(values, "children")}
    </Text>
  ),
  getCode: (values) => `<Text
  component=${jsxString(textValue(values, "component"))}
  size=${jsxString(textValue(values, "size"))}
  tone=${jsxString(textValue(values, "tone"))}
  weight=${jsxString(textValue(values, "weight"))}
>
  ${jsxText(textValue(values, "children"))}
</Text>`,
};
