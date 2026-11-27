import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Select } from "../components/select";

const options = [{ value: "blue", label: "Blue" }, { value: "red", label: "Red" }];

it("labels the trigger, excludes disabled values, and resets uncontrolled form values", async () => {
  const user = userEvent.setup();
  render(
    <>
      <form aria-label="Preferences" id="preferences">
        <button type="reset">Reset</button>
        <Select name="disabledColor" options={options} disabled />
        <Select name="controlledColor" options={options} value="red" defaultValue="blue" />
      </form>
      <label htmlFor="color">Color</label>
      <p id="color-hint">Choose a color.</p>
      <Select id="color" form="preferences" name="color" options={options} defaultValue="blue" aria-describedby="color-hint" />
    </>,
  );
  const form = screen.getByRole<HTMLFormElement>("form", { name: "Preferences" });
  const control = screen.getByRole("button", { name: "Color" });
  expect(control).toHaveAccessibleDescription("Choose a color.");
  expect(new FormData(form).has("disabledColor")).toBe(false);
  await user.click(control);
  await user.click(screen.getByRole("option", { name: "Red" }));
  expect(new FormData(form).get("color")).toBe("red");
  await user.click(screen.getByRole("button", { name: "Reset" }));
  await waitFor(() => expect(new FormData(form).get("color")).toBe("blue"));
  expect(new FormData(form).get("controlledColor")).toBe("red");
});
