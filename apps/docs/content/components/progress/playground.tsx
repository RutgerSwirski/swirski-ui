"use client";

import { Progress } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  textValue,
  numberValue,
} from "../playground-utils";

export const progressPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "value",
      label: "value",
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 100,
    },
    {
      name: "height",
      label: "height",
      type: "select",
      defaultValue: "default",
      options: ["default", "short", "tall"],
    },
  ],
  render: (values) => (
    <Progress
      value={numberValue(values, "value")}
      className={
        textValue(values, "height") === "short"
          ? "h-3"
          : textValue(values, "height") === "tall"
            ? "h-10"
            : undefined
      }
    />
  ),
  getCode: (values) => {
    const height = textValue(values, "height");
    const className =
      height === "short"
        ? ' className="h-3"'
        : height === "tall"
          ? ' className="h-10"'
          : "";

    return `<Progress value={${numberValue(values, "value")}}${className} />`;
  },
};
