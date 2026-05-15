"use client";

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import clsx from "clsx";

export type NavbarProps = HTMLAttributes<HTMLElement>;

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <header
      className={clsx(
        "flex min-h-20 items-center justify-between gap-4 border-b-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-4 text-[var(--sw-color-ink)] sm:px-6",
        className,
      )}
      {...props}
    />
  );
}

export type NavbarBrandProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: ElementType;
};

export function NavbarBrand({
  as: Component = "a",
  className,
  ...props
}: NavbarBrandProps) {
  return (
    <Component
      className={clsx(
        "inline-flex shrink-0 items-center gap-3 font-anton text-2xl uppercase leading-none text-[var(--sw-color-ink)] no-underline",
        className,
      )}
      {...props}
    />
  );
}

export type NavbarNavProps = HTMLAttributes<HTMLElement>;

export function NavbarNav({ className, ...props }: NavbarNavProps) {
  return (
    <nav
      className={clsx("hidden items-center gap-2 md:flex", className)}
      {...props}
    />
  );
}

export type NavbarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  as?: ElementType;
};

export function NavbarLink({
  active = false,
  as: Component = "a",
  className,
  ...props
}: NavbarLinkProps) {
  return (
    <Component
      className={clsx(
        "inline-flex min-h-11 items-center justify-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-2 text-sm font-black uppercase text-[var(--sw-color-ink)] no-underline transition-all duration-150 hover:-translate-y-0.5 hover:bg-[var(--sw-color-yellow)] active:translate-y-0 active:scale-[0.98]",
        active
          ? "bg-[var(--sw-color-yellow)] shadow-[var(--sw-shadow-sm)]"
          : "bg-[var(--sw-color-surface)]",
        className,
      )}
      aria-current={active ? "page" : props["aria-current"]}
      {...props}
    />
  );
}

export type NavbarActionsProps = HTMLAttributes<HTMLDivElement>;

export function NavbarActions({ className, ...props }: NavbarActionsProps) {
  return (
    <div
      className={clsx("flex shrink-0 items-center justify-end gap-2", className)}
      {...props}
    />
  );
}

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
    label?: string;
  };

export function MobileMenuTrigger({
  children,
  className,
  label = "Open navigation menu",
  onClick,
  "aria-label": ariaLabel,
  ...props
}: MobileMenuTriggerProps) {
  const { contentId, open, setOpen } = useMobileMenu();

  return (
    <button
      aria-controls={contentId}
      aria-expanded={open}
      aria-label={children ? ariaLabel : ariaLabel ?? label}
      className={clsx(
        "inline-grid size-12 place-items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-sm)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      type="button"
      {...props}
    >
      {children ?? (
        <span aria-hidden="true" className="grid w-5 gap-1">
          <span className="h-1 bg-current" />
          <span className="h-1 bg-current" />
          <span className="h-1 bg-current" />
        </span>
      )}
    </button>
  );
}

export type MobileMenuContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right";
};

export function MobileMenuContent({
  children,
  className,
  side = "right",
  ...props
}: MobileMenuContentProps) {
  const { contentId, open, setOpen } = useMobileMenu();

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

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/45">
      <button
        aria-label="Close navigation menu"
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div
        aria-modal="true"
        className={clsx(
          "absolute top-0 flex h-full w-full max-w-sm flex-col border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-5 text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-lg)]",
          side === "right" ? "right-0" : "left-0",
          className,
        )}
        id={contentId}
        role="dialog"
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export type MobileMenuHeaderProps = HTMLAttributes<HTMLDivElement>;

export function MobileMenuHeader({
  className,
  ...props
}: MobileMenuHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-start justify-between gap-4 border-b-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] pb-4",
        className,
      )}
      {...props}
    />
  );
}

export type MobileMenuTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function MobileMenuTitle({
  className,
  ...props
}: MobileMenuTitleProps) {
  return (
    <h2
      className={clsx("font-anton text-3xl uppercase leading-none", className)}
      {...props}
    />
  );
}

export type MobileMenuNavProps = HTMLAttributes<HTMLElement>;

export function MobileMenuNav({ className, ...props }: MobileMenuNavProps) {
  return (
    <nav
      className={clsx("grid gap-3 py-5", className)}
      {...props}
    />
  );
}

export type MobileMenuLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  as?: ElementType;
  closeOnSelect?: boolean;
};

export function MobileMenuLink({
  active = false,
  as: Component = "a",
  className,
  closeOnSelect = true,
  onClick,
  ...props
}: MobileMenuLinkProps) {
  const { setOpen } = useMobileMenu();

  return (
    <Component
      className={clsx(
        "flex min-h-14 items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-3 text-lg font-black uppercase text-[var(--sw-color-ink)] no-underline transition hover:bg-[var(--sw-color-yellow)]",
        active
          ? "bg-[var(--sw-color-yellow)] shadow-[var(--sw-shadow-sm)]"
          : "bg-[var(--sw-color-paper)]",
        className,
      )}
      aria-current={active ? "page" : props["aria-current"]}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (!event.defaultPrevented && closeOnSelect) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
}

export type MobileMenuCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function MobileMenuClose({
  children = "Close",
  className,
  onClick,
  ...props
}: MobileMenuCloseProps) {
  const { setOpen } = useMobileMenu();

  return (
    <button
      className={clsx(
        "inline-flex size-11 shrink-0 items-center justify-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] text-xl font-black leading-none text-[var(--sw-color-ink)] shadow-[var(--sw-shadow-sm)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
