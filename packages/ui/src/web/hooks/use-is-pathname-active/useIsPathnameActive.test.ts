import { describe, expect, it } from "vitest";
import { isPathnameActive } from "./useIsPathnameActive";

describe("isPathnameActive", () => {
  it("matches exact and nested paths", () => {
    expect(isPathnameActive("/components", "/components")).toBe(true);
    expect(isPathnameActive("/components", "/components/button")).toBe(true);
    expect(isPathnameActive("/components", "/components-button")).toBe(false);
  });

  it("supports exact matching", () => {
    expect(
      isPathnameActive("/components", "/components/button", { exact: true }),
    ).toBe(false);
  });

  it("normalizes URLs, query strings, and trailing slashes", () => {
    expect(
      isPathnameActive(
        "/components/",
        "https://swirski.dev/components/button?tab=props",
      ),
    ).toBe(true);
  });

  it("only marks the root path active for the root URL", () => {
    expect(isPathnameActive("/", "/")).toBe(true);
    expect(isPathnameActive("/", "/components")).toBe(false);
  });
});
