import { describe, expect, it } from "vitest";
import { scopeComponentStyles } from "./scope-component-styles.mjs";

describe("scopeComponentStyles", () => {
  it("guards each utility's subject without changing specificity", () => {
    const css = scopeComponentStyles(`
      .outside { display: block }
      @layer utilities {
        @scope ([data-swirski-component]) {
          .grid, .group:hover > .child { display: grid }
          @media (hover: hover) {
            .control:hover::before, .\\[\\&\\]::after { content: "" }
          }
        }
      }
    `);

    expect(css).toContain(".outside { display: block }");
    expect(css).not.toContain("@scope");
    expect(css).toContain(".grid:where([data-swirski-component]");
    expect(css).toContain(".group:hover>.child:where([data-swirski-component]");
    expect(css).toMatch(/\.control:hover:where\([^\n]+\)::before/);
    expect(css).toMatch(/\)::after/);
  });
});
