"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";
import { useDrawer } from "./DrawerContext";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";
import { drawerButtonSizeStyles } from "./drawer-utils";

export type DrawerCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose(
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
    const { setOpen } = useDrawer();
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "mt-6 border-4 border-black bg-white font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
          drawerButtonSizeStyles[size],
          className,
        )}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setOpen(false);
          }
        }}
        type={asChild ? undefined : "button"}
        {...swirskiAttrs("drawer-close", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

DrawerClose.displayName = "DrawerClose";
