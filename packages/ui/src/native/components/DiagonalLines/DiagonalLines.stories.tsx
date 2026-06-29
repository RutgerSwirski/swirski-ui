import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { DiagonalLines } from "./index";

const meta = {
  title: "Native/DiagonalLines",
  component: DiagonalLines,
  args: {
    angle: -45,
    color: "#0B0B0C",
    spacing: 18,
    thickness: 2,
  },
} satisfies Meta<typeof DiagonalLines>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <View style={{ height: 240, position: "relative", width: 360 }}>
      <DiagonalLines {...args} />
    </View>
  ),
};

export const Accent: Story = {
  render: () => (
    <View style={{ height: 240, position: "relative", width: 360 }}>
      <DiagonalLines
        accentColor="#FF3131"
        accentEvery={5}
        color="#0B0B0C"
        opacity={0.18}
      />
    </View>
  ),
};
