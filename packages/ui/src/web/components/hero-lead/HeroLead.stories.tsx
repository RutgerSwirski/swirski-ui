import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroLead } from "./HeroLead";

const meta = {
  title: "Components/HeroLead",
  component: HeroLead,
} satisfies Meta<typeof HeroLead>;

export default meta;

export const Default: StoryObj<typeof HeroLead> = {
  args: {
    children: "Hero Lead",
  },
};
