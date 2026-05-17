#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const templateRoot = path.join(
  repoRoot,
  "apps/docs/public/templates/component",
);
const componentsRoot = path.join(repoRoot, "packages/ui/src/components");
const packageIndexPath = path.join(repoRoot, "packages/ui/src/index.ts");
const registryPath = path.join(repoRoot, "registry/swirski.registry.json");

const categoryLabels = {
  backgrounds: "Backgrounds",
  buttons: "Buttons",
  cards: "Cards",
  disclosure: "Disclosure",
  feedback: "Feedback",
  forms: "Forms",
  interaction: "Interaction",
  layout: "Layout",
  media: "Media",
  theming: "Theming",
  typography: "Typography",
};

const templateFiles = [
  {
    source: "ComponentName.tsx.template",
    target: (name) => `${name}.tsx`,
  },
  {
    source: "index.ts.template",
    target: () => "index.ts",
  },
  {
    source: "ComponentName.test.tsx.template",
    target: (name) => `${name}.test.tsx`,
  },
];

function parseArgs(argv) {
  const args = { _: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];

    if (!item.startsWith("--")) {
      args._.push(item);
      continue;
    }

    const key = item.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function toKebabCase(value) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function toPascalCase(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toTitle(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function assertValidSlug(slug) {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Invalid component name "${slug}". Use a name like empty-state or pricing-card.`,
    );
  }
}

function replacePlaceholders(content, values) {
  return content
    .replaceAll("ComponentName", values.name)
    .replaceAll("component-name", values.slug)
    .replaceAll("Component name", values.title)
    .replaceAll("Feedback", values.docsCategory)
    .replaceAll("feedback", values.category)
    .replaceAll("A short description of what this component is for.", values.description);
}

function writeFile(filePath, content, options) {
  if (options.dryRun) {
    console.log(`Would write ${path.relative(repoRoot, filePath)}`);
    return;
  }

  if (existsSync(filePath) && !options.force) {
    throw new Error(
      `${path.relative(repoRoot, filePath)} already exists. Use --force to overwrite.`,
    );
  }

  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
  console.log(`Created ${path.relative(repoRoot, filePath)}`);
}

function createSourceFiles(values, options) {
  for (const template of templateFiles) {
    const sourcePath = path.join(templateRoot, template.source);
    const targetPath = path.join(
      componentsRoot,
      values.slug,
      template.target(values.name),
    );
    const content = replacePlaceholders(
      readFileSync(sourcePath, "utf8"),
      values,
    );

    writeFile(targetPath, content, options);
  }
}

function updatePackageIndex(slug, options) {
  const exportLine = `export * from "./components/${slug}/index";`;
  const content = readFileSync(packageIndexPath, "utf8");

  if (content.includes(exportLine)) {
    console.log(`Package export already exists for ${slug}`);
    return;
  }

  const marker = 'export * from "./hooks/index";';
  const markerIndex = content.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Could not find hooks export marker in packages/ui/src/index.ts.`);
  }

  const componentBlock = content.slice(0, markerIndex);
  const rest = content.slice(markerIndex);
  const exportLines =
    componentBlock.match(/^export \* from "\.\/components\/[^"]+";$/gm) ?? [];
  const nextExportLines = Array.from(new Set([...exportLines, exportLine])).sort();
  const nextContent = `${nextExportLines.join("\n\n")}\n\n${rest}`;

  if (options.dryRun) {
    console.log(`Would add package export ${exportLine}`);
    return;
  }

  writeFileSync(packageIndexPath, nextContent);
  console.log(`Updated ${path.relative(repoRoot, packageIndexPath)}`);
}

function formatRegistry(registry) {
  const lines = [
    "{",
    `  "$schema": ${JSON.stringify(registry.$schema)},`,
    `  "name": ${JSON.stringify(registry.name)},`,
    `  "version": ${JSON.stringify(registry.version)},`,
    `  "components": [`,
  ];

  registry.components.forEach((component, index) => {
    const fields = [
      `"name": ${JSON.stringify(component.name)}`,
      `"category": ${JSON.stringify(component.category)}`,
      `"description": ${JSON.stringify(component.description)}`,
      `"source": ${JSON.stringify(component.source)}`,
    ];

    if (component.dependencies?.length) {
      fields.push(`"dependencies": ${JSON.stringify(component.dependencies)}`);
    }

    const comma = index === registry.components.length - 1 ? "" : ",";
    lines.push(`    { ${fields.join(", ")} }${comma}`);
  });

  lines.push("  ]", "}", "");

  return lines.join("\n");
}

function updateRegistry(values, options) {
  const registry = readJson(registryPath);
  const existingIndex = registry.components.findIndex(
    (component) => component.name === values.slug,
  );
  const nextEntry = {
    name: values.slug,
    category: values.category,
    description: values.description,
    source: `packages/ui/src/components/${values.slug}`,
  };

  if (existingIndex !== -1 && !options.force) {
    console.log(`Registry entry already exists for ${values.slug}`);
    return;
  }

  if (existingIndex !== -1) {
    registry.components[existingIndex] = nextEntry;
  } else {
    registry.components.push(nextEntry);
  }

  registry.components.sort((a, b) => a.name.localeCompare(b.name));

  if (options.dryRun) {
    console.log(`Would add registry entry for ${values.slug}`);
    return;
  }

  writeFileSync(registryPath, formatRegistry(registry));
  console.log(`Updated ${path.relative(repoRoot, registryPath)}`);
}

function printNextSteps(values) {
  console.log(`
Next steps:
  1. Replace placeholder copy and adjust the component source.
  2. Add a docs entry in apps/docs/content/components.tsx.
  3. Add a playground entry in apps/docs/content/playgrounds.tsx if useful.
  4. Run:
     pnpm docs:metadata
     pnpm test:ui
     pnpm registry:shadcn
     pnpm build

Template snippets:
  ${path.relative(repoRoot, path.join(templateRoot, "docs-entry.tsx.template"))}
  ${path.relative(repoRoot, path.join(templateRoot, "playground-entry.tsx.template"))}
`);
}

function printUsage() {
  console.log(`Create a Swirski component

Usage:
  pnpm create:component <name> [options]

Examples:
  pnpm create:component empty-state
  pnpm create:component pricing-card --category cards --description "Pricing card surface."
  pnpm create:component EmptyState --dry-run

Options:
  --category <name>      Registry category. Default: feedback
  --description <text>   Short registry/docs description.
  --dry-run              Preview writes without creating files.
  --force                Overwrite existing source files and registry entry.
`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const rawName = args._[0];

  if (!rawName || args.help) {
    printUsage();
    process.exit(rawName ? 0 : 1);
  }

  const slug = toKebabCase(rawName);
  assertValidSlug(slug);

  const category = String(args.category ?? "feedback").toLowerCase();
  const docsCategory = categoryLabels[category];

  if (!docsCategory) {
    throw new Error(
      `Unknown category "${category}". Use one of: ${Object.keys(categoryLabels).join(", ")}.`,
    );
  }

  const values = {
    category,
    description:
      typeof args.description === "string"
        ? args.description
        : `${toTitle(slug)} component.`,
    docsCategory,
    name: toPascalCase(slug),
    slug,
    title: toTitle(slug),
  };
  const options = {
    dryRun: Boolean(args["dry-run"]),
    force: Boolean(args.force),
  };

  createSourceFiles(values, options);
  updatePackageIndex(values.slug, options);
  updateRegistry(values, options);
  printNextSteps(values);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
