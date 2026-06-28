import type { Meta, StoryObj } from "@storybook/react-vite";
import { Image, View } from "react-native";

import {
  Card,
  CardBadge,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle,
} from "./index";
import { Text } from "../Text";

const meta = {
  title: "Native/Card",
  component: Card,
  args: {
    style: { width: 376 },
    children: (
      <>
        <CardBadge>Featured</CardBadge>
        <CardBadge position="top-right" tone="black">
          Archived
        </CardBadge>
        <CardMedia aspect="4/5">
          <Image
            accessibilityLabel="Blue diamond camp collar shirt on a hanger"
            resizeMode="cover"
            source={{
              uri: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80",
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </CardMedia>
        <CardContent size="lg">
          <CardTitle>Gary Rhodes Camp Collar Shirt</CardTitle>
          <CardMeta>Found Fabric / Tops / 2026</CardMeta>
          <Text size="md" tone="muted" style={{ marginTop: 16 }}>
            One-of-One
          </Text>
        </CardContent>
      </>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <View style={{ gap: 24, maxWidth: 360 }}>
      <Card tone="yellow">
        <CardContent>
          <CardTitle size="sm">Yellow card</CardTitle>
          <CardMeta>High signal</CardMeta>
        </CardContent>
      </Card>
      <Card tone="blue">
        <CardContent>
          <CardTitle size="sm">Blue card</CardTitle>
          <CardMeta>Auto inverted text</CardMeta>
        </CardContent>
      </Card>
      <Card tone="black">
        <CardContent>
          <CardTitle size="sm">Black card</CardTitle>
          <CardMeta>Hard shadow</CardMeta>
        </CardContent>
      </Card>
    </View>
  ),
};

export const Flat: Story = {
  args: {
    variant: "flat",
    withShadow: false,
    children: (
      <CardContent>
        <CardTitle>Flat Card</CardTitle>
        <CardMeta>No shadow, same border language.</CardMeta>
      </CardContent>
    ),
  },
};
