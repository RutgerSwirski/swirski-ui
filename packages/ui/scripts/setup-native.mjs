#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd, exit } from "node:process";

const fontAssetPath = "./node_modules/@swirski/ui/dist/native/fonts";
const configFiles = [
  "react-native.config.js",
  "react-native.config.cjs",
  "react-native.config.mjs",
  "react-native.config.ts",
];

function printHelp() {
  console.log(`Swirski UI native setup

Usage:
  swirski-native setup

Adds the bundled Swirski font assets to your React Native asset config.
Run this from the root of your React Native app.

Options:
  --no-link   Update config but skip running react-native-asset.`);
}

function insertIntoAssetsArray(source) {
  return source.replace(
    /(assets\s*:\s*\[)/,
    `$1\n    "${fontAssetPath}",\n    `,
  );
}

function insertIntoExportedObject(source, exportPattern) {
  return source.replace(
    exportPattern,
    `$1\n  assets: ["${fontAssetPath}"],`,
  );
}

function updateConfig(filePath) {
  const source = readFileSync(filePath, "utf8");

  if (source.includes(fontAssetPath)) {
    return "unchanged";
  }

  let nextSource = source;

  if (/assets\s*:\s*\[/.test(nextSource)) {
    nextSource = insertIntoAssetsArray(nextSource);
  } else if (/module\.exports\s*=\s*{/.test(nextSource)) {
    nextSource = insertIntoExportedObject(
      nextSource,
      /(module\.exports\s*=\s*{)/,
    );
  } else if (/export\s+default\s*{/.test(nextSource)) {
    nextSource = insertIntoExportedObject(
      nextSource,
      /(export\s+default\s*{)/,
    );
  } else {
    return "unsupported";
  }

  writeFileSync(filePath, nextSource);
  return "updated";
}

function createConfig(filePath) {
  writeFileSync(
    filePath,
    `module.exports = {
  assets: ["${fontAssetPath}"],
};
`,
  );
}

function hasNativeProject(projectRoot) {
  return (
    existsSync(join(projectRoot, "ios")) ||
    existsSync(join(projectRoot, "android"))
  );
}

function runAssetLinker(projectRoot) {
  const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

  execFileSync(
    npxCommand,
    ["--yes", "react-native-asset", "-p", projectRoot, "-a", fontAssetPath],
    {
      cwd: projectRoot,
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );
}

function main() {
  const args = process.argv.slice(2);
  const command = args.find((arg) => !arg.startsWith("-")) ?? "setup";
  const shouldLinkAssets = !args.includes("--no-link");

  if (args.includes("--help") || args.includes("-h") || command === "help") {
    printHelp();
    return;
  }

  if (command !== "setup" && command !== "init") {
    console.error(`Unknown command: ${command}`);
    printHelp();
    exit(1);
  }

  const projectRoot = cwd();
  const existingConfig = configFiles
    .map((fileName) => join(projectRoot, fileName))
    .find((filePath) => existsSync(filePath));

  if (!existingConfig) {
    const configPath = join(projectRoot, "react-native.config.cjs");
    createConfig(configPath);
    console.log("Created react-native.config.cjs with Swirski font assets.");
  } else {
    const result = updateConfig(existingConfig);

    if (result === "unchanged") {
      console.log("Swirski font assets are already configured.");
    } else if (result === "updated") {
      console.log(`Updated ${existingConfig.replace(`${projectRoot}/`, "")}.`);
    } else {
      console.error(
        `Could not safely update ${existingConfig.replace(`${projectRoot}/`, "")}.`,
      );
      console.error(`Add this asset path manually: ${fontAssetPath}`);
      exit(1);
    }
  }

  if (shouldLinkAssets) {
    if (!hasNativeProject(projectRoot)) {
      console.log(
        "Skipped asset linking because no ios or android directory was found.",
      );
    } else {
      console.log("Linking Swirski font assets...");

      try {
        runAssetLinker(projectRoot);
      } catch {
        console.error("Could not run react-native-asset automatically.");
        console.error(
          `Run this manually: npx react-native-asset -a ${fontAssetPath}`,
        );
        exit(1);
      }
    }
  }

  console.log(`
Next:
  npx react-native run-ios

Or run your Android app with:
  npx react-native run-android`);
}

main();
