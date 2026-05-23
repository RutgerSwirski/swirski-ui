"use client";

import {
  Card,
  CardContent,
  Grid,
  Text,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  numberValue,
  gridColumnOptions,
  gridGapOptions,
} from "../playground-utils";

export const gridPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "columns",
      label: "columns",
      type: "select",
      defaultValue: "3",
      options: [...gridColumnOptions],
    },
    {
      name: "gap",
      label: "gap",
      type: "select",
      defaultValue: "md",
      options: [...gridGapOptions],
    },
    {
      name: "items",
      label: "items",
      type: "number",
      defaultValue: 3,
      min: 1,
      max: 6,
    },
  ],
  render: (values) => (
    <Grid
      columns={Number(textValue(values, "columns")) as 1 | 2 | 3 | 4 | 6}
      gap={textValue(values, "gap") as "xs" | "sm" | "md" | "lg" | "xl"}
      className="w-full"
    >
      {Array.from(
        { length: Math.round(numberValue(values, "items")) },
        (_, index) => (
          <Card interactive={false} key={index} withShadow={false}>
            <CardContent>
              <Text weight="black">Item {index + 1}</Text>
            </CardContent>
          </Card>
        ),
      )}
    </Grid>
  ),
  getCode: (
    values,
  ) => `<Grid columns={${Number(textValue(values, "columns"))}} gap=${jsxString(textValue(values, "gap"))}>
  {items.map((item) => (
    <Card key={item.id}>
      <CardContent>{item.label}</CardContent>
    </Card>
  ))}
</Grid>`,
};
