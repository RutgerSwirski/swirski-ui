import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion className="max-w-lg">
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
};
