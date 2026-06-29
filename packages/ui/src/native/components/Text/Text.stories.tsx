import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Text } from "./index";

const meta = {
  title: "Native/Text",
  component: Text,
  args: {
    children: "Swirski text keeps native screens sharp and readable.",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl" weight="bold">
        Extra large text
      </Text>
      <Text size="2xl" weight="black">
        Two extra large text
      </Text>
    </View>
  ),
};

export const Caption: Story = {
  args: {
    children: "Status caption",
    variant: "caption",
    weight: "black",
    tone: "muted",
  },
};
