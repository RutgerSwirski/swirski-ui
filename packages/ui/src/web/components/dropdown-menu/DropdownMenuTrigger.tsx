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
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    disabled,
    onClick,
    onKeyDown,
    ...props
  },
  ref,
) {
  const styles = useDropdownMenu();
  const variant = variantProp ?? styles.variant ?? "default";
  const size = sizeProp ?? styles.size ?? "md";
  const tone = toneProp ?? styles.tone ?? "default";
  const { contentId, focusIntentRef, open, setOpen, triggerRef } = styles;
  const isDisabled = disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={composeRefs(triggerRef, ref)}
      className={cn(
        "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] font-black uppercase outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
        focusVisibleStyles,
        disabledInteractiveStyles,
        triggerSizeStyles[size],
        variant === "compact" ? "shadow-none disabled:hover:shadow-none" : "shadow-[4px_4px_0_var(--sw-color-shadow)]",
        className,
      )}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);

        if (!event.defaultPrevented) {
          if (!open) focusIntentRef.current = "first";
          setOpen(!open);
        }
      }}
      onKeyDown={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
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
      id={`${contentId}-trigger`}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
      data-state={open ? "open" : "closed"}
      {...swirskiAttrs("dropdown-menu-trigger", { size, tone, variant })}
      {...props}
      disabled={asChild ? undefined : disabled}
      aria-disabled={isDisabled || undefined}
      tabIndex={asChild && isDisabled ? -1 : props.tabIndex}
    />
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
