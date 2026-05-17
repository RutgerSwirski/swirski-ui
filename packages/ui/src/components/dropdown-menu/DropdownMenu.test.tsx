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
  onRename = vi.fn(),
  onSelect = vi.fn(),
}: {
  onArchive?: () => void;
  onRename?: () => void;
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
        <DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
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
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
  });

  it("opens from keyboard activation and closes on Escape with focus returned", async () => {
    const user = userEvent.setup();

    render(<DropdownExample />);

    const trigger = screen.getByRole("button", { name: "Actions" });
    trigger.focus();

    await user.keyboard("{Enter}");

    const menu = await screen.findByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: "Duplicate" }))
      .toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
  });

  it("moves through enabled items with arrow, Home, and End keys", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();

    render(<DropdownExample onRename={onRename} />);

    const trigger = screen.getByRole("button", { name: "Actions" });
    trigger.focus();

    await user.keyboard("{ArrowDown}");

    const menu = await screen.findByRole("menu");
    const duplicateItem = within(menu).getByRole("menuitem", {
      name: "Duplicate",
    });
    const archiveItem = within(menu).getByRole("menuitem", {
      name: "Archive",
    });
    const renameItem = within(menu).getByRole("menuitem", {
      name: "Rename",
    });

    expect(duplicateItem).toHaveFocus();
    expect(archiveItem).toBeDisabled();

    await user.keyboard("{ArrowDown}");
    expect(renameItem).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(duplicateItem).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(renameItem).toHaveFocus();

    await user.keyboard("{Home}");
    expect(duplicateItem).toHaveFocus();

    await user.keyboard("{End}");
    expect(renameItem).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(onRename).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
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
