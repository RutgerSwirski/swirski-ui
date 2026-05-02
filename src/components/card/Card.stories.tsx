import { Card } from "./Card";
import { CardMedia } from "./CardMedia";
import { CardContent } from "./CardContent";
import { CardTitle } from "./CardTitle";
import { CardMeta } from "./CardMeta";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Card Content",
  },
  render: () => (
    <Card>
      <CardMedia aspect="16/9">
        <img
          src="https://source.unsplash.com/random/800x450"
          alt="Random Unsplash"
          className="object-cover w-full h-full"
        />
      </CardMedia>
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <CardMeta>Meta Information</CardMeta>
        <p className="mt-4 text-sm text-gray-600">
          This is a sample card content. It can include any React nodes.
        </p>
      </CardContent>
    </Card>
  ),
};
