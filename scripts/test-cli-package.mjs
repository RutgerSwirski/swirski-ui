import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const cliRoot = fileURLToPath(new URL("../packages/cli/", import.meta.url));
const uiModules = fileURLToPath(new URL("../packages/ui/node_modules/", import.meta.url));
const fixture = mkdtempSync(join(tmpdir(), "swirski-cli-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

try {
  const packOutput = execFileSync(npm, [
    "pack", "--json", "--pack-destination", fixture,
  ], { cwd: cliRoot, encoding: "utf8" });
  const jsonStart = packOutput.search(/\[\s*\{\s*"id"/);
  assert(jsonStart >= 0, "npm pack did not return its JSON manifest.");
  const [pack] = JSON.parse(packOutput.slice(jsonStart));
  writeFileSync(join(fixture, "package.json"), JSON.stringify({ private: true }));
  execFileSync(npm, ["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", `./${pack.filename}`], {
    cwd: fixture,
    stdio: "inherit",
  });

  const cli = join(fixture, "node_modules/@swirski/cli/src/index.js");
  const run = (...args) => execFileSync(process.execPath, [cli, ...args], {
    cwd: fixture,
    encoding: "utf8",
  });
  const output = join(fixture, "src/components/ui");
  assert.match(run("list"), /button/);
  run("init");
  assert.match(run("add", "button", "tabs", "dialog", "--dry-run"), /Would write/);
  assert(!existsSync(output));
  assert.match(run("add", "button", "tabs", "dialog"), /Consumer dependencies: npm install/);

  for (const file of [
    "components/button/Button.tsx",
    "components/tabs/Tabs.tsx",
    "components/dialog/DialogContent.tsx",
    "shared/contracts/button.ts",
    "hooks/use-controllable-state/index.ts",
    "hooks/use-portal-root/usePortalRoot.ts",
    "styles.css",
  ]) {
    assert(existsSync(join(output, file)), file);
  }
  assert(!readdirSync(output, { recursive: true }).some((file) => /\.(test|stories)\.tsx?$/.test(file)));
  assert.match(run("add", "button"), /already up to date/);

  const button = join(output, "components/button/Button.tsx");
  const original = readFileSync(button, "utf8");
  writeFileSync(button, "// Local customization");
  const result = spawnSync(process.execPath, [cli, "add", "button", "card"], {
    cwd: fixture,
    encoding: "utf8",
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Refusing to overwrite/);
  assert.equal(readFileSync(button, "utf8"), "// Local customization");
  assert(!existsSync(join(output, "components/card")));
  run("add", "button", "--overwrite");
  assert.equal(readFileSync(button, "utf8"), original);

  const dependencies = ["react", "react-dom", "@types/react", "@types/react-dom", "@floating-ui/dom", "clsx"];
  execFileSync(npm, [
    "install", "--ignore-scripts", "--no-audit", "--no-fund",
    ...dependencies.map((name) => {
      const { version } = JSON.parse(readFileSync(join(uiModules, name, "package.json"), "utf8"));
      return `${name}@${version}`;
    }),
  ], { cwd: fixture, stdio: "inherit" });
  writeFileSync(join(fixture, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      jsx: "react-jsx",
      module: "esnext",
      moduleResolution: "bundler",
      target: "es2020",
      strict: true,
      skipLibCheck: true,
      noEmit: true,
    },
    include: ["src"],
  }));
  execFileSync(process.execPath, [join(uiModules, "typescript/bin/tsc")], {
    cwd: fixture,
    stdio: "inherit",
  });
  console.log("Packed CLI works outside the workspace and preserves consumer edits.");
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
