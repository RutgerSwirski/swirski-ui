import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const sourceRegistryPath = path.join(repoRoot, "registry/swirski.registry.json");
const outputRoot = path.join(repoRoot, "apps/docs/public");
const itemsOutputRoot = path.join(outputRoot, "r");
const registryOutputPath = path.join(outputRoot, "registry.json");
const registryItemSchema = "https://ui.shadcn.com/schema/registry-item.json";
const registrySchema = "https://ui.shadcn.com/schema/registry.json";
const publicRegistryUrl = "https://ui.swirski.dev";

const ignoredFilePatterns = [/\.stories\.tsx$/];

function registryItemUrl(name) {
  return `${publicRegistryUrl}/r/${name}.json`;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function titleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function walkFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory)) {
    if (ignoredFilePatterns.some((pattern) => pattern.test(entry))) {
      continue;
    }

    const filePath = path.join(directory, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      files.push(...walkFiles(filePath));
      continue;
    }

    files.push(filePath);
  }

  return files.sort();
}

function fileTypeForSource(source, fallbackType) {
  if (source.includes("/hooks/")) {
    return "registry:hook";
  }

  if (source.includes("/system/") || source.includes("/theme/")) {
    return "registry:lib";
  }

  if (source.endsWith(".css")) {
    return "registry:file";
  }

  return fallbackType;
}

function targetForSource(source) {
  const relativeSource = path.relative(path.join(repoRoot, "packages/ui/src"), source);
  return `@ui/swirski/${relativeSource}`;
}

function toRegistryFile(filePath, fallbackType) {
  const relativePath = path.relative(repoRoot, filePath);
  const type = fileTypeForSource(relativePath, fallbackType);

  return {
    path: relativePath,
    content: readFileSync(filePath, "utf8"),
    type,
    target: targetForSource(filePath),
  };
}

function createBaseItem() {
  const files = [
    ...walkFiles(path.join(repoRoot, "packages/ui/src/system")),
    ...walkFiles(path.join(repoRoot, "packages/ui/src/theme")),
    path.join(repoRoot, "packages/ui/src/styles.css"),
  ].map((filePath) => toRegistryFile(filePath, "registry:lib"));

  return {
    "$schema": registryItemSchema,
    name: "swirski-base",
    type: "registry:item",
    title: "Swirski Base",
    description:
      "Shared Swirski UI system helpers, theme provider, CSS variables and base styles.",
    dependencies: ["clsx", "@fontsource/anton", "@fontsource/bangers"],
    files,
    docs:
      'Import the generated `@ui/swirski/styles.css` once in your app entry, then wrap your app with `SwirskiProvider` when you want theme tokens.',
    categories: ["swirski", "base", "theming"],
    meta: {
      swirskiSource: "packages/ui/src",
    },
  };
}

function createRegistryItem(component) {
  const sourceRoot = path.join(repoRoot, component.source);
  const isHook = component.source.includes("/hooks/");
  const isTheme = component.source.includes("/theme");
  const fallbackType = isHook ? "registry:hook" : "registry:ui";
  const files = walkFiles(sourceRoot).map((filePath) =>
    toRegistryFile(filePath, fallbackType),
  );
  const registryDependencies = [
    ...(isHook || isTheme ? [] : ["swirski-base"]),
    ...(component.dependencies ?? []),
  ].map(registryItemUrl);

  return {
    "$schema": registryItemSchema,
    name: component.name,
    type: isHook ? "registry:hook" : "registry:ui",
    title: titleCase(component.name),
    description: component.description,
    registryDependencies,
    dependencies: isHook ? [] : ["clsx"],
    files,
    categories: ["swirski", component.category],
    meta: {
      swirskiCategory: component.category,
      swirskiSource: component.source,
    },
  };
}

function main() {
  if (!existsSync(sourceRegistryPath)) {
    throw new Error(`Missing source registry at ${sourceRegistryPath}`);
  }

  const sourceRegistry = readJson(sourceRegistryPath);
  const items = [
    createBaseItem(),
    ...sourceRegistry.components.map(createRegistryItem),
  ];
  const registry = {
    "$schema": registrySchema,
    name: sourceRegistry.name,
    homepage: publicRegistryUrl,
    items,
  };

  rmSync(itemsOutputRoot, { force: true, recursive: true });
  rmSync(registryOutputPath, { force: true });
  mkdirSync(itemsOutputRoot, { recursive: true });
  writeJson(registryOutputPath, registry);

  for (const item of items) {
    writeJson(path.join(itemsOutputRoot, `${item.name}.json`), item);
  }

  console.log(
    `Generated ${items.length} shadcn registry items in apps/docs/public`,
  );
}

main();
