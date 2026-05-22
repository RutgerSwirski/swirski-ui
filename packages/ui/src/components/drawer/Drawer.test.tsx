import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Navigation</DrawerTitle>
        <DrawerDescription>Choose a destination.</DrawerDescription>
        <button type="button">First link</button>
        <DrawerClose>Close panel</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

function CustomSlotIdDrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger>Open custom drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle id="custom-drawer-title">Custom drawer</DrawerTitle>
        <DrawerDescription id="custom-drawer-description">
          Custom drawer description.
        </DrawerDescription>
        <DrawerClose>Close custom drawer</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("opens as a labelled modal, traps focus, and returns focus on Escape", async () => {
    const user = userEvent.setup();

    render(<DrawerExample />);

    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);

    const drawer = await screen.findByRole("dialog", {
      name: "Navigation",
    });

    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(drawer).toHaveAccessibleDescription("Choose a destination.");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "First link" })).toHaveFocus();
    });

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Close panel" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("uses custom title and description ids from slots", async () => {
    const user = userEvent.setup();

    render(<CustomSlotIdDrawerExample />);

    await user.click(screen.getByRole("button", { name: "Open custom drawer" }));

    const drawer = await screen.findByRole("dialog", {
      name: "Custom drawer",
    });

    expect(drawer).toHaveAttribute("aria-labelledby", "custom-drawer-title");
    expect(drawer).toHaveAttribute(
      "aria-describedby",
      "custom-drawer-description",
    );
    expect(drawer).toHaveAccessibleDescription("Custom drawer description.");
  });
});
