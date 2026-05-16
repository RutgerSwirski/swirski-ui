import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardBadgeTone = "white" | "yellow" | "blue" | "red" | "black";
export type CardBadgeVariant = "solid" | "outline";
export type CardBadgeSize = "sm" | "md";

export type CardBadgeProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: CardBadgeVariant;
  size?: CardBadgeSize;
  tone?: CardBadgeTone;
} & Omit<HTMLAttributes<HTMLSpanElement>, "color">;

const toneStyles: Record<CardBadgeTone, string> = {
  white: "bg-white text-black",
  yellow: "bg-[#FFD400] text-black",
  blue: "bg-[#0057FF] text-white",
  red: "bg-[#FF3131] text-white",
  black: "bg-[#0B0B0C] text-white",
};

const sizeStyles: Record<CardBadgeSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1.5 text-base",
};

export const CardBadge = forwardRef<HTMLSpanElement, CardBadgeProps>(
  function CardBadge(
    {
      asChild = false,
      children,
      className,
      variant = "solid",
      size = "sm",
      tone = "white",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "span";

    return (
      <Component
        ref={ref}
        className={cn(
          "absolute left-3 top-3 z-20 -rotate-3 border-2 border-black font-anton uppercase tracking-normal shadow-[2px_2px_0_#0B0B0C]",
          variant === "solid" ? toneStyles[tone] : "bg-transparent text-current",
          sizeStyles[size],
          className,
        )}
        {...swirskiAttrs("card-badge", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardBadge.displayName = "CardBadge";
