import assert from "node:assert/strict";
import axe from "axe-core";

async function audit(page, state) {
  if (!(await page.evaluate(() => Boolean(window.axe)))) {
    await page.addScriptTag({ content: axe.source });
  }
  const violations = await page.evaluate(async () => (await window.axe.run()).violations
    .filter(({ impact }) => impact === "serious" || impact === "critical")
    .map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) })));
  assert.deepEqual(violations, [], `Serious or critical axe violations in ${state}`);
}

const tabColors = (tab) => tab.evaluate((element) => {
  const { color, backgroundColor } = getComputedStyle(element);
  return [color, backgroundColor];
});

const focused = (locator) => locator.and(locator.page().locator(":focus")).waitFor();

export async function verifyInteractions(browser, url, name) {
  const page = await browser.newPage();
  page.setDefaultTimeout(7000);
  const role = (kind, name) => page.getByRole(kind, { name, exact: true });
  const press = (key) => page.keyboard.press(key);
  try {
    await page.goto(`${url}?interactions`);
    await role("heading", "Interaction checks").waitFor();
    await audit(page, "default controls");

    const firstTab = role("tab", "One");
    const secondTab = role("tab", "Two");
    await firstTab.press("ArrowRight");
    await focused(secondTab);
    assert.deepEqual(await tabColors(secondTab), ["rgb(255, 255, 255)", "rgb(0, 87, 255)"]);
    await role("tabpanel", "Two").waitFor();
    await role("checkbox", "Accept terms").press("Space");
    assert.equal(await role("checkbox", "Accept terms").isChecked(), true);
    await role("switch", "Notifications").press("Space");
    assert.equal(await role("switch", "Notifications").isChecked(), true);
    await page.locator("summary").filter({ hasText: "Disclosure heading" }).press("Enter");
    await page.getByText("Disclosure body", { exact: true }).waitFor();
    const cursors = role("radiogroup", "Cursor");
    await cursors.locator('[aria-checked="true"]').press("ArrowRight");
    await focused(cursors.locator('[aria-checked="true"]'));

    await role("button", "Actions").press("Enter");
    await focused(role("menuitem", "Archive"));
    await press("r");
    await focused(role("menuitem", "Rename"));
    await audit(page, "open action menu");
    await press("Tab");
    await page.getByRole("menu").waitFor({ state: "hidden" });
    await focused(role("button", "After standalone menu"));
    await role("button", "Actions").press("ArrowUp");
    await focused(role("menuitem", "Rename"));
    await press("Shift+Tab");
    await page.getByRole("menu").waitFor({ state: "hidden" });
    await focused(role("button", "Open dialog"));
    await role("button", "Actions").press("ArrowUp");
    await focused(role("menuitem", "Rename"));
    await press("Escape");
    await focused(role("button", "Actions"));

    const tip = role("tooltip", "Changes are saved immediately.");
    const tipTrigger = role("button", "Save changes");
    assert.match(await tipTrigger.getAttribute("aria-describedby"), /tooltip/);
    await tipTrigger.hover();
    await tip.waitFor();
    await tip.hover();
    await page.waitForTimeout(220);
    await page.waitForFunction(() => {
      const tooltip = document.querySelector('[role="tooltip"]:hover');
      return tooltip && !tooltip.hidden && getComputedStyle(tooltip).opacity === "1";
    });
    await press("Escape");
    await tip.waitFor({ state: "hidden" });
    await tipTrigger.focus();
    await tip.waitFor();
    await focused(tipTrigger);
    await press("Escape");
    await tip.waitFor({ state: "hidden" });
    await focused(tipTrigger);

    const combo = role("combobox", "Color");
    await role("button", "Submit color").click();
    await focused(combo);
    await combo.press("End");
    await role("option", "Red").waitFor();
    await page.locator("[data-shrink]").evaluate((button) => button.click());
    await page.waitForFunction(() => {
      const combo = document.getElementById("fixture-color");
      return document.getElementById(combo.getAttribute("aria-activedescendant"))?.textContent === "Blue";
    });
    await press("Enter");
    await role("button", "Submit color").click();
    await page.locator("output").getByText("blue").waitFor();
    await role("button", "Reset color").click();
    await combo.getByText("Select an option").waitFor();

    const dialogTrigger = role("button", "Open dialog");
    await dialogTrigger.press("Enter");
    const parent = role("dialog", "Parent dialog");
    await parent.waitFor();
    const drawerTrigger = role("button", "Open drawer");
    await focused(drawerTrigger);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
    assert.ok(await page.locator("main").evaluate((el) => el.inert));
    await press("Shift+Tab");
    await focused(role("button", "Done with dialog"));
    await drawerTrigger.press("Enter");
    const drawer = role("dialog", "Child drawer");
    await drawer.waitFor();
    const popoverTrigger = role("button", "Open popover");
    await focused(popoverTrigger);
    await popoverTrigger.press("Enter");
    await role("dialog", "Nested popover").waitFor();
    await role("combobox", "Nested color").press("ArrowDown");
    await page.getByRole("listbox").waitFor();
    await press("Escape");
    await page.getByRole("listbox").waitFor({ state: "hidden" });
    const nestedActions = role("dialog", "Nested popover").getByRole("button", { name: "Actions" });
    await nestedActions.press("Enter");
    await focused(role("menuitem", "Archive"));
    await press("Escape");
    await focused(nestedActions);
    await press("Escape");
    await focused(popoverTrigger);
    await audit(page, "open drawer");
    await press("Escape");
    await focused(drawerTrigger);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
    await press("Escape");
    await focused(dialogTrigger);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    assert.equal(await page.locator("main").evaluate((el) => el.inert), false);

    for (const [mode, top] of [["initial", "Child drawer"], ["siblings", "Sibling dialog"]]) {
      await page.goto(`${url}?interactions=${mode}`);
      await role("dialog", top).waitFor();
      await page.waitForFunction(() => document.activeElement?.closest('[role="dialog"]'));
      await press("Escape");
      await role("dialog", top).waitFor({ state: "hidden" });
      await role("dialog", "Parent dialog").waitFor();
      await focused(role("button", "Open drawer"));
      assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
      await press("Escape");
      await role("dialog", "Parent dialog").waitFor({ state: "hidden" });
      assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    }

    await page.goto(`${url}?interactions`);
    const themeToggle = role("switch", "Dark mode");
    await themeToggle.press("Space");
    assert.ok(await themeToggle.isChecked());
    await secondTab.hover();
    assert.deepEqual(await tabColors(secondTab), ["rgb(11, 11, 12)", "rgb(255, 212, 0)"]);

    if (name === "chromium") {
      await page.emulateMedia({ forcedColors: "active" });
      await page.goto(`${url}?interactions`);
      const trigger = role("button", "Actions");
      await trigger.press("Tab");
      await press("Shift+Tab");
      await focused(trigger);
      await page.waitForFunction(() => {
        const tabColors = (tab) => tab.evaluate((element) => {
  const { color, backgroundColor } = getComputedStyle(element);
  return [color, backgroundColor];
});

const focused = document.activeElement;
        return focused?.matches(":focus-visible") && getComputedStyle(focused).outlineStyle === "solid";
      });
      await trigger.press("Enter");
      await focused(role("menuitem", "Archive"));
      await page.waitForFunction(() => getComputedStyle(document.activeElement).outlineStyle === "solid");
    }
  } finally {
    await page.close();
  }

  const mobile = await browser.newPage({ hasTouch: true, viewport: { width: 375, height: 700 } });
  try {
    await mobile.goto(`${url}?interactions`);
    await mobile.getByRole("button", { name: "Open dialog" }).tap();
    await mobile.getByRole("dialog", { name: "Parent dialog" }).waitFor();
    await mobile.getByRole("button", { name: "Done with dialog" }).tap();
    await mobile.getByRole("dialog").waitFor({ state: "hidden" });
    await mobile.getByRole("button", { name: "Open navigation menu" }).tap();
    await mobile.getByRole("dialog", { name: "Navigation menu" }).waitFor();
    await mobile.getByRole("button", { name: "Close mobile menu" }).tap();
    await mobile.getByRole("dialog").waitFor({ state: "hidden" });
  } finally {
    await mobile.close();
  }
}
