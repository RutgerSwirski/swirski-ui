import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
import { Title } from "./Title";

const meta = {
  title: "Components/Typography",
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Titles: Story = {
  render: () => (
    <div className="grid gap-4">
      <Title size="display">Design loud.</Title>
      <Title order={2}>Ship sharp.</Title>
      <Title order={3}>Build with rhythm.</Title>
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div className="grid max-w-xl gap-3">
      <Text size="xl" weight="bold" tone="muted">
        A practical text primitive for product copy, editorial blocks and dense
        interface descriptions.
      </Text>
      <Text size="sm" tone="subtle">
        Use size, tone and weight props for the common typographic adjustments.
      </Text>
    </div>
  ),
};
