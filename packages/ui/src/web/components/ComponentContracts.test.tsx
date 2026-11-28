import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { expect, it, vi } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger } from "./accordion";
import { AppShell, AppShellBody, AppShellMain, AppShellNavbar, AppShellSidebar } from "./app-shell";
import { Button } from "./button";
import { Card, CardContent, CardTitle } from "./card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Navbar, NavbarLink } from "./navbar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

it("resolves root defaults and child overrides across compound parts", () => {
  const ref = createRef<HTMLAnchorElement>();
  render(
    <>
      <Tabs defaultValue="one" variant="compact" size="lg" tone="yellow">
        <TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger size="sm" value="two">Two</TabsTrigger></TabsList>
        <TabsContent value="one">Panel</TabsContent>
      </Tabs>
      <Card size="lg" tone="black">
        <CardContent size="sm"><CardTitle>Card title</CardTitle></CardContent>
      </Card>
      <Accordion variant="compact" size="lg">
        <AccordionItem size="sm"><AccordionTrigger>Details</AccordionTrigger></AccordionItem>
      </Accordion>
      <Navbar size="lg" variant="compact">
        <NavbarLink asChild className="navigation" style={{ color: "red" }}>
          <a href="/" ref={ref} className="consumer" style={{ color: "blue" }}>Home</a>
        </NavbarLink>
      </Navbar>
    </>,
  );

  const selected = screen.getByRole("tab", { name: "One" });
  expect(selected).toHaveAttribute("data-swirski-size", "lg");
  expect(selected).toHaveAttribute("data-swirski-tone", "yellow");
  expect(selected).toHaveAttribute("data-state", "active");
  expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("data-swirski-size", "sm");
  expect(screen.getByRole("tabpanel")).toHaveAttribute("data-swirski-variant", "compact");
  expect(screen.getByText("Card title")).toHaveAttribute("data-swirski-size", "lg");
  expect(screen.getByText("Card title").parentElement).toHaveAttribute("data-swirski-size", "sm");
  expect(screen.getByText("Details").closest("summary")).toHaveAttribute("data-swirski-size", "sm");
  expect(screen.getByText("Details").closest("summary")).toHaveAttribute("data-swirski-variant", "compact");
  expect(ref.current).toBe(screen.getByRole("link", { name: "Home" }));
  expect(ref.current).toHaveClass("consumer", "navigation");
  expect(ref.current?.style.color).toBe("blue");
  expect(ref.current).toHaveAttribute("data-swirski-size", "lg");
});

it.each([
  [Dialog, DialogTrigger, DialogContent, DialogTitle],
  [Drawer, DrawerTrigger, DrawerContent, DrawerTitle],
])("inherits overlay root styling through a portal", (Root, Trigger, Content, Title) => {
  render(
    <Root variant="compact" size="lg">
      <Trigger>Open</Trigger>
      <Content size="sm"><Title>Surface</Title></Content>
    </Root>,
  );
  const trigger = screen.getByRole("button", { name: "Open" });
  expect(trigger).toHaveAttribute("data-state", "closed");
  expect(trigger).toHaveAttribute("data-swirski-size", "lg");
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("data-state", "open");
  const content = screen.getByRole("dialog", { name: "Surface" });
  expect(content).toHaveAttribute("data-swirski-size", "sm");
  expect(content).toHaveAttribute("data-swirski-variant", "compact");
});

it("supports controlled disclosure, portalled styles, and disabled slotted menu items", () => {
  const onOpenChange = vi.fn();
  const onSelect = vi.fn();
  const menu = (open: boolean) => (
    <DropdownMenu open={open} onOpenChange={onOpenChange} size="lg" variant="compact">
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled asChild><a href="#blocked" onClick={onSelect}>Blocked</a></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  const { rerender } = render(menu(false));
  fireEvent.click(screen.getByRole("button", { name: "Actions" }));
  expect(onOpenChange).toHaveBeenCalledWith(true);
  expect(screen.queryByRole("menu")).toBeNull();
  rerender(menu(true));
  const item = screen.getByRole("menuitem", { name: "Blocked" });
  expect(item).toHaveAttribute("aria-disabled", "true");
  expect(item).not.toHaveAttribute("disabled");
  expect(item).toHaveAttribute("data-swirski-size", "lg");
  fireEvent.click(item);
  expect(onSelect).not.toHaveBeenCalled();
  expect(onOpenChange).toHaveBeenCalledTimes(1);
});

it("marks loading buttons busy and prevents both native and slotted activation", () => {
  const press = vi.fn();
  render(
    <>
      <Button loading onClick={press}>Save</Button>
      <Button loading asChild><a href="#publish" onClick={press}>Publish</a></Button>
    </>,
  );
  const save = screen.getByRole("button", { name: "Save" });
  const publish = screen.getByRole("link", { name: "Publish" });
  expect(save).toBeDisabled();
  expect(save).toHaveAttribute("aria-busy", "true");
  expect(publish).toHaveAttribute("aria-disabled", "true");
  expect(publish).toHaveAttribute("aria-busy", "true");
  fireEvent.click(save);
  fireEvent.click(publish);
  expect(press).not.toHaveBeenCalled();
});

it("keeps native Accordion disclosure in sync with a controlled owner", () => {
  const onOpenChange = vi.fn();
  const ref = createRef<HTMLDetailsElement>();
  const item = (open: boolean) => (
    <AccordionItem ref={ref} open={open} onOpenChange={onOpenChange}>
      <AccordionTrigger>Details</AccordionTrigger>
    </AccordionItem>
  );
  const { rerender } = render(item(false));
  const details = ref.current!;
  details.open = true;
  fireEvent(details, new Event("toggle"));
  expect(onOpenChange).toHaveBeenCalledWith(true);
  expect(details.open).toBe(false);

  rerender(item(true));
  expect(details.open).toBe(true);
  fireEvent(details, new Event("toggle"));
  expect(onOpenChange).toHaveBeenCalledTimes(1);
});

it("applies popover defaults and focuses the first item in an initially open menu", async () => {
  render(
    <>
      <Popover defaultOpen size="lg" variant="compact">
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent aria-label="Filter panel">Contents</PopoverContent>
      </Popover>
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>First action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>,
  );
  expect(screen.getByRole("button", { name: "Filters" })).toHaveAttribute("data-swirski-size", "lg");
  expect(screen.getByRole("dialog", { name: "Filter panel" })).toHaveClass("w-96", "p-3");
  await waitFor(() => expect(screen.getByRole("menuitem", { name: "First action" })).toHaveFocus());
});

it("inherits AppShell styling and resolves a nested region override", () => {
  render(
    <AppShell size="lg" tone="black">
      <AppShellSidebar collapseBelow="never">Sidebar</AppShellSidebar>
      <AppShellBody size="sm" variant="compact">
        <AppShellNavbar tone="white">Navbar</AppShellNavbar>
        <AppShellMain size="md">Main</AppShellMain>
      </AppShellBody>
    </AppShell>,
  );
  expect(screen.getByText("Sidebar")).toHaveClass("w-72", "bg-[var(--sw-color-ink)]");
  expect(screen.getByText("Navbar")).toHaveAttribute("data-swirski-size", "sm");
  expect(screen.getByText("Navbar")).toHaveAttribute("data-swirski-variant", "compact");
  expect(screen.getByText("Navbar")).toHaveAttribute("data-swirski-tone", "white");
  expect(screen.getByText("Main")).toHaveClass("[--sw-app-shell-content-padding:1.5rem]");
});

it("attaches outer refs to slotted and explicit polymorphic elements", () => {
  const slotRef = createRef<HTMLAnchorElement>();
  const explicitRef = createRef<HTMLAnchorElement>();
  const buttonRef = createRef<HTMLButtonElement>();
  render(
    <>
      <Dialog>
        <DialogTrigger asChild ref={slotRef}><a href="#details">Details link</a></DialogTrigger>
        <DialogTrigger ref={buttonRef}>Default trigger</DialogTrigger>
      </Dialog>
      <Button as="a" href="#open" ref={explicitRef}>Explicit link</Button>
    </>,
  );
  expect(slotRef.current).toBe(screen.getByRole("link", { name: "Details link" }));
  expect(buttonRef.current).toBe(screen.getByRole("button", { name: "Default trigger" }));
  expect(explicitRef.current).toBe(screen.getByRole("link", { name: "Explicit link" }));
});

// Verify that the public default and explicit-tag ref contracts reject mismatched refs.
function invalidRefExamples() {
  const link = createRef<HTMLAnchorElement>();
  const button = createRef<HTMLButtonElement>();
  // @ts-expect-error The default DialogTrigger renders a button.
  const invalidDefault = <DialogTrigger ref={link}>Invalid</DialogTrigger>;
  // @ts-expect-error This Button explicitly renders an anchor.
  const invalidExplicit = <Button as="a" href="/" ref={button}>Invalid</Button>;
  return [invalidDefault, invalidExplicit];
}
void invalidRefExamples;
