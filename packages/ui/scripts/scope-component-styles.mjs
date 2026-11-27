import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

const componentBoundary =
  ":where([data-swirski-component], [data-swirski-component] *, :has(> [data-swirski-backdrop]), :has(> [data-swirski-backdrop]) *)";
const legacyPseudoElements = new Set([":before", ":after", ":first-line", ":first-letter"]);

const scopeSelector = selectorParser((selectors) => {
  selectors.each((selector) => {
    selector.walkNesting(() => {
      throw new Error("Expected Tailwind to flatten selectors before scoping.");
    });
    const nodes = [...selector.nodes];
    const subjectStart = nodes.map((node) => node.type).lastIndexOf("combinator") + 1;
    const pseudoElement = nodes.slice(subjectStart).find((node) =>
      node.type === "pseudo" && (node.value.startsWith("::") || legacyPseudoElements.has(node.value)),
    );
    const boundary = selectorParser().astSync(componentBoundary).first.first.clone();
    if (pseudoElement) selector.insertBefore(pseudoElement, boundary);
    else selector.append(boundary);
  });
});

/** Keep the component boundary in browsers that support Tailwind v4 but lack @scope. */
export function scopeComponentStyles(css) {
  const root = postcss.parse(css);
  root.walkAtRules("scope", (scope) => {
    if (!scope.params.includes("[data-swirski-component]")) return;
    scope.walkRules((rule) => {
      if (rule.parent.type === "rule") {
        throw rule.error("Expected Tailwind to flatten selectors before scoping.");
      }
      rule.selector = scopeSelector.processSync(rule.selector, { lossless: false });
    });
    scope.replaceWith(...scope.nodes);
  });
  return root.toString();
}
