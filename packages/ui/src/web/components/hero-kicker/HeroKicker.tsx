import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type HeroKickerVariant = "default" | "flat";
export type HeroKickerSize = "sm" | "md" | "lg";
export type HeroKickerTone = "yellow" | "white" | "blue" | "red";

export type HeroKickerProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: HeroKickerVariant;
  size?: HeroKickerSize;
  tone?: HeroKickerTone;
} & HTMLAttributes<HTMLParagraphElement>;

const sizeStyles: Record<HeroKickerSize, string> = {
  sm: "px-3 py-1 text-lg",
  md: "px-4 py-1 text-xl md:text-2xl",
  lg: "px-5 py-2 text-2xl md:text-3xl",
};

const toneStyles: Record<HeroKickerTone, string> = {
  yellow: "bg-[#FFD400] text-black",
  white: "bg-white text-black",
  blue: "bg-[#0057FF] text-white",
  red: "bg-[#FF3131] text-white",
};

export const HeroKicker = forwardRef<HTMLParagraphElement, HeroKickerProps>(
  function HeroKicker(
    {
      asChild = false,
      children,
      className,
      variant = "default",
      size = "md",
      tone = "yellow",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "p";

    return (
      <Component
        ref={ref}
        className={cn(
          "mb-5 inline-block w-fit -rotate-3 border-3 border-black font-bangers uppercase tracking-wide",
          sizeStyles[size],
          toneStyles[tone],
          variant === "default" && "shadow-[3px_3px_0_#0B0B0C]",
          className,
        )}
        {...swirskiAttrs("hero-kicker", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

HeroKicker.displayName = "HeroKicker";
