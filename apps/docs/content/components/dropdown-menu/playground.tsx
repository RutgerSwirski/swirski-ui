"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const dropdownMenuPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "trigger",
      label: "trigger",
      type: "text",
      defaultValue: "Actions",
    },
    {
      name: "align",
      label: "align",
      type: "select",
      defaultValue: "start",
      options: ["start", "end"],
    },
    {
      name: "dangerItem",
      label: "dangerItem",
      type: "boolean",
      defaultValue: true,
    },
  ],
  render: (values) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {textValue(values, "trigger")}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={textValue(values, "align") as "start" | "end"}
      >
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        {booleanValue(values, "dangerItem") && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[#FF3131]">
              Archive
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  getCode: (values) => `<DropdownMenu>
  <DropdownMenuTrigger>${jsxText(textValue(values, "trigger"))}</DropdownMenuTrigger>
  <DropdownMenuContent align=${jsxString(textValue(values, "align"))}>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>${
      booleanValue(values, "dangerItem")
        ? `\n    <DropdownMenuSeparator />\n    <DropdownMenuItem className="text-[#FF3131]">Archive</DropdownMenuItem>`
        : ""
    }
  </DropdownMenuContent>
</DropdownMenu>`,
};
