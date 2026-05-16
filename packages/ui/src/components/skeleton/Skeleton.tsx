import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type SkeletonVariant = "default" | "text";
export type SkeletonSize = "sm" | "md" | "lg";
export type SkeletonTone = "default" | "muted";

export type SkeletonProps = {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  tone?: SkeletonTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<SkeletonSize, string> = {
  sm: "min-h-4",
  md: "min-h-6",
  lg: "min-h-10",
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { className, variant = "default", size = "md", tone = "default", ...props },
    ref,
  ) {
  return (
    <div
      ref={ref}
      className={cn(
        "animate-pulse border-4 border-black bg-neutral-200 shadow-[4px_4px_0_#0B0B0C]",
        variant === "text" && "h-4",
        sizeStyles[size],
        className,
      )}
      {...swirskiAttrs("skeleton", { size, tone, variant })}
      {...props}
    />
  );
  },
);

Skeleton.displayName = "Skeleton";
