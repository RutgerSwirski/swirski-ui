"use client";

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Slot, cn, swirskiAttrs } from "../../system";
import { usePortalRoot } from "../../system/usePortalRoot";

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

type MobileMenuContextValue = {
  contentId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export type MobileMenuProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

function useMobileMenu() {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error("MobileMenu components must be used inside MobileMenu.");
  }

  return context;
}

export function MobileMenu({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  variant: _variant = "default",
  size: _size = "md",
  tone: _tone = "default",
}: MobileMenuProps) {
  const contentId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <MobileMenuContext.Provider
      value={{ contentId, open: currentOpen, setOpen }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

export type MobileMenuTriggerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    label?: string;
    variant?: NavbarVariant;
    size?: NavbarSize;
    tone?: NavbarTone;
  };

export const MobileMenuTrigger = forwardRef<
  HTMLButtonElement,
  MobileMenuTriggerProps
>(function MobileMenuTrigger({
  asChild = false,
  children,
  className,
  label = "Open navigation menu",
  onClick,
  variant = "default",
  size = "md",
  tone = "default",
  "aria-label": ariaLabel,
  ...props
}, ref) {
  const { contentId, open, setOpen } = useMobileMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      aria-controls={contentId}
      aria-expanded={open}
      aria-label={children ? ariaLabel : ariaLabel ?? label}
      className={cn(
        "inline-grid size-12 place-items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-sm)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1",
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
});

MobileMenuTrigger.displayName = "MobileMenuTrigger";

export type MobileMenuContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right";
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const MobileMenuContent = forwardRef<HTMLDivElement, MobileMenuContentProps>(
  function MobileMenuContent({
  children,
  className,
  side = "right",
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { contentId, open, setOpen } = useMobileMenu();
  const portalRoot = usePortalRoot();

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/45">
      <button
        aria-label="Close navigation menu"
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div
        aria-modal="true"
        ref={ref}
        className={cn(
          "absolute top-0 flex h-full w-full max-w-sm flex-col border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-5 text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-lg)]",
          side === "right" ? "right-0" : "left-0",
          variant === "compact" && "max-w-xs p-4",
          className,
        )}
        id={contentId}
        role="dialog"
        {...swirskiAttrs("mobile-menu-content", { size, tone, variant })}
        {...props}
      >
        {children}
      </div>
    </div>,
    portalRoot,
  );
});

MobileMenuContent.displayName = "MobileMenuContent";

export type MobileMenuHeaderProps = {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
} & HTMLAttributes<HTMLDivElement>;

export const MobileMenuHeader = forwardRef<HTMLDivElement, MobileMenuHeaderProps>(
  function MobileMenuHeader({
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

export const MobileMenuTitle = forwardRef<HTMLHeadingElement, MobileMenuTitleProps>(
  function MobileMenuTitle({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
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
  function MobileMenuNav({
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
      className={cn("grid gap-3 py-5", className)}
      {...swirskiAttrs("mobile-menu-nav", { size, tone, variant })}
      {...props}
    />
  );
});

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

export const MobileMenuLink = forwardRef<HTMLAnchorElement, MobileMenuLinkProps>(
  function MobileMenuLink({
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
}, ref) {
  const { setOpen } = useMobileMenu();
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <ResolvedComponent
      ref={ref}
      className={cn(
        "flex min-h-14 items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-3 text-lg font-black uppercase text-[var(--sw-color-ink)] no-underline transition hover:bg-[var(--sw-color-yellow)]",
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

export type MobileMenuCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const MobileMenuClose = forwardRef<HTMLButtonElement, MobileMenuCloseProps>(
  function MobileMenuClose({
  asChild = false,
  children = "Close",
  className,
  onClick,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { setOpen } = useMobileMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] text-xl font-black leading-none text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-sm)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none",
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
});

MobileMenuClose.displayName = "MobileMenuClose";
