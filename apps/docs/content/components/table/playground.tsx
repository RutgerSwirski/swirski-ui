"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  numberValue,
  booleanValue,
} from "../playground-utils";

export const tablePlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "rows",
      label: "rows",
      type: "number",
      defaultValue: 3,
      min: 1,
      max: 5,
    },
    {
      name: "showValue",
      label: "showValue",
      type: "boolean",
      defaultValue: true,
    },
  ],
  render: (values) => {
    const rows = Math.round(numberValue(values, "rows"));

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Status</TableHeader>
            {booleanValue(values, "showValue") && (
              <TableHeader>Value</TableHeader>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }, (_, index) => (
            <TableRow key={index}>
              <TableCell>Project {index + 1}</TableCell>
              <TableCell>{index % 2 === 0 ? "Live" : "Draft"}</TableCell>
              {booleanValue(values, "showValue") && (
                <TableCell>{`${72 + index * 8}%`}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
  getCode: (values) => `<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Status</TableHeader>${
        booleanValue(values, "showValue")
          ? "\n      <TableHeader>Value</TableHeader>"
          : ""
      }
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.name}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.status}</TableCell>${
          booleanValue(values, "showValue")
            ? "\n        <TableCell>{row.value}</TableCell>"
            : ""
        }
      </TableRow>
    ))}
  </TableBody>
</Table>`,
};
