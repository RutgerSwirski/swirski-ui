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
});
