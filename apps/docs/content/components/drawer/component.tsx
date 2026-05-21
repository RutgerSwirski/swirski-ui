import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const drawerComponentDoc: ComponentDoc = {
  slug: "drawer",
  title: "Drawer",
  description:
    "A side sheet for mobile menus, settings panels and command surfaces.",
  category: "Interaction",
  importCode: `import { Drawer, DrawerContent, DrawerTrigger } from "@swirski/ui";`,
  usageCode: `<Drawer>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Panel content lives here.</DrawerDescription>
    </DrawerHeader>
    <DrawerClose>Close</DrawerClose>
  </DrawerContent>
</Drawer>`,
  compositionCode: `Drawer
|-- DrawerTrigger
\`-- DrawerContent
    |-- DrawerHeader
    |   |-- DrawerTitle
    |   \`-- DrawerDescription
    \`-- DrawerClose`,
  preview: (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Panel content lives here.</DrawerDescription>
        </DrawerHeader>
        <DrawerClose>Close</DrawerClose>
      </DrawerContent>
    </Drawer>
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
      name: "DrawerContent.side",
      type: '"left" | "right" | "top" | "bottom"',
      defaultValue: '"right"',
      description: "Where the drawer enters from.",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when the drawer opens or closes.",
    },
  ],
};
