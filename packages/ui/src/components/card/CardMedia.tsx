import { CSSProperties, HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardMediaVariant = "default" | "flush";
export type CardMediaSize = "sm" | "md" | "lg";

export type CardMediaProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: CardMediaVariant;
  size?: CardMediaSize;
  aspect?: string; // "4/3", "4/5"
} & Omit<HTMLAttributes<HTMLDivElement>, "color">;

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  function CardMedia(
    {
      asChild = false,
      children,
      className,
      aspect = "4/3",
      variant = "default",
      size = "md",
      style,
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-white",
          variant === "default" && "border-b-4 border-black",
          className,
        )}
        style={{ aspectRatio: aspect, ...(style as CSSProperties | undefined) }}
        {...swirskiAttrs("card-media", { size, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardMedia.displayName = "CardMedia";
