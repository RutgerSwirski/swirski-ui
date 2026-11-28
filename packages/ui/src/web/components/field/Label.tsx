"use client";

import { LabelHTMLAttributes, forwardRef, useContext, useId } from "react";
import { FieldContext, useFieldPart } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type LabelVariant = "default" | "plain";
export type LabelSize = "sm" | "md" | "lg";
export type LabelTone = "default" | "muted" | "danger";

export type LabelProps = {
  variant?: LabelVariant;
  size?: LabelSize;
  tone?: LabelTone;
} & LabelHTMLAttributes<HTMLLabelElement>;

const sizeStyles: Record<LabelSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const toneStyles: Record<LabelTone, string> = {
  default: "text-[var(--sw-color-ink)]",
  muted: "text-[var(--sw-color-muted)]",
  danger: "text-[color:var(--sw-color-red-text)]",
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, id, htmlFor, variant = "default", size: sizeProp, tone = "default", ...props },
  ref,
) {
  const field = useContext(FieldContext);
  const generatedId = useId();
  const partId = id ?? (field ? generatedId : undefined);
  useFieldPart("label", partId);
  const size = sizeProp ?? field?.size ?? "md";
  return (
    <label
      ref={ref}
      id={partId}
      htmlFor={htmlFor ?? (field?.labelable === false ? undefined : field?.explicitControlId ?? field?.controlId)}
      className={cn(
        variant === "default" && "font-black uppercase tracking-wide",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      {...swirskiAttrs("label", { size, tone, variant })}
      {...props}
    >
      {children}
      {field?.required && <span aria-hidden="true" className="ml-1 text-[color:var(--sw-color-red-text)]">*</span>}
    </label>
  );
});

Label.displayName = "Label";
