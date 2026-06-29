import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Badge } from "./index";

const meta = {
  title: "Native/Badge",
  component: Badge,
  args: {
    children: "Fresh",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <View style={{ alignItems: "flex-start", gap: 12 }}>
      <Badge tone="blue">Blue</Badge>
      <Badge tone="yellow">Yellow</Badge>
      <Badge tone="red">Red</Badge>
      <Badge tone="white">White</Badge>
      <Badge tone="black">Black</Badge>
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ alignItems: "flex-start", gap: 12 }}>
      <Badge>Solid</Badge>
      <Badge variant="outline" tone="blue">
        Outline
      </Badge>
      <Badge variant="soft" tone="red" withShadow={false}>
        Soft
      </Badge>
    </View>
  ),
};
