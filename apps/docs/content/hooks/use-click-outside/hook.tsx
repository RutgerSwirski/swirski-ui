import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useClickOutsideHookDoc: HookDoc = {
  slug: "use-click-outside",
  title: "useClickOutside",
  description:
    "Runs a callback when pointer events happen outside a referenced element.",
  category: "Hooks",
  importCode: `import { useClickOutside } from "@swirski/ui";`,
  usageCode: `const ref = useRef<HTMLDivElement>(null);

useClickOutside(ref, () => setOpen(false), {
  enabled: open,
});`,
  preview: (
    <Popover defaultOpen>
      <PopoverTrigger>Outside click</PopoverTrigger>
      <PopoverContent>
        <Text weight="bold" tone="muted">
          Useful for popovers, menus and custom panels.
        </Text>
      </PopoverContent>
    </Popover>
  ),
  props: [
    {
      name: "ref",
      type: "RefObject<HTMLElement | null>",
      required: true,
      description: "Element that owns the inside area.",
    },
    {
      name: "handler",
      type: "(event: Event) => void",
      required: true,
      description: "Runs when the event target is outside the ref.",
    },
    {
      name: "options.enabled",
      type: "boolean",
      defaultValue: "true",
      description: "Turns listeners on or off.",
    },
    {
      name: "options.events",
      type: 'Array<"mousedown" | "pointerdown" | "touchstart">',
      defaultValue: '["pointerdown"]',
      description: "Events to listen for.",
    },
  ],
  returns: [
    {
      name: "return",
      type: "void",
      description:
        "Registers document listeners in an effect and returns no value.",
    },
  ],
};
