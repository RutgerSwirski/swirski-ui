import { HTMLAttributes, forwardRef } from "react";
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
  danger: "text-[var(--sw-color-red)]",
  default: "text-[var(--sw-color-ink)]",
};

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  function FieldError(
    { className, variant = "default", size = "md", tone = "danger", ...props },
    ref,
  ) {
  return (
    <p
      ref={ref}
      className={cn(
        variant === "default" && "font-black",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      {...swirskiAttrs("field-error", { size, tone, variant })}
      {...props}
    />
  );
  },
);

FieldError.displayName = "FieldError";
