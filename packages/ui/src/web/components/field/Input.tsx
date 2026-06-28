import { forwardRef, InputHTMLAttributes } from "react";
import { cn, swirskiAttrs } from "../../system";

export type InputVariant = "default" | "filled";
export type InputSize = "sm" | "md" | "lg";
export type InputTone = "default" | "danger";

export type InputProps = {
  variant?: InputVariant;
  size?: InputSize;
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
    { className, variant = "default", size = "md", tone = "default", ...props },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border-[length:var(--sw-border-width)] font-bold text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 placeholder:text-neutral-500 hover:shadow-[6px_6px_0_var(--sw-color-shadow)] focus:-translate-y-0.5 focus:shadow-[6px_6px_0_var(--sw-color-focus)] focus:hover:shadow-[6px_6px_0_var(--sw-color-focus)] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
          variant === "default"
            ? "bg-[var(--sw-color-surface)]"
            : "bg-[var(--sw-color-paper)]",
          sizeStyles[size],
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("input", { size, tone, variant })}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
