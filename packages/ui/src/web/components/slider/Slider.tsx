import { InputHTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type SliderVariant = "default";
export type SliderSize = "sm" | "md" | "lg";
export type SliderTone = "blue" | "yellow" | "red";

export type SliderProps = {
  variant?: SliderVariant;
  size?: SliderSize;
  tone?: SliderTone;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "color">;

const sizeStyles: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const toneStyles: Record<SliderTone, string> = {
  blue: "accent-[#0057FF]",
  yellow: "accent-[#FFD400]",
  red: "accent-[#FF3131]",
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, variant = "default", size = "md", tone = "blue", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn("w-full", sizeStyles[size], toneStyles[tone], className)}
      type="range"
      {...swirskiAttrs("slider", { size, tone, variant })}
      {...props}
    />
  );
});

Slider.displayName = "Slider";
