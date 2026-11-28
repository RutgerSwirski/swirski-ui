"use client";

import { HTMLAttributes, forwardRef, useContext, useId } from "react";
import { FieldContext, useFieldPart } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type FieldHintVariant = "default" | "plain";
export type FieldHintSize = "sm" | "md";
export type FieldHintTone = "muted" | "default";

export type FieldHintProps = {
  variant?: FieldHintVariant;
  size?: FieldHintSize;
  tone?: FieldHintTone;
} & HTMLAttributes<HTMLParagraphElement>;

const sizeStyles: Record<FieldHintSize, string> = {
  sm: "text-xs leading-5",
  md: "text-sm leading-5",
};

const toneStyles: Record<FieldHintTone, string> = {
  muted: "text-[var(--sw-color-muted)]",
  default: "text-[var(--sw-color-ink)]",
};

export const FieldHint = forwardRef<HTMLParagraphElement, FieldHintProps>(
  function FieldHint(
    { className, id, variant = "default", size: sizeProp, tone = "muted", ...props },
    ref,
  ) {
    const field = useContext(FieldContext);
    const generatedId = useId();
    const partId = id ?? (field ? generatedId : undefined);
    useFieldPart("description", partId);
    const size = sizeProp ?? (field?.size === "sm" ? "sm" : "md");
    return (
      <p
        ref={ref}
        id={partId}
        className={cn(
          variant === "default" && "font-bold",
          sizeStyles[size],
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("field-hint", { size, tone, variant })}
        {...props}
      />
    );
  },
);

FieldHint.displayName = "FieldHint";
