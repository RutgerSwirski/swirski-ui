import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { SwirskiProvider, type SwirskiColorScheme } from "../../theme";
import { ThemeToggle } from "./ThemeToggle";

it("toggles the provider with the keyboard and keeps focus on the switch", async () => {
  const user = userEvent.setup();
  const inputRef = createRef<HTMLInputElement>();

  function Example() {
    const [scheme, setScheme] = useState<SwirskiColorScheme>("light");
    return (
      <SwirskiProvider colorScheme={scheme} data-testid="theme">
        <ThemeToggle ref={inputRef} colorScheme={scheme} onColorSchemeChange={setScheme} />
      </SwirskiProvider>
    );
  }

  render(<Example />);
  const toggle = screen.getByRole("switch", { name: "Dark mode" });
  expect(inputRef.current).toBe(toggle);
  expect(toggle).not.toBeChecked();
  await user.tab();
  await user.keyboard(" ");
  expect(toggle).toHaveFocus();
  expect(toggle).toBeChecked();
  expect(screen.getByTestId("theme")).toHaveAttribute("data-swirski-color-scheme", "dark");
  await user.keyboard(" ");
  expect(toggle).not.toBeChecked();
  expect(screen.getByTestId("theme")).toHaveAttribute("data-swirski-color-scheme", "light");
});

it("reflects the controlled value and respects disabled", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { rerender } = render(<ThemeToggle colorScheme="dark" disabled onColorSchemeChange={change} />);
  const toggle = screen.getByRole("switch", { name: "Dark mode" });
  await user.click(toggle);
  expect(toggle).toBeChecked();
  expect(change).not.toHaveBeenCalled();
  rerender(<ThemeToggle colorScheme="light" onColorSchemeChange={change} />);
  await user.click(toggle);
  expect(change).toHaveBeenCalledWith("dark");
  expect(toggle).not.toBeChecked();
});
