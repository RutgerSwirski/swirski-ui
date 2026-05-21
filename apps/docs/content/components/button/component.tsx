import { Button } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const buttonComponentDoc: ComponentDoc = {
  slug: "button",
  title: "Button",
  description:
    "A bold Swirski UI button used for links, actions and call-to-actions.",
  category: "Buttons",
  importCode: `import { Button } from "@swirski/ui";`,
  usageCode: `<Button href="/pieces">View pieces</Button>`,
  preview: (
    <Button variant="ghost" tone="yellow">
      View pieces
    </Button>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Button label or inline content.",
    },
    {
      name: "href",
      type: "string",
      description: "Renders the button as an anchor when provided.",
    },
    {
      name: "as",
      type: "ElementType",
      description:
        "Custom component used for the root element, such as Next.js Link.",
    },
    {
      name: "tone",
      type: '"blue" | "yellow" | "red" | "white" | "black"',
      defaultValue: '"blue"',
      description: "Applies the Swirski color treatment.",
    },
    {
      name: "variant",
      type: '"solid" | "outline" | "ghost"',
      defaultValue: '"solid"',
      description: "Controls the visual treatment independently from tone.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      defaultValue: '"md"',
      description: "Controls the button scale.",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Passes button props to a single child element.",
    },
    {
      name: "icon",
      type: '"arrow-up-right" | "github"',
      description: "Adds a bundled icon beside the label.",
    },
    {
      name: "iconSide",
      type: '"left" | "right"',
      defaultValue: '"left"',
      description: "Controls where the optional icon is rendered.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the root button or anchor.",
    },
    {
      name: "...anchorProps",
      type: "AnchorHTMLAttributes<HTMLAnchorElement>",
      description: "Forwarded when the component renders an anchor.",
    },
    {
      name: "...buttonProps",
      type: "ButtonHTMLAttributes<HTMLButtonElement>",
      description: "Forwarded when the component renders a button.",
    },
  ],
};
