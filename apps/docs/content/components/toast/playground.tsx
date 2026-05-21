"use client";

import {
  Toast,
  ToastDescription,
  ToastTitle,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  toastToneOptions,
} from "../playground-utils";

export const toastPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "title",
      label: "title",
      type: "text",
      defaultValue: "Saved",
    },
    {
      name: "description",
      label: "description",
      type: "text",
      defaultValue: "Your changes are live.",
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "yellow",
      options: [...toastToneOptions],
    },
  ],
  render: (values) => (
    <Toast
      tone={textValue(values, "tone") as "blue" | "yellow" | "red" | "white"}
    >
      <ToastTitle>{textValue(values, "title")}</ToastTitle>
      <ToastDescription>{textValue(values, "description")}</ToastDescription>
    </Toast>
  ),
  getCode: (values) => `<Toast tone=${jsxString(textValue(values, "tone"))}>
  <ToastTitle>${jsxText(textValue(values, "title"))}</ToastTitle>
  <ToastDescription>
    ${jsxText(textValue(values, "description"))}
  </ToastDescription>
</Toast>`,
};
