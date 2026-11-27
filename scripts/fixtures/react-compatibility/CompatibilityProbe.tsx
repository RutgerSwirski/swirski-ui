"use client";

import { useCallback, useEffect, useId, useRef, useState, version } from "react";
import {
  Button, Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger,
  Select, SwirskiProvider, ThemeToggle, Tooltip,
} from "@swirski/ui";

export function CompatibilityProbe() {
  const id = useId();
  const [effectRuns, setEffectRuns] = useState(0);
  const [showLink, setShowLink] = useState(true);
  const [refReport, setRefReport] = useState("");
  const [scheme, setScheme] = useState<"light" | "dark">("dark");
  const anchor = useRef<HTMLAnchorElement | null>(null);
  const nativeButton = useRef<HTMLElement>(null);
  const attached = useRef<HTMLElement | null>(null);
  const cleanupCount = useRef(0);
  const childDetachCount = useRef(0);
  const events = useRef<string[]>([]);
  const childRef = useCallback((node: HTMLAnchorElement | null) => {
    anchor.current = node;
    if (!node) childDetachCount.current += 1;
  }, []);
  const composedRef = useCallback((node: HTMLElement | null) => {
    attached.current = node;
    if (!node) return;
    return () => {
      cleanupCount.current += 1;
      attached.current = null;
    };
  }, []);

  useEffect(() => {
    setEffectRuns((count) => count + 1);
  }, []);

  function reportRefs() {
    setRefReport(JSON.stringify({
      linked: Boolean(anchor.current && anchor.current === attached.current),
      detached: anchor.current === null && attached.current === null,
      forwarded: nativeButton.current?.tagName ?? null,
      cleaned: cleanupCount.current,
      childDetached: childDetachCount.current,
      events: events.current,
    }));
  }

  return (
    <SwirskiProvider colorScheme="light">
      <main data-ready={effectRuns > 0} data-react-version={version} data-effect-runs={effectRuns}>
        <h1>React compatibility</h1>
        <label htmlFor={id}>Hydration field</label>
        <input id={id} />
        <output data-hydration-id="">{id}</output>
        {showLink && (
          <>
            <Button asChild ref={composedRef} onClick={() => events.current.push("slot")}>
              <a href="#compatibility" ref={childRef} onClick={() => events.current.push("child")}>Composed link</a>
            </Button>
            <Button ref={nativeButton}>Object ref target</Button>
          </>
        )}
        <Button onClick={reportRefs}>Check refs</Button>
        <Button onClick={() => setShowLink(false)}>Detach link</Button>
        <output data-ref-report="">{refReport}</output>
        <SwirskiProvider colorScheme={scheme} theme={{ colorFocus: "#ff00ff" }}>
          <ThemeToggle colorScheme={scheme} onColorSchemeChange={setScheme} />
          <div data-dialog-trigger-area="">
            <Dialog>
              <DialogTrigger>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogTitle>Compatibility dialog</DialogTitle>
                <Tooltip asChild content="Tooltip description">
                  <Button>Help action</Button>
                </Tooltip>
                <Select
                  aria-label="Color"
                  defaultValue="blue"
                  options={[{ value: "blue", label: "Blue" }, { value: "red", label: "Red" }]}
                />
                <DialogClose>Close dialog</DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </SwirskiProvider>
      </main>
    </SwirskiProvider>
  );
}
