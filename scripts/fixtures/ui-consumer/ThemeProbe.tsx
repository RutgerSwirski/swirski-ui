"use client";

import {
  Dialog, DialogContent, DialogTitle, DialogTrigger, Drawer, DrawerContent,
  DrawerTitle, IconButton, Inline, InputField, Select, Stack, SwirskiProvider,
} from "@swirski/ui";
import { useEffect, useRef } from "react";

function ThemeProbe() {
  const probe = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = probe.current;
    if (!element) return;
    const styles = getComputedStyle(element);
    const scope = element.closest("[data-swirski-color-scheme]");
    const dialog = element.closest('[role="dialog"]');
    const input = dialog?.querySelector("input:not([type='hidden'])");
    document.documentElement.dataset.themeProbe = JSON.stringify({
      scheme: scope?.getAttribute("data-swirski-color-scheme"),
      surface: styles.getPropertyValue("--sw-color-surface").trim(),
      focus: styles.getPropertyValue("--sw-color-focus").trim(),
      border: input && getComputedStyle(input).borderTopWidth,
      background: dialog && getComputedStyle(dialog).backgroundColor,
    });
    if (
      scope?.getAttribute("data-swirski-color-scheme") === "dark" &&
      styles.getPropertyValue("--sw-color-surface").trim().toLowerCase() === "#1d1d1f" &&
      styles.getPropertyValue("--sw-color-focus").trim() === "#ff00ff" &&
      input && getComputedStyle(input).borderTopWidth === "4px" &&
      dialog && getComputedStyle(dialog).backgroundColor === "rgb(29, 29, 31)"
    ) {
      document.documentElement.dataset.themeVerified = "true";
    }
  }, []);
  return <span ref={probe}>Theme probe</span>;
}

async function checkInteractions() {
  const tick = () => new Promise((resolve) => setTimeout(resolve, 25));
  async function find<T extends HTMLElement>(selector: string) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const element = document.querySelector<T>(selector);
      if (element) return element;
      await tick();
    }
    return null;
  }
  const escape = () => document.activeElement?.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }),
  );

  const trigger = await find<HTMLButtonElement>("#probe-dialog-trigger");
  document.documentElement.dataset.interactionStage = trigger ? "drawer-open" : "drawer-missing";
  if (!trigger) return;
  trigger.focus();
  trigger.click();
  const select = await find<HTMLButtonElement>("#probe-select");
  document.documentElement.dataset.interactionStage = select ? "dialog-open" : "dialog-missing";
  if (!select) return;
  select.focus();
  select.click();
  if (!await find('[role="listbox"]')) return;
  document.documentElement.dataset.interactionStage = "listbox-open";
  escape();
  await tick();
  if (document.querySelector('[role="listbox"]') || !document.querySelector("#probe-dialog")) return;
  document.documentElement.dataset.interactionStage = "listbox-dismissed";
  escape();
  await tick();
  if (!document.querySelector("#probe-dialog") && document.querySelector("#probe-drawer") &&
      document.activeElement === trigger) {
    document.documentElement.dataset.interactionVerified = "true";
  }
}

export function ConsumerExample({ verifyInteractions = false }: { verifyInteractions?: boolean }) {
  useEffect(() => {
    if (verifyInteractions) void checkInteractions();
  }, [verifyInteractions]);

  return (
    <SwirskiProvider colorScheme="dark" theme={{ colorFocus: "#ff00ff" }}>
      <Drawer defaultOpen>
        <DrawerContent id="probe-drawer">
          <DrawerTitle>Consumer smoke test</DrawerTitle>
          <Dialog>
            <Inline>
              <DialogTrigger id="probe-dialog-trigger">Edit preferences</DialogTrigger>
              <IconButton aria-label="Next image">→</IconButton>
            </Inline>
            <DialogContent id="probe-dialog">
              <DialogTitle>Preferences</DialogTitle>
              <Stack>
                <Select id="probe-select" aria-label="Tone" name="tone" options={[{ value: "blue", label: "Blue" }]} />
                <InputField label="Email" type="email" hint="Use your work address." />
                <ThemeProbe />
              </Stack>
            </DialogContent>
          </Dialog>
        </DrawerContent>
      </Drawer>
    </SwirskiProvider>
  );
}
