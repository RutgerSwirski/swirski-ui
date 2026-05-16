import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type ProgressVariant = "solid" | "striped";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressTone = "blue" | "yellow" | "red" | "black";

export type ProgressProps = {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  tone?: ProgressTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-3",
  md: "h-6",
  lg: "h-8",
};

const toneStyles: Record<ProgressTone, string> = {
  blue: "bg-[#0057FF]",
  yellow: "bg-[#FFD400]",
  red: "bg-[#FF3131]",
  black: "bg-[#0B0B0C]",
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({
  value = 0,
  max = 100,
  variant = "solid",
  size = "md",
  tone = "blue",
  className,
  ...props
}, ref) {
  const safeMax = max <= 0 ? 100 : max;
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden border-4 border-black bg-white", sizeStyles[size], className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      {...swirskiAttrs("progress", { size, tone, variant })}
      {...props}
    >
      <div
        className={cn(
          "h-full",
          toneStyles[tone],
          variant === "striped" &&
            "bg-[repeating-linear-gradient(45deg,currentColor_0,currentColor_6px,transparent_6px,transparent_12px)]",
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";
