import assert from "node:assert/strict";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repo = fileURLToPath(new URL("../", import.meta.url));
const ui = join(repo, "packages/ui");
const requireUi = createRequire(join(ui, "package.json"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const versions = {
  18: { react: "18.3.1", "react-dom": "18.3.1", "@types/react": "18.3.32", "@types/react-dom": "18.3.7", next: "14.2.35" },
  19: { react: "19.3.1", "react-dom": "19.3.1", "@types/react": "19.3.3", "@types/react-dom": "19.3.0", next: "16.4.6" },
};
const majors = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(versions);
const versionWarning = /useLayoutEffect does nothing on the server|hydration|did not match|recoverable|unexpected return value from a callback ref|accessing element\.ref|deprecated|validateDOMNesting|minified react error|ReactDOM\.render is no longer supported/i;

function run(args, cwd, env = process.env) {
  execFileSync(npm, args, { cwd, env, stdio: "inherit" });
}

async function listen(server) {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  return `http://127.0.0.1:${server.address().port}/`;
}

async function startNext(fixture) {
  const reservation = createServer();
  const url = await listen(reservation);
  const port = String(reservation.address().port);
  await new Promise((done) => reservation.close(done));
  let output = "";
  const processHandle = spawn(process.execPath, [
    join(fixture, "node_modules/next/dist/bin/next"), "start", "-H", "127.0.0.1", "-p", port,
  ], { cwd: fixture, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } });
  processHandle.stdout.on("data", (data) => { output += data; });
  processHandle.stderr.on("data", (data) => { output += data; });
  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (processHandle.exitCode !== null) break;
      try {
        if ((await fetch(url, { signal: AbortSignal.timeout(1500) })).ok) {
          return {
            url,
            stop: async () => {
              if (processHandle.exitCode === null) {
                processHandle.kill();
                await once(processHandle, "exit");
              }
              assert.doesNotMatch(output, versionWarning);
            },
          };
        }
      } catch { /* Wait for Next to start. */ }
      await new Promise((done) => setTimeout(done, 250));
    }
    throw new Error(`Next did not start:\n${output}`);
  } catch (error) {
    processHandle.kill();
    throw error;
  }
}

async function verify(browser, url, { major, expectedVersion, hydrated, strictReplay }) {
  const page = await browser.newPage();
  const warnings = [];
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()) && versionWarning.test(message.text())) warnings.push(message.text());
  });
  page.on("pageerror", (error) => warnings.push(error.message));
  try {
    const response = await page.goto(url);
    assert.ok(response?.ok());
    const html = await response.text();
    const serverId = html.match(/<output data-hydration-id="">([^<]+)<\/output>/)?.[1];
    assert.equal(Boolean(serverId), hydrated, `Unexpected SSR markup at ${url}`);
    const main = page.locator('main[data-ready="true"]');
    await main.waitFor();
    const runtime = await main.getAttribute("data-react-version");
    if (expectedVersion) assert.equal(runtime, expectedVersion);
    else {
      assert.equal(Number.parseInt(runtime, 10), Number(major));
      console.log(`Next ${versions[major].next} App Router runtime: React ${runtime}`);
    }
    if (strictReplay) await main.and(page.locator('[data-effect-runs="2"]')).waitFor({ timeout: 5000 });

    const field = page.getByRole("textbox", { name: "Hydration field" });
    const id = await field.getAttribute("id");
    if (hydrated) assert.equal(id, serverId);
    assert.ok(id);
    await page.waitForFunction(() => {
      const field = document.querySelector('input[name="hydrated"]');
      return field?.required && field.labels?.[0]?.textContent?.includes("Hydration field")
        && document.getElementById(field.getAttribute("aria-describedby"))?.textContent === "Hydrated field description";
    });
    const button = (name) => page.getByRole("button", { name, exact: true });
    const link = page.getByRole("link", { name: "Composed link" });
    assert.equal(await link.getAttribute("data-swirski-component"), "button");
    await link.click();
    await button("Check refs").click();
    const readRefs = async () => JSON.parse(await page.locator("[data-ref-report]").textContent());
    const attached = await readRefs();
    assert.equal(attached.linked, true);
    assert.equal(attached.forwarded, "BUTTON");
    assert.deepEqual(attached.events, ["child", "slot"]);
    await button("Detach link").click();
    await link.waitFor({ state: "detached" });
    await button("Check refs").click();
    const detached = await readRefs();
    assert.equal(detached.detached, true);
    assert.equal(detached.forwarded, null);
    assert.equal(detached.cleaned, attached.cleaned + 1);
    assert.equal(detached.childDetached, attached.childDetached + 1);

    const toggle = page.getByRole("switch", { name: "Dark mode" });
    assert.equal(await toggle.isChecked(), true);
    await toggle.press("Space");
    assert.equal(await toggle.isChecked(), false);
    await toggle.press("Space");
    await button("Open dialog").press("Enter");
    const dialog = page.getByRole("dialog", { name: "Compatibility dialog" });
    await dialog.waitFor();
    assert.equal(await dialog.evaluate((el) => el.closest("[data-swirski-color-scheme]").getAttribute("data-swirski-color-scheme")), "dark");
    assert.equal(await dialog.evaluate((el) => getComputedStyle(el).getPropertyValue("--sw-color-focus").trim()), "#ff00ff");
    assert.equal(await dialog.evaluate((el) => Boolean(el.closest("[data-dialog-trigger-area]"))), false);
    const described = dialog.getByRole("button", { name: "Help action" });
    assert.equal(await described.evaluate((el) =>
      document.getElementById(el.getAttribute("aria-describedby"))?.textContent), "Tooltip description");
    const combo = page.getByRole("combobox", { name: "Color" });
    await combo.press("End");
    const red = page.getByRole("option", { name: "Red" });
    await red.waitFor();
    assert.equal(await combo.getAttribute("aria-activedescendant"), await red.getAttribute("id"));
    await combo.press("Enter");
    await combo.getByText("Red").waitFor();
    await button("Close dialog").click();
    await dialog.waitFor({ state: "detached" });
    assert.deepEqual(warnings, [], `React warnings at ${url}`);
  } finally {
    await page.close();
  }
}

async function testRelease(major, packPath, browser) {
  assert.ok(Object.hasOwn(versions, major), `Unknown React major: ${major}`);
  const fixture = mkdtempSync(join(tmpdir(), `swirski-react-${major}-`));
  const write = (name, contents) => writeFileSync(join(fixture, name), contents);
  try {
    copyFileSync(packPath, join(fixture, "swirski-ui.tgz"));
    write("package.json", JSON.stringify({
      private: true, type: "module",
      dependencies: {
        ...versions[major],
        "@swirski/ui": "file:./swirski-ui.tgz",
        vite: requireUi("vite/package.json").version,
        typescript: requireUi("typescript/package.json").version,
        "@types/node": "22.19.15",
      },
    }));
    for (const file of ["CompatibilityProbe.tsx", "client.tsx", "server.tsx"]) {
      copyFileSync(join(repo, "scripts/fixtures/react-compatibility", file), join(fixture, file));
    }
    // These temporary fixtures pin direct versions. Avoid Next 14 attempting
    // to rewrite a disposable npm lockfile for SWC on other platforms.
    run(["install", "--no-audit", "--no-fund", "--package-lock=false"], fixture);
    const requireFixture = createRequire(join(fixture, "package.json"));
    for (const [dependency, version] of Object.entries(versions[major])) {
      assert.equal(requireFixture(`${dependency}/package.json`).version, version);
    }
    write("tsconfig.consumer.json", JSON.stringify({
      compilerOptions: {
        target: "ES2022", module: "ESNext", moduleResolution: "bundler",
        jsx: "react-jsx", strict: true, noEmit: true, skipLibCheck: false,
      },
      files: ["CompatibilityProbe.tsx", "client.tsx", "server.tsx"],
    }));
    run(["exec", "--", "tsc", "-p", "tsconfig.consumer.json"], fixture);

    write("index.html", '<!doctype html><html lang="en"><title>React compatibility</title><div id="root"></div><script type="module" src="/client.tsx"></script></html>');
    write("vite.config.ts", 'export default { oxc: { jsx: { runtime: "automatic" } } };');
    const dev = { ...process.env, NODE_ENV: "development" };
    run(["exec", "--", "vite", "build", "--mode", "development"], fixture, dev);
    run(["exec", "--", "vite", "build", "--mode", "development", "--ssr", "server.tsx", "--outDir", "ssr"], fixture, dev);
    const ssr = spawnSync(process.execPath, ["ssr/server.js"], { cwd: fixture, env: dev, encoding: "utf8" });
    assert.equal(ssr.status, 0, ssr.stderr);
    assert.doesNotMatch(ssr.stderr, versionWarning);
    const clientHtml = readFileSync(join(fixture, "dist/index.html"), "utf8");
    const server = createServer((request, response) => {
      const path = new URL(request.url, "http://localhost").pathname;
      if (path === "/" || path === "/csr") {
        response.setHeader("Content-Type", "text/html");
        response.end(path === "/csr" ? clientHtml : clientHtml.replace('<div id="root"></div>', () => `<div id="root">${ssr.stdout}</div>`));
        return;
      }
      try {
        response.setHeader("Content-Type", ({
          ".js": "text/javascript", ".css": "text/css",
        })[extname(path)] ?? "application/octet-stream");
        response.end(readFileSync(join(fixture, "dist", path)));
      } catch { response.writeHead(404).end(); }
    });
    try {
      const url = await listen(server);
      const config = { major, expectedVersion: versions[major].react, strictReplay: true };
      await verify(browser, url, { ...config, hydrated: true });
      await verify(browser, `${url}csr`, { ...config, hydrated: false });
    } finally {
      server.close();
    }

    mkdirSync(join(fixture, "app"));
    write("next.config.mjs", "export default { reactStrictMode: true, experimental: { cpus: 2 } };");
    write("app/layout.tsx", `import "@swirski/ui/styles.css";
import type {ReactNode} from "react";
export default function Layout({children}: {children: ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}`);
    write("app/page.tsx", 'export { CompatibilityProbe as default } from "../CompatibilityProbe";');
    run(["exec", "--", "next", "build"], fixture, { ...process.env, NEXT_TELEMETRY_DISABLED: "1" });
    const next = await startNext(fixture);
    try {
      await verify(browser, next.url, { major, hydrated: true, strictReplay: false });
    } finally {
      await next.stop();
    }
    console.log(`React ${major}: declarations, Vite SSR/hydration, StrictMode, and Next App Router passed.`);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
}

const packDir = mkdtempSync(join(tmpdir(), "swirski-react-pack-"));
try {
  const [pack] = JSON.parse(execFileSync(npm, [
    "pack", "--ignore-scripts", "--json", "--pack-destination", packDir,
  ], { cwd: ui, encoding: "utf8" }));
  const browser = await chromium.launch();
  try {
    for (const major of majors) await testRelease(major, join(packDir, pack.filename), browser);
  } finally {
    await browser.close();
  }
} finally {
  rmSync(packDir, { recursive: true, force: true });
}
