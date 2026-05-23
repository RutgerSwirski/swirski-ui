import { Pagination } from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const paginationComponentDoc: ComponentDoc = {
  slug: "pagination",
  title: "Pagination",
  description: "Page controls for tables, lists and archives.",
  category: "Layout",
  importCode: `import { Pagination } from "@swirski/ui";`,
  usageCode: `<Pagination page={2} total={5} />`,
  preview: <Pagination page={2} total={5} />,
  props: [
    {
      name: "page",
      type: "number",
      required: true,
      description: "Current page.",
    },
    {
      name: "total",
      type: "number",
      required: true,
      description: "Total number of pages.",
    },
    {
      name: "onPageChange",
      type: "(page: number) => void",
      description: "Called when a page button is pressed.",
    },
  ],
};
