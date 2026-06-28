import { Card } from "./Card";
import { CardMedia } from "./CardMedia";
import { CardContent } from "./CardContent";
import { CardTitle } from "./CardTitle";
import { CardMeta } from "./CardMeta";
import { Meta, StoryObj } from "@storybook/react-vite";
import { CardBadge } from "./CardBadge";

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
          src="https://source.unsplash.com/random/800x600"
          alt="Random Unsplash"
          className="object-cover w-full h-full"
        />
      </CardMedia>
      <CardContent>
        <CardTitle>Denim Patchwork Flat Cap</CardTitle>
        <CardMeta>Meta Information</CardMeta>
        <p className="mt-4 text-sm text-gray-600">
          This is a sample card content. It can include any React nodes.
        </p>
      </CardContent>
    </Card>
  ),
};

export const StudioCard: Story = {
  args: {
    children: "Card Content",
    interactive: false,
  },

  render: ({ interactive }) => (
    <Card interactive={interactive} className="w-80">
      <CardMedia className="relative" aspect="4/5">
        <CardBadge>Featured</CardBadge>

        <img
          src="https://source.unsplash.com/random/800x600"
          alt=""
          className="object-cover w-full h-full"
        />
      </CardMedia>
      <CardContent>
        <div className="flex  items-center justify-between text-sm uppercase tracking-wide text-(--steel)">
          <span>2026</span>

          <span className="text-blue-600 bg-blue-600/10 px-1.5 py-0.5 rounded">
            Available
          </span>
        </div>

        <CardTitle>Denim Patchwork Flat Cap</CardTitle>
        {/* <CardMeta>Meta Information</CardMeta> */}
        <p className="mt-4 text-sm text-gray-600">
          Patchwork Collection / Accessories
        </p>

        <p className="mt-4 text-sm text-gray-600">
          Size:
          <span className="font-semibold text-black"> XXL</span>
        </p>

        <p className="mt-4 text-sm font-semibold">€ Price</p>
      </CardContent>
    </Card>
  ),
};

export const DevProjectCard: Story = {
  args: {
    children: "Card Content",
  },

  render: () => (
    <Card className="w-80">
      <CardMedia aspect="4/5">
        <img
          src="https://source.unsplash.com/random/800x600"
          alt=""
          className="object-cover w-full h-full"
        />
      </CardMedia>
      <CardContent>
        <CardTitle>Brainial Saas Platform</CardTitle>

        <p className="mt-4 text-sm text-gray-600">
          Led frontend development for 4 years. Built and maintained complex B2B
          SaaS interfaces used in production.
        </p>

        <CardMeta>
          <span>React</span>
          <span>Next</span>
          <span>Tailwind</span>
          <span>GraphQL</span>
        </CardMeta>
      </CardContent>
    </Card>
  ),
};
