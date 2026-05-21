"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const breadcrumbPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "current",
      label: "current",
      type: "text",
      defaultValue: "Components",
    },
    {
      name: "separator",
      label: "separator",
      type: "select",
      defaultValue: "/",
      options: ["/", ">", "|"],
    },
    {
      name: "includeMiddle",
      label: "includeMiddle",
      type: "boolean",
      defaultValue: true,
    },
  ],
  render: (values) => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#preview">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          {textValue(values, "separator")}
        </BreadcrumbSeparator>
        {booleanValue(values, "includeMiddle") && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="#preview">Library</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              {textValue(values, "separator")}
            </BreadcrumbSeparator>
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{textValue(values, "current")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  getCode: (values) => `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>${jsxText(textValue(values, "separator"))}</BreadcrumbSeparator>${
      booleanValue(values, "includeMiddle")
        ? `\n    <BreadcrumbItem><BreadcrumbLink href="/components">Library</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator>${jsxText(textValue(values, "separator"))}</BreadcrumbSeparator>`
        : ""
    }
    <BreadcrumbItem><BreadcrumbPage>${jsxText(textValue(values, "current"))}</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
};
