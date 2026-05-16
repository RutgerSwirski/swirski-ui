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

    await user.unhover(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.tab();
    expect(trigger).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful context",
    );
  });
});
