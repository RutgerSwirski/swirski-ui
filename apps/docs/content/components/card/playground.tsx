"use client";

import {
  Card,
  CardContent,
  CardTitle,
  Text,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
  cardSurfaceClasses,
} from "../playground-utils";

export const cardPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "title",
      label: "title",
      type: "text",
      defaultValue: "Patchwork Jacket",
    },
    {
      name: "surface",
      label: "surface",
      type: "select",
      defaultValue: "cream",
      options: ["cream", "white", "yellow"],
    },
    {
      name: "interactive",
      label: "interactive",
      type: "boolean",
      defaultValue: true,
    },
  ],
  render: (values) => {
    const surface = textValue(
      values,
      "surface",
    ) as keyof typeof cardSurfaceClasses;

    return (
      <Card
        className={`max-w-sm ${cardSurfaceClasses[surface]} shadow-[8px_8px_0_#0B0B0C]`}
        interactive={booleanValue(values, "interactive")}
      >
        <CardContent>
          <CardTitle>{textValue(values, "title")}</CardTitle>
          <Text className="mt-3" size="sm" tone="muted" weight="bold">
            A framed content primitive with Swirski borders and shadows.
          </Text>
        </CardContent>
      </Card>
    );
  },
  getCode: (values) => {
    const surface = textValue(values, "surface");
    const surfaceClass =
      cardSurfaceClasses[surface as keyof typeof cardSurfaceClasses];
    const interactive = booleanValue(values, "interactive");

    return `<Card
  className=${jsxString(`max-w-sm ${surfaceClass} shadow-[8px_8px_0_#0B0B0C]`)}
  interactive={${interactive}}
>
  <CardContent>
    <CardTitle>${jsxText(textValue(values, "title"))}</CardTitle>
    <Text className="mt-3" size="sm" tone="muted" weight="bold">
      A framed content primitive with Swirski borders and shadows.
    </Text>
  </CardContent>
</Card>`;
  },
};
