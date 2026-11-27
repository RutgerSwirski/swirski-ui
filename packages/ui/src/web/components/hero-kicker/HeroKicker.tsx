import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type HeroKickerVariant = "default" | "flat";
export type HeroKickerSize = "sm" | "md" | "lg";
export type HeroKickerTone = "yellow" | "white" | "blue" | "red";

export type HeroKickerProps = {
  asChild?: boolean;
  children?: ReactNode;
  /** Badge treatment. Use flat to remove the shadow. */
  variant?: HeroKickerVariant;
  /** Label size and padding. Defaults to md. */
  size?: HeroKickerSize;
  /** Badge color. Defaults to yellow. */
  tone?: HeroKickerTone;
} & HTMLAttributes<HTMLParagraphElement>;

const sizeStyles: Record<HeroKickerSize, string> = {
  sm: "px-3 py-1 text-lg",
  md: "px-4 py-1 text-xl md:text-2xl",
  lg: "px-5 py-2 text-2xl md:text-3xl",
};

const toneStyles: Record<HeroKickerTone, string> = {
  yellow: "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
  white: "bg-white text-black",
  blue: "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
  red: "bg-[var(--sw-color-red)] text-[color:var(--sw-color-on-red)]",
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
          "mb-5 inline-block w-fit -rotate-3 border-3 border-black font-[family-name:var(--sw-font-display)] uppercase tracking-wide",
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
