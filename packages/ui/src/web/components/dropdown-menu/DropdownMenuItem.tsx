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
  active?: boolean;
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
    active = false,
    ...props
  },
  ref,
) {
  const { setOpen, triggerRef } = useDropdownMenu();
  const Component = asChild ? Slot : "button";

  const baseStyles =
    "block w-full text-left font-black uppercase transition hover:bg-[var(--sw-color-yellow)] focus-visible:bg-[var(--sw-color-yellow)] focus-visible:outline-none disabled:cursor-not-allowed disabled:text-black/35 disabled:hover:bg-transparent";

  return (
    <Component
      ref={ref}
      className={cn(
        baseStyles,
        active && "bg-[var(--sw-color-yellow)]",
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
      data-active={active ? "" : undefined}
      {...props}
    />
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";
