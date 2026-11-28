"use client";

import {
  DetailsHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useRef,
} from "react";
import { Slot, cn, focusVisibleStyles, swirskiAttrs } from "../../system";

export type AccordionVariant = "default" | "compact";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionTone = "default";

const AccordionStyles = createContext<{
  variant: AccordionVariant;
  size: AccordionSize;
  tone: AccordionTone;
} | null>(null);

export type AccordionProps = {
  asChild?: boolean;
  variant?: AccordionVariant;
  size?: AccordionSize;
  tone?: AccordionTone;
} & HTMLAttributes<HTMLDivElement>;

const gapStyles: Record<AccordionSize, string> = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
};

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      asChild = false,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <AccordionStyles.Provider value={{ variant, size, tone }}>
        <Component
          ref={ref}
          className={cn("grid", gapStyles[size], className)}
          {...swirskiAttrs("accordion", { size, tone, variant })}
          {...props}
        />
      </AccordionStyles.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

export type AccordionItemProps = {
  /** Initially open in uncontrolled mode. */
  defaultOpen?: boolean;
  /** Reports native disclosure changes. Pair with open for controlled mode. */
  onOpenChange?: (open: boolean) => void;
  variant?: AccordionVariant;
  size?: AccordionSize;
  tone?: AccordionTone;
} & DetailsHTMLAttributes<HTMLDetailsElement>;

export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  function AccordionItem(
    {
      className, variant: variantProp, size: sizeProp, tone: toneProp,
      open, defaultOpen, onOpenChange, onToggle, ...props
    },
    ref,
  ) {
    const styles = useContext(AccordionStyles);
    const variant = variantProp ?? styles?.variant ?? "default";
    const size = sizeProp ?? styles?.size ?? "md";
    const tone = toneProp ?? styles?.tone ?? "default";
    const initialOpen = useRef(defaultOpen);
    const lastUncontrolledOpen = useRef(open ?? defaultOpen ?? false);
    const controlled = open !== undefined && onOpenChange !== undefined;

    return (
      <AccordionStyles.Provider value={{ variant, size, tone }}>
        <details
          ref={ref}
          className={cn(
            "group border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] open:bg-[var(--sw-color-paper)]",
            variant === "compact" ? "shadow-[3px_3px_0_var(--sw-color-shadow)]" : "shadow-[5px_5px_0_var(--sw-color-shadow)]",
            className,
          )}
          open={open ?? initialOpen.current}
          onToggle={(event) => {
            const details = event.currentTarget;
            const nextOpen = details.open;
            onToggle?.(event);
            if (controlled) {
              if (nextOpen === open) return;
              details.open = open;
            } else {
              if (nextOpen === lastUncontrolledOpen.current) return;
              lastUncontrolledOpen.current = nextOpen;
            }
            onOpenChange?.(nextOpen);
          }}
          {...swirskiAttrs("accordion-item", { size, tone, variant })}
          {...props}
        />
      </AccordionStyles.Provider>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = {
  children?: ReactNode;
  variant?: AccordionVariant;
  size?: AccordionSize;
  tone?: AccordionTone;
} & HTMLAttributes<HTMLElement>;

const triggerSizeStyles: Record<AccordionSize, string> = {
  sm: "px-4 py-3 text-sm",
  md: "px-5 py-4",
  lg: "px-6 py-5 text-lg",
};

export const AccordionTrigger = forwardRef<HTMLElement, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      children,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const styles = useContext(AccordionStyles);
    const variant = variantProp ?? styles?.variant ?? "default";
    const size = sizeProp ?? styles?.size ?? "md";
    const tone = toneProp ?? styles?.tone ?? "default";
    return (
      <summary
        ref={ref}
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 font-black uppercase outline-none marker:hidden [&::-webkit-details-marker]:hidden",
          focusVisibleStyles,
          triggerSizeStyles[size],
          className,
        )}
        {...swirskiAttrs("accordion-trigger", { size, tone, variant })}
        {...props}
      >
        <span>{children}</span>
        <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center border-2 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)] leading-none sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] group-open:rotate-45">
          +
        </span>
      </summary>
    );
  },
);

AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = {
  variant?: AccordionVariant;
  size?: AccordionSize;
  tone?: AccordionTone;
} & HTMLAttributes<HTMLDivElement>;

const contentSizeStyles: Record<AccordionSize, string> = {
  sm: "px-4 py-3 text-xs leading-5",
  md: "px-5 py-4 text-sm leading-6",
  lg: "px-6 py-5 text-base leading-7",
};

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(function AccordionContent(
  { className, variant: variantProp, size: sizeProp, tone: toneProp, ...props },
  ref,
) {
  const styles = useContext(AccordionStyles);
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";
  return (
    <div
      ref={ref}
      className={cn(
        "border-t-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] font-bold text-[color:var(--sw-color-muted)]",
        contentSizeStyles[size],
        className,
      )}
      {...swirskiAttrs("accordion-content", { size, tone, variant })}
      {...props}
    />
  );
});

AccordionContent.displayName = "AccordionContent";
