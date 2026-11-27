import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, it, vi } from "vitest";
import { Button } from "../components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/dropdown-menu";

it("styles the actual anchor, placing icons inside it and forwarding both refs", () => {
  const ref = createRef<HTMLElement>();
  const anchorRef = createRef<HTMLAnchorElement>();
  render(
    <Button asChild ref={ref} className="button-class" icon="arrow-up-right">
      <a href="/about" ref={anchorRef} className="anchor-class">About</a>
    </Button>,
  );
  const link = screen.getByRole("link", { name: "About" });
  expect(link).toHaveAttribute("href", "/about");
  expect(link).toHaveAttribute("data-swirski-component", "button");
  expect(link).toHaveClass("button-class", "anchor-class");
  expect(link.querySelector("svg")).not.toBeNull();
  expect(ref.current).toBe(link);
  expect(anchorRef.current).toBe(link);
});

it("runs the child handler first and respects cancellation", async () => {
  const user = userEvent.setup();
  const calls: string[] = [];
  render(
    <>
      <Button asChild onClick={() => calls.push("button")}>
        <button onClick={() => calls.push("child")}>Compose</button>
      </Button>
      <Button asChild onClick={() => calls.push("cancelled button")}>
        <a href="/cancelled" onClick={(event) => {
          event.preventDefault();
          calls.push("cancelled child");
        }}>Cancel</a>
      </Button>
    </>,
  );
  await user.click(screen.getByRole("button", { name: "Compose" }));
  await user.click(screen.getByRole("link", { name: "Cancel" }));
  expect(calls).toEqual(["child", "button", "cancelled child"]);
});

it("preserves native disabled and button type through composition", async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<Button asChild disabled onClick={onClick}><button>Disabled</button></Button>);
  const button = screen.getByRole("button", { name: "Disabled" });
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute("type", "button");
  await user.click(button);
  expect(onClick).not.toHaveBeenCalled();
});

it("blocks activation on disabled links, including composed anchors", async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(
    <>
      <Button href="/one" disabled onClick={onClick}>One</Button>
      <Button asChild disabled><a href="/two" onClick={onClick}>Two</a></Button>
    </>,
  );
  for (const link of screen.getAllByRole("link")) {
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    await user.click(link);
  }
  expect(onClick).not.toHaveBeenCalled();
});

it("opens dialogs and dropdown menus through composed Buttons", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Dialog>
        <DialogTrigger asChild><Button>Edit</Button></DialogTrigger>
        <DialogContent><DialogTitle>Edit details</DialogTitle></DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button>Actions</Button></DropdownMenuTrigger>
        <DropdownMenuContent><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuContent>
      </DropdownMenu>
    </>,
  );
  await user.click(screen.getByRole("button", { name: "Edit" }));
  expect(screen.getByRole("dialog", { name: "Edit details" })).toBeVisible();
  await user.keyboard("{Escape}");
  await user.click(screen.getByRole("button", { name: "Actions" }));
  expect(screen.getByRole("menuitem", { name: "Archive" })).toBeVisible();
});

it("preserves callback ref cleanup in React 19", () => {
  const cleanup = vi.fn();
  const forwarded = createRef<HTMLElement>();
  const { unmount } = render(
    <Button asChild ref={forwarded}>
      <a href="/about" ref={() => cleanup}>About</a>
    </Button>,
  );
  expect(forwarded.current).toBe(screen.getByRole("link", { name: "About" }));
  unmount();
  expect(cleanup).toHaveBeenCalledOnce();
  expect(forwarded.current).toBeNull();
});
