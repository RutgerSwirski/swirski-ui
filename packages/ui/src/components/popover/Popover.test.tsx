import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("connects trigger and content with ARIA", async () => {
    const user = userEvent.setup();

    render(<PopoverExample />);

    const trigger = screen.getByRole("button", { name: "Open popover" });
    await user.click(trigger);

    const popover = await screen.findByRole("dialog");
    expect(popover).toHaveTextContent("Popover content");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", popover.id);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();

    render(<PopoverExample />);

    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
