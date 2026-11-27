import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../components/drawer";
import { Select } from "../components/select";

it("closes Select, Dialog, and Drawer one at a time and restores focus", async () => {
  const user = userEvent.setup();
  render(
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Drawer</DrawerTitle>
        <Dialog>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
            <Select aria-label="Color" name="color" options={[{ value: "blue", label: "Blue" }]} />
            <button>Done</button>
          </DialogContent>
        </Dialog>
      </DrawerContent>
    </Drawer>,
  );
  const drawerTrigger = screen.getByRole("button", { name: "Open drawer" });
  await user.click(drawerTrigger);
  const dialogTrigger = screen.getByRole("button", { name: "Open dialog" });
  await user.click(dialogTrigger);
  const select = screen.getByRole("button", { name: "Color" });
  await waitFor(() => expect(select).toHaveFocus());
  await user.tab({ shift: true });
  expect(screen.getByRole("button", { name: "Done" })).toHaveFocus();
  await user.tab();
  expect(select).toHaveFocus();
  await user.click(select);
  expect(screen.getByRole("listbox")).toBeVisible();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "Dialog" })).toBeVisible();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: "Dialog" })).not.toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "Drawer" })).toBeVisible();
  expect(dialogTrigger).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(drawerTrigger).toHaveFocus();
});

it("dismisses the innermost modal when both open together", async () => {
  const user = userEvent.setup();
  render(
    <Drawer defaultOpen>
      <DrawerContent>
        <DrawerTitle>Outer drawer</DrawerTitle>
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Inner dialog</DialogTitle>
            <button>Inner action</button>
          </DialogContent>
        </Dialog>
      </DrawerContent>
    </Drawer>,
  );
  await waitFor(() => expect(screen.getByRole("button", { name: "Inner action" })).toHaveFocus());
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: "Inner dialog" })).not.toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: "Outer drawer" })).toBeVisible();
});
