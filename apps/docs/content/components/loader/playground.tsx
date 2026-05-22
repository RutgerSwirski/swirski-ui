"use client";

import {
  Loader,
  type LoaderSize,
  type LoaderTone,
  type LoaderVariant,
} from "@swirski/ui";
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
      options: ["blue", "yellow", "red", "pink", "green", "black"],
    },
    {
      name: "variant",
      label: "variant",
      type: "select",
      defaultValue: "pixel-dots",
      options: ["pixel-dots", "pixel-bars", "pixel-blocks", "pixel-scan"],
    },
  ],
  render: (values) => (
    <Loader
      tone={textValue(values, "tone") as LoaderTone}
      size={textValue(values, "size") as LoaderSize}
      variant={textValue(values, "variant") as LoaderVariant}
    />
  ),
  getCode: (values) =>
    `<Loader 
    tone=${jsxString(textValue(values, "tone"))}
    size=${jsxString(textValue(values, "size"))} 
    variant=${jsxString(textValue(values, "variant"))}
    />`,
};
