"use client";

import { InputHTMLAttributes, ReactNode, forwardRef, useEffect, useId, useMemo, useRef } from "react";
import { useFieldControl } from "../../system/field";
import { cn, composeRefs, swirskiAttrs } from "../../system";

export type CheckboxVariant = "default" | "card";
export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxTone = "yellow" | "blue" | "red";

export type CheckboxProps = {
  label?: ReactNode;
  /** Controlled native mixed state. It does not change the submitted checked value. */
  indeterminate?: boolean;
  /** Initial and reset mixed state for uncontrolled checkboxes. */
  defaultIndeterminate?: boolean;
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
  yellow: "peer-checked:bg-[var(--sw-color-yellow)] peer-indeterminate:bg-[var(--sw-color-yellow)]",
  blue: "peer-checked:bg-[var(--sw-color-blue)] peer-indeterminate:bg-[var(--sw-color-blue)]",
  red: "peer-checked:bg-[var(--sw-color-red)] peer-indeterminate:bg-[var(--sw-color-red)]",
};

const checkToneStyles: Record<CheckboxTone, string> = {
  yellow: "text-[color:var(--sw-color-on-yellow)]",
  blue: "text-[color:var(--sw-color-on-blue)]",
  red: "text-[color:var(--sw-color-on-red)]",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,
      indeterminate,
      defaultIndeterminate = false,
      onChange,
      className,
      containerClassName,
      inputClassName,
      variant = "default",
      size: sizeProp,
      tone = "yellow",
      ...props
    },
    ref,
  ) {
    const { size: inheritedSize, readOnly: _readOnly, ...field } = useFieldControl(props, "composite");
    const size = sizeProp ?? inheritedSize ?? "md";
    const { disabled } = field;
    const control = useRef<HTMLInputElement>(null);
    const mergedRef = useMemo(() => composeRefs(control, ref), [ref]);
    const initialMixed = useRef(defaultIndeterminate);
    const descriptionId = useId();
    const labelId = useId();
    const describedBy = [field["aria-describedby"], description ? descriptionId : undefined].filter(Boolean).join(" ") || undefined;

    useEffect(() => {
      if (control.current) control.current.indeterminate = initialMixed.current;
    }, []);
    useEffect(() => {
      if (control.current && indeterminate !== undefined) control.current.indeterminate = indeterminate;
    }, [indeterminate]);
    useEffect(() => {
      const input = control.current;
      if (!input) return;
      const reset = (event: Event) => {
        if (event.target !== input.form) return;
        queueMicrotask(() => {
          if (input.isConnected && !event.defaultPrevented) {
            input.indeterminate = indeterminate ?? initialMixed.current;
          }
        });
      };
      input.ownerDocument.addEventListener("reset", reset);
      return () => input.ownerDocument.removeEventListener("reset", reset);
    }, [indeterminate]);
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
            ref={mergedRef}
            className={cn("peer sr-only", inputClassName)}
            {...swirskiAttrs("checkbox-input", { size, tone, variant })}
            {...props}
            {...field}
            aria-labelledby={field["aria-labelledby"] ?? (label && !props["aria-label"] ? labelId : undefined)}
            aria-describedby={describedBy}
            onChange={(event) => {
              const input = event.currentTarget;
              if (indeterminate !== undefined) input.indeterminate = indeterminate;
              onChange?.(event);
            }}
          />
          <span
            className={cn(
              "absolute inset-0 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] shadow-[var(--sw-shadow-sm)] sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] peer-focus-visible:shadow-[4px_4px_0_var(--sw-color-focus)]",
              toneStyles[tone],
              "peer-aria-invalid:outline-2 peer-aria-invalid:outline-[color:var(--sw-color-red)]",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "relative hidden font-black leading-none peer-checked:block peer-indeterminate:hidden",
              checkSizeStyles[size],
              checkToneStyles[tone],
            )}
          >
            x
          </span>
          <span
            aria-hidden="true"
            className={cn("relative hidden font-black leading-none peer-indeterminate:block", checkSizeStyles[size], checkToneStyles[tone])}
          >
            −
          </span>
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
  },
);

Checkbox.displayName = "Checkbox";
