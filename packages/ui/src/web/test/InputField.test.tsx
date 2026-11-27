import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { InputField } from "../components/field";

describe("InputField", () => {
  it("links the label, hint and error and preserves external descriptions", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <>
        <p id="policy">Required for billing.</p>
        <InputField
          ref={ref}
          id="email"
          name="email"
          label="Email"
          hint="Use your work address."
          error="Enter a valid email."
          aria-describedby="policy"
        />
      </>,
    );

    const control = screen.getByRole("textbox", { name: "Email" });
    expect(ref.current).toBe(control);
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAccessibleDescription(
      "Required for billing. Use your work address. Enter a valid email.",
    );
  });
});
