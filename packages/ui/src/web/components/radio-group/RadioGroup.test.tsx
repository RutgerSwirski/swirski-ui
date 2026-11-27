import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
  { value: "standard", label: "Standard" },
  { value: "express", label: "Express" },
];

describe("RadioGroup", () => {
  it("keeps group attributes on the radiogroup", () => {
    render(
      <RadioGroup
        aria-labelledby="shipping-label"
        id="shipping-options"
        name="shipping"
        options={options}
      />,
    );

    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("id", "shipping-options");
    expect(group).toHaveAttribute("aria-labelledby", "shipping-label");

    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).not.toHaveAttribute("id", "shipping-options");
      expect(radio).not.toHaveAttribute("aria-labelledby", "shipping-label");
    }
  });

  it("applies explicit native input props to each radio", () => {
    render(
      <RadioGroup
        inputProps={{ required: true, form: "checkout" }}
        name="shipping"
        options={options}
      />,
    );

    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toBeRequired();
      expect(radio).toHaveAttribute("form", "checkout");
    }
  });
});
