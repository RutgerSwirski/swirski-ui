import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { AlertDescription } from "./AlertDescription";
import { AlertTitle } from "./AlertTitle";

const meta = {
  title: "Components/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    tone: "yellow",
    children: (
      <>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          This block is loud enough for announcements and compact feedback.
        </AlertDescription>
      </>
    ),
  },
};
