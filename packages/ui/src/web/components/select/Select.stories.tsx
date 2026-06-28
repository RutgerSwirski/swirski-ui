import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const options = [
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
  { value: "white", label: "White" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    options,
    defaultValue: "yellow",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    defaultValue: "",
    placeholder: "Pick a tone",
  },
};
