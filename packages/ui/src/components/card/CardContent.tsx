import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type CardContentSize = "sm" | "md" | "lg";
export type CardContentVariant = "default" | "flush";

export type CardContentProps = {
  asChild?: boolean;
  children?: ReactNode;
  size?: CardContentSize;
  variant?: CardContentVariant;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<CardContentSize, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(
    {
      asChild = false,
      children,
      className,
      size = "md",
      variant = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(variant === "default" && sizeStyles[size], className)}
        {...swirskiAttrs("card-content", { size, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

CardContent.displayName = "CardContent";
