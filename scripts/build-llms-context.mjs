import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const uiRoot = path.join(repoRoot, "packages/ui");
const docsPublicRoot = path.join(repoRoot, "apps/docs/public");
const componentDocsRoot = path.join(repoRoot, "apps/docs/content/components");
const hookDocsRoot = path.join(repoRoot, "apps/docs/content/hooks");
const registryPath = path.join(repoRoot, "registry/swirski.registry.json");
const publicRegistryUrl = "https://ui.swirski.dev";
const requireFromUi = createRequire(path.join(uiRoot, "package.json"));
const ts = requireFromUi("typescript");

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeText(filePath, value) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${value.trim()}\n`);
}

function registryItemUrl(name) {
  return `${publicRegistryUrl}/r/${name}.json`;
}

function docsUrl(type, slug) {
  return `${publicRegistryUrl}/${type}/${slug}`;
}

function toTitle(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function docFiles(root, fileName) {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name, fileName))
    .filter((filePath) => existsSync(filePath))
    .sort();
}

function propByName(objectLiteral, propertyName) {
  return objectLiteral.properties.find((property) => {
    if (!ts.isPropertyAssignment(property)) {
      return false;
    }

    const name = property.name;
    return (
      (ts.isIdentifier(name) || ts.isStringLiteral(name)) &&
      name.text === propertyName
    );
  });
}

function literalText(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text.trim();
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return "true";
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return "false";
  }

  if (ts.isNumericLiteral(node)) {
    return node.text;
  }

  return undefined;
}

function objectString(objectLiteral, propertyName) {
  const property = propByName(objectLiteral, propertyName);

  if (!property) {
    return undefined;
  }

  return literalText(property.initializer);
}

function objectBoolean(objectLiteral, propertyName) {
  const value = objectString(objectLiteral, propertyName);

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

function propDocs(objectLiteral, propertyName) {
  const property = propByName(objectLiteral, propertyName);

  if (!property || !ts.isArrayLiteralExpression(property.initializer)) {
    return [];
  }

  return property.initializer.elements
    .filter(ts.isObjectLiteralExpression)
    .map((prop) => ({
      name: objectString(prop, "name") ?? "",
      type: objectString(prop, "type") ?? "",
      defaultValue: objectString(prop, "defaultValue"),
      required: objectBoolean(prop, "required"),
      description: objectString(prop, "description") ?? "",
    }))
    .filter((prop) => prop.name && prop.type);
}

function findDocObject(sourceFile) {
  const docs = [];

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer) &&
      objectString(node.initializer, "slug")
    ) {
      docs.push(node.initializer);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return docs[0] ?? null;
}

function parseDocFile(filePath, type) {
  const sourceText = readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const docObject = findDocObject(sourceFile);

  if (!docObject) {
    return null;
  }

  const slug = objectString(docObject, "slug");

  if (!slug) {
    return null;
  }

  return {
    category: objectString(docObject, "category") ?? (type === "hook" ? "Hooks" : "Other"),
    compositionCode: objectString(docObject, "compositionCode"),
    description: objectString(docObject, "description") ?? "",
    filePath: path.relative(repoRoot, filePath),
    importCode: objectString(docObject, "importCode") ?? "",
    props: propDocs(docObject, "props"),
    returns: propDocs(docObject, "returns"),
    slug,
    title: objectString(docObject, "title") ?? toTitle(slug),
    type,
    usageCode: objectString(docObject, "usageCode") ?? "",
  };
}

function loadDocs(root, fileName, type) {
  return docFiles(root, fileName)
    .map((filePath) => parseDocFile(filePath, type))
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));
}

function groupByCategory(docs) {
  return docs.reduce((groups, doc) => {
    groups.set(doc.category, [...(groups.get(doc.category) ?? []), doc]);
    return groups;
  }, new Map());
}

function codeBlock(language, code) {
  if (!code) {
    return "";
  }

  return `\n\`\`\`${language}\n${code}\n\`\`\`\n`;
}

function propLine(prop) {
  const required = prop.required ? " required" : "";
  const defaultValue = prop.defaultValue ? ` default ${prop.defaultValue}` : "";
  const description = prop.description ? ` - ${prop.description}` : "";

  return `- \`${prop.name}\`: \`${prop.type}\`${required}${defaultValue}${description}`;
}

function compactImport(importCode) {
  return importCode.replace(/\s+/g, " ").trim();
}

function registryFor(doc, registryByName) {
  return registryByName.get(doc.slug);
}

function renderCompactCatalogue(docs, type, registryByName) {
  return docs
    .map((doc) => {
      const registryItem = registryFor(doc, registryByName);
      const registryText = registryItem ? ` Registry: ${registryItemUrl(doc.slug)}.` : "";
      const importText = doc.importCode ? ` Import: \`${compactImport(doc.importCode)}\`.` : "";
      return `- [${doc.title}](${docsUrl(type, doc.slug)}): ${doc.description}${importText}${registryText}`;
    })
    .join("\n");
}

function renderFullDoc(doc, type, registryByName) {
  const registryItem = registryFor(doc, registryByName);
  const source = registryItem?.source ? `\nSource: \`${registryItem.source}\`` : "";
  const dependencies = registryItem?.dependencies?.length
    ? `\nCopy dependencies: ${registryItem.dependencies.map((dependency) => `\`${dependency}\``).join(", ")}`
    : "";
  const registry = registryItem ? `\nRegistry: ${registryItemUrl(doc.slug)}` : "";
  const docs = `Docs: ${docsUrl(type, doc.slug)}`;
  const props = doc.props.length
    ? `\nProps:\n${doc.props.map(propLine).join("\n")}\n`
    : "";
  const returns = doc.returns.length
    ? `\nReturns:\n${doc.returns.map(propLine).join("\n")}\n`
    : "";
  const composition = doc.compositionCode
    ? `\nComposition:${codeBlock("txt", doc.compositionCode)}`
    : "";
  const importCode = doc.importCode ? `\nImport:${codeBlock("tsx", doc.importCode)}` : "";
  const usageCode = doc.usageCode ? `\nUsage:${codeBlock("tsx", doc.usageCode)}` : "";

  return `### ${doc.title}

${doc.description}

Category: ${doc.category}
${docs}${registry}${source}${dependencies}
${importCode}${usageCode}${composition}${props}${returns}`.trim();
}

function renderGroupedFullCatalogue(docs, type, registryByName) {
  return [...groupByCategory(docs).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, categoryDocs]) => {
      const entries = categoryDocs
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((doc) => renderFullDoc(doc, type, registryByName))
        .join("\n\n");

      return `## ${category}\n\n${entries}`;
    })
    .join("\n\n");
}

function missingRegistryDocs(registryItems, docs) {
  const documented = new Set(docs.map((doc) => doc.slug));

  return registryItems
    .filter((item) => !documented.has(item.name))
    .map((item) => `- \`${item.name}\`: ${item.description} Source: \`${item.source}\``)
    .join("\n");
}

function createShortContext({ components, hooks, packageJson, registryByName }) {
  return `# Swirski UI

> Swirski UI is a React component package for bold, graphic, studio-flavored interfaces. It supports package imports from \`@swirski/ui\`, a source-copy workflow through \`@swirski/cli\`, and shadcn-compatible hosted registry items.

Generated from \`packages/ui/package.json\`, \`registry/swirski.registry.json\`, and docs metadata in \`apps/docs/content\`.

Current package version: \`@swirski/ui@${packageJson.version}\`.

Primary install paths:

- Package: \`pnpm add @swirski/ui\`
- Swirski CLI: \`pnpm add -D @swirski/cli\`
- shadcn registry: \`pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json\`

## Start Here

- [Home](${publicRegistryUrl}): Product overview and primary workflow choices.
- [Get Started](${publicRegistryUrl}/get-started): Package, Swirski CLI, and shadcn registry setup.
- [CLI and Registry](${publicRegistryUrl}/cli): Details for \`@swirski/cli\`, hosted registry URLs, and namespace setup.
- [System](${publicRegistryUrl}/system): Theme tokens, \`SwirskiProvider\`, component anatomy, and \`asChild\` conventions.
- [Build a Component](${publicRegistryUrl}/build-component): Guide for creating a new Swirski component.
- [Components](${publicRegistryUrl}/components): Component index with examples, imports, props, and playgrounds.
- [Hooks](${publicRegistryUrl}/hooks): Hook index and recipes.
- [Examples](${publicRegistryUrl}/examples): Composed UI examples built from Swirski primitives.
- [Full LLM Context](${publicRegistryUrl}/llms-full.txt): Expanded generated reference.

## Registry

- [shadcn registry root](${publicRegistryUrl}/registry.json): Full hosted registry index.
- [swirski-base item](${registryItemUrl("swirski-base")}): Shared system helpers, theme files, CSS variables, and base styles.
- Registry item URL pattern: \`${publicRegistryUrl}/r/{name}.json\`

## Component Docs

${renderCompactCatalogue(components, "components", registryByName)}

## Hook Docs

${renderCompactCatalogue(hooks, "hooks", registryByName)}

## Optional

- [Repository README](https://github.com/rutgerswirski/swirski-ui): Project overview, development commands, release flow, and design principles.
- [npm package](https://www.npmjs.com/package/@swirski/ui): Published \`@swirski/ui\` package.
- [CLI package](https://www.npmjs.com/package/@swirski/cli): Published \`@swirski/cli\` package.
`;
}

function createFullContext({ components, hooks, packageJson, registry, registryByName }) {
  const undocumented = missingRegistryDocs(registry.components, [...components, ...hooks]);
  const missingSection = undocumented
    ? `\n## Registry Items Without Docs Metadata\n\n${undocumented}\n`
    : "";

  return `# Swirski UI Full LLM Context

Generated from \`packages/ui/package.json\`, \`registry/swirski.registry.json\`, and docs metadata in \`apps/docs/content\`.

Current package version: \`@swirski/ui@${packageJson.version}\`.

Docs site: ${publicRegistryUrl}

## What Swirski UI Is

Swirski UI is a React component package for bold, graphic, studio-flavored interfaces. It combines thick borders, hard shadows, expressive typography, custom cursors, practical app primitives, theme tokens, docs, playgrounds, generated props metadata, examples, and registry workflows.

Use \`@swirski/ui\` for normal package installs, \`@swirski/cli\` for source-copy ownership, and hosted shadcn-compatible registry items for shadcn workflows.

The visual language is loud but practical: strong borders, hard offset shadows, graphic color, uppercase labels, expressive display fonts, dense app primitives, and \`className\` escape hatches.

## Install Workflows

### Package

\`\`\`bash
pnpm add @swirski/ui
\`\`\`

Import styles once in the app entry:

\`\`\`tsx
import "@swirski/ui/styles.css";
\`\`\`

Import components from the package root:

\`\`\`tsx
import { Button, Card, CardContent, Text, Title } from "@swirski/ui";
\`\`\`

Tailwind CSS v4 package consumers should make Tailwind scan the package output:

\`\`\`css
@source "../node_modules/@swirski/ui/dist";
\`\`\`

### Swirski CLI

\`\`\`bash
pnpm add -D @swirski/cli
pnpm exec swirski init
pnpm exec swirski add button
pnpm exec swirski add button card dialog
\`\`\`

### shadcn Registry

\`\`\`bash
pnpm dlx shadcn@latest view ${registryItemUrl("button")}
pnpm dlx shadcn@latest add ${registryItemUrl("button")}
\`\`\`

\`\`\`json
{
  "registries": {
    "@swirski": "${publicRegistryUrl}/r/{name}.json"
  }
}
\`\`\`

Registry root: ${publicRegistryUrl}/registry.json

## Theme Provider

\`\`\`tsx
import { SwirskiProvider, createSwirskiTheme } from "@swirski/ui";

const theme = createSwirskiTheme({
  colorBlue: "#0047FF",
  colorYellow: "#FFE45C",
  shadowMd: "8px 8px 0 var(--sw-color-shadow)",
});

export function App() {
  return (
    <SwirskiProvider theme={theme}>
      <YourRoutes />
    </SwirskiProvider>
  );
}
\`\`\`

Core tokens:

\`\`\`txt
--sw-color-ink
--sw-color-paper
--sw-color-surface
--sw-color-muted
--sw-color-blue
--sw-color-yellow
--sw-color-red
--sw-color-shadow
--sw-color-focus
--sw-border-width
--sw-shadow-sm
--sw-shadow-md
--sw-shadow-lg
--sw-font-body
--sw-font-heading
--sw-font-display
\`\`\`

## Code Generation Guidance

- Import package examples from \`@swirski/ui\`.
- Use copied-source imports only when the user is using \`@swirski/cli\` or shadcn registry installs.
- Prefer \`variant\`, \`size\`, \`tone\`, native props, forwarded refs, and \`className\` escape hatches.
- Prefer theme tokens and shared system helpers over hardcoded one-off styles.
- Preserve native HTML semantics where Swirski already uses them.
- Use \`@floating-ui/dom\` positioning through the shared system helper for floating content.
- Keep docs metadata, registry metadata, and package exports in sync when adding components.

${renderGroupedFullCatalogue(components, "components", registryByName)}

${renderGroupedFullCatalogue(hooks, "hooks", registryByName)}
${missingSection}
## Workspace Development

\`\`\`txt
apps/docs        Documentation site
packages/ui      React component package
packages/cli     Local registry CLI
registry         Component registry manifest
\`\`\`

Common commands:

\`\`\`bash
pnpm install
pnpm dev
pnpm storybook
pnpm docs:metadata
pnpm llms:build
pnpm build:ui
pnpm registry:shadcn
pnpm test:ui
pnpm build
\`\`\`

## Current Quality Notes

Swirski UI has a broad component surface, docs pages, playgrounds, generated props metadata, examples, component tests for several interactive primitives, shared modal overlay behavior for Dialog and Drawer, shared Floating UI positioning for DropdownMenu, Popover, Select, and Tooltip, and hosted shadcn-compatible registry output.

Important near-term quality work:

- Validate hosted shadcn registry items in CI.
- Smoke test remote shadcn installs for key components.
- Add per-component install tabs for package, Swirski CLI, and shadcn workflows.
- Continue strengthening accessibility tests for complex interaction primitives.

## License

Swirski UI is released under the MIT License.

License file: https://github.com/rutgerswirski/swirski-ui/blob/main/LICENSE
`;
}

function main() {
  const packageJson = readJson(path.join(uiRoot, "package.json"));
  const registry = readJson(registryPath);
  const registryByName = new Map(
    registry.components.map((component) => [component.name, component]),
  );
  const components = loadDocs(componentDocsRoot, "component.tsx", "component");
  const hooks = loadDocs(hookDocsRoot, "hook.tsx", "hook");

  writeText(
    path.join(docsPublicRoot, "llms.txt"),
    createShortContext({ components, hooks, packageJson, registryByName }),
  );
  writeText(
    path.join(docsPublicRoot, "llms-full.txt"),
    createFullContext({ components, hooks, packageJson, registry, registryByName }),
  );

  console.log(
    `Generated llms.txt and llms-full.txt from ${components.length} components and ${hooks.length} hooks.`,
  );
}

main();
