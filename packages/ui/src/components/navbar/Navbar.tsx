"use client";

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  forwardRef,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuProps,
} from "../dropdown-menu/DropdownMenu";
import { useDropdownMenu } from "../dropdown-menu/DropdownMenuContext";
import { Slot, cn, composeRefs, swirskiAttrs } from "../../system";

export type NavbarVariant = "default" | "compact";
export type NavbarSize = "sm" | "md" | "lg";
export type NavbarTone = "default";

function navbarLinkStyles({
  active,
  variant,
}: {
  active: boolean;
  variant: NavbarVariant;
}) {
  return cn(
    "inline-flex min-h-11 items-center justify-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-2 text-sm font-black uppercase text-[var(--sw-color-ink)] no-underline transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--sw-color-yellow)] active:translate-y-0 active:scale-[0.98]",
    active
      ? "bg-[var(--sw-color-yellow)] shadow-[var(--sw-shadow-sm)]"
      : "bg-[var(--sw-color-surface)]",
    variant === "compact" && "min-h-10 px-3 py-1.5 text-xs",
  );
}

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
        navbarLinkStyles({ active, variant }),
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

export type NavbarDropdownProps = DropdownMenuProps & {
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const NavbarDropdown = forwardRef<HTMLDivElement, NavbarDropdownProps>(
  function NavbarDropdown(
    {
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    return (
      <DropdownMenu
        ref={ref}
        className={cn("shrink-0", className)}
        variant={variant}
        size={size}
        tone={tone}
        {...swirskiAttrs("navbar-dropdown", { size, tone, variant })}
        {...props}
      />
    );
  },
);

NavbarDropdown.displayName = "NavbarDropdown";

export type NavbarDropdownTriggerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
    asChild?: boolean;
    variant?: NavbarVariant;
    size?: NavbarSize;
    tone?: NavbarTone;
  };

export const NavbarDropdownTrigger = forwardRef<
  HTMLButtonElement,
  NavbarDropdownTriggerProps
>(function NavbarDropdownTrigger(
  {
    active = false,
    asChild = false,
    children,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    onClick,
    onKeyDown,
    ...props
  },
  ref,
) {
  const { contentId, focusIntentRef, open, setOpen, triggerRef } =
    useDropdownMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={composeRefs(triggerRef, ref)}
      className={cn(
        navbarLinkStyles({ active, variant }),
        "cursor-pointer gap-2",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (
          event.key === "ArrowDown" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          focusIntentRef.current = "first";
          setOpen(true);
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          focusIntentRef.current = "last";
          setOpen(true);
        }
      }}
      type={asChild ? undefined : "button"}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
      {...swirskiAttrs("navbar-dropdown-trigger", { size, tone, variant })}
      data-active={active ? "" : undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          <span
            aria-hidden="true"
            className="h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-current"
          />
        </>
      )}
    </Component>
  );
});

NavbarDropdownTrigger.displayName = "NavbarDropdownTrigger";

export type NavbarDropdownContentProps = DropdownMenuContentProps & {
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const NavbarDropdownContent = forwardRef<
  HTMLDivElement,
  NavbarDropdownContentProps
>(function NavbarDropdownContent(
  {
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  return (
    <DropdownMenuContent
      ref={ref}
      className={cn("min-w-56", className)}
      variant={variant}
      size={size}
      tone={tone}
      {...swirskiAttrs("navbar-dropdown-content", { size, tone, variant })}
      {...props}
    />
  );
});

NavbarDropdownContent.displayName = "NavbarDropdownContent";

export type NavbarDropdownItemProps = DropdownMenuItemProps & {
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const NavbarDropdownItem = forwardRef<
  HTMLButtonElement,
  NavbarDropdownItemProps
>(function NavbarDropdownItem(
  { variant = "default", size = "md", tone = "default", ...props },
  ref,
) {
  return (
    <DropdownMenuItem
      ref={ref}
      variant={variant}
      size={size}
      tone={tone}
      {...swirskiAttrs("navbar-dropdown-item", { size, tone, variant })}
      {...props}
    />
  );
});

NavbarDropdownItem.displayName = "NavbarDropdownItem";

export type NavbarDropdownLinkProps =
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean;
    as?: ElementType;
    asChild?: boolean;
    variant?: NavbarVariant;
    size?: NavbarSize;
    tone?: NavbarTone;
  };

export const NavbarDropdownLink = forwardRef<
  HTMLAnchorElement,
  NavbarDropdownLinkProps
>(function NavbarDropdownLink(
  {
    active = false,
    as: Component = "a",
    asChild = false,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <DropdownMenuItem
      asChild
      active={active}
      className={cn("no-underline", className)}
      variant={variant}
      size={size}
      tone={tone}
    >
      <ResolvedComponent
        ref={ref}
        aria-current={active ? "page" : props["aria-current"]}
        data-active={active ? "" : undefined}
        {...swirskiAttrs("navbar-dropdown-link", { size, tone, variant })}
        {...props}
      />
    </DropdownMenuItem>
  );
});

NavbarDropdownLink.displayName = "NavbarDropdownLink";

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
