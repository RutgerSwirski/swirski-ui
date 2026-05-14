import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroTitle } from "./HeroTitle";

const meta = {
  title: "Components/HeroTitle",
  component: HeroTitle,
} satisfies Meta<typeof HeroTitle>;

export default meta;

export const Default: StoryObj<typeof HeroTitle> = {
  args: {
    children:
      "Honouring existing fabrics. Sculpting them into garments beyond trends.",
    className: "text-4xl",
  },
};
