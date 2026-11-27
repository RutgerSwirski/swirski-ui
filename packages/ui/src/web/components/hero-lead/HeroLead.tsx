import { forwardRef, type ReactNode } from "react";
import { cn, swirskiAttrs } from "../../system";
import { Text } from "../typography";
import type { TextProps, TextSize, TextTone, TextWeight } from "../typography";

export type HeroLeadProps = {
  children?: ReactNode;
  /** Visual text size. Defaults to lg. */
  size?: TextSize;
  /** Text color treatment. Defaults to muted. */
  tone?: TextTone;
  /** Font weight. Defaults to regular. */
  weight?: TextWeight;
} & TextProps;

export const HeroLead = forwardRef<HTMLElement, HeroLeadProps>(
  function HeroLead(
    {
      children,
      className,
      variant = "default",
      size = "lg",
      tone = "muted",
      weight = "regular",
      ...props
    },
    ref,
  ) {
    return (
      <Text
        ref={ref}
        size={size}
        tone={tone}
        weight={weight}
        variant={variant}
        className={cn("mt-6 max-w-xl", className)}
        {...swirskiAttrs("hero-lead", { size, tone, variant })}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

HeroLead.displayName = "HeroLead";
