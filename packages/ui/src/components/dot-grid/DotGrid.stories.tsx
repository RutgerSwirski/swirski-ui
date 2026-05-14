import type { Meta, StoryObj } from "@storybook/react-vite";
import { DotGrid } from "./DotGrid";

const meta = {
  title: "Components/DotGrid",
  component: DotGrid,
} satisfies Meta<typeof DotGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-100 w-100",
  },
};
