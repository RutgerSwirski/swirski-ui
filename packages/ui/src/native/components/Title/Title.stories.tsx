import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Title } from "./index";

const meta = {
  title: "Native/Title",
  component: Title,
  args: {
    children: "Native Sharp",
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <View style={{ gap: 14 }}>
      <Title size="display">Display</Title>
      <Title order={1}>Heading One</Title>
      <Title order={2}>Heading Two</Title>
      <Title order={3}>Heading Three</Title>
      <Title order={4}>Heading Four</Title>
      <Title order={5}>Heading Five</Title>
      <Title order={6}>Heading Six</Title>
    </View>
  ),
};
