import { execFile, execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const root = fileURLToPath(new URL("../", import.meta.url));
const ui = join(root, "packages/ui");
const requireUi = createRequire(join(ui, "package.json"));
const requireDocs = createRequire(join(root, "apps/docs/package.json"));
const fixture = mkdtempSync(join(tmpdir(), "swirski-consumer-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const registryVersions = Object.fromEntries(
  ["react", "react-dom", "typescript", "@types/react", "@types/react-dom", "vite"]
    .map((name) => [name, requireUi(`${name}/package.json`).version]),
);

function run(args, cwd = fixture) {
  execFileSync(npm, args, { cwd, stdio: "inherit" });
}

function write(file, content) {
  writeFileSync(join(fixture, file), content);
}

async function verifyBrowser(browser) {
  const contentTypes = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
  const server = createServer((request, response) => {
    const path = new URL(request.url, "http://localhost").pathname;
    const file = join(fixture, "dist", path === "/" ? "index.html" : path);
    try {
      response.setHeader("Content-Type", contentTypes[extname(file)] ?? "application/octet-stream");
      response.end(readFileSync(file));
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const { stdout } = await promisify(execFile)(browser, [
      "--headless", "--disable-gpu", "--dump-dom", "--virtual-time-budget=5000",
      `http://127.0.0.1:${server.address().port}/`,
    ], { timeout: 30000 });
    if (!stdout.includes('data-theme-verified="true"')) {
      throw new Error("The packed stylesheet or scoped dark portal theme did not reach the browser.");
    }
    if (!stdout.includes('data-isolation-verified="true"')) {
      throw new Error("Component styles changed the consumer's document defaults or unscoped utilities.");
    }
    for (const scheme of ["light", "dark"]) {
      if (!stdout.includes(`data-contrast-verified="${scheme}"`)) {
        const failures = [...stdout.matchAll(/data-contrast-failure="([^"]*)"/g)];
        throw new Error(`Packed ${scheme} theme contrast check failed: ${failures.map((match) => match[1]).join(", ")}`);
      }
    }
    console.log("Verified 4.5:1 text contrast for representative tone variants in both themes.");
    console.log("Verified packed stylesheet and dark/custom theme inside a browser portal.");
  } finally {
    server.close();
  }
}

try {
  const [pack] = JSON.parse(execFileSync(npm, [
    "pack", "--ignore-scripts", "--json", "--pack-destination", fixture,
  ], { cwd: ui, encoding: "utf8" }));
  write("package.json", JSON.stringify({
    private: true,
    type: "module",
    dependencies: {
      ...registryVersions,
      next: requireDocs("next/package.json").version,
      "@types/node": requireDocs("@types/node/package.json").version,
      "@swirski/ui": `file:./${pack.filename}`,
    },
  }));
  mkdirSync(join(fixture, "app"));
  copyFileSync(join(root, "scripts/fixtures/ui-consumer/ThemeProbe.tsx"), join(fixture, "ThemeProbe.tsx"));
  write("app/layout.tsx", `import "@swirski/ui/styles.css";
import type { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}`);
  write("app/page.tsx", `import { Button, Dialog, DialogContent, DialogTitle, DialogTrigger, Title } from "@swirski/ui";
import Link from "next/link";
import { ConsumerExample } from "../ThemeProbe";
export default function Page() {
  return <>
    <Title>Installed tarball</Title>
    <Button asChild icon="arrow-up-right"><Link href="/about">About</Link></Button>
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent><DialogTitle>Imported from the server page</DialogTitle></DialogContent>
    </Dialog>
    <ConsumerExample />
  </>;
}`);
  write("index.html", '<!doctype html><html lang="en"><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
  write("vite.config.ts", 'export default { oxc: { jsx: { runtime: "automatic" } } };');
  write("main.tsx", `import "@swirski/ui/styles.css";
import { Title } from "@swirski/ui";
import { createRoot } from "react-dom/client";
import { ConsumerExample } from "./ThemeProbe";
createRoot(document.getElementById("root")!).render(<><Title>Installed tarball</Title><ConsumerExample /></>);
`);
  run(["install", "--no-audit", "--no-fund"]);
  execFileSync(process.execPath, ["-e", 'for (const font of ["anton", "bangers"]) require.resolve(`@swirski/ui/fonts/${font}-latin.woff2`)'], { cwd: fixture });
  const consumerRequire = createRequire(join(fixture, "package.json"));
  const css = (entry) => readFileSync(consumerRequire.resolve(`@swirski/ui/${entry}.css`), "utf8");
  if (css("styles").includes("@font-face") || !css("fonts").includes("@font-face") ||
      !css("reset").includes("box-sizing:border-box")) {
    throw new Error("The component, font and reset CSS exports did not build separately.");
  }
  run(["exec", "--", "next", "build"]);
  const page = readFileSync(join(fixture, ".next/server/app/index.html"), "utf8");
  const composedLink = page.match(/<a\b(?=[^>]*\bhref="\/about")[^>]*>/)?.[0];
  if (!composedLink?.includes('data-swirski-component="button"')) {
    throw new Error("The packed Button did not forward its attributes to Next.js Link.");
  }
  run(["exec", "--", "tsc", "--noEmit"]);
  run(["exec", "--", "vite", "build"]);
  if (process.env.CHROMIUM_BIN) await verifyBrowser(process.env.CHROMIUM_BIN);
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
