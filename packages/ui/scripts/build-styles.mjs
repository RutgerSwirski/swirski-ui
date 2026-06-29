#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const packageDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(packageDir, "dist");
const stylesPath = join(distDir, "styles.css");
const nativeFontsDir = join(distDir, "native", "fonts");

const binName = process.platform === "win32" ? "postcss.cmd" : "postcss";
const localPostcssBin = join(packageDir, "node_modules", ".bin", binName);
const postcssCommand = existsSync(localPostcssBin) ? localPostcssBin : binName;

execFileSync(
  postcssCommand,
  [
    "src/styles.css",
    "-o",
    "dist/styles.css",
    "--env",
    "production",
    "--config",
    ".",
  ],
  {
    cwd: packageDir,
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

const fontPackages = [
  { name: "@fontsource-variable/inter", outputDir: "inter" },
  { name: "@fontsource/anton", outputDir: "anton" },
  { name: "@fontsource/bangers", outputDir: "bangers" },
];

let styles = readFileSync(stylesPath, "utf8");

for (const fontPackage of fontPackages) {
  const packageJsonPath = require.resolve(`${fontPackage.name}/package.json`);
  const fontPackageDir = dirname(packageJsonPath);
  const fontFilesDir = join(fontPackageDir, "files");
  const outputDir = join(distDir, "fonts", fontPackage.outputDir);

  mkdirSync(outputDir, { recursive: true });

  const escapedPackageName = fontPackage.name.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const fontUrlPattern = new RegExp(
    `url\\((["']?)[^)"']*${escapedPackageName}/files/([^)"']+)\\1\\)`,
    "g",
  );

  const copiedFontFiles = new Set();

  styles = styles.replace(fontUrlPattern, (_match, quote, fileName) => {
    if (!copiedFontFiles.has(fileName)) {
      copyFileSync(join(fontFilesDir, fileName), join(outputDir, fileName));
      copiedFontFiles.add(fileName);
    }

    return `url(${quote}./fonts/${fontPackage.outputDir}/${fileName}${quote})`;
  });
}

writeFileSync(stylesPath, styles);

const nativeFontFiles = [
  {
    packageName: "@expo-google-fonts/inter",
    sourcePath: "400Regular/Inter_400Regular.ttf",
  },
  {
    packageName: "@expo-google-fonts/inter",
    sourcePath: "500Medium/Inter_500Medium.ttf",
  },
  {
    packageName: "@expo-google-fonts/inter",
    sourcePath: "700Bold/Inter_700Bold.ttf",
  },
  {
    packageName: "@expo-google-fonts/inter",
    sourcePath: "900Black/Inter_900Black.ttf",
  },
  {
    packageName: "@expo-google-fonts/anton",
    sourcePath: "400Regular/Anton_400Regular.ttf",
  },
  {
    packageName: "@expo-google-fonts/bangers",
    sourcePath: "400Regular/Bangers_400Regular.ttf",
  },
];

mkdirSync(nativeFontsDir, { recursive: true });

for (const fontFile of nativeFontFiles) {
  const packageJsonPath = require.resolve(`${fontFile.packageName}/package.json`);
  const fontPackageDir = dirname(packageJsonPath);
  const fileName = fontFile.sourcePath.split("/").pop();

  copyFileSync(
    join(fontPackageDir, fontFile.sourcePath),
    join(nativeFontsDir, fileName),
  );
}
