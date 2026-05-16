"use client";

import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type RadioGroupVariant = "default" | "card";
export type RadioGroupSize = "sm" | "md" | "lg";
export type RadioGroupTone = "yellow" | "blue" | "red";

export type RadioGroupOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: RadioGroupVariant;
  size?: RadioGroupSize;
  tone?: RadioGroupTone;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange" | "size" | "color"
> &
  Record<never, never>;

const controlSizeStyles: Record<RadioGroupSize, string> = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
};

const dotSizeStyles: Record<RadioGroupSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

const toneStyles: Record<RadioGroupTone, string> = {
  yellow: "peer-checked:bg-[#FFD400]",
  blue: "peer-checked:bg-[#0057FF]",
  red: "peer-checked:bg-[#FF3131]",
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  variant = "default",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  return (
    <div
      ref={ref}
      className={cn("grid gap-3", className)}
      role="radiogroup"
      {...swirskiAttrs("radio-group", { size, tone, variant })}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "group inline-flex w-fit items-start gap-3",
            variant === "card" && "border-4 border-black bg-white p-3 shadow-[4px_4px_0_#0B0B0C]",
            option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          )}
          data-swirski-radio-option={option.value}
        >
          <span className={cn("relative mt-0.5 grid shrink-0 place-items-center", controlSizeStyles[size])}>
            <input
              className="peer sr-only"
              defaultChecked={defaultValue === option.value}
              checked={value === undefined ? undefined : value === option.value}
              disabled={option.disabled}
              name={name}
              onChange={() => onValueChange?.(option.value)}
              type="radio"
              value={option.value}
              {...swirskiAttrs("radio-group-input", { size, tone, variant })}
              {...props}
            />
            <span className={cn("absolute inset-0 rounded-full border-4 border-black bg-white shadow-[3px_3px_0_#0B0B0C]", toneStyles[tone])} />
            <span className={cn("relative hidden rounded-full bg-black peer-checked:block", dotSizeStyles[size])} />
          </span>
          <span className="grid gap-1">
            <span className="font-black leading-5">{option.label}</span>
            {option.description && (
              <span className="text-sm font-bold leading-5 text-neutral-600">
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
  },
);

RadioGroup.displayName = "RadioGroup";
