"use client";

import type {
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { useFloatingPosition } from "../../system/floating";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";
import { useDropdownMenu } from "./DropdownMenuContext";
import type {
  DropdownMenuSize,
  DropdownMenuTone,
  DropdownMenuVariant,
} from "./dropdown-menu-types";
import { focusMatchingMenuItem, focusMenuItem, getCurrentMenuItemIndex } from "./dropdown-menu-utils";

export type DropdownMenuContentProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end";
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
};

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  {
    className,
    align = "start",
    variant = "default",
    size = "md",
    tone = "default",
    onKeyDown,
    style,
    ...props
  },
  ref,
) {
  const {
    contentId,
    contentRef,
    focusIntentRef,
    open,
    rootRef,
    setOpen,
    triggerRef,
  } = useDropdownMenu();
  const typeahead = useRef({ value: "", time: 0 });
  const portalRoot = usePortalRoot();
  const floatingStyle = useFloatingPosition({
    floatingRef: contentRef,
    open,
    placement: align === "end" ? "bottom-end" : "bottom-start",
    referenceRef: rootRef,
  });

  useEffect(() => {
    if (!open || !contentRef.current || !focusIntentRef.current) {
      return;
    }

    // The parent registers the portal with the modal focus boundary after this effect.
    const frame = window.requestAnimationFrame(() => {
      if (!contentRef.current || !focusIntentRef.current) return;
      focusMenuItem(contentRef.current, focusIntentRef.current === "first" ? 0 : -1);
      focusIntentRef.current = null;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [contentRef, focusIntentRef, open, portalRoot]);

  useEffect(() => {
    if (!open) typeahead.current = { value: "", time: 0 };
  }, [open]);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented || !contentRef.current ||
        (event.target as Element).closest('[role="menu"]') !== contentRef.current) {
      return;
    }

    if (event.key === "Tab") {
      // Restart native sequential navigation at the trigger rather than the portal.
      triggerRef.current?.focus();
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusMenuItem(
        contentRef.current,
        getCurrentMenuItemIndex(contentRef.current) + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusMenuItem(
        contentRef.current,
        getCurrentMenuItemIndex(contentRef.current) - 1,
      );
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusMenuItem(contentRef.current, 0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusMenuItem(contentRef.current, -1);
      return;
    }

    if (event.key.length === 1 && event.key !== " " && !event.altKey &&
        !event.ctrlKey && !event.metaKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      const previous = typeahead.current;
      const value = (event.timeStamp - previous.time < 700 ? previous.value : "") +
        event.key.toLocaleLowerCase();
      typeahead.current = { value, time: event.timeStamp };
      focusMatchingMenuItem(contentRef.current, value);
    }
  }

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <div
      ref={composeRefs(contentRef, ref)}
      className={cn(
        "fixed z-[1000] min-w-48 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)] p-1 shadow-[8px_8px_0_var(--sw-color-shadow)]",
        variant === "compact" && "shadow-[4px_4px_0_var(--sw-color-shadow)]",
        className,
      )}
      id={contentId}
      aria-labelledby={props["aria-label"] ? undefined : triggerRef.current?.id}
      onKeyDown={handleKeyDown}
      role="menu"
      {...swirskiAttrs("dropdown-menu-content", { size, tone, variant })}
      style={{
        ...floatingStyle,
        ...style,
      }}
      {...props}
    />,
    portalRoot,
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";
