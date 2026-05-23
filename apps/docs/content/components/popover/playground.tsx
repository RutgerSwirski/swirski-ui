"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const popoverPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "trigger",
      label: "trigger",
      type: "text",
      defaultValue: "Open note",
    },
    {
      name: "align",
      label: "align",
      type: "select",
      defaultValue: "start",
      options: ["start", "end"],
    },
    {
      name: "defaultOpen",
      label: "defaultOpen",
      type: "boolean",
      defaultValue: true,
    },
  ],
  render: (values) => (
    <Popover
      key={`${textValue(values, "align")}-${booleanValue(values, "defaultOpen")}`}
      defaultOpen={booleanValue(values, "defaultOpen")}
    >
      <PopoverTrigger>{textValue(values, "trigger")}</PopoverTrigger>
      <PopoverContent align={textValue(values, "align") as "start" | "end"}>
        <Text size="sm" tone="muted" weight="bold">
          Popovers are useful for compact context, filters and quick actions.
        </Text>
      </PopoverContent>
    </Popover>
  ),
  getCode: (
    values,
  ) => `<Popover${booleanValue(values, "defaultOpen") ? " defaultOpen" : ""}>
  <PopoverTrigger>${jsxText(textValue(values, "trigger"))}</PopoverTrigger>
  <PopoverContent align=${jsxString(textValue(values, "align"))}>
    Popover content
  </PopoverContent>
</Popover>`,
};
