import {
  Badge,
  Button,
  Card,
  CardContent,
  Text,
} from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useDisclosureHookDoc: HookDoc = {
  slug: "use-disclosure",
  title: "useDisclosure",
  description:
    "Boolean open/close/toggle state for dialogs, drawers, popovers and custom disclosure UI.",
  category: "Hooks",
  importCode: `import { useDisclosure } from "@swirski/ui";`,
  usageCode: `const [opened, handlers] = useDisclosure(false);

<Button onClick={handlers.toggle}>
  {opened ? "Close" : "Open"}
</Button>`,
  preview: (
    <Card
      interactive={false}
      className="max-w-md bg-white shadow-[7px_7px_0_#0B0B0C]"
    >
      <CardContent>
        <Badge tone="blue">Disclosure state</Badge>
        <Text className="mt-4" tone="muted" weight="bold">
          Returns opened plus open, close, toggle and set handlers.
        </Text>
      </CardContent>
    </Card>
  ),
  props: [
    {
      name: "defaultOpened",
      type: "boolean",
      defaultValue: "false",
      description: "Initial uncontrolled disclosure state.",
    },
    {
      name: "options.value",
      type: "boolean",
      description: "Controlled disclosure state.",
    },
    {
      name: "options.onChange",
      type: "(opened: boolean) => void",
      description: "Called whenever state changes.",
    },
  ],
  returns: [
    {
      name: "opened",
      type: "boolean",
      description: "Current disclosure state.",
    },
    {
      name: "handlers.open",
      type: "() => void",
      description: "Sets the disclosure state to open.",
    },
    {
      name: "handlers.close",
      type: "() => void",
      description: "Sets the disclosure state to closed.",
    },
    {
      name: "handlers.toggle",
      type: "() => void",
      description: "Flips the current disclosure state.",
    },
    {
      name: "handlers.set",
      type: "(opened: boolean) => void",
      description: "Sets the disclosure state directly.",
    },
  ],
};
