"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { useFieldControl } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type SliderVariant = "default";
export type SliderSize = "sm" | "md" | "lg";
export type SliderTone = "blue" | "yellow" | "red";

export type SliderProps = {
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
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
  { className, variant = "default", size: sizeProp, tone = "blue", ...props },
  ref,
) {
  const { size: inheritedSize, readOnly: _readOnly, required: _required, ...field } = useFieldControl(props);
  const size = sizeProp ?? inheritedSize ?? "md";
  return (
    <input
      ref={ref}
      className={cn("w-full disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:outline-2 aria-invalid:outline-[color:var(--sw-color-red)]", sizeStyles[size], toneStyles[tone], className)}
      type="range"
      {...swirskiAttrs("slider", { size, tone, variant })}
      {...props}
      {...field}
    />
  );
});

Slider.displayName = "Slider";
