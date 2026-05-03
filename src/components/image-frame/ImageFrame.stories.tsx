import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImageFrame } from "./ImageFrame";

const meta = {
  title: "Components/ImageFrame",
  component: ImageFrame,
} satisfies Meta<typeof ImageFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Image Frame",
    caption: "Caption",
  },
  render: (args) => (
    <div className="w-80">
      <ImageFrame {...args}>
        <img
          width={400}
          height={400}
          src="https://placekitten.com/400/400"
          alt="Kitten"
        />
      </ImageFrame>
    </div>
  ),
};
