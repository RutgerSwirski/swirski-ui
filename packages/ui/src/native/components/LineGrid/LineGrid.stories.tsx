import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { LineGrid } from "./index";

const meta = {
  title: "Native/LineGrid",
  component: LineGrid,
  args: {
    color: "#0B0B0C",
    direction: "both",
    spacing: 18,
    thickness: 1,
  },
} satisfies Meta<typeof LineGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <View style={{ height: 240, position: "relative", width: 360 }}>
      <LineGrid {...args} />
    </View>
  ),
};

export const Accent: Story = {
  render: () => (
    <View style={{ height: 240, position: "relative", width: 360 }}>
      <LineGrid
        accentColor="#0057FF"
        accentEvery={5}
        color="#0B0B0C"
        opacity={0.18}
      />
    </View>
  ),
};
