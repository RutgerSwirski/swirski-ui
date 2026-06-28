import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("describes an asChild trigger on hover and focus", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip asChild content="Helpful context">
        <button type="button">Info</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Info" });

    await user.hover(trigger);
    const tooltip = await screen.findByRole("tooltip");

    expect(tooltip).toHaveTextContent("Helpful context");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    expect(trigger).toHaveAccessibleDescription("Helpful context");

    await user.unhover(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful context");
    expect(trigger).toHaveAccessibleDescription("Helpful context");
  });

  it("preserves existing descriptions while the tooltip opens and closes", async () => {
    const user = userEvent.setup();

    render(
      <>
        <p id="external-note">Visible note</p>
        <Tooltip asChild content="Helpful context">
          <button aria-describedby="external-note" type="button">
            Info
          </button>
        </Tooltip>
        <button type="button">Next</button>
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Info" });

    expect(trigger).toHaveAccessibleDescription("Visible note");

    await user.tab();

    const tooltip = await screen.findByRole("tooltip");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute(
      "aria-describedby",
      `external-note ${tooltip.id}`,
    );
    expect(trigger).toHaveAccessibleDescription(
      "Visible note Helpful context",
    );

    await user.tab();

    expect(screen.getByRole("button", { name: "Next" })).toHaveFocus();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-describedby", "external-note");
    expect(trigger).toHaveAccessibleDescription("Visible note");
  });
});
