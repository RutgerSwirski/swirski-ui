import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardVariant = "elevated" | "flat" | "outline";
export type CardSize = "sm" | "md" | "lg";
export type CardTone = "default" | "white" | "yellow" | "blue" | "black";

export type CardProps = {
  asChild?: boolean;
  children?: ReactNode;
  interactive?: boolean;
  withShadow?: boolean;
  variant?: CardVariant;
  size?: CardSize;
  tone?: CardTone;
} & HTMLAttributes<HTMLElement>;

const base =
  "group relative min-w-0 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] text-[var(--sw-color-ink)]";

const shadowStyles: Record<CardSize, string> = {
  sm: "shadow-[4px_4px_0_var(--sw-color-shadow)]",
  md: "shadow-[8px_8px_0_var(--sw-color-shadow)]",
  lg: "shadow-[12px_12px_0_var(--sw-color-shadow)]",
};

const toneStyles: Record<CardTone, string> = {
  default: "bg-[var(--sw-color-paper)]",
  white: "bg-[var(--sw-color-surface)]",
  yellow: "bg-[var(--sw-color-yellow)]",
  blue: "bg-[var(--sw-color-blue)] text-white",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

const variantStyles: Record<CardVariant, string> = {
  elevated: "",
  flat: "shadow-none",
  outline: "bg-transparent shadow-none",
};

const interactiveStyles =
  "transition-all duration-150 hover:-translate-y-2 active:translate-y-2";

const interactiveShadowStyles =
  "hover:shadow-[12px_12px_0_var(--sw-color-shadow)] active:shadow-[4px_4px_0_var(--sw-color-shadow)]";

export const Card = forwardRef<HTMLElement, CardProps>(function Card({
  asChild = false,
  children,
  className,
  interactive = true,
  variant = "elevated",
  size = "md",
  tone = "default",
  withShadow,
  ...props
}, ref) {
  const Component = asChild ? Slot : "article";
  const resolvedWithShadow = withShadow ?? variant === "elevated";

  return (
    <Component
      ref={ref}
      className={cn(
        base,
        toneStyles[tone],
        variantStyles[variant],
        resolvedWithShadow && shadowStyles[size],
        interactive && interactiveStyles,
        interactive && resolvedWithShadow && interactiveShadowStyles,
        className,
      )}
      {...swirskiAttrs("card", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";
