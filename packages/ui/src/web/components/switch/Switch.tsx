"use client";

import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";
import { useFieldControl } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type SwitchVariant = "default" | "card";
export type SwitchSize = "sm" | "md" | "lg";
export type SwitchTone = "blue" | "yellow" | "red";

export type SwitchProps = {
  label?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  variant?: SwitchVariant;
  size?: SwitchSize;
  tone?: SwitchTone;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "color">;

const trackSizeStyles: Record<SwitchSize, string> = {
  sm: "h-7 w-12",
  md: "h-8 w-14",
  lg: "h-9 w-16",
};

const thumbSizeStyles: Record<SwitchSize, string> = {
  sm: "size-3 peer-checked:translate-x-5",
  md: "size-4 peer-checked:translate-x-6",
  lg: "size-5 peer-checked:translate-x-7",
};

const toneStyles: Record<SwitchTone, string> = {
  blue: "peer-checked:bg-[var(--sw-color-blue)]",
  yellow: "peer-checked:bg-[var(--sw-color-yellow)]",
  red: "peer-checked:bg-[var(--sw-color-red)]",
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    label,
    description,
    className,
    containerClassName,
    inputClassName,
    variant = "default",
    size: sizeProp,
    tone = "blue",
    ...props
  },
  ref,
) {
  const { size: inheritedSize, readOnly: _readOnly, ...field } = useFieldControl(props, "composite");
  const size = sizeProp ?? inheritedSize ?? "md";
  const { disabled } = field;
  const descriptionId = useId();
  const labelId = useId();
  const describedBy = [field["aria-describedby"], description ? descriptionId : undefined].filter(Boolean).join(" ") || undefined;
  return (
    <label
      className={cn(
        "group inline-flex w-fit items-center gap-3",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        variant === "card" &&
          "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-3 shadow-[4px_4px_0_var(--sw-color-shadow)]",
        containerClassName,
        className,
      )}
      {...swirskiAttrs("switch", { size, tone, variant })}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] shadow-[4px_4px_0_var(--sw-color-shadow)] sw-motion-shift transition duration-[var(--sw-motion-fast,150ms)] group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none",
          trackSizeStyles[size],
        )}
      >
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          className={cn("peer sr-only", inputClassName)}
          {...swirskiAttrs("switch-input", { size, tone, variant })}
          {...props}
          {...field}
          aria-labelledby={field["aria-labelledby"] ?? (label && !props["aria-label"] ? labelId : undefined)}
          aria-describedby={describedBy}
        />
        <span
          className={cn(
            "absolute inset-0 bg-[var(--sw-color-surface)] sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] peer-focus-visible:shadow-[0_0_0_3px_var(--sw-color-focus)]",
            toneStyles[tone],
            "peer-aria-invalid:outline-2 peer-aria-invalid:outline-[color:var(--sw-color-red)]",
          )}
        />
        <span
          className={cn(
            "relative ml-1 border-2 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] peer-checked:bg-[var(--sw-color-surface)]",
            thumbSizeStyles[size],
          )}
        />
      </span>
      {(label || description) && (
        <span className="grid gap-1">
          {label && <span id={labelId} className="font-black leading-5">{label}</span>}
          {description && (
            <span id={descriptionId} className="text-sm font-bold leading-5 text-[color:var(--sw-color-muted)]">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

Switch.displayName = "Switch";
