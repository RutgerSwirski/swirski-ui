import {
  Card,
  CardContent,
  Container,
  Text,
  Title,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const containerComponentDoc: ComponentDoc = {
  slug: "container",
  title: "Container",
  description:
    "A responsive page-width wrapper for sections, shells and documentation layouts.",
  category: "Layout",
  importCode: `import { Container } from "@swirski/ui";`,
  usageCode: `<Container size="md">
  <Card>
    <CardContent>
      <Title order={2} size="h4">Contained section</Title>
      <Text tone="muted" weight="bold">
        Keep page content aligned without rewriting max-width classes.
      </Text>
    </CardContent>
  </Card>
</Container>`,
  preview: (
    <Container
      size="sm"
      className="border-2 border-dashed border-black bg-white py-4"
    >
      <Text weight="black">Responsive content rail</Text>
      <Text size="sm" tone="muted">
        Centered, padded and ready for page sections.
      </Text>
    </Container>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Container content.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      defaultValue: '"lg"',
      description: "Applies the standard max-width.",
    },
    {
      name: "variant",
      type: '"default" | "fluid"',
      defaultValue: '"default"',
      description: "Uses a constrained or full-width layout.",
    },
    {
      name: "tone",
      type: '"default"',
      defaultValue: '"default"',
      description: "Reserved tone hook for Swirski data attributes.",
    },
    {
      name: "asChild",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the child as the root element.",
    },
    {
      name: "...divProps",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "Forwarded to the rendered container.",
    },
  ],
};
