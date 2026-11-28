import { HTMLAttributes, forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";

export type AlertTone = "blue" | "yellow" | "red" | "white";
export type AlertVariant = "solid" | "outline" | "soft";
export type AlertSize = "sm" | "md" | "lg";

export type AlertProps = {
  asChild?: boolean;
  variant?: AlertVariant;
  size?: AlertSize;
  tone?: AlertTone;
} & HTMLAttributes<HTMLDivElement>;

const toneStyles: Record<AlertTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
  yellow: "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
  red: "bg-[var(--sw-color-red)] text-[color:var(--sw-color-on-red)]",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
};

const outlineToneStyles: Record<AlertTone, string> = {
  blue: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-blue-text)]",
  yellow: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-red-text)]",
  white:
    "bg-transparent text-[color:var(--sw-color-ink)] border-[color:var(--sw-color-ink)]",
};

const softToneStyles: Record<AlertTone, string> = {
  blue: "bg-[var(--sw-color-blue)]/10 text-[var(--sw-color-ink)]",
  yellow: "bg-[var(--sw-color-yellow)]/30 text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-red)]/10 text-[var(--sw-color-ink)]",
  white: "bg-[var(--sw-color-surface)] text-[color:var(--sw-color-ink)]",
};

const sizeStyles: Record<AlertSize, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    asChild = false,
    variant = "solid",
    size = "md",
    tone = "yellow",
    className,
    children,
    role = "status",
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      role={role}
      className={cn(
        "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] shadow-[var(--sw-shadow-md)]",
        sizeStyles[size],
        variant === "solid" && toneStyles[tone],
        variant === "outline" && outlineToneStyles[tone],
        variant === "soft" && softToneStyles[tone],
        className,
      )}
      {...swirskiAttrs("alert", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
}) as unknown as PolymorphicComponent<AlertProps, HTMLDivElement>;

Alert.displayName = "Alert";
