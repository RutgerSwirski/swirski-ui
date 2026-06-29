"use client";

import type {
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { forwardRef, useEffect } from "react";
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
import { focusMenuItem, getCurrentMenuItemIndex } from "./dropdown-menu-utils";

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

    focusMenuItem(
      contentRef.current,
      focusIntentRef.current === "first" ? 0 : -1,
    );
    focusIntentRef.current = null;
  }, [contentRef, focusIntentRef, open]);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented || !contentRef.current) {
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

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <div
      ref={composeRefs(contentRef, ref)}
      className={cn(
        "fixed z-[1000] min-w-48 border-4 border-black bg-white p-1 shadow-[8px_8px_0_#0B0B0C]",
        variant === "compact" && "shadow-[4px_4px_0_#0B0B0C]",
        className,
      )}
      id={contentId}
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
