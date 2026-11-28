"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { OverlayParentContext, useModalOverlay } from "../../system/overlay";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";
import { useDrawer } from "./DrawerContext";
import type {
  DrawerSide,
  DrawerSize,
  DrawerTone,
  DrawerVariant,
} from "./drawer-types";
import { drawerSideStyles, drawerWidthStyles } from "./drawer-utils";

export type DrawerContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: DrawerSide;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(
    {
      side = "right",
      className,
      children,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const styles = useDrawer();
    const variant = variantProp ?? styles.variant ?? "default";
    const size = sizeProp ?? styles.size ?? "md";
    const tone = toneProp ?? styles.tone ?? "default";
    const { describedById, labelledById, open, setOpen } = styles;
    const portalRoot = usePortalRoot();
    const contentRef = useRef<HTMLDivElement>(null);

    useModalOverlay({
      contentRef,
      onEscape: () => setOpen(false),
      open: open && Boolean(portalRoot),
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
          ref={composeRefs(contentRef, ref)}
          className={cn(
            "absolute border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
            drawerSideStyles[side],
            (side === "left" || side === "right") && drawerWidthStyles[size],
            variant === "compact"
              ? "p-5 shadow-[8px_8px_0_var(--sw-color-shadow)]"
              : "p-6 shadow-[12px_12px_0_var(--sw-color-shadow)]",
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledById ?? props["aria-labelledby"]}
          aria-describedby={describedById ?? props["aria-describedby"]}
          tabIndex={-1}
          data-state="open"
          {...swirskiAttrs("drawer-content", { size, tone, variant })}
          {...props}
        >
          <OverlayParentContext.Provider value={contentRef}>
            {children}
          </OverlayParentContext.Provider>
        </div>
      </div>,
      portalRoot,
    );
  },
);

DrawerContent.displayName = "DrawerContent";
