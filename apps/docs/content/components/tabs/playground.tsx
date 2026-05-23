"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxString,
  textValue,
  booleanValue,
} from "../playground-utils";

export const tabsPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "defaultValue",
      label: "defaultValue",
      type: "select",
      defaultValue: "preview",
      options: ["preview", "code", "notes"],
    },
    {
      name: "showNotes",
      label: "showNotes",
      type: "boolean",
      defaultValue: true,
    },
  ],
  render: (values) => (
    <Tabs
      key={`${textValue(values, "defaultValue")}-${booleanValue(values, "showNotes")}`}
      defaultValue={textValue(values, "defaultValue")}
    >
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        {booleanValue(values, "showNotes") && (
          <TabsTrigger value="notes">Notes</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
      {booleanValue(values, "showNotes") && (
        <TabsContent value="notes">Notes content</TabsContent>
      )}
    </Tabs>
  ),
  getCode: (
    values,
  ) => `<Tabs defaultValue=${jsxString(textValue(values, "defaultValue"))}>
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>${
      booleanValue(values, "showNotes")
        ? `\n    <TabsTrigger value="notes">Notes</TabsTrigger>`
        : ""
    }
  </TabsList>
  <TabsContent value="preview">Preview content</TabsContent>
  <TabsContent value="code">Code content</TabsContent>${
    booleanValue(values, "showNotes")
      ? `\n  <TabsContent value="notes">Notes content</TabsContent>`
      : ""
  }
</Tabs>`,
};
