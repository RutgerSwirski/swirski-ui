import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroKicker } from "./HeroKicker";

const meta = {
  title: "Components/HeroKicker",
  component: HeroKicker,
} satisfies Meta<typeof HeroKicker>;

export default meta;

export const Default: StoryObj<typeof HeroKicker> = {
  args: {
    children: "Hey I'm",
  },
};
