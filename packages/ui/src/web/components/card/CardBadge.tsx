import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardBadgeTone = "white" | "yellow" | "blue" | "red" | "black";
export type CardBadgeVariant = "solid" | "outline";
export type CardBadgeSize = "sm" | "md";
export type CardBadgePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type CardBadgeProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: CardBadgeVariant;
  size?: CardBadgeSize;
  tone?: CardBadgeTone;
  position?: CardBadgePosition;
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

const positionStyles: Record<CardBadgePosition, string> = {
  "top-left": "left-3 top-3",
  "top-right": "right-3 top-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
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
      position = "top-left",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "span";

    return (
      <Component
        ref={ref}
        className={cn(
          "absolute z-20 inline-flex w-fit max-w-[calc(100%-1.5rem)] -rotate-3 items-center border-2 border-black font-anton uppercase tracking-normal shadow-[2px_2px_0_#0B0B0C]",
          positionStyles[position],
          variant === "solid"
            ? toneStyles[tone]
            : "bg-transparent text-current",
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
