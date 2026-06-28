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
    className: "inset-0",
  },
  render: (args) => (
    <div className="relative h-100 w-100 overflow-hidden bg-white">
      <DotGrid {...args} />
    </div>
  ),
};

export const PopArt: Story = {
  args: {
    accentColor: "#FF3131",
    accentDotSize: 5,
    accentEvery: 5,
    className: "inset-0",
    color: "#0B0B0C",
    opacity: 0.38,
    spacing: 14,
    dotSize: 1.8,
  },
  render: (args) => (
    <div className="relative h-100 w-100 overflow-hidden bg-[#FFD400]">
      <DotGrid {...args} />
    </div>
  ),
};
