import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Navbar,
  NavbarDropdown,
  NavbarDropdownContent,
  NavbarDropdownLink,
  NavbarDropdownTrigger,
  NavbarNav,
} from "./index";

function NavbarDropdownExample({
  onSelect = vi.fn(),
}: {
  onSelect?: () => void;
}) {
  return (
    <Navbar>
      <NavbarNav aria-label="Main navigation">
        <NavbarDropdown>
          <NavbarDropdownTrigger active>More</NavbarDropdownTrigger>
          <NavbarDropdownContent aria-label="More pages">
            <NavbarDropdownLink href="/system" active onClick={onSelect}>
              System
            </NavbarDropdownLink>
            <NavbarDropdownLink href="/cli">CLI</NavbarDropdownLink>
          </NavbarDropdownContent>
        </NavbarDropdown>
      </NavbarNav>
    </Navbar>
  );
}

describe("Navbar dropdown", () => {
  it("renders nav dropdown links as menu items and closes on select", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<NavbarDropdownExample onSelect={onSelect} />);

    const trigger = screen.getByRole("button", { name: "More" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-active", "");

    await user.click(trigger);

    const menu = await screen.findByRole("menu", { name: "More pages" });
    const systemItem = within(menu).getByRole("menuitem", { name: "System" });

    expect(systemItem).toHaveAttribute("href", "/system");
    expect(systemItem).toHaveAttribute("aria-current", "page");
    expect(systemItem).toHaveAttribute(
      "data-swirski-component",
      "navbar-dropdown-link",
    );

    await user.click(systemItem);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("opens from keyboard and focuses the first item", async () => {
    const user = userEvent.setup();

    render(<NavbarDropdownExample />);

    const trigger = screen.getByRole("button", { name: "More" });
    trigger.focus();

    await user.keyboard("{ArrowDown}");

    const menu = await screen.findByRole("menu", { name: "More pages" });
    expect(within(menu).getByRole("menuitem", { name: "System" }))
      .toHaveFocus();
  });
});
