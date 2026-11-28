import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;

export const InheritedStyle: StoryObj<typeof meta> = {
  render: () => (
    <DropdownMenu size="lg" variant="compact">
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Inherited large size</DropdownMenuItem>
        <DropdownMenuItem size="sm">Explicit small override</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
