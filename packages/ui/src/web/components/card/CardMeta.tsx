import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardMetaSize = "sm" | "md";
export type CardMetaTone = "default" | "muted" | "inverted";
export type CardMetaVariant = "default" | "plain";

export type CardMetaProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: CardMetaVariant;
  size?: CardMetaSize;
  tone?: CardMetaTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<CardMetaSize, string> = {
  sm: "text-xs",
  md: "text-sm",
};

const toneStyles: Record<CardMetaTone, string> = {
  default: "text-current",
  muted: "text-[var(--sw-color-muted)]",
  inverted: "text-white",
};

export const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(
  function CardMeta(
    {
      asChild = false,
      children,
      className,
      variant = "default",
      size = "sm",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "mt-6 flex flex-wrap gap-x-4 gap-y-2 font-black uppercase",
          sizeStyles[size],
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("card-meta", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardMeta.displayName = "CardMeta";
