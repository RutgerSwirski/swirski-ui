import { HTMLAttributes, ReactNode, forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";

export type BadgeTone = "blue" | "yellow" | "red" | "white" | "black";
export type BadgeVariant = "solid" | "outline" | "soft";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  withShadow?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, "color">;

const toneStyles: Record<BadgeTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
  yellow: "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
  red: "bg-[var(--sw-color-red)] text-[color:var(--sw-color-on-red)]",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

const outlineToneStyles: Record<BadgeTone, string> = {
  blue: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-blue-text)]",
  yellow: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-red-text)]",
  white:
    "bg-transparent text-[color:var(--sw-color-ink)] border-[color:var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
};

const softToneStyles: Record<BadgeTone, string> = {
  blue: "bg-[var(--sw-color-blue)]/15 text-[color:var(--sw-color-blue-text)]",
  yellow: "bg-[var(--sw-color-yellow)]/35 text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-red)]/15 text-[color:var(--sw-color-red-text)]",
  white: "bg-[var(--sw-color-surface)]/25 text-[var(--sw-color-surface)]",
  black: "bg-[var(--sw-color-ink)]/10 text-[var(--sw-color-ink)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    asChild = false,
    children,
    variant = "solid",
    tone = "yellow",
    size = "md",
    className,
    withShadow = true,
    // position = "top-left",
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex w-fit items-center border-2 border-[color:var(--sw-color-ink)] font-black uppercase leading-none tracking-wide",
        variant === "solid" && toneStyles[tone],
        variant === "outline" && outlineToneStyles[tone],
        variant === "soft" && softToneStyles[tone],
        sizeStyles[size],
        withShadow && "shadow-(--sw-shadow-sm)",
        className,
      )}
      {...swirskiAttrs("badge", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
}) as unknown as PolymorphicComponent<BadgeProps, HTMLSpanElement>;

Badge.displayName = "Badge";
