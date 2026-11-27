import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, it, vi } from "vitest";
import { IconButton } from "../components/icon-button";

it("forwards the native ref, names the icon action, and respects disabled", async () => {
  const ref = createRef<HTMLButtonElement>();
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<IconButton aria-label="Next image" disabled onClick={onClick} ref={ref}>→</IconButton>);
  const button = screen.getByRole("button", { name: "Next image" });
  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute("type", "button");
  await user.click(button);
  expect(onClick).not.toHaveBeenCalled();
});
