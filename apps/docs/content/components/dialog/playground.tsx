"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const dialogPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "title",
      label: "title",
      type: "text",
      defaultValue: "Publish changes",
    },
    {
      name: "description",
      label: "description",
      type: "text",
      defaultValue: "Review the release notes before this goes live.",
    },
    {
      name: "defaultOpen",
      label: "defaultOpen",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <Dialog
      key={String(booleanValue(values, "defaultOpen"))}
      defaultOpen={booleanValue(values, "defaultOpen")}
    >
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{textValue(values, "title")}</DialogTitle>
          <DialogDescription>
            {textValue(values, "description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose className="bg-[#0057FF] text-white">
            Publish
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  getCode: (
    values,
  ) => `<Dialog${booleanValue(values, "defaultOpen") ? " defaultOpen" : ""}>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>${jsxText(textValue(values, "title"))}</DialogTitle>
      <DialogDescription>
        ${jsxText(textValue(values, "description"))}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
      <DialogClose className="bg-[#0057FF] text-white">Publish</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
};
