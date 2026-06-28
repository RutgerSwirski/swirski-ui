import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNavbar,
  AppShellSidebar,
} from "./AppShell";

describe("AppShell", () => {
  it("renders composed layout regions and Swirski data attributes", () => {
    render(
      <AppShell data-testid="shell" size="lg" tone="white">
        <AppShellSidebar aria-label="Workspace" width="sm">
          <a href="#overview">Overview</a>
        </AppShellSidebar>
        <AppShellBody>
          <AppShellNavbar>Studio workspace</AppShellNavbar>
          <AppShellMain>
            <AppShellContent>
              <h1>Dashboard</h1>
            </AppShellContent>
          </AppShellMain>
        </AppShellBody>
      </AppShell>,
    );

    const shell = screen.getByTestId("shell");
    const sidebar = screen.getByRole("complementary", {
      name: "Workspace",
    });

    expect(shell).toHaveAttribute("data-swirski-component", "app-shell");
    expect(shell).toHaveAttribute("data-swirski-size", "lg");
    expect(shell).toHaveAttribute("data-swirski-tone", "white");
    expect(sidebar).toHaveAttribute(
      "data-swirski-component",
      "app-shell-sidebar",
    );
    expect(screen.getByRole("banner")).toHaveTextContent("Studio workspace");
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { name: "Dashboard" }),
    );
  });
});
