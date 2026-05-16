import { forwardRef, type ReactNode } from "react";
import { swirskiAttrs } from "../../system";
import { Title } from "../typography";
import type { TitleOrder, TitleProps, TitleSize } from "../typography";

export type HeroTitleProps = {
  children?: ReactNode;
  order?: TitleOrder;
  size?: TitleSize;
} & TitleProps;

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  function HeroTitle({
    children,
    className,
    order = 1,
    size = "display",
    variant = "default",
    tone = "default",
    ...props
  }, ref) {
  return (
    <Title
      ref={ref}
      order={order}
      size={size}
      variant={variant}
      tone={tone}
      className={className}
      {...swirskiAttrs("hero-title", { size, tone, variant })}
      {...props}
    >
      {children}
    </Title>
  );
  },
);

HeroTitle.displayName = "HeroTitle";
