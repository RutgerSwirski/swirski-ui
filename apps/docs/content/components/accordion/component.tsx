import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@swirski/ui";
import type { ComponentDoc } from "../../types";

export const accordionComponentDoc: ComponentDoc = {
  slug: "accordion",
  title: "Accordion",
  description:
    "A disclosure component built on details and summary, with no client JavaScript required.",
  category: "Disclosure",
  importCode: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@swirski/ui";`,
  usageCode: `<Accordion>
  <AccordionItem open>
    <AccordionTrigger>What makes it Swirski?</AccordionTrigger>
    <AccordionContent>
      Thick borders, punchy color, loud type and plain HTML behavior.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  compositionCode: `Accordion
\`-- AccordionItem
    |-- AccordionTrigger
    \`-- AccordionContent`,
  preview: (
    <Accordion className="max-w-xl">
      <AccordionItem open>
        <AccordionTrigger>What makes it Swirski?</AccordionTrigger>
        <AccordionContent>
          Thick borders, punchy color, loud type and plain HTML behavior.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Can I customize it?</AccordionTrigger>
        <AccordionContent>
          Every piece accepts className and native element props.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  props: [
    {
      name: "Accordion.className",
      type: "string",
      description: "Adds classes to the accordion wrapper.",
    },
    {
      name: "AccordionItem.open",
      type: "boolean",
      defaultValue: "false",
      description: "Uses the native details open state.",
    },
    {
      name: "AccordionItem.className",
      type: "string",
      description: "Adds classes to the details element.",
    },
    {
      name: "AccordionTrigger.children",
      type: "ReactNode",
      required: true,
      description: "Summary label for the disclosure item.",
    },
    {
      name: "AccordionTrigger.className",
      type: "string",
      description: "Adds classes to the summary element.",
    },
    {
      name: "AccordionContent.className",
      type: "string",
      description: "Adds classes to the content panel.",
    },
    {
      name: "...detailsProps",
      type: "DetailsHTMLAttributes<HTMLDetailsElement>",
      description: "Forwarded to each accordion item.",
    },
  ],
};
