"use client";

import {
  AccordionItem, AccordionTrigger, Alert, Badge, Button, Dialog, DialogContent,
  DialogTitle, InputField, NavbarLink, SwirskiProvider, Table, TableBody, TableCell,
  TableRow,
} from "@swirski/ui";
import { useEffect, useRef } from "react";

function luminance(color: string) {
  const channels = color.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Unexpected color: ${color}`);
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function ContrastProbe({ scheme }: { scheme: "light" | "dark" }) {
  const probe = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = probe.current;
    if (!element) return;
    const surface = getComputedStyle(element).backgroundColor;
    const controls = Array.from(element.querySelectorAll<HTMLElement>(
      '[data-contrast], [data-swirski-component="table-wrapper"], [data-swirski-component="accordion-item"]',
    ));
    for (const control of controls) {
      const { color, backgroundColor } = getComputedStyle(control);
      const text = luminance(color);
      const background = luminance(backgroundColor === "rgba(0, 0, 0, 0)" ? surface : backgroundColor);
      const ratio = (Math.max(text, background) + 0.05) / (Math.min(text, background) + 0.05);
      if (ratio < 4.5) {
        element.dataset.contrastFailure = `${control.textContent}: ${ratio.toFixed(2)}:1`;
        return;
      }
    }
    if (controls.length > 0) element.dataset.contrastVerified = scheme;
  }, [scheme]);

  return (
    <div ref={probe} style={{ backgroundColor: "var(--sw-color-paper)" }}>
      {(["blue", "yellow", "red"] as const).map((tone) => (
        <div key={tone}>
          <Button tone={tone} data-contrast="">Filled {tone}</Button>
          <Button tone={tone} variant="outline" data-contrast="">Outline {tone}</Button>
          <Button tone={tone} variant="ghost" data-contrast="">Ghost {tone}</Button>
          <Alert tone={tone} data-contrast="">Alert {tone}</Alert>
          <Badge tone={tone} data-contrast="">Badge {tone}</Badge>
        </div>
      ))}
      <NavbarLink href="#contrast" active data-contrast="">Active navigation</NavbarLink>
      <AccordionItem>
        <AccordionTrigger>Accordion label</AccordionTrigger>
      </AccordionItem>
      <Table>
        <TableBody><TableRow><TableCell>Prop table</TableCell></TableRow></TableBody>
      </Table>
    </div>
  );
}

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

function IsolationProbe() {
  const probe = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = probe.current;
    if (!element) return;
    const styles = getComputedStyle(element);
    const heading = element.querySelector("h2");
    if (
      styles.display === "block" &&
      styles.paddingTop === "0px" &&
      heading && getComputedStyle(heading).fontWeight === "700" &&
      getComputedStyle(document.body).marginTop === "8px" &&
      document.fonts.size === 0
    ) {
      element.dataset.isolationVerified = "true";
    }
  }, []);
  return <div ref={probe} className="grid p-6"><h2>Consumer heading</h2></div>;
}

export function ConsumerExample() {
  return (
    <>
    <IsolationProbe />
    <SwirskiProvider colorScheme="dark" theme={{ colorFocus: "#ff00ff" }}>
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Consumer smoke test</DialogTitle>
          <InputField label="Email" type="email" hint="Use your work address." />
          <ThemeProbe />
          <ContrastProbe scheme="dark" />
          <SwirskiProvider colorScheme="light">
            <ContrastProbe scheme="light" />
          </SwirskiProvider>
        </DialogContent>
      </Dialog>
    </SwirskiProvider>
    </>
  );
}
