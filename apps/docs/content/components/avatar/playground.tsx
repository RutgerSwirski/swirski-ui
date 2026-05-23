"use client";

import {
  Avatar,
  AvatarFallback,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxText,
  textValue,
} from "../playground-utils";

export const avatarPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "fallback",
      label: "fallback",
      type: "text",
      defaultValue: "RS",
    },
    {
      name: "size",
      label: "size",
      type: "select",
      defaultValue: "md",
      options: ["sm", "md", "lg"],
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "yellow",
      options: ["yellow", "blue", "red"],
    },
  ],
  render: (values) => {
    const sizeClass =
      textValue(values, "size") === "sm"
        ? "size-10"
        : textValue(values, "size") === "lg"
          ? "size-16 text-lg"
          : "";
    const toneClass =
      textValue(values, "tone") === "blue"
        ? "bg-[#0057FF] text-white"
        : textValue(values, "tone") === "red"
          ? "bg-[#FF3131] text-white"
          : "bg-[#FFD400]";

    return (
      <Avatar className={`${sizeClass} ${toneClass}`}>
        <AvatarFallback>{textValue(values, "fallback")}</AvatarFallback>
      </Avatar>
    );
  },
  getCode: (values) => `<Avatar>
  <AvatarFallback>${jsxText(textValue(values, "fallback"))}</AvatarFallback>
</Avatar>`,
};
