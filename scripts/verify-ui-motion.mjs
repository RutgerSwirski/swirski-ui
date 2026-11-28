import assert from "node:assert/strict";

export async function verifyMotion(browser, url) {
  const page = await browser.newPage({ reducedMotion: "no-preference", viewport: { width: 1280, height: 900 } });
  const button = page.locator("[data-motion-demo]");
  const dialogTrigger = page.getByRole("button", { name: "Open dialog", exact: true });
  const drawerTrigger = page.getByRole("button", { name: "Open drawer", exact: true });
  const css = (locator, property) => locator.evaluate((el, key) => getComputedStyle(el)[key], property);
  const loading = page.locator("[data-motion-fixture]");
  const loops = () => loading.locator(".sw-motion-loop").evaluateAll(
    (elements) => elements.filter((element) => getComputedStyle(element).animationName !== "none").length,
  );

  try {
    await page.goto(`${url}?interactions`);
    await button.hover();
    assert.equal(await css(button, "transitionDuration"), "0.2s");
    assert.notEqual(await css(button, "translate"), "none");
    assert.match(await css(button, "cursor"), /url\(/);
    assert.equal(await loops(), 18);
    const dotsLabel = loading.getByText("Loading dots", { exact: true });
    assert.equal(await css(dotsLabel, "position"), "absolute");

    await dialogTrigger.press("Enter");
    await drawerTrigger.and(page.locator(":focus")).waitFor();
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await css(button, "transitionDuration"), "0s");
    assert.equal(await css(button, "translate"), "none");
    assert.doesNotMatch(await css(button, "cursor"), /url\(/);
    assert.equal(await loops(), 0);
    assert.equal(await css(dotsLabel, "position"), "static");
    assert.equal(await css(loading.locator("[data-consumer-motion]"), "transitionDuration"), "1s");
    assert.equal(await css(drawerTrigger, "transitionDuration"), "0s");
    await drawerTrigger.and(page.locator(":focus")).waitFor();
    await page.keyboard.press("Escape");
    await dialogTrigger.and(page.locator(":focus")).waitFor();

    const notifications = page.getByRole("switch", { name: "Notifications", exact: true });
    await notifications.press("Space");
    assert.ok(await notifications.isChecked());
    await button.hover();
    assert.equal(await css(button, "translate"), "none");
    await page.mouse.down();
    assert.match(await css(button, "filter"), /brightness/);
    await page.mouse.up();

    await page.emulateMedia({ reducedMotion: "no-preference" });
    assert.equal(await css(button, "transitionDuration"), "0.2s");
    assert.equal(await loops(), 18);
    await page.locator("html").evaluate((html) => html.setAttribute("data-swirski-reduce-motion", ""));
    assert.equal(await css(button, "transitionDuration"), "0s");
    assert.doesNotMatch(await css(button, "cursor"), /url\(/);
    assert.equal(await loops(), 0);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await button.waitFor();
    assert.equal(await css(button, "transitionDuration"), "0s");
    assert.equal(await loops(), 0);
  } finally {
    await page.close();
  }
}
