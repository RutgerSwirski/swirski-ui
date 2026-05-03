import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroActions } from "./HeroActions";
import { Button } from "../button";

const meta = {
  title: "Components/HeroActions",
  component: HeroActions,
} satisfies Meta<typeof HeroActions>;

export default meta;

export const Default: StoryObj<typeof HeroActions> = {
  args: {
    children: "Hero Actions",
  },
  render: (args) => (
    <HeroActions>
      <Button>View Work →</Button>
      <Button>Let’s build!</Button>
    </HeroActions>
  ),
};
