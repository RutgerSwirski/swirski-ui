"use client";

import type {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  MouseEvent,
} from "react";
import { forwardRef } from "react";
import { Slot, cn, focusVisibleStyles, swirskiAttrs } from "../../system";
import type { NavbarSize, NavbarTone, NavbarVariant } from "./Navbar";
import { useMobileMenu } from "./MobileMenuContext";

export type MobileMenuHeaderProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLDivElement>;

export const MobileMenuHeader = forwardRef<
  HTMLDivElement,
  MobileMenuHeaderProps
>(function MobileMenuHeader(
  {
    asChild = false,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "flex items-start justify-between gap-4 border-b-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] pb-4",
        className,
      )}
      {...swirskiAttrs("mobile-menu-header", { size, tone, variant })}
      {...props}
    />
  );
});

MobileMenuHeader.displayName = "MobileMenuHeader";

export type MobileMenuTitleProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const MobileMenuTitle = forwardRef<
  HTMLHeadingElement,
  MobileMenuTitleProps
>(function MobileMenuTitle(
  {
    asChild = false,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "h2";

  return (
    <Component
      ref={ref}
      className={cn("font-anton text-3xl uppercase leading-none", className)}
      {...swirskiAttrs("mobile-menu-title", { size, tone, variant })}
      {...props}
    />
  );
});

MobileMenuTitle.displayName = "MobileMenuTitle";

export type MobileMenuNavProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLElement>;

export const MobileMenuNav = forwardRef<HTMLElement, MobileMenuNavProps>(
  function MobileMenuNav(
    {
      asChild = false,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "nav";

    return (
      <Component
        ref={ref}
        className={cn("grid gap-3 py-5", className)}
        {...swirskiAttrs("mobile-menu-nav", { size, tone, variant })}
        {...props}
      />
    );
  },
);

MobileMenuNav.displayName = "MobileMenuNav";

export type MobileMenuLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  as?: ElementType;
  asChild?: boolean;
  closeOnSelect?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const MobileMenuLink = forwardRef<
  HTMLAnchorElement,
  MobileMenuLinkProps
>(function MobileMenuLink(
  {
    active = false,
    as: Component = "a",
    asChild = false,
    className,
    closeOnSelect = true,
    onClick,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const { setOpen } = useMobileMenu();
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <ResolvedComponent
      ref={ref}
      className={cn(
        "flex min-h-14 items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-3 text-lg font-black uppercase text-[var(--sw-color-ink)] no-underline outline-none transition hover:bg-[var(--sw-color-yellow)]",
        focusVisibleStyles,
        active
          ? "bg-[var(--sw-color-yellow)] shadow-[var(--sw-shadow-sm)]"
          : "bg-[var(--sw-color-paper)]",
        variant === "compact" && "min-h-12 py-2 text-base",
        className,
      )}
      aria-current={active ? "page" : props["aria-current"]}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (!event.defaultPrevented && closeOnSelect) {
          setOpen(false);
        }
      }}
      {...swirskiAttrs("mobile-menu-link", { size, tone, variant })}
      data-active={active ? "" : undefined}
      {...props}
    />
  );
});

MobileMenuLink.displayName = "MobileMenuLink";
