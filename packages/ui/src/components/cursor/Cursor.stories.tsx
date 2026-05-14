import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/Button";
import { CursorDock } from "./CursorDock";
import { CursorPicker } from "./CursorPicker";
import { CursorProvider } from "./CursorProvider";

const meta = {
  title: "Components/Cursor",
  component: CursorPicker,
} satisfies Meta<typeof CursorPicker>;

export default meta;

type Story = StoryObj<typeof CursorPicker>;

export const Picker: Story = {
  render: () => (
    <CursorProvider className="space-y-6 bg-[#F5F5F3] p-8">
      <CursorPicker />

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="yellow">Hover me</Button>
        <a className="font-black underline" href="#cursor-story">
          Tiny link test
        </a>
      </div>
    </CursorProvider>
  ),
};

export const SideDock: Story = {
  render: () => (
    <CursorProvider className="relative min-h-80 space-y-6 overflow-hidden bg-[#F5F5F3] p-8">
      <CursorDock />

      <div className="max-w-xl space-y-4">
        <p className="font-black uppercase">Hover the side tab.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="yellow">Hover me</Button>
          <a className="font-black underline" href="#cursor-dock-story">
            Tiny link test
          </a>
        </div>
      </div>
    </CursorProvider>
  ),
};
