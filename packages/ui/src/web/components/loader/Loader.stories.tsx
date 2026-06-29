import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "./Loader";

const meta = {
  title: "Components/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    tone: "blue",
    variant: "pixel-dots",
  },
  render: (args) => (
    <div className="flex items-center justify-center h-40">
      <Loader {...args} />
    </div>
  ),
};

export const pixelDots: Story = {
  args: {
    size: "md",
    tone: "yellow",
    variant: "pixel-dots",
  },
};
