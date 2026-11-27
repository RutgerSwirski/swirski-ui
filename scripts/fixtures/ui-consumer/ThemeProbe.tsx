"use client";

import {
  Dialog, DialogContent, DialogTitle, InputField, SwirskiProvider,
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
    const input = dialog?.querySelector("input");
    if (
      scope?.getAttribute("data-swirski-color-scheme") === "dark" &&
      styles.getPropertyValue("--sw-color-surface").trim().toLowerCase() === "#1d1d1f" &&
      styles.getPropertyValue("--sw-color-focus").trim() === "#ff00ff" &&
      input && getComputedStyle(input).borderTopWidth === "4px" &&
      dialog && getComputedStyle(dialog).backgroundColor === "rgb(29, 29, 31)"
    ) {
      element.dataset.themeVerified = "true";
    }
  }, []);
  return <span ref={probe}>Theme probe</span>;
}

export function ConsumerExample() {
  return (
    <SwirskiProvider colorScheme="dark" theme={{ colorFocus: "#ff00ff" }}>
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Consumer smoke test</DialogTitle>
          <InputField label="Email" type="email" hint="Use your work address." />
          <ThemeProbe />
        </DialogContent>
      </Dialog>
    </SwirskiProvider>
  );
}
