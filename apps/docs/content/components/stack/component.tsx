import { Stack, Text } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const stackComponentDoc: ComponentDoc = {
  slug: "stack",
  title: "Stack",
  description: "Vertical spacing for form sections and content.",
  category: "Layout",
  importCode: 'import { Stack } from "@swirski/ui";',
  usageCode: `<Stack gap="sm">
  <Text weight="bold">Shipping address</Text>
  <Text tone="muted">Tell us where to send your piece.</Text>
</Stack>`,
  preview: (
    <Stack gap="sm">
      <Text weight="bold">Shipping address</Text>
      <Text tone="muted">Tell us where to send your piece.</Text>
    </Stack>
  ),
  props: [
    { name: "gap", type: "Layout gap", defaultValue: '"md"', description: "Space between children." },
    { name: "align", type: '"start" | "center" | "end" | "stretch"', defaultValue: '"stretch"', description: "Horizontal alignment." },
  ],
};
