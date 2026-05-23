"use client";

import { Separator } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
} from "../playground-utils";

export const separatorPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "orientation",
      label: "orientation",
      type: "select",
      defaultValue: "horizontal",
      options: ["horizontal", "vertical"],
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "black",
      options: ["black", "blue", "red"],
    },
  ],
  render: (values) => {
    const toneClass =
      textValue(values, "tone") === "blue"
        ? "bg-[#0057FF]"
        : textValue(values, "tone") === "red"
          ? "bg-[#FF3131]"
          : "bg-black";

    return (
      <div
        className={
          textValue(values, "orientation") === "vertical" ? "h-40" : "w-full"
        }
      >
        <Separator
          orientation={
            textValue(values, "orientation") as "horizontal" | "vertical"
          }
          className={toneClass}
        />
      </div>
    );
  },
  getCode: (values) => `<Separator
  orientation=${jsxString(textValue(values, "orientation"))}
  className=${jsxString(
    textValue(values, "tone") === "blue"
      ? "bg-[#0057FF]"
      : textValue(values, "tone") === "red"
        ? "bg-[#FF3131]"
        : "bg-black",
  )}
/>`,
};
