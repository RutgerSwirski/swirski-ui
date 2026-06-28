import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import {
  Card,
  CardBadge,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle,
} from "./index";

const meta = {
  title: "Native/Card",
  component: Card,
  args: {
    children: (
      <>
        <CardBadge>New</CardBadge>
        <CardMedia>
          <View style={{ flex: 1, backgroundColor: "#FFD400" }} />
        </CardMedia>
        <CardContent>
          <CardTitle>Launch Notes</CardTitle>
          <CardMeta>Native / Product / Today</CardMeta>
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
