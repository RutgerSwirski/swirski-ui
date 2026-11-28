"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
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
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
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
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    active = false,
    disabled,
    ...props
  },
  ref,
) {
  const styles = useDropdownMenu();
  const variant = variantProp ?? styles.variant ?? "default";
  const size = sizeProp ?? styles.size ?? "md";
  const tone = toneProp ?? styles.tone ?? "default";
  const { setOpen, triggerRef } = styles;
  const isDisabled = disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const Component = asChild ? Slot : "button";

  const baseStyles =
    "block w-full text-left font-black uppercase sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] hover:bg-[var(--sw-color-yellow)] hover:text-[color:var(--sw-color-on-yellow)] focus-visible:bg-[var(--sw-color-yellow)] focus-visible:text-[color:var(--sw-color-on-yellow)] focus-visible:outline-none forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid disabled:cursor-not-allowed disabled:text-black/35 disabled:hover:bg-transparent aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

  return (
    <Component
      ref={ref}
      className={cn(
        baseStyles,
        active && "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
        itemSizeStyles[size],
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
          triggerRef.current?.focus();
        }
      }}
      role="menuitem"
      tabIndex={-1}
      type={asChild ? undefined : "button"}
      {...swirskiAttrs("dropdown-menu-item", { size, tone, variant })}
      data-active={active ? "" : undefined}
      {...props}
      disabled={asChild ? undefined : disabled}
      aria-disabled={isDisabled || undefined}
    />
  );
}) as unknown as PolymorphicComponent<DropdownMenuItemProps, HTMLButtonElement>;

DropdownMenuItem.displayName = "DropdownMenuItem";
