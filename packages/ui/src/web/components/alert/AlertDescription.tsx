import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type AlertDescriptionVariant = "default";
export type AlertDescriptionSize = "sm" | "md" | "lg";
export type AlertDescriptionTone = "default";

export type AlertDescriptionProps = {
  variant?: AlertDescriptionVariant;
  size?: AlertDescriptionSize;
  tone?: AlertDescriptionTone;
} & HTMLAttributes<HTMLParagraphElement>;

const sizeStyles: Record<AlertDescriptionSize, string> = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
};

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(function AlertDescription(
  { className, variant = "default", size = "md", tone = "default", ...props },
  ref,
) {
  return (
    <p
      ref={ref}
      className={cn("mt-3 font-bold", sizeStyles[size], className)}
      {...swirskiAttrs("alert-description", { size, tone, variant })}
      {...props}
    />
  );
});

AlertDescription.displayName = "AlertDescription";
