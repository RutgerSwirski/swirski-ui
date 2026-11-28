import { HTMLAttributes, ReactNode, forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";

export type HeroActionsVariant = "default" | "compact";
export type HeroActionsSize = "sm" | "md" | "lg";
export type HeroActionsTone = "default";

export type HeroActionsProps = {
  asChild?: boolean;
  children?: ReactNode;
  /** Layout variant for CSS targeting. Use size to change the built-in gap. */
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: HeroActionsVariant;
  /** Gap between actions. Defaults to md. */
  size?: HeroActionsSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
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
) as unknown as PolymorphicComponent<HeroActionsProps, HTMLDivElement>;

HeroActions.displayName = "HeroActions";
