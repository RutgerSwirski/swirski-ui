import {
  Button,
  CursorDock,
  CursorProvider,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const cursorComponentDoc: ComponentDoc = {
  slug: "cursor",
  title: "Cursor",
  description:
    "A playful pixel-art cursor provider with arrow, hover, click, text, zoom, panning and status states.",
  category: "Interaction",
  importCode: `import { Button, CursorProvider, CursorDock } from "@swirski/ui";`,
  usageCode: `<CursorProvider>
  <CursorDock />
  <Button href="/components">Hover me</Button>
  <div data-cursor="pan">Pan surface</div>
</CursorProvider>`,
  preview: (
    <CursorProvider className="relative min-h-64 space-y-6 overflow-hidden p-2">
      <CursorDock position="absolute" />
      <div className="flex flex-wrap items-center gap-4">
        <Button tone="yellow">Hover me</Button>
        <Button href="/components/cursor" tone="white">
          Link cursor
        </Button>
        <Button disabled tone="white">
          Locked
        </Button>
      </div>
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
        <div
          className="grid min-h-20 place-items-center border-4 border-black bg-white p-3 text-center font-black uppercase"
          data-cursor="crosshair"
        >
          Target
        </div>
      </div>
    </CursorProvider>
  ),
  props: [
    {
      name: "CursorProvider.children",
      type: "ReactNode",
      required: true,
      description: "Content that should receive the Swirski cursor styles.",
    },
    {
      name: "CursorProvider.cursor",
      type: "CursorId",
      description: "Controlled cursor id.",
    },
    {
      name: "CursorProvider.defaultCursor",
      type: "CursorId",
      defaultValue: '"bolt"',
      description: "Initial cursor when the provider is uncontrolled.",
    },
    {
      name: "CursorProvider.cursors",
      type: "SwirskiCursor[]",
      description:
        "Custom cursor sets. Optional fields can supply pointer, active, disabled, text, zoom, grab, grabbing, busy and status cursor assets.",
    },
    {
      name: "CursorProvider.storageKey",
      type: "string | false",
      defaultValue: '"swirski-cursor"',
      description: "Local storage key, or false to skip persistence.",
    },
    {
      name: "data-cursor",
      type: '"pointer" | "active" | "disabled" | "text" | "zoom-in" | "zoom-out" | "pan" | "grab" | "grabbing" | "move" | "resize" | "copy" | "crosshair" | "help" | "progress" | "wait" | "not-allowed"',
      description:
        "Opts any descendant into a specific cursor state. Tailwind cursor utility classes are recognized too.",
    },
    {
      name: "CursorDock.position",
      type: '"fixed" | "absolute"',
      defaultValue: '"fixed"',
      description: "Positions the dock against the viewport or parent.",
    },
    {
      name: "CursorDock.side",
      type: '"left" | "right"',
      defaultValue: '"right"',
      description: "Side where the cursor dock opens.",
    },
    {
      name: "CursorDock.label",
      type: "string",
      defaultValue: '"Choose cursor"',
      description: "Accessible label for the dock trigger.",
    },
  ],
};
