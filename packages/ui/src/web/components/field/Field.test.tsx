import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { expect, it, vi } from "vitest";
import { Checkbox } from "../checkbox";
import { RadioGroup } from "../radio-group";
import { Select } from "../select";
import { Slider } from "../slider";
import { Switch } from "../switch";
import { Field, FieldError, FieldHint, Input, Label, Textarea } from "./index";

it("associates a native control with its field label and descriptions", () => {
  render(
    <StrictMode>
      <p id="account-info">Account information</p>
      <Field size="lg" required>
        <Label>Email</Label>
        <Input id="email" aria-describedby="account-info hint" />
        <FieldHint id="hint">Receipt address</FieldHint>
        <FieldError>Email already used</FieldError>
      </Field>
    </StrictMode>,
  );
  const input = screen.getByRole("textbox", { name: "Email" });
  expect(input).toHaveAttribute("id", "email");
  expect(input).toBeRequired();
  expect(input).toHaveAttribute("data-swirski-size", "lg");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAccessibleDescription("Account information Receipt address Email already used");
  expect(input.getAttribute("aria-describedby")?.match(/hint/g)).toHaveLength(1);
});

it("isolates nested fields and clears a removed error", () => {
  const form = (error?: string) => (
    <Field required disabled readOnly>
      <Label>Outer control</Label>
      <Input disabled={false} />
      <Field>
        <Label>Inner control</Label>
        <Textarea />
        <FieldError>{error}</FieldError>
      </Field>
    </Field>
  );
  const { rerender } = render(form("Invalid note"));
  const outer = screen.getByRole("textbox", { name: "Outer control" });
  const inner = screen.getByRole("textbox", { name: "Inner control" });
  expect(outer).toBeRequired();
  expect(outer).toBeEnabled();
  expect(outer).toHaveAttribute("readonly");
  expect(outer).not.toHaveAttribute("aria-describedby");
  expect(inner).not.toBeRequired();
  expect(inner).not.toHaveAttribute("readonly");
  expect(inner).toHaveAccessibleDescription("Invalid note");
  rerender(form());
  expect(inner).not.toHaveAttribute("aria-invalid");
  expect(inner).not.toHaveAttribute("aria-describedby");
});

it("preserves RadioGroup form ownership and root-level required and disabled props", () => {
  render(
    <>
      <form id="preferences" />
      <Field>
        <Label>Delivery</Label>
        <FieldHint>Choose a method</FieldHint>
        <RadioGroup required disabled form="preferences" name="delivery" options={[
          { value: "a", label: "Postal", description: "Two days" },
          { value: "b", label: "Pickup" },
        ]} />
      </Field>
    </>,
  );
  const group = screen.getByRole("radiogroup", { name: "Delivery" });
  expect(group).toHaveAccessibleDescription("Choose a method");
  expect(group).toHaveAttribute("aria-required", "true");
  expect(group).not.toHaveAttribute("form");
  const radios = screen.getAllByRole<HTMLInputElement>("radio");
  expect(radios[0]).toHaveAccessibleName("Postal");
  expect(radios[0]).toHaveAccessibleDescription("Two days");
  expect(radios[0].form?.id).toBe("preferences");
  expect(radios[0]).toBeDisabled();
  expect(radios[1]).toBeDisabled();
  expect(radios[0].id).not.toBe(radios[1].id);
});

it("supports controlled and uncontrolled mixed-state checkboxes", async () => {
  const change = vi.fn();
  const { rerender } = render(
    <form aria-label="Example">
      <Checkbox label="All rows" name="all" defaultIndeterminate />
      <Checkbox label="Controlled" checked={false} indeterminate onChange={change} />
    </form>,
  );
  const mixed = screen.getByRole<HTMLInputElement>("checkbox", { name: "All rows" });
  const controlled = screen.getByRole<HTMLInputElement>("checkbox", { name: "Controlled" });
  expect(mixed).toBePartiallyChecked();
  expect(controlled).toBePartiallyChecked();
  fireEvent.click(mixed);
  fireEvent.click(controlled);
  expect(mixed).toBeChecked();
  expect(mixed).not.toBePartiallyChecked();
  expect(controlled).toBePartiallyChecked();
  expect(change).toHaveBeenCalledOnce();
  screen.getByRole<HTMLFormElement>("form", { name: "Example" }).reset();
  await waitFor(() => expect(mixed).toBePartiallyChecked());
  expect(mixed).not.toBeChecked();
  rerender(<Checkbox label="Controlled" checked indeterminate={false} readOnly />);
  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByRole("checkbox")).not.toBePartiallyChecked();
});

it("associates Select, Slider and Switch without changing their native roles", () => {
  const selectRef = vi.fn();
  render(
    <>
      <Field required><Label>Country</Label><Select triggerRef={selectRef} options={[]} /></Field>
      <Field><Label>Volume</Label><Slider /></Field>
      <Field><Label>Updates</Label><Switch description="Only order updates" /></Field>
    </>,
  );
  const country = screen.getByRole("combobox", { name: "Country" });
  expect(country).toHaveAttribute("aria-required", "true");
  expect(selectRef).toHaveBeenCalledWith(country);
  expect(screen.getByRole("slider", { name: "Volume" })).toBeEnabled();
  expect(screen.getByRole("switch", { name: "Updates" })).toHaveAccessibleDescription("Only order updates");
});
