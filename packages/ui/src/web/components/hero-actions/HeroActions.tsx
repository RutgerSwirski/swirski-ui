import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type HeroActionsVariant = "default" | "compact";
export type HeroActionsSize = "sm" | "md" | "lg";
export type HeroActionsTone = "default";

export type HeroActionsProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: HeroActionsVariant;
  size?: HeroActionsSize;
  tone?: HeroActionsTone;
} & HTMLAttributes<HTMLDivElement>;

const gapStyles: Record<HeroActionsSize, string> = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-6",
};

export const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  function HeroActions(
    {
      asChild = false,
      children,
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
          "mt-9 flex flex-wrap items-center",
          gapStyles[size],
          className,
        )}
        {...swirskiAttrs("hero-actions", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

HeroActions.displayName = "HeroActions";
