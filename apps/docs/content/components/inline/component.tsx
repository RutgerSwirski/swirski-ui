import { Button, Inline } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const inlineComponentDoc: ComponentDoc = {
  slug: "inline",
  title: "Inline",
  description: "Horizontal alignment for actions, badges, and short groups.",
  category: "Layout",
  importCode: 'import { Inline } from "@swirski/ui";',
  usageCode: `<Inline gap="sm">
  <Button href="/projects">View projects</Button>
  <Button href="/contact" variant="outline">Get in touch</Button>
</Inline>`,
  preview: (
    <Inline gap="sm">
      <Button href="/projects">View projects</Button>
      <Button href="/contact" variant="outline">Get in touch</Button>
    </Inline>
  ),
  props: [
    { name: "gap", type: "Layout gap", defaultValue: '"md"', description: "Space between children." },
    { name: "align", type: '"start" | "center" | "end" | "stretch"', defaultValue: '"center"', description: "Vertical alignment." },
    { name: "wrap", type: "boolean", defaultValue: "true", description: "Wrap children when space runs out." },
  ],
};
