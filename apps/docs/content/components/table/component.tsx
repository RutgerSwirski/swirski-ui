import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const tableComponentDoc: ComponentDoc = {
  slug: "table",
  title: "Table",
  description:
    "A bold base table for data lists before adding DataTable behavior.",
  category: "Layout",
  importCode: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@swirski/ui";`,
  usageCode: `<Table>
  <TableHead>
    <TableRow><TableHeader>Name</TableHeader><TableHeader>Status</TableHeader></TableRow>
  </TableHead>
  <TableBody>
    <TableRow><TableCell>Studio</TableCell><TableCell>Live</TableCell></TableRow>
  </TableBody>
</Table>`,
  compositionCode: `Table
|-- TableHead
|   \`-- TableRow
|       \`-- TableHeader
\`-- TableBody
    \`-- TableRow
        \`-- TableCell`,
  preview: (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Studio</TableCell>
          <TableCell>Live</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Docs</TableCell>
          <TableCell>Draft</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  props: [
    {
      name: "Table",
      type: "TableHTMLAttributes<HTMLTableElement>",
      description: "Props forwarded to the table element.",
    },
    {
      name: "TableHeader",
      type: "ThHTMLAttributes<HTMLTableCellElement>",
      description: "Props forwarded to header cells.",
    },
    {
      name: "TableCell",
      type: "TdHTMLAttributes<HTMLTableCellElement>",
      description: "Props forwarded to body cells.",
    },
  ],
};
