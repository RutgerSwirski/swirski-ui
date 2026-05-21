"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";
import { useDropdownMenu } from "./DropdownMenuContext";
import type {
  DropdownMenuSize,
  DropdownMenuTone,
  DropdownMenuVariant,
} from "./dropdown-menu-types";
import { itemSizeStyles } from "./dropdown-menu-utils";

export type DropdownMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
};

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(function DropdownMenuItem(
  {
    asChild = false,
    className,
    onClick,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const { setOpen, triggerRef } = useDropdownMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "block w-full text-left font-black uppercase transition hover:bg-[#FFD400] focus-visible:bg-[#FFD400] focus-visible:outline-none disabled:cursor-not-allowed disabled:text-black/35",
        itemSizeStyles[size],
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
      role="menuitem"
      type={asChild ? undefined : "button"}
      {...swirskiAttrs("dropdown-menu-item", { size, tone, variant })}
      {...props}
    />
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";
