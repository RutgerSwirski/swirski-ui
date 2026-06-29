import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Card, CardContent, CardTitle } from "../Card";
import { DotGrid } from "./index";

const meta = {
  title: "Native/DotGrid",
  component: DotGrid,
  args: {
    color: "#0057FF",
    dotSize: 1.2,
    spacing: 13,
  },
} satisfies Meta<typeof DotGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <View style={{ height: 240, position: "relative", width: 360 }}>
      <DotGrid {...args} />
    </View>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card style={{ width: 360 }}>
      <DotGrid accentEvery={5} color="#0057FF" opacity={0.16} />
      <CardContent>
        <CardTitle>Dot Grid</CardTitle>
      </CardContent>
    </Card>
  ),
};
