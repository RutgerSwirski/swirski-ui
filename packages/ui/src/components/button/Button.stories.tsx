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
    tone: "blue",
  },
};

export const Yellow: Story = {
  args: {
    children: "Let’s build!",
    tone: "yellow",
  },
};

export const White: Story = {
  args: {
    children: "Read more",
    tone: "white",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost button",
    variant: "ghost",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline button",
    variant: "outline",
  },
};
