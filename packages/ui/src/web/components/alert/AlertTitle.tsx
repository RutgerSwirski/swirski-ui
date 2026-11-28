import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type AlertTitleVariant = "default";
export type AlertTitleSize = "sm" | "md" | "lg";
export type AlertTitleTone = "default";

export type AlertTitleProps = {
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  variant?: AlertTitleVariant;
  size?: AlertTitleSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: AlertTitleTone;
} & HTMLAttributes<HTMLHeadingElement>;

const sizeStyles: Record<AlertTitleSize, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  function AlertTitle(
    { className, variant = "default", size = "md", tone = "default", ...props },
    ref,
  ) {
    return (
      <h3
        ref={ref}
        className={cn(
          "font-[family-name:var(--sw-font-heading)] uppercase leading-none",
          sizeStyles[size],
          className,
        )}
        {...swirskiAttrs("alert-title", { size, tone, variant })}
        {...props}
      />
    );
  },
);

AlertTitle.displayName = "AlertTitle";
