import type { Meta, StoryObj } from "@storybook/react-vite";
import { DiagonalLines } from "./DiagonalLines";

const meta = {
  title: "Components/DiagonalLines",
  component: DiagonalLines,
} satisfies Meta<typeof DiagonalLines>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "inset-0",
  },
  render: (args) => (
    <div className="relative h-100 w-100 overflow-hidden bg-white">
      <DiagonalLines {...args} />
    </div>
  ),
};

export const PopArt: Story = {
  args: {
    accentColor: "#FF3131",
    accentEvery: 1,
    accentThickness: 8,
    angle: -55,
    className: "inset-0",
    color: "#0B0B0C",
    opacity: 0.3,
    spacing: 18,
    thickness: 2,
  },
  render: (args) => (
    <div className="relative h-100 w-100 overflow-hidden bg-[#FFD400]">
      <DiagonalLines {...args} />
    </div>
  ),
};
