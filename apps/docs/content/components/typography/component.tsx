import {
  Grid,
  Text,
  Title,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const typographyComponentDoc: ComponentDoc = {
  slug: "typography",
  title: "Typography",
  description:
    "Heading and body text primitives with semantic controls, reusable scales and Swirski tone presets.",
  category: "Typography",
  importCode: `import { Text, Title } from "@swirski/ui";`,
  usageCode: `<Title order={1} size="display">Build expressive interfaces.</Title>
<Text size="xl" tone="muted" weight="bold">
  A small UI library for expressive, editorial web interfaces.
</Text>`,
  preview: (
    <Grid gap="sm" className="max-w-xl">
      <Title order={1} size="display">
        Build expressive interfaces.
      </Title>
      <Title order={2} size="h3" tone="muted">
        Without naming every heading after a page section.
      </Title>
      <Text size="xl" tone="muted" weight="bold">
        A small UI library for expressive, editorial web interfaces.
      </Text>
      <Text size="sm" tone="subtle">
        Use it for lead copy, helper text, labels and dense interface notes.
      </Text>
    </Grid>
  ),
  props: [
    {
      name: "Title.children",
      type: "ReactNode",
      required: true,
      description: "Heading content.",
    },
    {
      name: "Title.order",
      type: "1 | 2 | 3 | 4 | 5 | 6",
      defaultValue: "1",
      description: "Chooses the semantic heading element.",
    },
    {
      name: "Title.size",
      type: '"display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
      description: "Overrides the visual heading scale.",
    },
    {
      name: "Title.tone",
      type: '"default" | "muted" | "inverted"',
      defaultValue: '"default"',
      description: "Applies the standard title color treatment.",
    },
    {
      name: "Title.as",
      type: "ElementType",
      description: "Custom heading element or component.",
    },
    {
      name: "Title.asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the child as the root element.",
    },
    {
      name: "Text.children",
      type: "ReactNode",
      required: true,
      description: "Text content.",
    },
    {
      name: "Text.component",
      type: '"p" | "span" | "div"',
      defaultValue: '"p"',
      description: "Chooses the rendered text element.",
    },
    {
      name: "Text.size",
      type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
      defaultValue: '"md"',
      description: "Applies the standard text scale.",
    },
    {
      name: "Text.variant",
      type: '"default" | "lead" | "caption"',
      defaultValue: '"default"',
      description: "Applies the standard text role treatment.",
    },
    {
      name: "Text.tone",
      type: '"default" | "muted" | "subtle" | "inverted"',
      defaultValue: '"default"',
      description: "Applies the standard text color treatment.",
    },
    {
      name: "Text.weight",
      type: '"regular" | "medium" | "bold" | "black"',
      defaultValue: '"regular"',
      description: "Applies the text weight.",
    },
    {
      name: "Text.as",
      type: "ElementType",
      description: "Custom text element or component.",
    },
    {
      name: "Text.asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the child as the root element.",
    },
  ],
};
