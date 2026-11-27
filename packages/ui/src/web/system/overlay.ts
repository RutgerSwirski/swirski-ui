"use client";

import { useEffect, useRef, type RefObject } from "react";
import { focusInitialElement, trapFocus as trapFocusWithin } from "./focus";

let bodyScrollLockCount = 0;
let originalBodyOverflow = "";
const modalStack: symbol[] = [];

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

    const modal = Symbol();
    modalStack.push(modal);
    const isTopmost = () => modalStack[modalStack.length - 1] === modal;
    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;
    const releaseScrollLock = lockScroll ? lockBodyScroll() : undefined;
    const animationFrame = autoFocus
      ? window.requestAnimationFrame(() => {
          if (isTopmost() && contentRef.current) {
            focusInitialElement(contentRef.current);
          }
        })
      : undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || !isTopmost()) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current();
        return;
      }

      if (trapFocus && contentRef.current) {
        trapFocusWithin(contentRef.current, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      const wasTopmost = isTopmost();
      modalStack.splice(modalStack.indexOf(modal), 1);
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      releaseScrollLock?.();
      window.removeEventListener("keydown", handleKeyDown);

      if (
        restoreFocus &&
        wasTopmost &&
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
      ) {
        previouslyFocusedElement.focus();
      }
    };
  }, [autoFocus, contentRef, lockScroll, open, restoreFocus, trapFocus]);
}
