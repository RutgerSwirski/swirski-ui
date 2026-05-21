import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const tabsComponentDoc: ComponentDoc = {
  slug: "tabs",
  title: "Tabs",
  description: "Tabbed sections for settings, dashboards and previews.",
  category: "Interaction",
  importCode: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@swirski/ui";`,
  usageCode: `<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">Preview content</TabsContent>
  <TabsContent value="code">Code content</TabsContent>
</Tabs>`,
  compositionCode: `Tabs
|-- TabsList
|   \`-- TabsTrigger
\`-- TabsContent`,
  preview: (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
    </Tabs>
  ),
  props: [
    {
      name: "defaultValue",
      type: "string",
      required: true,
      description: "Initial active tab value.",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled active tab value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Called when a tab is selected.",
    },
    {
      name: "TabsTrigger.value",
      type: "string",
      required: true,
      description: "Value this trigger activates.",
    },
  ],
};
