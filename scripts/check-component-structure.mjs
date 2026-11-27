#!/usr/bin/env node

import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const componentRoot = join(
  repoRoot,
  "packages",
  "ui",
  "src",
  "web",
  "components",
);

const missingBarrels = readdirSync(componentRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => {
    const directory = join(componentRoot, name);
    const hasSource = readdirSync(directory).some((file) =>
      /\.(ts|tsx)$/.test(file),
    );

    return hasSource && !existsSync(join(directory, "index.ts"));
  });

if (missingBarrels.length > 0) {
  console.error("UI component structure check failed:");
  console.error(
    `- Missing index.ts barrels: ${missingBarrels.sort().join(", ")}.`,
  );
  process.exit(1);
}

console.log("UI component structure check passed: all implemented components have barrels.");
