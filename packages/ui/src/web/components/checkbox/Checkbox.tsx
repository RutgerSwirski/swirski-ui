import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type CheckboxVariant = "default" | "card";
export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxTone = "yellow" | "blue" | "red";

export type CheckboxProps = {
  label?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  tone?: CheckboxTone;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "color">;

const boxSizeStyles: Record<CheckboxSize, string> = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
};

const checkSizeStyles: Record<CheckboxSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const toneStyles: Record<CheckboxTone, string> = {
  yellow: "peer-checked:bg-[var(--sw-color-yellow)]",
  blue: "peer-checked:bg-[var(--sw-color-blue)]",
  red: "peer-checked:bg-[var(--sw-color-red)]",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      className,
      containerClassName,
      inputClassName,
      disabled,
      variant = "default",
      size = "md",
      tone = "yellow",
      ...props
    },
    ref,
  ) {
    return (
      <label
        className={cn(
          "group inline-flex w-fit items-start gap-3",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          variant === "card" &&
            "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-3 shadow-[4px_4px_0_var(--sw-color-shadow)]",
          containerClassName,
          className,
        )}
        {...swirskiAttrs("checkbox", { size, tone, variant })}
      >
        <span
          className={cn(
            "relative mt-0.5 grid shrink-0 place-items-center",
            boxSizeStyles[size],
          )}
        >
          <input
            type="checkbox"
            ref={ref}
            className={cn("peer sr-only", inputClassName)}
            disabled={disabled}
            {...swirskiAttrs("checkbox-input", { size, tone, variant })}
            {...props}
          />
          <span
            className={cn(
              "absolute inset-0 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] shadow-[var(--sw-shadow-sm)] transition peer-focus-visible:shadow-[4px_4px_0_var(--sw-color-focus)]",
              toneStyles[tone],
            )}
          />
          <span
            className={cn(
              "relative hidden font-black leading-none text-black peer-checked:block",
              checkSizeStyles[size],
            )}
          >
            x
          </span>
        </span>
        {(label || description) && (
          <span className="grid gap-1">
            {label && <span className="font-black leading-5">{label}</span>}
            {description && (
              <span className="text-sm font-bold leading-5 text-neutral-600">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
