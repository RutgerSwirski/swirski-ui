import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CursorProvider } from "./CursorProvider";

describe("CursorProvider", () => {
  it("publishes custom cursor variables for the supported interaction states", () => {
    render(
      <CursorProvider data-testid="provider" storageKey={false}>
        <button type="button">Hover me</button>
      </CursorProvider>,
    );

    const provider = screen.getByTestId("provider");

    expect(document.body).toHaveAttribute("data-swirski-cursor", "bolt");
    expect(provider.style.getPropertyValue("--swirski-cursor-grab")).toContain(
      "grab",
    );
    expect(
      provider.style.getPropertyValue("--swirski-cursor-grabbing"),
    ).toContain("grabbing");
    expect(
      provider.style.getPropertyValue("--swirski-cursor-disabled"),
    ).toContain("not-allowed");
    expect(
      provider.style.getPropertyValue("--swirski-cursor-not-allowed"),
    ).toContain("not-allowed");
    expect(
      provider.style.getPropertyValue("--swirski-cursor-progress"),
    ).toContain("progress");
  });

  it("switches pressed state for panning targets without overriding text input", () => {
    render(
      <CursorProvider data-testid="provider" storageKey={false}>
        <button type="button">Press me</button>
        <div data-cursor="pan" data-testid="pan-surface">
          <button type="button">Nested action</button>
        </div>
        <div data-cursor="disabled" data-testid="disabled-surface">
          Locked
        </div>
        <input aria-label="Title" />
      </CursorProvider>,
    );

    const provider = screen.getByTestId("provider");

    fireEvent.pointerDown(screen.getByTestId("pan-surface"), {
      pointerType: "mouse",
    });
    expect(provider).toHaveAttribute(
      "data-swirski-cursor-pressed-state",
      "grabbing",
    );

    fireEvent.pointerUp(window);
    expect(provider).not.toHaveAttribute("data-swirski-cursor-pressed-state");

    fireEvent.pointerDown(screen.getByRole("button", { name: "Press me" }), {
      pointerType: "mouse",
    });
    expect(provider).toHaveAttribute(
      "data-swirski-cursor-pressed-state",
      "active",
    );

    fireEvent.pointerUp(window);
    fireEvent.pointerDown(
      screen.getByRole("button", { name: "Nested action" }),
      {
        pointerType: "mouse",
      },
    );
    expect(provider).toHaveAttribute(
      "data-swirski-cursor-pressed-state",
      "active",
    );

    fireEvent.pointerUp(window);
    fireEvent.pointerDown(screen.getByRole("textbox", { name: "Title" }), {
      pointerType: "mouse",
    });
    expect(provider).not.toHaveAttribute("data-swirski-cursor-pressed-state");

    fireEvent.pointerDown(screen.getByTestId("disabled-surface"), {
      pointerType: "mouse",
    });
    expect(provider).not.toHaveAttribute("data-swirski-cursor-pressed-state");
  });
});
