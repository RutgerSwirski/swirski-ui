import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type LoaderVariant = "spinner";
export type LoaderTone = "blue" | "yellow" | "red" | "black";
export type LoaderSize = "sm" | "md" | "lg";

export type LoaderProps = {
  variant?: LoaderVariant;
  tone?: LoaderTone;
  size?: LoaderSize;
} & HTMLAttributes<HTMLSpanElement>;

const sizeStyles: Record<LoaderSize, string> = {
  sm: "size-5 border-[3px]",
  md: "size-8 border-4",
  lg: "size-12 border-4",
};

const toneStyles: Record<LoaderTone, string> = {
  blue: "border-r-[#FFD400] border-t-[#0057FF]",
  yellow: "border-r-[#0057FF] border-t-[#FFD400]",
  red: "border-r-[#FFD400] border-t-[#FF3131]",
  black: "border-r-[#FFD400] border-t-[#0B0B0C]",
};

export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader({
  variant = "spinner",
  tone = "blue",
  size = "md",
  className,
  ...props
}, ref) {
  return (
    <span
      ref={ref}
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin border-black",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      role="status"
      {...swirskiAttrs("loader", { size, tone, variant })}
      {...props}
    />
  );
});

Loader.displayName = "Loader";
