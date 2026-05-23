"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { useModalOverlay } from "../../system/overlay";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";
import { useDrawer } from "./DrawerContext";
import type {
  DrawerSide,
  DrawerSize,
  DrawerTone,
  DrawerVariant,
} from "./drawer-types";
import { drawerSideStyles } from "./drawer-utils";

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
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const { describedById, labelledById, open, setOpen } = useDrawer();
    const portalRoot = usePortalRoot();
    const contentRef = useRef<HTMLDivElement>(null);

    useModalOverlay({
      contentRef,
      onEscape: () => setOpen(false),
      open,
    });

    if (!open || !portalRoot) {
      return null;
    }

    return createPortal(
      <div className="fixed inset-0 z-50 bg-black/45">
        <button
          aria-label="Close drawer"
          className="absolute inset-0"
          onClick={() => setOpen(false)}
          type="button"
        />
        <div
          ref={composeRefs(contentRef, ref)}
          className={cn(
            "absolute border-4 border-black bg-white p-6 shadow-[12px_12px_0_#0B0B0C]",
            drawerSideStyles[side],
            variant === "compact" && "p-5 shadow-[8px_8px_0_#0B0B0C]",
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledById ?? props["aria-labelledby"]}
          aria-describedby={describedById ?? props["aria-describedby"]}
          tabIndex={-1}
          {...swirskiAttrs("drawer-content", { size, tone, variant })}
          {...props}
        >
          {children}
        </div>
      </div>,
      portalRoot,
    );
  },
);

DrawerContent.displayName = "DrawerContent";
