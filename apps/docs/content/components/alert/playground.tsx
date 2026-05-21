"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
} from "../playground-utils";

export const alertPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "title",
      label: "title",
      type: "text",
      defaultValue: "Heads up",
    },
    {
      name: "description",
      label: "description",
      type: "text",
      defaultValue: "New components are ready to try in your next interface.",
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "yellow",
      options: ["yellow", "blue", "red", "white"],
    },
  ],
  render: (values) => (
    <Alert
      tone={textValue(values, "tone") as "blue" | "yellow" | "red" | "white"}
    >
      <AlertTitle>{textValue(values, "title")}</AlertTitle>
      <AlertDescription>{textValue(values, "description")}</AlertDescription>
    </Alert>
  ),
  getCode: (values) => `<Alert tone=${jsxString(textValue(values, "tone"))}>
  <AlertTitle>${jsxText(textValue(values, "title"))}</AlertTitle>
  <AlertDescription>
    ${jsxText(textValue(values, "description"))}
  </AlertDescription>
</Alert>`,
};
