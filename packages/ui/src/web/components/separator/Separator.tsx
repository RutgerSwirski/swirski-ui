import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type SeparatorVariant = "solid" | "dashed";
export type SeparatorSize = "sm" | "md" | "lg";
export type SeparatorTone = "black" | "muted" | "white";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  variant?: SeparatorVariant;
  size?: SeparatorSize;
  tone?: SeparatorTone;
} & HTMLAttributes<HTMLDivElement>;

const horizontalSizeStyles: Record<SeparatorSize, string> = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-2",
};

const verticalSizeStyles: Record<SeparatorSize, string> = {
  sm: "w-0.5",
  md: "w-1",
  lg: "w-2",
};

const toneStyles: Record<SeparatorTone, string> = {
  black: "bg-black",
  muted: "bg-black/25",
  white: "bg-white",
};

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    {
      orientation = "horizontal",
      variant = "solid",
      size = "md",
      tone = "black",
      className,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          toneStyles[tone],
          variant === "dashed" && "bg-none border-black",
          orientation === "horizontal"
            ? cn(
                "w-full",
                horizontalSizeStyles[size],
                variant === "dashed" && "border-t-4",
              )
            : cn(
                "h-full min-h-8",
                verticalSizeStyles[size],
                variant === "dashed" && "border-l-4",
              ),
          className,
        )}
        role="separator"
        aria-orientation={orientation}
        {...swirskiAttrs("separator", { size, tone, variant })}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";
