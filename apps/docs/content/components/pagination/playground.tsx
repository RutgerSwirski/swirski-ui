"use client";

import { Pagination } from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import { numberValue } from "../playground-utils";

export const paginationPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "page",
      label: "page",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 8,
    },
    {
      name: "total",
      label: "total",
      type: "number",
      defaultValue: 5,
      min: 2,
      max: 8,
    },
  ],
  render: (values) => {
    const total = Math.round(numberValue(values, "total"));
    const page = Math.min(Math.round(numberValue(values, "page")), total);

    return <Pagination page={page} total={total} />;
  },
  getCode: (values) => {
    const total = Math.round(numberValue(values, "total"));
    const page = Math.min(Math.round(numberValue(values, "page")), total);

    return `<Pagination page={${page}} total={${total}} />`;
  },
};
