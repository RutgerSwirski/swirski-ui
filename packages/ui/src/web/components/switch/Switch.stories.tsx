import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: {
    label: "Studio mode",
    description: "Use a native checkbox with switch semantics.",
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = {
  args: {
    defaultChecked: true,
  },
};
