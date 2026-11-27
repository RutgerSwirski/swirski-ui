import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "yellow", label: "Yellow" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red", disabled: true },
];

describe("Select", () => {
  it("validates an empty required selection and omits disabled values", async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form aria-label="Preferences" onSubmit={submit}>
        <Select required name="tone" defaultValue="" options={options} />
        <Select disabled name="disabledTone" options={options} />
        <button type="submit">Save</button>
      </form>,
    );
    const form = screen.getByRole<HTMLFormElement>("form");
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(submit).not.toHaveBeenCalled();
    const trigger = screen.getByRole("button", { name: "Select an option" });
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    await user.click(screen.getByRole("option", { name: "Blue" }));
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(submit).toHaveBeenCalledOnce();
    expect(Array.from(new FormData(form))).toEqual([["tone", "blue"]]);
  });

  it("resets the uncontrolled value in an associated form and preserves the controlled value", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <>
        <form aria-label="Preferences" id="preferences">
          <button type="reset">Reset</button>
        </form>
        <Select form="preferences" name="tone" defaultValue="" options={options} onValueChange={change} />
        <Select form="preferences" name="controlled" value="blue" options={options} />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Select an option" }));
    await user.click(screen.getByRole("option", { name: "Yellow" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Select an option" })).toBeInTheDocument());
    expect(Array.from(new FormData(screen.getByRole<HTMLFormElement>("form"))))
      .toEqual([["tone", ""], ["controlled", "blue"]]);
    expect(change).toHaveBeenCalledOnce();
  });

  it("keeps highlight valid as options shrink and closes on Tab", async () => {
    const user = userEvent.setup();
    function Example({ shrink = false }: { shrink?: boolean }) {
      return (
        <>
          <Select options={shrink ? options.slice(0, 1) : options} />
          <button type="button">Continue</button>
        </>
      );
    }

    const { rerender } = render(<Example />);
    const trigger = screen.getByRole("button", { name: "Yellow" });
    trigger.focus();
    await user.keyboard("{End}");
    const list = screen.getByRole("listbox");
    expect(trigger).toHaveAttribute("aria-activedescendant", `${list.id}-option-1`);
    rerender(<Example shrink />);
    expect(trigger).toHaveAttribute("aria-activedescendant", `${list.id}-option-0`);
    await user.tab();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toHaveFocus();
  });

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

  it("can hide the selected option indicator", async () => {
    const user = userEvent.setup();

    render(
      <Select
        options={options}
        defaultValue="yellow"
        showSelectedIndicator={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: /yellow/i }));

    expect(screen.getByRole("option", { name: "Yellow" })).toHaveTextContent(
      /^Yellow$/,
    );
  });

  it("supports Home, End, and typeahead navigation", async () => {
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

    await user.keyboard("{End}");

    const listbox = await screen.findByRole("listbox");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${listbox.id}-option-1`,
    );

    await user.keyboard("{Home}");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${listbox.id}-option-0`,
    );

    await user.keyboard("b");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${listbox.id}-option-1`,
    );

    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("blue");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /blue/i })).toHaveFocus();
  });
});
