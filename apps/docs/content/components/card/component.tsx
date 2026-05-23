import {
  Card,
  CardContent,
  CardTitle,
  Text,
  Title,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const cardComponentDoc: ComponentDoc = {
  slug: "card",
  title: "Card",
  description:
    "A bordered content block for projects, pieces, links and previews.",
  category: "Cards",
  importCode: `import { Card, CardContent, CardTitle, Text } from "@swirski/ui";`,
  usageCode: `<Card>
  <CardContent>
    <CardTitle>Patchwork Jacket</CardTitle>
    <Text className="mt-3" tone="muted" weight="bold">
      A framed content primitive with Swirski borders and shadows.
    </Text>
  </CardContent>
</Card>`,
  compositionCode: `Card
\`-- CardContent
    |-- CardTitle
    \`-- children`,
  preview: (
    <Card>
      <CardContent>
        <CardTitle>Patchwork Jacket</CardTitle>
        <Text className="mt-3" tone="muted" weight="bold">
          A framed content primitive with Swirski borders and shadows.
        </Text>
      </CardContent>
    </Card>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Card body content.",
    },
    {
      name: "interactive",
      type: "boolean",
      defaultValue: "true",
      description: "Enables hover and active movement styles.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the card root.",
    },
    {
      name: "CardContent.className",
      type: "string",
      description: "Adds classes to the padded content wrapper.",
    },
    {
      name: "CardTitle.children",
      type: "ReactNode",
      required: true,
      description: "Title content rendered inside the card heading.",
    },
  ],
};
