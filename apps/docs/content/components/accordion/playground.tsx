"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@swirski/ui";
import type { PlaygroundDefinition } from "../../types";
import {
  jsxText,
  textValue,
  booleanValue,
} from "../playground-utils";

export const accordionPlayground: PlaygroundDefinition = {
  controls: [
    {
      name: "firstTitle",
      label: "firstTitle",
      type: "text",
      defaultValue: "What makes it Swirski?",
    },
    {
      name: "secondTitle",
      label: "secondTitle",
      type: "text",
      defaultValue: "Can I customize it?",
    },
    {
      name: "firstOpen",
      label: "firstOpen",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "secondOpen",
      label: "secondOpen",
      type: "boolean",
      defaultValue: false,
    },
  ],
  render: (values) => (
    <Accordion className="max-w-xl">
      <AccordionItem open={booleanValue(values, "firstOpen")}>
        <AccordionTrigger>{textValue(values, "firstTitle")}</AccordionTrigger>
        <AccordionContent>
          Thick borders, punchy color, loud type and plain HTML behavior.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem open={booleanValue(values, "secondOpen")}>
        <AccordionTrigger>
          {textValue(values, "secondTitle")}
        </AccordionTrigger>
        <AccordionContent>
          Every piece accepts className and native element props.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  getCode: (values) => `<Accordion>
  <AccordionItem${booleanValue(values, "firstOpen") ? " open" : ""}>
    <AccordionTrigger>${jsxText(textValue(values, "firstTitle"))}</AccordionTrigger>
    <AccordionContent>
      Thick borders, punchy color, loud type and plain HTML behavior.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem${booleanValue(values, "secondOpen") ? " open" : ""}>
    <AccordionTrigger>${jsxText(textValue(values, "secondTitle"))}</AccordionTrigger>
    <AccordionContent>
      Every piece accepts className and native element props.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
};
