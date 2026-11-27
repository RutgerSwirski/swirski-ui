"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { OverlayParentContext, useModalOverlay } from "../../system/overlay";
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

  const contentRef = useRef<HTMLDivElement>(null);
  useModalOverlay({
    contentRef,
    open: open && Boolean(portalRoot),
    onEscape: () => setOpen(false),
  });

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/45">
      <div
        aria-hidden="true"
        data-swirski-backdrop=""
        className="absolute inset-0"
      />
      <div
        aria-label="Navigation menu"
        aria-modal="true"
        ref={composeRefs(contentRef, ref)}
        tabIndex={-1}
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
        <OverlayParentContext.Provider value={contentRef}>
          {children}
        </OverlayParentContext.Provider>
      </div>
    </div>,
    portalRoot,
  );
});

MobileMenuContent.displayName = "MobileMenuContent";
