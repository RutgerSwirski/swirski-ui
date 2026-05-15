import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "New drop",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Yellow: Story = {
  args: {
    tone: "yellow",
  },
};

export const Blue: Story = {
  args: {
    tone: "blue",
  },
};

export const Red: Story = {
  args: {
    tone: "red",
  },
};
