import {
  Card,
  CardContent,
  CardTitle,
  Text,
} from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useLocalStorageHookDoc: HookDoc = {
  slug: "use-local-storage",
  title: "useLocalStorage",
  description: "Persists React state in localStorage with serializer hooks.",
  category: "Hooks",
  importCode: `import { useLocalStorage } from "@swirski/ui";`,
  usageCode: `const [cursor, setCursor, clearCursor] = useLocalStorage(
  "swirski-cursor",
  "bolt",
);`,
  preview: (
    <Card interactive={false} className="max-w-md bg-[#FFD400]">
      <CardContent>
        <CardTitle>Persistent settings</CardTitle>
        <Text className="mt-3" weight="bold">
          Good for cursor choice, theme choice and docs preferences.
        </Text>
      </CardContent>
    </Card>
  ),
  props: [
    {
      name: "key",
      type: "string",
      required: true,
      description: "localStorage key.",
    },
    {
      name: "defaultValue",
      type: "T",
      required: true,
      description: "Fallback value.",
    },
    {
      name: "options.serialize",
      type: "(value: T) => string",
      description: "Custom serializer.",
    },
    {
      name: "options.deserialize",
      type: "(value: string) => T",
      description: "Custom parser.",
    },
  ],
  returns: [
    {
      name: "value",
      type: "T",
      description:
        "Current state, initialized from defaultValue and then hydrated from localStorage.",
    },
    {
      name: "setValue",
      type: "Dispatch<SetStateAction<T>>",
      description: "Updates React state and persists the serialized value.",
    },
    {
      name: "removeValue",
      type: "() => void",
      description:
        "Removes the stored item and resets state to defaultValue.",
    },
  ],
};
