"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn, swirskiAttrs } from "../../system";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";
import type { NavbarSize, NavbarTone, NavbarVariant } from "./Navbar";
import { useMobileMenu } from "./MobileMenuContext";

export type MobileMenuContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right";
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export const MobileMenuContent = forwardRef<
  HTMLDivElement,
  MobileMenuContentProps
>(function MobileMenuContent(
  {
    children,
    className,
    side = "right",
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
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
