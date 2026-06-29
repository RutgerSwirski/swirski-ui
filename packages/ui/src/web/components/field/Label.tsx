import { LabelHTMLAttributes, forwardRef } from "react";
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
  danger: "text-[var(--sw-color-red)]",
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, variant = "default", size = "md", tone = "default", ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(
        variant === "default" && "font-black uppercase tracking-wide",
        sizeStyles[size],
        toneStyles[tone],
        className,
      )}
      {...swirskiAttrs("label", { size, tone, variant })}
      {...props}
    />
  );
});

Label.displayName = "Label";
