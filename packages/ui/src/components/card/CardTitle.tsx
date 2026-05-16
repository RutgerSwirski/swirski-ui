import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardTitleSize = "sm" | "md" | "lg";
export type CardTitleTone = "default" | "muted" | "inverted";
export type CardTitleVariant = "default" | "plain";

export type CardTitleProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: CardTitleVariant;
  size?: CardTitleSize;
  tone?: CardTitleTone;
} & HTMLAttributes<HTMLHeadingElement>;

const sizeStyles: Record<CardTitleSize, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
};

const toneStyles: Record<CardTitleTone, string> = {
  default: "text-current",
  muted: "text-[var(--sw-color-muted)]",
  inverted: "text-white",
};

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle(
    {
      asChild = false,
      children,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "h3";

    return (
      <Component
        ref={ref}
        className={cn(
          "mt-3 font-anton uppercase tracking-normal",
          sizeStyles[size],
          toneStyles[tone],
          variant === "default" && "group-hover:underline",
          className,
        )}
        {...swirskiAttrs("card-title", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardTitle.displayName = "CardTitle";
