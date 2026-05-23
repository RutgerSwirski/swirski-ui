import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const dialogComponentDoc: ComponentDoc = {
  slug: "dialog",
  title: "Dialog",
  description:
    "A modal overlay for confirmations, details and focused forms.",
  category: "Interaction",
  importCode: `import { Dialog, DialogContent, DialogTrigger } from "@swirski/ui";`,
  usageCode: `<Dialog>
  <DialogTrigger>Open dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete piece?</DialogTitle>
      <DialogDescription>This action needs confirmation.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>Cancel</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  compositionCode: `Dialog
|-- DialogTrigger
\`-- DialogContent
    |-- DialogHeader
    |   |-- DialogTitle
    |   \`-- DialogDescription
    |-- DialogFooter
    \`-- DialogClose`,
  preview: (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete piece?</DialogTitle>
          <DialogDescription>
            This action needs confirmation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  props: [
    { name: "open", type: "boolean", description: "Controlled open state." },
    {
      name: "defaultOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Initial uncontrolled open state.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when the dialog opens or closes.",
    },
    {
      name: "className",
      type: "string",
      description: "Available on trigger, content and layout slots.",
    },
  ],
};
