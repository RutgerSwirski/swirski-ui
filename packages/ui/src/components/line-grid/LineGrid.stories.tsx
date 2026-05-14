import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineGrid } from "./LineGrid";

const meta = {
  title: "Components/LineGrid",
  component: LineGrid,
} satisfies Meta<typeof LineGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "inset-0",
  },
  render: (args) => (
    <div className="relative h-100 w-100 overflow-hidden bg-white">
      <LineGrid {...args} />
    </div>
  ),
};

export const PopArt: Story = {
  args: {
    accentColor: "#FF3131",
    accentEvery: 4,
    accentThickness: 5,
    className: "inset-0",
    horizontalColor: "#0B0B0C",
    horizontalSpacing: 18,
    horizontalThickness: 2,
    opacity: 0.34,
    verticalColor: "#0057FF",
    verticalSpacing: 26,
    verticalThickness: 1,
  },
  render: (args) => (
    <div className="relative h-100 w-100 overflow-hidden bg-[#FFD400]">
      <LineGrid {...args} />
    </div>
  ),
};
