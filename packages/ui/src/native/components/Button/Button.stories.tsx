import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./index";

const meta = {
  title: "Native/Button",
  component: Button,
  args: {
    children: "Press me",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    tone: "blue",
  },
};
