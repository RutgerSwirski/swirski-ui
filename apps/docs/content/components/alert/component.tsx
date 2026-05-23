import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const alertComponentDoc: ComponentDoc = {
  slug: "alert",
  title: "Alert",
  description:
    "A loud composable feedback block for announcements, errors and status messages.",
  category: "Feedback",
  importCode: `import { Alert, AlertTitle, AlertDescription } from "@swirski/ui";`,
  usageCode: `<Alert tone="yellow">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>New components are ready to try.</AlertDescription>
</Alert>`,
  preview: (
    <Alert tone="yellow">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        New components are ready to try in your next interface.
      </AlertDescription>
    </Alert>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Alert content, usually AlertTitle and AlertDescription.",
    },
    {
      name: "tone",
      type: '"blue" | "yellow" | "red" | "white"',
      defaultValue: '"yellow"',
      description: "Applies the alert surface color.",
    },
    {
      name: "role",
      type: "AriaRole",
      defaultValue: '"status"',
      description: "Accessible live-region role for the alert container.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the root alert.",
    },
    {
      name: "AlertTitle.className",
      type: "string",
      description: "Adds classes to the title heading.",
    },
    {
      name: "AlertDescription.className",
      type: "string",
      description: "Adds classes to the description paragraph.",
    },
  ],
};
