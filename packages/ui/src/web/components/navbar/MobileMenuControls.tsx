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
import type { NavbarSize, NavbarTone, NavbarVariant } from "./Navbar";
import { useMobileMenu } from "./MobileMenuContext";

export type MobileMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  label?: string;
  variant?: NavbarVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: NavbarSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NavbarTone;
};

export const MobileMenuTrigger = forwardRef<
  HTMLButtonElement,
  MobileMenuTriggerProps
>(function MobileMenuTrigger(
  {
    asChild = false,
    children,
    className,
    label = "Open navigation menu",
    onClick,
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const styles = useMobileMenu();
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";

  const { contentId, open, setOpen } = styles;
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      aria-controls={contentId}
      aria-expanded={open}
      aria-label={children ? ariaLabel : (ariaLabel ?? label)}
      className={cn(
        "inline-grid size-12 place-items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-sm)] outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:hover:shadow-[var(--sw-shadow-sm)]",
        focusVisibleStyles,
        disabledInteractiveStyles,
        variant === "compact" && "size-10",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      type={asChild ? undefined : "button"}
      data-state={open ? "open" : "closed"}
      {...swirskiAttrs("mobile-menu-trigger", { size, tone, variant })}
      {...props}
    >
      {children ?? (
        <span aria-hidden="true" className="grid w-5 gap-1">
          <span className="h-1 bg-current" />
          <span className="h-1 bg-current" />
          <span className="h-1 bg-current" />
        </span>
      )}
    </Component>
  );
}) as unknown as PolymorphicComponent<MobileMenuTriggerProps, HTMLButtonElement>;

MobileMenuTrigger.displayName = "MobileMenuTrigger";

export type MobileMenuCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: NavbarVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: NavbarSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NavbarTone;
};

export const MobileMenuClose = forwardRef<
  HTMLButtonElement,
  MobileMenuCloseProps
>(function MobileMenuClose(
  {
    asChild = false,
    children = "Close",
    className,
    onClick,
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    ...props
  },
  ref,
) {
  const styles = useMobileMenu();
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";

  const { setOpen } = styles;
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] text-xl font-black leading-none text-[color:var(--sw-color-on-yellow)] shadow-[var(--sw-shadow-sm)] outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:hover:shadow-[var(--sw-shadow-sm)]",
        focusVisibleStyles,
        disabledInteractiveStyles,
        variant === "compact" && "size-10 text-lg",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      type={asChild ? undefined : "button"}
      {...swirskiAttrs("mobile-menu-close", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
}) as unknown as PolymorphicComponent<MobileMenuCloseProps, HTMLButtonElement>;

MobileMenuClose.displayName = "MobileMenuClose";
