"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import {
  Slot,
  cn,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";
import { useDialog } from "./DialogContext";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";
import { dialogButtonSizeStyles } from "./dialog-utils";

export type DialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger(
    {
      asChild = false,
      className,
      children,
      variant = "default",
      size = "md",
      tone = "default",
      onClick,
      ...props
    },
    ref,
  ) {
    const { setOpen } = useDialog();
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-blue)] font-black uppercase text-white shadow-[5px_5px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[5px_5px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          dialogButtonSizeStyles[size],
          variant === "compact" && "shadow-[3px_3px_0_var(--sw-color-shadow)] disabled:hover:shadow-[3px_3px_0_var(--sw-color-shadow)]",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setOpen(true);
          }
        }}
        type={asChild ? undefined : "button"}
        {...swirskiAttrs("dialog-trigger", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

DialogTrigger.displayName = "DialogTrigger";
