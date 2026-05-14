import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Blue: Story = {
  args: {
    children: "View Work →",
    variant: "blue",
  },
};

export const Yellow: Story = {
  args: {
    children: "Let’s build!",
    variant: "yellow",
  },
};

export const White: Story = {
  args: {
    children: "Read more",
    variant: "white",
  },
};
