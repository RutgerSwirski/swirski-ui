"use client";

import {
  Grid,
  Skeleton,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  textValue,
  numberValue,
} from "../playground-utils";

export const skeletonPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "lines",
      label: "lines",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 5,
    },
    {
      name: "blockHeight",
      label: "blockHeight",
      type: "select",
      defaultValue: "medium",
      options: ["small", "medium", "large"],
    },
  ],
  render: (values) => {
    const heightClass =
      textValue(values, "blockHeight") === "small"
        ? "h-8"
        : textValue(values, "blockHeight") === "large"
          ? "h-24"
          : "h-14";

    return (
      <Grid gap="sm" className="w-full max-w-sm">
        {Array.from(
          { length: Math.round(numberValue(values, "lines")) },
          (_, index) => (
            <Skeleton
              className={`${index === 0 ? "w-3/4" : "w-full"} ${heightClass}`}
              key={index}
            />
          ),
        )}
      </Grid>
    );
  },
  getCode: (values) => {
    const heightClass =
      textValue(values, "blockHeight") === "small"
        ? "h-8"
        : textValue(values, "blockHeight") === "large"
          ? "h-24"
          : "h-14";

    return `<Grid gap="sm" className="max-w-sm">
  <Skeleton className="w-3/4 ${heightClass}" />
  <Skeleton className="w-full ${heightClass}" />
</Grid>`;
  },
};
