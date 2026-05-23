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
import { useDrawer } from "./DrawerContext";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";
import { drawerButtonSizeStyles } from "./drawer-utils";

export type DrawerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function DrawerTrigger(
    {
      asChild = false,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      onClick,
      ...props
    },
    ref,
  ) {
    const { setOpen } = useDrawer();
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-blue)] font-black uppercase text-white shadow-[5px_5px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[5px_5px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          drawerButtonSizeStyles[size],
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
        {...swirskiAttrs("drawer-trigger", { size, tone, variant })}
        {...props}
      />
    );
  },
);

DrawerTrigger.displayName = "DrawerTrigger";
