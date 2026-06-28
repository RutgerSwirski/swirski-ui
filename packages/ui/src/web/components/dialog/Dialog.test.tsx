import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit project</DialogTitle>
        <DialogDescription>Update the project settings.</DialogDescription>
        <button type="button">First action</button>
        <DialogClose>Done</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function CustomAriaDialogExample() {
  return (
    <Dialog>
      <DialogTrigger>Open fallback dialog</DialogTrigger>
      <DialogContent
        aria-describedby="archive-description"
        aria-labelledby="archive-title"
      >
        <h2 id="archive-title">Archive project</h2>
        <p id="archive-description">This can be restored later.</p>
        <DialogClose>Keep project</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function CustomSlotIdDialogExample() {
  return (
    <Dialog>
      <DialogTrigger>Open custom id dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle id="custom-dialog-title">Custom title</DialogTitle>
        <DialogDescription id="custom-dialog-description">
          Custom description.
        </DialogDescription>
        <DialogClose>Close custom dialog</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens as a labelled modal, traps focus, and returns focus on Escape", async () => {
    const user = userEvent.setup();

    render(<DialogExample />);

    const trigger = screen.getByRole("button", { name: "Open dialog" });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", {
      name: "Edit project",
    });
    const title = screen.getByText("Edit project");
    const description = screen.getByText("Update the project settings.");

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleName("Edit project");
    expect(dialog).toHaveAccessibleDescription("Update the project settings.");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
    expect(
      screen.getByRole("button", { name: "Close dialog" }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "First action" })).toHaveFocus();
    });

    await user.tab();
    expect(screen.getByRole("button", { name: "Done" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "First action" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Done" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("uses explicit ARIA labels when title and description slots are absent", async () => {
    const user = userEvent.setup();

    render(<CustomAriaDialogExample />);

    const trigger = screen.getByRole("button", {
      name: "Open fallback dialog",
    });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", {
      name: "Archive project",
    });

    expect(dialog).toHaveAttribute("aria-labelledby", "archive-title");
    expect(dialog).toHaveAttribute("aria-describedby", "archive-description");
    expect(dialog).toHaveAccessibleDescription("This can be restored later.");

    await user.click(screen.getByRole("button", { name: "Close dialog" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("uses custom title and description ids from slots", async () => {
    const user = userEvent.setup();

    render(<CustomSlotIdDialogExample />);

    await user.click(
      screen.getByRole("button", { name: "Open custom id dialog" }),
    );

    const dialog = await screen.findByRole("dialog", {
      name: "Custom title",
    });

    expect(dialog).toHaveAttribute("aria-labelledby", "custom-dialog-title");
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      "custom-dialog-description",
    );
    expect(dialog).toHaveAccessibleDescription("Custom description.");
  });
});
