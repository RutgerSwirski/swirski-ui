import { Meta, StoryObj } from "@storybook/react-vite";
import { SectionLabel } from "./SectionLabel";

const meta = {
  title: "Components/SectionLabel",
  component: SectionLabel,
} satisfies Meta<typeof SectionLabel>;

export default meta;

type Story = StoryObj<typeof SectionLabel>;

export const Default: Story = {
  args: {
    children: "Section Label",
  },
};
