"use client";

import { useEffect, useRef, type RefObject } from "react";
import { focusInitialElement, trapFocus as trapFocusWithin } from "./focus";

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
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;
    const releaseScrollLock = lockScroll ? lockBodyScroll() : undefined;
    const animationFrame = autoFocus
      ? window.requestAnimationFrame(() => {
          if (contentRef.current) {
            focusInitialElement(contentRef.current);
          }
        })
      : undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapeRef.current();
        return;
      }

      if (trapFocus && contentRef.current) {
        trapFocusWithin(contentRef.current, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      releaseScrollLock?.();
      window.removeEventListener("keydown", handleKeyDown);

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
