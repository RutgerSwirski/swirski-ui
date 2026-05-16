import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red", disabled: true },
];

describe("Select", () => {
  it("opens a listbox and selects an option with pointer input", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        name="tone"
        options={options}
        defaultValue="yellow"
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: /yellow/i });
    await user.click(trigger);

    const listbox = await screen.findByRole("listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", listbox.id);

    await user.click(screen.getByRole("option", { name: "Blue" }));

    expect(onValueChange).toHaveBeenCalledWith("blue");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("blue")).toHaveAttribute("name", "tone");
  });

  it("supports keyboard selection and Escape close", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Select
        options={options}
        defaultValue="yellow"
        onValueChange={onValueChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: /yellow/i });
    trigger.focus();

    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("blue");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /blue/i }));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
