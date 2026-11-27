"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { focusInitialElement, trapFocus as trapFocusWithin } from "./focus";

type LayerOptions = {
  open: boolean;
  contentRef: RefObject<HTMLElement | null>;
  rootRef?: RefObject<HTMLElement | null>;
  onEscape: () => void;
  onOutside?: (event: PointerEvent) => void;
  modal?: boolean;
};

const layers: LayerOptions[] = [];
const hiddenBackground = new Set<Element>();

function getTopModalIndex() {
  return layers.map((entry) => entry.modal).lastIndexOf(true);
}

function updateBackground() {
  for (const element of hiddenBackground) element.removeAttribute("inert");
  hiddenBackground.clear();

  const modalIndex = getTopModalIndex();
  const modal = layers[modalIndex]?.contentRef.current;
  if (!modal) return;
  const modalWrapper = modal.parentElement;

  const allowed = [modal, ...layers.slice(modalIndex + 1).flatMap((entry) =>
    [entry.contentRef.current, entry.rootRef?.current].filter(Boolean),
  )];
  function visit(parent: Element) {
    for (const child of parent.children) {
      if (allowed.includes(child as HTMLElement) ||
          (parent === modalWrapper && child.hasAttribute("data-swirski-backdrop"))) continue;
      if (allowed.some((element) => element && child.contains(element))) {
        visit(child);
      } else if (!child.hasAttribute("inert")) {
        child.setAttribute("inert", "");
        hiddenBackground.add(child);
      }
    }
  }

  visit(modal.ownerDocument.body);
}

export function useOverlayLayer(options: LayerOptions) {
  const latest = useRef(options);
  useEffect(() => {
    latest.current = options;
  }, [options]);
  const { open, contentRef, rootRef, modal } = options;

  useEffect(() => {
    if (!open) return;

    const layer = { ...latest.current, contentRef, rootRef, modal };
    // A child initially open in the same commit registers before its parent.
    const childIndex = layers.findIndex((entry) =>
      contentRef.current?.contains(entry.rootRef?.current ?? entry.contentRef.current),
    );
    layers.splice(childIndex < 0 ? layers.length : childIndex, 0, layer);
    updateBackground();

    const isTop = () => layers[layers.length - 1] === layer;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || !isTop()) return;
      event.preventDefault();
      latest.current.onEscape();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!isTop() || event.defaultPrevented) return;
      const path = event.composedPath();
      if (path.some((element) => element === rootRef?.current || element === contentRef.current)) return;
      latest.current.onOutside?.(event);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      layers.splice(layers.indexOf(layer), 1);
      updateBackground();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, contentRef, rootRef, modal]);
}

let bodyScrollLockCount = 0;
let originalBodyOverflow = "";

function lockBodyScroll() {
  if (bodyScrollLockCount === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  bodyScrollLockCount += 1;

  return () => {
    bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);

    if (bodyScrollLockCount === 0) {
      document.body.style.overflow = originalBodyOverflow;
      originalBodyOverflow = "";
    }
  };
}

export type UseModalOverlayOptions = {
  autoFocus?: boolean;
  contentRef: RefObject<HTMLElement | null>;
  lockScroll?: boolean;
  onEscape: () => void;
  open: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
};

export function useModalOverlay({
  autoFocus = true,
  contentRef,
  lockScroll = true,
  onEscape,
  open,
  restoreFocus = true,
  trapFocus = true,
}: UseModalOverlayOptions) {
  const previousFocus = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (open) previousFocus.current = document.activeElement as HTMLElement | null;
  }, [open]);

  useOverlayLayer({
    open, contentRef, onEscape, modal: true,
    onOutside: (event) => {
      if (event.button === 0 && (event.target as Element)?.parentElement === contentRef.current?.parentElement &&
          (event.target as Element)?.hasAttribute?.("data-swirski-backdrop")) onEscape();
    },
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocusedElement = previousFocus.current;
    const releaseScrollLock = lockScroll ? lockBodyScroll() : undefined;
    const animationFrame = autoFocus
      ? window.requestAnimationFrame(() => {
          if (contentRef.current &&
              isActiveModal() &&
              !inPortalledLayer(document.activeElement)) {
            focusInitialElement(contentRef.current);
          }
        })
      : undefined;

    const isActiveModal = () =>
      layers[getTopModalIndex()]?.contentRef === contentRef;
    const portalledContent = () => {
      const index = layers.findIndex((layer) => layer.contentRef === contentRef);
      return layers.slice(index + 1).flatMap((layer) => {
        const content = layer.contentRef.current;
        return content && !contentRef.current?.contains(content) ? [content] : [];
      });
    };
    const inPortalledLayer = (target: Node | null) =>
      portalledContent().some((content) => content.contains(target));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (trapFocus && isActiveModal() && !event.defaultPrevented && contentRef.current) {
        trapFocusWithin(contentRef.current, event, portalledContent());
      }
    };
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as Node;
      if (trapFocus && isActiveModal() && contentRef.current &&
          !contentRef.current.contains(target) && !inPortalledLayer(target)) {
        focusInitialElement(contentRef.current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocus);
    const observer = new MutationObserver(updateBackground);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      releaseScrollLock?.();
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
      observer.disconnect();

      if (
        restoreFocus &&
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
      ) {
        previouslyFocusedElement.focus();
      }
    };
  }, [autoFocus, contentRef, lockScroll, open, restoreFocus, trapFocus]);
}
