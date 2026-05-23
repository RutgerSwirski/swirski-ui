"use client";

import {
  Button,
  CursorDock,
  CursorProvider,
  swirskiCursors,
} from "@swirski/ui";
import type { CursorId } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
} from "../playground-utils";

export const cursorPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "cursor",
      label: "cursor",
      type: "select",
      defaultValue: String(swirskiCursors[0]?.id ?? "bolt"),
      options: swirskiCursors.map((cursor) => String(cursor.id)),
    },
    {
      name: "side",
      label: "side",
      type: "select",
      defaultValue: "right",
      options: ["left", "right"],
    },
  ],
  render: (values) => (
    <CursorProvider
      className="relative min-h-72 overflow-hidden border-4 border-black bg-[#F5F5F3] p-6"
      cursor={textValue(values, "cursor") as CursorId}
      storageKey={false}
    >
      <CursorDock
        position="absolute"
        side={textValue(values, "side") as "left" | "right"}
      />
      <div className="flex min-h-48 flex-col justify-center gap-5">
        <Button tone="yellow">Hover me</Button>
        <Button className="w-fit" href="#preview" tone="white">
          Link cursor
        </Button>
        <div className="grid gap-3 sm:grid-cols-3">
          <div
            className="grid min-h-20 place-items-center border-4 border-black bg-[#0057FF] p-3 text-center font-black uppercase text-white"
            data-cursor="pan"
          >
            Pan board
          </div>
          <div
            aria-busy="true"
            className="grid min-h-20 place-items-center border-4 border-black bg-[#FFD400] p-3 text-center font-black uppercase"
          >
            Busy
          </div>
          <button
            className="min-h-20 border-4 border-black bg-neutral-200 p-3 font-black uppercase text-black/50"
            disabled
            type="button"
          >
            Locked
          </button>
        </div>
      </div>
    </CursorProvider>
  ),
  getCode: (values) => `<CursorProvider
  className="relative min-h-72 overflow-hidden border-4 border-black bg-[#F5F5F3] p-6"
  cursor=${jsxString(textValue(values, "cursor"))}
  storageKey={false}
>
  <CursorDock position="absolute" side=${jsxString(textValue(values, "side"))} />
  <div className="flex min-h-48 flex-col justify-center gap-5">
    <Button tone="yellow">Hover me</Button>
    <Button className="w-fit" href="#preview" tone="white">
      Link cursor
    </Button>
    <div className="grid gap-3 sm:grid-cols-3">
      <div
        className="grid min-h-20 place-items-center border-4 border-black bg-[#0057FF] p-3 text-center font-black uppercase text-white"
        data-cursor="pan"
      >
        Pan board
      </div>
      <div
        aria-busy="true"
        className="grid min-h-20 place-items-center border-4 border-black bg-[#FFD400] p-3 text-center font-black uppercase"
      >
        Busy
      </div>
      <button
        className="min-h-20 border-4 border-black bg-neutral-200 p-3 font-black uppercase text-black/50"
        disabled
        type="button"
      >
        Locked
      </button>
    </div>
  </div>
</CursorProvider>`,
};
