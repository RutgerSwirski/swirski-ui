import { Badge } from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useEscapeKeyHookDoc: HookDoc = {
  slug: "use-escape-key",
  title: "useEscapeKey",
  description: "Runs a callback when Escape is pressed.",
  category: "Hooks",
  importCode: `import { useEscapeKey } from "@swirski/ui";`,
  usageCode: `useEscapeKey(() => setOpen(false), {
  enabled: open,
});`,
  preview: <Badge tone="black">Escape listener for overlays</Badge>,
  props: [
    {
      name: "handler",
      type: "(event: KeyboardEvent) => void",
      required: true,
      description: "Runs when Escape is pressed.",
    },
    {
      name: "options.enabled",
      type: "boolean",
      defaultValue: "true",
      description: "Turns the key listener on or off.",
    },
    {
      name: "options.target",
      type: "Document | HTMLElement | Window | null",
      description: "Event target, defaults to document.",
    },
  ],
  returns: [
    {
      name: "return",
      type: "void",
      description:
        "Registers a keydown listener in an effect and returns no value.",
    },
  ],
};
