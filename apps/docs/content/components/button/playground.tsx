"use client";

import { Button } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const buttonPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "children",
      label: "children",
      type: "text",
      defaultValue: "View pieces",
    },
    {
      name: "tone",
      label: "tone",
      type: "select",
      defaultValue: "blue",
      options: ["blue", "yellow", "white"],
    },
    {
      name: "icon",
      label: "icon",
      type: "select",
      defaultValue: "none",
      options: ["none", "arrow-up-right", "github"],
    },
    {
      name: "variant",
      label: "variant",
      type: "select",
      defaultValue: "solid",
      options: ["solid", "outline", "ghost"],
    },
    {
      name: "iconSide",
      label: "iconSide",
      type: "select",
      defaultValue: "left",
      options: ["left", "right"],
    },
    { name: "href", label: "href", type: "boolean", defaultValue: true },
    {
      name: "disabled",
      label: "disabled",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => {
    const asLink = booleanValue(values, "href");
    const icon = textValue(values, "icon");

    return (
      <Button
        disabled={!asLink && booleanValue(values, "disabled")}
        href={asLink ? "#preview" : undefined}
        icon={
          icon === "none" ? undefined : (icon as "arrow-up-right" | "github")
        }
        iconSide={textValue(values, "iconSide") as "left" | "right"}
        tone={textValue(values, "tone") as "blue" | "yellow" | "white"}
        variant={
          textValue(values, "variant") as "solid" | "outline" | "ghost"
        }
      >
        {textValue(values, "children")}
      </Button>
    );
  },
  getCode: (values) => {
    const asLink = booleanValue(values, "href");
    const icon = textValue(values, "icon");
    const props = [
      asLink ? 'href="#preview"' : null,
      `tone=${jsxString(textValue(values, "tone"))}`,
      icon !== "none" ? `icon=${jsxString(icon)}` : null,
      icon !== "none"
        ? `iconSide=${jsxString(textValue(values, "iconSide"))}`
        : null,
      !asLink && booleanValue(values, "disabled") ? "disabled" : null,
    ].filter(Boolean);

    return `<Button ${props.join(" ")}>
  ${jsxText(textValue(values, "children"))}
</Button>`;
  },
};
