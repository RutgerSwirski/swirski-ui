import {
  DetailsHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { Slot, cn, focusVisibleStyles, swirskiAttrs } from "../../system";

export type AccordionVariant = "default" | "compact";
export type AccordionSize = "sm" | "md" | "lg";
export type AccordionTone = "default";

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
      <Component
        ref={ref}
        className={cn("grid", gapStyles[size], className)}
        {...swirskiAttrs("accordion", { size, tone, variant })}
        {...props}
      />
    );
  },
);

Accordion.displayName = "Accordion";

export type AccordionItemProps = {
  variant?: AccordionVariant;
  size?: AccordionSize;
  tone?: AccordionTone;
} & DetailsHTMLAttributes<HTMLDetailsElement>;

export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  function AccordionItem(
    { className, variant = "default", size = "md", tone = "default", ...props },
    ref,
  ) {
  return (
    <details
      ref={ref}
      className={cn(
        "group border-4 border-black bg-white shadow-[5px_5px_0_#0B0B0C] transition open:bg-[#F5F5F3]",
        variant === "compact" && "shadow-[3px_3px_0_#0B0B0C]",
        className,
      )}
      {...swirskiAttrs("accordion-item", { size, tone, variant })}
      {...props}
    />
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
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
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
      <span className="grid size-7 shrink-0 place-items-center border-2 border-black bg-[#FFD400] leading-none transition group-open:rotate-45">
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

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent(
    { className, variant = "default", size = "md", tone = "default", ...props },
    ref,
  ) {
  return (
    <div
      ref={ref}
      className={cn(
        "border-t-4 border-black font-bold text-neutral-700",
        contentSizeStyles[size],
        className,
      )}
      {...swirskiAttrs("accordion-content", { size, tone, variant })}
      {...props}
    />
  );
  },
);

AccordionContent.displayName = "AccordionContent";
