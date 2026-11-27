"use client";

import {
  Card,
  CardContent,
  CardTitle,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  jsxText,
  textValue,
  booleanValue,
  cardSurfaceTones,
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
    ) as keyof typeof cardSurfaceTones;

    return (
      <Card
        className="max-w-sm"
        tone={cardSurfaceTones[surface]}
        interactive={booleanValue(values, "interactive")}
      >
        <CardContent>
          <CardTitle>{textValue(values, "title")}</CardTitle>
          <p className="mt-3 text-sm font-bold">
            A framed content primitive with Swirski borders and shadows.
          </p>
        </CardContent>
      </Card>
    );
  },
  getCode: (values) => {
    const surface = textValue(values, "surface");
    const tone = cardSurfaceTones[surface as keyof typeof cardSurfaceTones];
    const interactive = booleanValue(values, "interactive");

    return `<Card
  className="max-w-sm"
  tone=${jsxString(tone)}
  interactive={${interactive}}
>
  <CardContent>
    <CardTitle>${jsxText(textValue(values, "title"))}</CardTitle>
    <p className="mt-3 text-sm font-bold">
      A framed content primitive with Swirski borders and shadows.
    </p>
  </CardContent>
</Card>`;
  },
};
