import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, firefox, webkit } from "playwright";
import { verifyInteractions } from "./verify-ui-interactions.mjs";

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

function buildHostStyles() {
  const input = join(fixture, "host.css");
  write("host.css", '@tailwind base; @tailwind utilities;\n.host-button { border: 3px solid; }');
  write("tailwind.config.cjs", `module.exports = {
    content: [{ raw: 'grid p-6 px-host bg-primary text-primary-foreground' }],
    corePlugins: { preflight: false },
    theme: { extend: {
      spacing: { 6: '23px', host: '41px' },
      colors: { primary: '#663399', 'primary-foreground': '#ffffff' },
    } },
  };`);
  execFileSync(process.execPath, [
    join(fixture, "node_modules/tailwind-v3/lib/cli.js"),
    "-i", input, "-o", join(fixture, "dist/host-v3.css"), "--minify",
  ], { cwd: fixture, stdio: "inherit" });

  write("host.css", `
@import "tailwindcss" source(none);
@source inline("grid p-6 px-host bg-primary text-primary-foreground");
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
@theme { --spacing: 5px; --spacing-host: 41px; }
:root { --primary: #663399; --primary-foreground: #fff; }
.host-button { border: 3px solid; }
`);
  execFileSync(process.execPath, [
    join(ui, "node_modules/postcss-cli/index.js"), input,
    "-o", join(fixture, "dist/host-v4.css"), "--env", "production", "--config", ui,
  ], { cwd: fixture, stdio: "inherit" });
}

async function verifyBrowsers(names) {
  const engines = { chromium, firefox, webkit };
  const contentTypes = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
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
    const url = `http://127.0.0.1:${server.address().port}/`;
    for (const name of names) {
      if (!Object.hasOwn(engines, name)) throw new Error(`Unknown browser: ${name}`);
      const browser = await engines[name].launch({
        executablePath: name === "chromium" ? process.env.CHROMIUM_BIN : undefined,
        // Exercise the built selector fallback even on a Firefox with native @scope.
        firefoxUserPrefs: name === "firefox" ? { "layout.css.scope.enabled": false } : undefined,
      });
      try {
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForFunction(() =>
          document.querySelector('[data-theme-verified="true"]') &&
          document.querySelector('[data-isolation-verified="true"]') &&
          document.querySelector('[data-contrast-verified="light"]') &&
          document.querySelector('[data-contrast-verified="dark"]'), undefined, { timeout: 8000 });
        await page.goto(`${url}?optional-styles`);
        await page.locator('[data-optional-styles-verified="true"]').waitFor({
          state: "attached",
          timeout: 8000,
        });
        for (const [host, expectedPadding] of [["plain", "0px"], ["v3", "23px"], ["v4", "30px"]]) {
          await page.goto(`${url}?host=${host}`);
          await page.locator('[data-host="override"]').waitFor();
          const actual = await page.evaluate(() => {
            const style = (key) => getComputedStyle(document.querySelector(`[data-host="${key}"]`));
            const inputBox = (key) => {
              const css = style(key);
              return [css.boxSizing, css.borderTopWidth, css.paddingLeft, css.fontFamily].join("|");
            };
            return {
              outside: style("outside").paddingTop,
              optOut: style("opt-out").paddingTop,
              nested: style("nested").paddingTop,
              modulePadding: style("override").paddingLeft,
              componentBorder: style("override").borderTopWidth,
              utilityPadding: style("utility-override").paddingLeft,
              inputMatches: inputBox("outside-input") === inputBox("opt-out-input"),
              hostSpacing: style("opt-out").getPropertyValue("--spacing").trim(),
              hostBorder: style("button").borderTopWidth,
              hostColor: style("button").backgroundColor,
            };
          });
          if (actual.outside !== expectedPadding || actual.optOut !== expectedPadding ||
              actual.modulePadding !== "37px" || actual.componentBorder !== "4px" ||
              !actual.inputMatches || (host !== "plain" && actual.utilityPadding !== "41px") ||
              (host === "v4" && actual.hostSpacing !== "5px") ||
              (host === "plain" && actual.nested !== "24px") ||
              (host !== "plain" && (actual.hostBorder !== "3px" || actual.hostColor !== "rgb(102, 51, 153)"))) {
            throw new Error(`CSS coexistence failed for ${host}: ${JSON.stringify(actual)}`);
          }
        }
        console.log(`${name} ${browser.version()}: verified scoped CSS, portal theme, contrast, and opt-in reset and fonts.`);
        await verifyInteractions(browser, url, name);
        console.log(`${name}: interaction and axe checks passed.`);
      } catch (error) {
        throw new Error(`Packed stylesheet failed in ${name} ${browser.version()}`, { cause: error });
      } finally {
        await browser.close();
      }
    }
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
      tailwindcss: requireUi("tailwindcss/package.json").version,
      "tailwind-v3": "npm:tailwindcss@3.4.19",
      "@swirski/ui": `file:./${pack.filename}`,
    },
  }));
  mkdirSync(join(fixture, "app"));
  for (const name of ["ThemeProbe.tsx", "CoexistenceProbe.tsx", "coexistence.module.css", "InteractionProbe.tsx"]) {
    copyFileSync(join(root, "scripts/fixtures/ui-consumer", name), join(fixture, name));
  }
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
  write("index.html", '<!doctype html><html lang="en"><head><title>Swirski UI consumer</title></head><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
  write("vite.config.ts", 'export default { oxc: { jsx: { runtime: "automatic" } } };');
  write("main.tsx", `import "@swirski/ui/styles.css";
import { Title } from "@swirski/ui";
import { createRoot } from "react-dom/client";
import { CoexistenceProbe } from "./CoexistenceProbe";
import { InteractionProbe } from "./InteractionProbe";
import { ConsumerExample } from "./ThemeProbe";
const root = document.getElementById("root")!;
async function start() {
  const interactions = new URLSearchParams(location.search).get("interactions");
  if (interactions !== null) {
    createRoot(root).render(<InteractionProbe initiallyOpen={interactions === "initial"} siblings={interactions === "siblings"} />);
    return;
  }
  const host = new URLSearchParams(location.search).get("host");
  if (host === "v3" || host === "v4") {
    if (host === "v3") await import("@swirski/ui/reset.css");
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/host-" + host + ".css";
    await new Promise<void>((resolve, reject) => {
      style.onload = () => resolve();
      style.onerror = reject;
      document.head.append(style);
    });
  }
  if (host) {
    createRoot(root).render(<CoexistenceProbe />);
    return;
  }
  if (new URLSearchParams(location.search).has("optional-styles")) {
    await import("@swirski/ui/reset.css");
    if (getComputedStyle(document.body).marginTop !== "0px" || document.fonts.size !== 0) return;
    await import("@swirski/ui/fonts.css");
    const fonts = await document.fonts.load("16px Anton", "A");
    if (fonts.length > 0 && fonts.every((font) => font.status === "loaded")) {
      root.dataset.optionalStylesVerified = "true";
    }
    return;
  }
  createRoot(root).render(<><Title>Installed tarball</Title><ConsumerExample /></>);
}
void start();
`);
  run(["install", "--no-audit", "--no-fund"]);
  execFileSync(process.execPath, ["-e", 'for (const font of ["anton", "bangers"]) require.resolve(`@swirski/ui/fonts/${font}-latin.woff2`)'], { cwd: fixture });
  const consumerRequire = createRequire(join(fixture, "package.json"));
  const css = (entry) => readFileSync(consumerRequire.resolve(`@swirski/ui/${entry}.css`), "utf8");
  if (/@font-face|@scope\b/.test(css("styles")) || !css("fonts").includes("@font-face") ||
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
  const browsers = process.env.UI_BROWSERS ?? (process.env.CHROMIUM_BIN ? "chromium" : "");
  if (browsers) {
    buildHostStyles();
    await verifyBrowsers(browsers.split(",").map((name) => name.trim()));
  }
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
