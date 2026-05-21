import {
  Badge,
  Button,
  Card,
  CardContent,
  Text,
} from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useClipboardHookDoc: HookDoc = {
  slug: "use-clipboard",
  title: "useClipboard",
  description: "Copies text to the clipboard and tracks copied/error state.",
  category: "Hooks",
  importCode: `import { useClipboard } from "@swirski/ui";`,
  usageCode: `const clipboard = useClipboard();

<Button onClick={() => clipboard.copy("pnpm add @swirski/ui")}>
  {clipboard.copied ? "Copied" : "Copy"}
</Button>`,
  preview: (
    <Card interactive={false} className="max-w-md bg-white">
      <CardContent>
        <Badge tone="yellow">Clipboard</Badge>
        <Text className="mt-4" tone="muted" weight="bold">
          Used by the docs copy buttons and handy for snippets.
        </Text>
      </CardContent>
    </Card>
  ),
  props: [
    {
      name: "options.timeout",
      type: "number",
      defaultValue: "1600",
      description: "Copied-state reset delay in milliseconds.",
    },
  ],
  returns: [
    {
      name: "copied",
      type: "boolean",
      description: "True immediately after a successful copy.",
    },
    {
      name: "copy",
      type: "(value: string) => Promise<void>",
      description: "Copies text to the clipboard.",
    },
    { name: "error", type: "Error | null", description: "Last copy error." },
    {
      name: "reset",
      type: "() => void",
      description: "Clears copied and error state.",
    },
  ],
};
