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

export type DialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose(
    {
      asChild = false,
      className,
      children = "Close",
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
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] font-black uppercase shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          dialogButtonSizeStyles[size],
          className,
        )}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setOpen(false);
          }
        }}
        type={asChild ? undefined : "button"}
        {...swirskiAttrs("dialog-close", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

DialogClose.displayName = "DialogClose";
