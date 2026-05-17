import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

function DropdownExample({
  onArchive = vi.fn(),
  onSelect = vi.fn(),
}: {
  onArchive?: () => void;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Project actions">
        <DropdownMenuItem onClick={onSelect}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem disabled onClick={onArchive}>
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("connects trigger and menu with ARIA and closes on item select", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<DropdownExample onSelect={onSelect} />);

    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");

    await user.click(trigger);

    const menu = await screen.findByRole("menu", {
      name: "Project actions",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", menu.id);
    expect(within(menu).getByRole("menuitem", { name: "Archive" })).toBeDisabled();

    await user.click(within(menu).getByRole("menuitem", { name: "Duplicate" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
  });

  it("opens from keyboard activation and closes on Escape without moving focus", async () => {
    const user = userEvent.setup();

    render(<DropdownExample />);

    const trigger = screen.getByRole("button", { name: "Actions" });
    trigger.focus();

    await user.keyboard("{Enter}");

    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
  });

  it("keeps disabled menu items inert", async () => {
    const user = userEvent.setup();
    const onArchive = vi.fn();

    render(<DropdownExample onArchive={onArchive} />);

    await user.click(screen.getByRole("button", { name: "Actions" }));

    const menu = await screen.findByRole("menu");
    const archiveItem = within(menu).getByRole("menuitem", {
      name: "Archive",
    });

    expect(archiveItem).toBeDisabled();

    await user.click(archiveItem);

    expect(onArchive).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});
