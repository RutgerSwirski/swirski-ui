"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { useFieldControl } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type InputVariant = "default" | "filled";
export type InputSize = "sm" | "md" | "lg";
export type InputTone = "default" | "danger";

export type InputProps = {
  variant?: InputVariant;
  /** Visual input height and padding. Defaults to md. */
  size?: InputSize;
  /** Border treatment. Use danger for error styling and aria-invalid for validation semantics. */
  tone?: InputTone;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">;

const sizeStyles: Record<InputSize, string> = {
  sm: "h-10 px-3 text-sm",
  md: "h-12 px-4 text-base",
  lg: "h-14 px-5 text-lg",
};

const toneStyles: Record<InputTone, string> = {
  default: "border-[color:var(--sw-color-ink)]",
  danger: "border-[color:var(--sw-color-red)]",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = "default", size: sizeProp, tone: toneProp, ...props },
    ref,
  ) => {
    const { size: inheritedSize, readOnly, ...field } = useFieldControl(props);
    const size = sizeProp ?? inheritedSize ?? "md";
    const invalid = field["aria-invalid"] !== undefined && field["aria-invalid"] !== false && field["aria-invalid"] !== "false";
    const tone = toneProp ?? (invalid ? "danger" : "default");
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border-[length:var(--sw-border-width)] font-bold text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none sw-motion-shift transition-all duration-[var(--sw-motion-fast,150ms)] placeholder:text-[color:var(--sw-color-muted)] hover:shadow-[6px_6px_0_var(--sw-color-shadow)] focus:-translate-y-0.5 focus:shadow-[6px_6px_0_var(--sw-color-focus)] focus:hover:shadow-[6px_6px_0_var(--sw-color-focus)] disabled:cursor-not-allowed disabled:bg-[var(--sw-color-paper)] disabled:text-[color:var(--sw-color-muted)] read-only:bg-[var(--sw-color-paper)] disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
          variant === "default"
            ? "bg-[var(--sw-color-surface)]"
            : "bg-[var(--sw-color-paper)]",
          sizeStyles[size],
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("input", { size, tone, variant })}
        {...props}
          {...field}
          readOnly={readOnly}
      />
    );
  },
);

Input.displayName = "Input";
