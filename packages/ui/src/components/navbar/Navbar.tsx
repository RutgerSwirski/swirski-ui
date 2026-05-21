"use client";

import {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  forwardRef,
} from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type NavbarVariant = "default" | "compact";
export type NavbarSize = "sm" | "md" | "lg";
export type NavbarTone = "default";

export type NavbarProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLElement>;

export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "header";

  return (
    <Component
      ref={ref}
      className={cn(
        "flex min-h-20 items-center justify-between gap-4 border-b-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-4 text-[var(--sw-color-ink)] sm:px-6",
        variant === "compact" && "min-h-16 py-3",
        className,
      )}
      {...swirskiAttrs("navbar", { size, tone, variant })}
      {...props}
    />
  );
});

Navbar.displayName = "Navbar";

export type NavbarBrandProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: ElementType;
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const NavbarBrand = forwardRef<HTMLAnchorElement, NavbarBrandProps>(
  function NavbarBrand({
  as: Component = "a",
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <ResolvedComponent
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center gap-3 font-anton text-2xl uppercase leading-none text-[var(--sw-color-ink)] no-underline",
        variant === "compact" && "text-xl",
        className,
      )}
      {...swirskiAttrs("navbar-brand", { size, tone, variant })}
      {...props}
    />
  );
});

NavbarBrand.displayName = "NavbarBrand";

export type NavbarNavProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLElement>;

export const NavbarNav = forwardRef<HTMLElement, NavbarNavProps>(function NavbarNav({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "nav";

  return (
    <Component
      ref={ref}
      className={cn("hidden items-center gap-2 md:flex", className)}
      {...swirskiAttrs("navbar-nav", { size, tone, variant })}
      {...props}
    />
  );
});

NavbarNav.displayName = "NavbarNav";

export type NavbarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  as?: ElementType;
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  function NavbarLink({
  active = false,
  as: Component = "a",
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <ResolvedComponent
      ref={ref}
      className={cn(
        "inline-flex min-h-11 items-center justify-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-2 text-sm font-black uppercase text-[var(--sw-color-ink)] no-underline transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--sw-color-yellow)] active:translate-y-0 active:scale-[0.98]",
        active
          ? "bg-[var(--sw-color-yellow)] shadow-[var(--sw-shadow-sm)]"
          : "bg-[var(--sw-color-surface)]",
        variant === "compact" && "min-h-10 px-3 py-1.5 text-xs",
        className,
      )}
      aria-current={active ? "page" : props["aria-current"]}
      {...swirskiAttrs("navbar-link", { size, tone, variant })}
      data-active={active ? "" : undefined}
      {...props}
    />
  );
});

NavbarLink.displayName = "NavbarLink";

export type NavbarActionsProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLDivElement>;

export const NavbarActions = forwardRef<HTMLDivElement, NavbarActionsProps>(
  function NavbarActions({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn("flex shrink-0 items-center justify-end gap-2", className)}
      {...swirskiAttrs("navbar-actions", { size, tone, variant })}
      {...props}
    />
  );
});

NavbarActions.displayName = "NavbarActions";
