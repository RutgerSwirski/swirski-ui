"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";
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
          "border-4 border-black bg-[#0057FF] font-black uppercase text-white shadow-[5px_5px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
          drawerButtonSizeStyles[size],
          variant === "compact" && "shadow-[3px_3px_0_#0B0B0C]",
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
