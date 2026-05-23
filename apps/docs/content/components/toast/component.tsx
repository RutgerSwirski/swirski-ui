import {
  Toast,
  ToastDescription,
  ToastTitle,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const toastComponentDoc: ComponentDoc = {
  slug: "toast",
  title: "Toast",
  description: "Status messages for save states, confirmations and errors.",
  category: "Feedback",
  importCode: `import { Toast, ToastDescription, ToastTitle } from "@swirski/ui";`,
  usageCode: `<Toast tone="yellow">
  <ToastTitle>Saved</ToastTitle>
  <ToastDescription>Your changes are live.</ToastDescription>
</Toast>`,
  preview: (
    <Toast tone="yellow">
      <ToastTitle>Saved</ToastTitle>
      <ToastDescription>Your changes are live.</ToastDescription>
    </Toast>
  ),
  props: [
    {
      name: "tone",
      type: '"blue" | "yellow" | "red" | "white"',
      defaultValue: '"yellow"',
      description: "Applies the toast color treatment.",
    },
    {
      name: "ToastProvider",
      type: "{ children: ReactNode }",
      description: "Provider for managed toasts and useToast.",
    },
    {
      name: "useToast",
      type: "() => ToastContextValue",
      description: "Adds and removes managed toasts.",
    },
  ],
};
