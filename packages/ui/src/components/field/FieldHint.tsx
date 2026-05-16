import { HTMLAttributes, forwardRef } from "react";
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
    { className, variant = "default", size = "md", tone = "muted", ...props },
    ref,
  ) {
  return (
    <p
      ref={ref}
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
