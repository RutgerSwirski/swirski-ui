"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import {
  Slot,
  cn,
  composeRefs,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";
import { useDropdownMenu } from "./DropdownMenuContext";
import type {
  DropdownMenuSize,
  DropdownMenuTone,
  DropdownMenuVariant,
} from "./dropdown-menu-types";
import { triggerSizeStyles } from "./dropdown-menu-utils";

export type DropdownMenuTriggerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: DropdownMenuVariant;
    size?: DropdownMenuSize;
    tone?: DropdownMenuTone;
  };

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(function DropdownMenuTrigger(
  {
    asChild = false,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    onClick,
    onKeyDown,
    ...props
  },
  ref,
) {
  const { contentId, focusIntentRef, open, setOpen, triggerRef } =
    useDropdownMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={composeRefs(triggerRef, ref)}
      className={cn(
        "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] font-black uppercase shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
        focusVisibleStyles,
        disabledInteractiveStyles,
        triggerSizeStyles[size],
        variant === "compact" && "shadow-none disabled:hover:shadow-none",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (
          event.key === "ArrowDown" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          focusIntentRef.current = "first";
          setOpen(true);
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          focusIntentRef.current = "last";
          setOpen(true);
        }
      }}
      type={asChild ? undefined : "button"}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
      {...swirskiAttrs("dropdown-menu-trigger", { size, tone, variant })}
      {...props}
    />
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
