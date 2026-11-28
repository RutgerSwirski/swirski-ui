"use client";

import { HTMLAttributes, forwardRef, useContext, useId } from "react";
import { FieldContext, useFieldPart } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type FieldErrorVariant = "default" | "plain";
export type FieldErrorSize = "sm" | "md";
export type FieldErrorTone = "danger" | "default";

export type FieldErrorProps = {
  variant?: FieldErrorVariant;
  size?: FieldErrorSize;
  tone?: FieldErrorTone;
} & HTMLAttributes<HTMLParagraphElement>;

const sizeStyles: Record<FieldErrorSize, string> = {
  sm: "text-xs leading-5",
  md: "text-sm leading-5",
};

const toneStyles: Record<FieldErrorTone, string> = {
  danger: "text-[color:var(--sw-color-red-text)]",
  default: "text-[var(--sw-color-ink)]",
};

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  function FieldError(
    { className, children, id, variant = "default", size: sizeProp, tone = "danger", ...props },
    ref,
  ) {
    const field = useContext(FieldContext);
    const generatedId = useId();
    const partId = id ?? (field ? generatedId : undefined);
    useFieldPart("error", children === undefined || children === null || children === "" || children === false ? undefined : partId);
    const size = sizeProp ?? (field?.size === "sm" ? "sm" : "md");
    return (
      <p
        ref={ref}
        id={partId}
        className={cn(
          variant === "default" && "font-black",
          sizeStyles[size],
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("field-error", { size, tone, variant })}
        {...props}
      >
        {children}
      </p>
    );
  },
);

FieldError.displayName = "FieldError";
