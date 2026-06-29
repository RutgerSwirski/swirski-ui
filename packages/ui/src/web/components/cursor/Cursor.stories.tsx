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
        <Button tone="yellow">Hover me</Button>
        <a className="font-black underline" href="#cursor-story">
          Tiny link test
        </a>
        <Button disabled tone="white">
          Locked
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div
          className="grid min-h-24 place-items-center border-4 border-black bg-[#0057FF] p-4 text-center font-black uppercase text-white"
          data-cursor="pan"
        >
          Pan board
        </div>
        <div
          aria-busy="true"
          className="grid min-h-24 place-items-center border-4 border-black bg-[#FFD400] p-4 text-center font-black uppercase"
        >
          Busy
        </div>
        <div
          className="grid min-h-24 place-items-center border-4 border-black bg-white p-4 text-center font-black uppercase"
          data-cursor="crosshair"
        >
          Target
        </div>
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
          <Button tone="yellow">Hover me</Button>
          <a className="font-black underline" href="#cursor-dock-story">
            Tiny link test
          </a>
          <div
            className="grid min-h-24 min-w-48 place-items-center border-4 border-black bg-[#0057FF] p-4 text-center font-black uppercase text-white"
            data-cursor="pan"
          >
            Pan board
          </div>
        </div>
      </div>
    </CursorProvider>
  ),
};
