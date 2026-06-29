import { describe, expect, it } from "vitest";

import { resolveButtonStyleConfig } from "./button";

describe("resolveButtonStyleConfig", () => {
  it("normalizes legacy tone variants", () => {
    expect(resolveButtonStyleConfig({ variant: "red" })).toEqual({
      variant: "solid",
      tone: "red",
    });
  });

  it("defaults to the solid blue variant", () => {
    expect(resolveButtonStyleConfig({})).toEqual({
      variant: "solid",
      tone: "blue",
    });
  });

  it("preserves an explicit outline variant and tone", () => {
    expect(resolveButtonStyleConfig({ variant: "outline", tone: "yellow" })).toEqual({
      variant: "outline",
      tone: "yellow",
    });
  });
});
