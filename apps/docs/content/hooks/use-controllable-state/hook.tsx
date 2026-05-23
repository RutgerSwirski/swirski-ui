import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@swirski/ui";
import type { HookDoc } from "../../types";

export const useControllableStateHookDoc: HookDoc = {
  slug: "use-controllable-state",
  title: "useControllableState",
  description:
    "A small helper for components that support both controlled and uncontrolled state.",
  category: "Hooks",
  importCode: `import { useControllableState } from "@swirski/ui";`,
  usageCode: `const [value, setValue] = useControllableState({
  value: props.value,
  defaultValue: props.defaultValue ?? "",
  onChange: props.onValueChange,
});`,
  preview: (
    <Alert tone="yellow">
      <AlertTitle>Internal helper</AlertTitle>
      <AlertDescription>
        Use this to keep component APIs consistent across Swirski primitives.
      </AlertDescription>
    </Alert>
  ),
  props: [
    { name: "value", type: "T", description: "Controlled value." },
    {
      name: "defaultValue",
      type: "T",
      required: true,
      description: "Uncontrolled initial value.",
    },
    {
      name: "onChange",
      type: "(value: T) => void",
      description: "Called when the setter resolves a value.",
    },
  ],
  returns: [
    {
      name: "value",
      type: "T",
      description: "Current controlled or uncontrolled value.",
    },
    {
      name: "setValue",
      type: "Dispatch<SetStateAction<T>>",
      description:
        "Updates internal state or calls onChange with the resolved value.",
    },
  ],
};
