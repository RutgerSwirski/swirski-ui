import { HTMLAttributes, ReactNode, forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";

export type SectionLabelVariant = "default" | "flat";
export type SectionLabelSize = "sm" | "md" | "lg";
export type SectionLabelTone = "yellow" | "white" | "blue" | "red";

export type SectionLabelProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: SectionLabelVariant;
  size?: SectionLabelSize;
  tone?: SectionLabelTone;
} & HTMLAttributes<HTMLHeadingElement>;

const sizeStyles: Record<SectionLabelSize, string> = {
  sm: "px-3 py-1 text-2xl",
  md: "px-4 py-2 text-4xl",
  lg: "px-5 py-3 text-5xl",
};

const toneStyles: Record<SectionLabelTone, string> = {
  yellow: "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)]",
  white: "bg-white text-black",
  blue: "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
  red: "bg-[var(--sw-color-red)] text-[color:var(--sw-color-on-red)]",
};

export const SectionLabel = forwardRef<HTMLHeadingElement, SectionLabelProps>(
  function SectionLabel(
    {
      asChild = false,
      children,
      className,
      variant = "default",
      size = "md",
      tone = "yellow",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "h2";

    return (
      <Component
        ref={ref}
        className={cn(
          "w-fit -rotate-2 border-4 border-black font-[family-name:var(--sw-font-display)] uppercase tracking-wide",
          sizeStyles[size],
          toneStyles[tone],
          variant === "default" && "shadow-[4px_4px_0_#0B0B0C]",
          className,
        )}
        {...swirskiAttrs("section-label", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
) as unknown as PolymorphicComponent<SectionLabelProps, HTMLHeadingElement>;

SectionLabel.displayName = "SectionLabel";
