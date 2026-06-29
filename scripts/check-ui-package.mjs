#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const packageDir = join(repoRoot, "packages", "ui");
const packageJsonPath = join(packageDir, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const packJson = execFileSync(
  npmCommand,
  ["pack", "--dry-run", "--json"],
  {
    cwd: packageDir,
    encoding: "utf8",
    shell: process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  },
);

const pack = parsePackOutput(packJson);
const files = pack.files
  .map((file) => file.path.replaceAll("\\", "/"))
  .sort();

const requiredFiles = [
  "dist/index.d.ts",
  "dist/index.js",
  "dist/native/index.d.ts",
  "dist/native/index.js",
  "dist/native/fonts/Anton_400Regular.ttf",
  "dist/native/fonts/Bangers_400Regular.ttf",
  "dist/native/fonts/Inter_400Regular.ttf",
  "dist/native/fonts/Inter_500Medium.ttf",
  "dist/native/fonts/Inter_700Bold.ttf",
  "dist/native/fonts/Inter_900Black.ttf",
  "dist/styles.css",
  "package.json",
  "scripts/setup-native.mjs",
];

const allowedRootFiles = new Set([
  "LICENSE",
  "README.md",
  "README.native.md",
  "package.json",
]);
const allowedScriptFiles = new Set(["scripts/setup-native.mjs"]);
const leakedPrefixes = ["src/", "scripts/", ".storybook/", "node_modules/"];
const leakedRootFiles = new Set([
  "postcss.config.js",
  "tailwind.config.ts",
  "tsconfig.json",
  "vitest.config.ts",
]);

const errors = [];
const missingFiles = requiredFiles.filter((file) => !files.includes(file));
const leakedFiles = files.filter(
  (file) =>
    !allowedScriptFiles.has(file) &&
    (leakedPrefixes.some((prefix) => file.startsWith(prefix)) ||
      leakedRootFiles.has(file)),
);
const unexpectedFiles = files.filter(
  (file) =>
    !file.startsWith("dist/") &&
    !allowedRootFiles.has(file) &&
    !allowedScriptFiles.has(file),
);

if (!Array.isArray(packageJson.files) || !packageJson.files.includes("dist")) {
  errors.push('packages/ui/package.json must publish the "dist" directory.');
}

if (packageJson.bin?.["swirski-native"] !== "./scripts/setup-native.mjs") {
  errors.push(
    'packages/ui/package.json must expose "swirski-native" from ./scripts/setup-native.mjs.',
  );
}

for (const field of ["main", "module", "types"]) {
  if (!packageJson[field]?.startsWith("./dist/")) {
    errors.push(`packages/ui/package.json field "${field}" must point into ./dist.`);
  }
}

if (missingFiles.length > 0) {
  errors.push(`Missing required packed files: ${missingFiles.join(", ")}.`);
}

if (leakedFiles.length > 0) {
  errors.push(`Source/config files leaked into the npm package: ${leakedFiles.join(", ")}.`);
}

if (unexpectedFiles.length > 0) {
  errors.push(`Unexpected files in the npm package: ${unexpectedFiles.join(", ")}.`);
}

if (errors.length > 0) {
  console.error("UI package check failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  console.error("");
  console.error("Packed files:");

  for (const file of files) {
    console.error(`- ${file}`);
  }

  process.exit(1);
}

console.log(`UI package check passed: ${files.length} packed files, dist payload only.`);

function parsePackOutput(output) {
  const start = output.search(/\[\s*\{\s*"id"\s*:/);

  if (start === -1) {
    throw new Error("npm pack did not return JSON output.");
  }

  const packs = JSON.parse(output.slice(start));
  const [firstPack] = packs;

  if (!firstPack?.files) {
    throw new Error("npm pack JSON output did not include a file list.");
  }

  return firstPack;
}
