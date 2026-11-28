"use client";

import {
  HTMLAttributes,
  ReactNode,
  cloneElement,
  Fragment,
  isValidElement,
  forwardRef,
  useEffect,
  useMemo,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, composeRefs, swirskiAttrs } from "../../system";
import { useFloatingPosition } from "../../system/floating";
import { useOverlayLayer } from "../../system/overlay";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";

export type TooltipVariant = "default";
export type TooltipSize = "sm" | "md";
export type TooltipTone = "black" | "yellow";

export type TooltipProps = {
  asChild?: boolean;
  children: ReactNode;
  content: ReactNode;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
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
    const tooltipRef = useRef<HTMLSpanElement | null>(null);
    const tooltipId = `${useId()}-tooltip`;
    const portalRoot = usePortalRoot();
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const leaveTimer = useRef<number | undefined>(undefined);
    const open = Boolean(portalRoot) && !dismissed && (hovered || focused);
    useOverlayLayer({
      open,
      contentRef: tooltipRef,
      rootRef: triggerRef,
      onEscape: () => {
        setHovered(false);
        setDismissed(true);
      },
    });
    useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

    function leaveHover() {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = window.setTimeout(() => setHovered(false), 180);
    }
    const tooltipStyle = useFloatingPosition({
      floatingRef: tooltipRef,
      open,
      placement: "top",
      referenceRef: triggerRef,
    });
    const describedBy =
      [props["aria-describedby"], tooltipId]
        .filter(Boolean)
        .join(" ") || undefined;

    const setTriggerRef = useMemo(() => composeRefs(triggerRef, ref), [ref]);
    const child = !asChild && isValidElement<HTMLAttributes<HTMLElement>>(children) && children.type !== Fragment
      ? cloneElement(children, {
          "aria-describedby": [children.props["aria-describedby"], describedBy].filter(Boolean).join(" "),
        })
      : children;

    const tooltipContent =
      portalRoot &&
      createPortal(
        <span
          ref={tooltipRef}
          className={cn(
            "fixed z-[1000] w-max max-w-[calc(100vw-1.5rem)] border-4 border-black font-black uppercase",
            sizeStyles[size],
            toneStyles[tone],
          )}
          id={tooltipId}
          hidden={!open}
          onPointerEnter={() => window.clearTimeout(leaveTimer.current)}
          onPointerLeave={leaveHover}
          role="tooltip"
          style={tooltipStyle}
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
          aria-describedby={child === children ? describedBy : undefined}
          onBlur={(event) => {
            onBlur?.(event);
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onFocus={(event) => {
            onFocus?.(event);
            if (!event.defaultPrevented) {
              setDismissed(false);
              setFocused(true);
            }
          }}
          onPointerEnter={(event) => {
            onPointerEnter?.(event);
            if (!event.defaultPrevented && event.pointerType !== "touch") {
              window.clearTimeout(leaveTimer.current);
              setDismissed(false);
              setHovered(true);
            }
          }}
          onPointerLeave={(event) => {
            onPointerLeave?.(event);
            leaveHover();
          }}
        >
          {child}
        </Component>
        {tooltipContent}
        {!portalRoot && <span id={tooltipId} hidden>{content}</span>}
      </>
    );
  },
) as unknown as PolymorphicComponent<TooltipProps, HTMLSpanElement>;

Tooltip.displayName = "Tooltip";
