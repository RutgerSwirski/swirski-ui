"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
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
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DialogVariant;
  size?: DialogSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DialogTone;
};

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose(
    {
      asChild = false,
      className,
      children = "Close",
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) {
    const styles = useDialog();
    const variant = variantProp ?? styles.variant ?? "default";
    const size = sizeProp ?? styles.size ?? "md";
    const tone = toneProp ?? styles.tone ?? "default";
    const { setOpen } = styles;
    const isDisabled = disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] font-black uppercase shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          dialogButtonSizeStyles[size],
          className,
        )}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);

          if (!event.defaultPrevented) {
            setOpen(false);
          }
        }}
        type={asChild ? undefined : "button"}
        {...swirskiAttrs("dialog-close", { size, tone, variant })}
        {...props}
        disabled={asChild ? undefined : disabled}
        aria-disabled={isDisabled || undefined}
        tabIndex={asChild && isDisabled ? -1 : props.tabIndex}
      >
        {children}
      </Component>
    );
  },
) as unknown as PolymorphicComponent<DialogCloseProps, HTMLButtonElement>;

DialogClose.displayName = "DialogClose";
