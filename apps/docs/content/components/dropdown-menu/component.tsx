import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const dropdownMenuComponentDoc: ComponentDoc = {
  slug: "dropdown-menu",
  title: "DropdownMenu",
  description:
    "A compact actions menu for navs, profile menus and table rows.",
  category: "Interaction",
  importCode: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@swirski/ui";`,
  usageCode: `<DropdownMenu size="lg" variant="compact">
  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  compositionCode: `DropdownMenu
|-- DropdownMenuTrigger
\`-- DropdownMenuContent
    |-- DropdownMenuItem
    |-- DropdownMenuSeparator
    \`-- DropdownMenuItem`,
  preview: (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  props: [
    {
      name: "open / defaultOpen",
      type: "boolean",
      description: "Control disclosure with open and onOpenChange, or initialize it with defaultOpen.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when an interaction requests an open state change.",
    },
    {
      name: "DropdownMenuTrigger",
      type: "ButtonHTMLAttributes<HTMLButtonElement>",
      description: "Button props forwarded to the trigger.",
    },
    {
      name: "DropdownMenuContent.align",
      type: '"start" | "end"',
      defaultValue: '"start"',
      description: "Aligns the menu to the trigger.",
    },
    {
      name: "DropdownMenuItem",
      type: "ButtonHTMLAttributes<HTMLButtonElement>",
      description: "Button props forwarded to each item.",
    },
  ],
};
