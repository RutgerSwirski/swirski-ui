import { describe, expect, it } from "vitest";
import { scopeComponentStyles } from "./scope-component-styles.mjs";

describe("scopeComponentStyles", () => {
  it.each([
    [String.raw`.group-hover\:block:is(:where(.group):hover *)`, ""],
    [String.raw`.peer-checked\:block:is(:where(.peer):checked~*)`, ""],
    [String.raw`.peer:checked ~ .sibling`, ""],
    [String.raw`.\[\&\>svg\]\:size-4 > svg`, ""],
    [String.raw`.before\:block`, "::before"],
    [String.raw`.\[\&\:\:-webkit-details-marker\]\:hidden`, "::-webkit-details-marker"],
  ])("scopes the subject of %s%s", (selector, suffix) => {
    const css = scopeComponentStyles(`@scope ([data-swirski-component]) { ${selector}${suffix} { display: block } }`);
    const normalized = selector.replaceAll(" ~ ", "~").replaceAll(" > ", ">");
    expect(css).toContain(`${normalized}:where([data-swirski-component]`);
    expect(css).toContain(`[data-swirski-unscoped] *))${suffix}`);
  });

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
