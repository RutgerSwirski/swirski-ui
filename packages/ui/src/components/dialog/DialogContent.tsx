"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { focusInitialElement, trapFocus } from "../../system/focus";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";
import { useDialog } from "./DialogContext";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";
import { dialogContentSizeStyles } from "./dialog-utils";

export type DialogContentProps = {
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    {
      className,
      children,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const { descriptionId, hasDescription, hasTitle, open, setOpen, titleId } =
      useDialog();
    const portalRoot = usePortalRoot();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) {
        return;
      }

      const previouslyFocusedElement =
        document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const animationFrame = window.requestAnimationFrame(() => {
        if (contentRef.current) {
          focusInitialElement(contentRef.current);
        }
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
          return;
        }

        if (contentRef.current) {
          trapFocus(contentRef.current, event);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.cancelAnimationFrame(animationFrame);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);

        if (
          previouslyFocusedElement &&
          document.contains(previouslyFocusedElement)
        ) {
          previouslyFocusedElement.focus();
        }
      };
    }, [open, setOpen]);

    if (!open || !portalRoot) {
      return null;
    }

    return createPortal(
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
        <button
          aria-label="Close dialog"
          className="absolute inset-0"
          onClick={() => setOpen(false)}
          type="button"
        />
        <div
          ref={composeRefs(contentRef, ref)}
          className={cn(
            "relative z-10 w-full border-4 border-black bg-white shadow-[12px_12px_0_#0B0B0C]",
            dialogContentSizeStyles[size],
            variant === "compact" && "shadow-[8px_8px_0_#0B0B0C]",
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={hasTitle ? titleId : props["aria-labelledby"]}
          aria-describedby={
            hasDescription ? descriptionId : props["aria-describedby"]
          }
          tabIndex={-1}
          {...swirskiAttrs("dialog-content", { size, tone, variant })}
          {...props}
        >
          {children}
        </div>
      </div>,
      portalRoot,
    );
  },
);

DialogContent.displayName = "DialogContent";
