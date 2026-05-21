"use client";

import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Slot, cn, swirskiAttrs } from "../../system";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";

export type TooltipVariant = "default";
export type TooltipSize = "sm" | "md";
export type TooltipTone = "black" | "yellow";

export type TooltipProps = {
  asChild?: boolean;
  children: ReactNode;
  content: ReactNode;
  variant?: TooltipVariant;
  size?: TooltipSize;
  tone?: TooltipTone;
} & HTMLAttributes<HTMLSpanElement>;

const sizeStyles: Record<TooltipSize, string> = {
  sm: "px-2 py-1 text-[0.65rem] leading-4",
  md: "px-3 py-2 text-xs leading-5",
};

const toneStyles: Record<TooltipTone, string> = {
  black: "bg-[#0B0B0C] text-white shadow-[5px_5px_0_#FFD400]",
  yellow: "bg-[#FFD400] text-black shadow-[5px_5px_0_#0B0B0C]",
};

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  function Tooltip(
    {
      asChild = false,
      children,
      content,
      className,
      onBlur,
      onFocus,
      onPointerEnter,
      onPointerLeave,
      variant = "default",
      size = "md",
      tone = "black",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "span";
    const triggerRef = useRef<HTMLElement | null>(null);
    const tooltipId = `${useId()}-tooltip`;
    const portalRoot = usePortalRoot();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [position, setPosition] = useState<{
      left: number;
      top: number;
    } | null>(null);
    const open = hovered || focused;
    const describedBy =
      [props["aria-describedby"], open ? tooltipId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;

    useEffect(() => {
      if (!open) {
        setPosition(null);
        return;
      }

      function updatePosition() {
        const rect = triggerRef.current?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        const viewportPadding = 12;
        const centeredLeft = rect.left + rect.width / 2;

        setPosition({
          left: Math.min(
            Math.max(centeredLeft, viewportPadding),
            window.innerWidth - viewportPadding,
          ),
          top: Math.max(rect.top - 8, viewportPadding),
        });
      }

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [open]);

    const setTriggerRef = useCallback(
      (node: HTMLElement | null) => {
        triggerRef.current = node;

        if (typeof ref === "function") {
          ref(node as HTMLSpanElement | null);
          return;
        }

        if (ref) {
          ref.current = node as HTMLSpanElement | null;
        }
      },
      [ref],
    );

    const tooltipContent =
      open &&
      position &&
      portalRoot &&
      createPortal(
        <span
          className={cn(
            "pointer-events-none fixed z-[1000] w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-full border-4 border-black font-black uppercase",
            sizeStyles[size],
            toneStyles[tone],
          )}
          id={tooltipId}
          role="tooltip"
          style={{
            left: position.left,
            top: position.top,
          }}
          {...swirskiAttrs("tooltip-content", { size, tone, variant })}
        >
          {content}
        </span>,
        portalRoot,
      );

    return (
      <>
        <Component
          ref={setTriggerRef}
          className={cn("group relative inline-flex", className)}
          {...swirskiAttrs("tooltip", { size, tone, variant })}
          {...props}
          aria-describedby={describedBy}
          onBlur={(event) => {
            onBlur?.(event);
            setFocused(false);
          }}
          onFocus={(event) => {
            onFocus?.(event);
            setFocused(true);
          }}
          onPointerEnter={(event) => {
            onPointerEnter?.(event);
            setHovered(true);
          }}
          onPointerLeave={(event) => {
            onPointerLeave?.(event);
            setHovered(false);
          }}
        >
          {children}
        </Component>
        {tooltipContent}
      </>
    );
  },
);

Tooltip.displayName = "Tooltip";
