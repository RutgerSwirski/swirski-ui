import { render, screen, waitFor } from "@testing-library/react";
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
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

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

    expect(trigger).toHaveAccessibleDescription("Visible note Helpful context");

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
    expect(trigger).toHaveAccessibleDescription("Visible note Helpful context");
  });

  it("describes a wrapped button before focus and dismisses on Escape without moving focus", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Extra context"><button>Info</button></Tooltip>);
    const trigger = screen.getByRole("button", { name: "Info" });
    expect(trigger).toHaveAccessibleDescription("Extra context");
    await user.tab();
    expect(await screen.findByRole("tooltip")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
