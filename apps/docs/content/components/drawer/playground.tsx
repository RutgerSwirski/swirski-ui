"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const drawerPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "title",
      label: "title",
      type: "text",
      defaultValue: "Settings",
    },
    {
      name: "side",
      label: "side",
      type: "select",
      defaultValue: "right",
      options: ["left", "right", "top", "bottom"],
    },
    {
      name: "defaultOpen",
      label: "defaultOpen",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <Drawer
      key={`${textValue(values, "side")}-${booleanValue(values, "defaultOpen")}`}
      defaultOpen={booleanValue(values, "defaultOpen")}
    >
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent
        side={
          textValue(values, "side") as "left" | "right" | "top" | "bottom"
        }
      >
        <DrawerHeader>
          <DrawerTitle>{textValue(values, "title")}</DrawerTitle>
          <DrawerDescription>Panel content lives here.</DrawerDescription>
        </DrawerHeader>
        <DrawerClose>Close</DrawerClose>
      </DrawerContent>
    </Drawer>
  ),
  getCode: (
    values,
  ) => `<Drawer${booleanValue(values, "defaultOpen") ? " defaultOpen" : ""}>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent side=${jsxString(textValue(values, "side"))}>
    <DrawerHeader>
      <DrawerTitle>${jsxText(textValue(values, "title"))}</DrawerTitle>
      <DrawerDescription>Panel content lives here.</DrawerDescription>
    </DrawerHeader>
    <DrawerClose>Close</DrawerClose>
  </DrawerContent>
</Drawer>`,
};
