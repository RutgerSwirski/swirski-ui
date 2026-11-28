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
import { useDrawer } from "./DrawerContext";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";
import { drawerButtonSizeStyles } from "./drawer-utils";

export type DrawerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DrawerTone;
};

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function DrawerTrigger(
    {
      asChild = false,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) {
    const styles = useDrawer();
    const variant = variantProp ?? styles.variant ?? "default";
    const size = sizeProp ?? styles.size ?? "md";
    const tone = toneProp ?? styles.tone ?? "default";
    const { open, setOpen } = styles;
    const isDisabled = disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-blue)] font-black uppercase text-[color:var(--sw-color-on-blue)] shadow-[5px_5px_0_var(--sw-color-shadow)] outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[5px_5px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          drawerButtonSizeStyles[size],
          variant === "compact" &&
            "shadow-[3px_3px_0_var(--sw-color-shadow)] disabled:hover:shadow-[3px_3px_0_var(--sw-color-shadow)]",
          className,
        )}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);

          if (!event.defaultPrevented) {
            setOpen(true);
          }
        }}
        type={asChild ? undefined : "button"}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        {...swirskiAttrs("drawer-trigger", { size, tone, variant })}
        {...props}
        disabled={asChild ? undefined : disabled}
        aria-disabled={isDisabled || undefined}
        tabIndex={asChild && isDisabled ? -1 : props.tabIndex}
      />
    );
  },
) as unknown as PolymorphicComponent<DrawerTriggerProps, HTMLButtonElement>;

DrawerTrigger.displayName = "DrawerTrigger";
