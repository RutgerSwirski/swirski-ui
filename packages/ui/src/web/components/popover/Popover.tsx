"use client";
import { useOverlayLayer } from "../../system/overlay";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
} from "react";
import { useControllableState } from "../../hooks/use-controllable-state/useControllableState";
import { createPortal } from "react-dom";
import {
  Slot,
  cn,
  composeRefs,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";
import { useFloatingPosition } from "../../system/floating";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";

export type PopoverVariant = "default" | "compact";
export type PopoverSize = "sm" | "md" | "lg";
export type PopoverTone = "default";

type PopoverContextValue = {
  size: PopoverSize;
  variant: PopoverVariant;
  tone: PopoverTone;
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  contentId: string;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

export type PopoverProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: PopoverVariant;
  size?: PopoverSize;
  tone?: PopoverTone;
} & HTMLAttributes<HTMLDivElement>;

function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover components must be used inside Popover.");
  }

  return context;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      children,
      open,
      defaultOpen = false,
      onOpenChange,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const contentId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [currentOpen, setOpen] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    useOverlayLayer({
      open: currentOpen,
      rootRef,
      contentRef,
      onEscape: () => {
        rootRef.current?.querySelector<HTMLElement>(`[aria-controls="${contentId}"]`)?.focus();
        setOpen(false);
      },
      onOutside: () => setOpen(false),
    });

    return (
      <PopoverContext.Provider
        value={{ open: currentOpen, setOpen, rootRef, contentRef, contentId, variant, size, tone }}
      >
        <div
          ref={composeRefs(rootRef, ref)}
          className={cn("relative w-fit", className)}
          data-state={currentOpen ? "open" : "closed"}
          {...swirskiAttrs("popover", { size, tone, variant })}
          {...props}
        >
          {children}
        </div>
      </PopoverContext.Provider>
    );
  },
);

Popover.displayName = "Popover";

export type PopoverTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: PopoverVariant;
  size?: PopoverSize;
  tone?: PopoverTone;
};

const triggerSizeStyles: Record<PopoverSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-base",
};

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(function PopoverTrigger(
  {
    asChild = false,
    className,
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    disabled,
    onClick,
    ...props
  },
  ref,
) {
  const styles = usePopover();
  const { contentId, open, setOpen } = styles;
  const variant = variantProp ?? styles.variant;
  const size = sizeProp ?? styles.size;
  const tone = toneProp ?? styles.tone;
  const isDisabled = disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] font-black uppercase outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-2 active:translate-y-2 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
        focusVisibleStyles,
        disabledInteractiveStyles,
        triggerSizeStyles[size],
        variant === "compact" ? "shadow-none disabled:hover:shadow-none" : "shadow-[4px_4px_0_var(--sw-color-shadow)]",
        className,
      )}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      type={asChild ? undefined : "button"}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="dialog"
      data-state={open ? "open" : "closed"}
      {...swirskiAttrs("popover-trigger", { size, tone, variant })}
      {...props}
      disabled={asChild ? undefined : disabled}
      aria-disabled={isDisabled || undefined}
      tabIndex={asChild && isDisabled ? -1 : props.tabIndex}
    />
  );
});

PopoverTrigger.displayName = "PopoverTrigger";

export type PopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end";
  variant?: PopoverVariant;
  size?: PopoverSize;
  tone?: PopoverTone;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      className,
      align = "start",
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      style,
      ...props
    },
    ref,
  ) {
    const styles = usePopover();
    const { contentId, contentRef, open, rootRef } = styles;
    const variant = variantProp ?? styles.variant;
    const size = sizeProp ?? styles.size;
    const tone = toneProp ?? styles.tone;
    const portalRoot = usePortalRoot();
    const floatingStyle = useFloatingPosition({
      floatingRef: contentRef,
      open,
      placement: align === "end" ? "bottom-end" : "bottom-start",
      referenceRef: rootRef,
    });

    if (!open || !portalRoot) {
      return null;
    }

    return createPortal(
      <div
        ref={composeRefs(contentRef, ref)}
        className={cn(
          "fixed z-[1000] border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
          size === "sm" ? "w-56" : size === "lg" ? "w-96" : "w-72",
          variant === "compact"
            ? "p-3 shadow-[4px_4px_0_var(--sw-color-shadow)]"
            : "p-4 shadow-[8px_8px_0_var(--sw-color-shadow)]",
          className,
        )}
        id={contentId}
        role="dialog"
        data-state="open"
        {...swirskiAttrs("popover-content", { size, tone, variant })}
        style={{
          ...floatingStyle,
          ...style,
        }}
        {...props}
      />,
      portalRoot,
    );
  },
);

PopoverContent.displayName = "PopoverContent";
