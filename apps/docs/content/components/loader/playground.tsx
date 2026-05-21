"use client";

import { Loader } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
} from "../playground-utils";

export const loaderPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "size",
      label: "size",
      type: "select",
      defaultValue: "lg",
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "blue",
      options: ["blue", "yellow", "red", "black"],
    },
    {
      name: "variant",
      label: "variant",
      type: "select",
      defaultValue: "spinner",
      options: ["spinner", "pixel-dots", "pixel-bars", "pixel-blocks"],
    },
  ],
  render: (values) => (
    <Loader
      tone={textValue(values, "tone") as "blue" | "yellow" | "red" | "black"}
      size={textValue(values, "size") as "sm" | "md" | "lg" | "xl" | "2xl"}
      variant={
        textValue(values, "variant") as
          | "spinner"
          | "pixel-dots"
          | "pixel-bars"
          | "pixel-blocks"
      }
    />
  ),
  getCode: (values) =>
    `<Loader 
    tone=${jsxString(textValue(values, "tone"))}
    size=${jsxString(textValue(values, "size"))} 
    variant=${jsxString(textValue(values, "variant"))}
    />`,
};
