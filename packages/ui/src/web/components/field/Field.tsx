import { HTMLAttributes, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type FieldVariant = "default" | "inline";
export type FieldSize = "sm" | "md" | "lg";
export type FieldTone = "default";

export type FieldProps = {
  asChild?: boolean;
  variant?: FieldVariant;
  size?: FieldSize;
  tone?: FieldTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<FieldSize, string> = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    asChild = false,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn(
        variant === "inline" ? "flex items-center gap-3" : "grid",
        sizeStyles[size],
        className,
      )}
      {...swirskiAttrs("field", { size, tone, variant })}
      {...props}
    />
  );
});

Field.displayName = "Field";
