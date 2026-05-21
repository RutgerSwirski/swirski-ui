import {
  Card,
  CardContent,
  Grid,
  Text,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const gridComponentDoc: ComponentDoc = {
  slug: "grid",
  title: "Grid",
  description:
    "A reusable CSS grid primitive for page sections, card clusters and dense interface layouts.",
  category: "Layout",
  importCode: `import { Grid } from "@swirski/ui";`,
  usageCode: `<Grid columns={3} gap="md" className="md:grid-cols-3">
  <Card><CardContent>One</CardContent></Card>
  <Card><CardContent>Two</CardContent></Card>
  <Card><CardContent>Three</CardContent></Card>
</Grid>`,
  preview: (
    <Grid className="md:grid-cols-3" gap="md">
      {["One", "Two", "Three"].map((item) => (
        <Card interactive={false} key={item} withShadow={false}>
          <CardContent>
            <Text weight="black">{item}</Text>
          </CardContent>
        </Card>
      ))}
    </Grid>
  ),
  props: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: "Grid content.",
    },
    {
      name: "as",
      type: "ElementType",
      defaultValue: '"div"',
      description: "Custom root element or component.",
    },
    {
      name: "columns",
      type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
      description: "Applies a static grid column count.",
    },
    {
      name: "gap",
      type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
      description: "Applies a standard gap size.",
    },
    {
      name: "align",
      type: '"start" | "center" | "end" | "stretch"',
      description: "Applies item alignment.",
    },
    {
      name: "content",
      type: '"start" | "center" | "end" | "between"',
      description: "Applies grid content alignment.",
    },
    {
      name: "className",
      type: "string",
      description: "Adds classes to the root grid.",
    },
    {
      name: "...elementProps",
      type: "HTMLAttributes<HTMLElement>",
      description: "Forwarded to the root element.",
    },
  ],
};
