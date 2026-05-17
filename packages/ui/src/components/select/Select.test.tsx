import { render, screen, within } from "@testing-library/react";
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
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
    expect(trigger).not.toHaveAttribute("aria-activedescendant");

    await user.click(trigger);

    const listbox = await screen.findByRole("listbox");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", listbox.id);
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${listbox.id}-option-0`,
    );
    expect(within(listbox).getByRole("option", { name: "Yellow" }))
      .toHaveAttribute("aria-selected", "true");
    expect(within(listbox).getByRole("option", { name: "Blue" }))
      .toHaveAttribute("aria-selected", "false");
    expect(within(listbox).getByRole("option", { name: "Red" }))
      .toHaveAttribute("aria-disabled", "true");
    expect(within(listbox).getByRole("option", { name: "Red" }))
      .toBeDisabled();

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
    const listbox = await screen.findByRole("listbox");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${listbox.id}-option-1`,
    );

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");
    expect(trigger).not.toHaveAttribute("aria-activedescendant");
  });

  it("does not open a disabled select", async () => {
    const user = userEvent.setup();

    render(<Select disabled options={options} defaultValue="yellow" />);

    const trigger = screen.getByRole("button", { name: /yellow/i });

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).not.toHaveAttribute("aria-controls");

    await user.click(trigger);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
