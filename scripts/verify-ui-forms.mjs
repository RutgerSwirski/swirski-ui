import assert from "node:assert/strict";
import axe from "axe-core";

export async function verifyForms(browser, url) {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  page.setDefaultTimeout(7000);
  const role = (type, name) => page.getByRole(type, { name, exact: true });
  const focused = (locator) => locator.and(page.locator(":focus")).waitFor();

  try {
    await page.goto(`${url}?forms`);
    const email = role("textbox", "Order email");
    const gift = role("checkbox", "Gift wrap");
    const orderPlan = role("combobox", "Order plan");
    const submit = role("button", "Submit order");

    assert.equal(await email.getAttribute("aria-describedby"), await page.getByText("Receipt address").getAttribute("id"));
    assert.equal(await role("textbox", "Unavailable").isDisabled(), true);
    assert.equal(await role("textbox", "Currency").getAttribute("readonly"), "");
    assert.equal(await gift.evaluate((input) => input.indeterminate), true);
    await submit.click();
    await focused(email);
    await email.fill("wrong");
    assert.equal(await email.evaluate((input) => input.validity.typeMismatch), true);
    await email.fill("order@example.com");

    const delivery = role("radiogroup", "Delivery method");
    const post = delivery.getByRole("radio", { name: "Post", exact: true });
    const express = delivery.getByRole("radio", { name: "Express", exact: true });
    assert.equal(await delivery.getByRole("radio", { name: "Collect" }).isDisabled(), true);
    await post.press("Space");
    await post.press("ArrowRight");
    assert.equal(await express.isChecked(), true);
    await submit.click();
    await focused(orderPlan);
    await orderPlan.press("End");
    await page.getByRole("option", { name: "Pro" }).waitFor();
    await page.keyboard.press("Enter");
    await gift.press("Space");
    assert.equal(await gift.evaluate((input) => input.indeterminate), false);
    await role("textbox", "Reference").fill("REF-2");
    await submit.click();
    const receipt = await page.locator("[data-order-receipt]").textContent();
    assert.deepEqual(JSON.parse(receipt), {
      email: "order@example.com",
      delivery: "express",
      plan: "pro",
      currency: "EUR",
      gift: "yes",
      notes: "Doorbell",
      priority: "25",
      updates: "yes",
      reference: "REF-2",
    });

    await role("button", "Reset order").click();
    await page.waitForFunction(() => document.querySelector('[name="gift"]').indeterminate);
    assert.equal(await gift.isChecked(), false);
    assert.equal(await express.isChecked(), false);
    assert.equal(await role("textbox", "Reference").inputValue(), "REF-1");
    await orderPlan.getByText("Select an option").waitFor();

    const accountEmail = role("textbox", "Account email");
    const accountPlan = role("combobox", "Account plan");
    const save = role("button", "Save account");
    await save.click();
    await focused(accountEmail);
    await page.getByText("Enter an email address", { exact: true }).waitFor();
    await accountEmail.fill("account@example.com");
    await save.click();
    await focused(accountPlan);
    await page.getByText("Choose a plan", { exact: true }).waitFor();
    await accountPlan.and(page.locator('[aria-invalid="true"]')).waitFor();
    assert.equal(await accountPlan.evaluate((element) => getComputedStyle(element).borderTopColor), "rgb(163, 17, 87)");

    await page.addScriptTag({ content: axe.source });
    for (const scheme of ["light", "dark"]) {
      if (scheme === "dark") await role("button", "Change theme").click();
      const failures = await page.evaluate(async () => (await window.axe.run()).violations
        .filter(({ impact }) => impact === "serious" || impact === "critical")
        .map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) })));
      assert.deepEqual(failures, [], `Form accessibility violations in ${scheme} mode`);
    }

    await accountPlan.press("Home");
    await page.getByRole("option", { name: "Basic" }).waitFor();
    await page.keyboard.press("Enter");
    await save.click();
    await save.and(page.locator('[aria-busy="true"]:disabled')).waitFor();
    await page.locator("[data-account-receipt]").getByText('{"email":"account@example.com","plan":"basic"}').waitFor();
  } finally {
    await page.close();
  }
}
