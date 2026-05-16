import { ElementType, HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleTone = "default" | "muted" | "inverted";
export type TitleVariant = "default" | "plain";

export type TitleProps = {
  as?: ElementType;
  asChild?: boolean;
  children?: ReactNode;
  order?: TitleOrder;
  variant?: TitleVariant;
  size?: TitleSize;
  tone?: TitleTone;
} & HTMLAttributes<HTMLHeadingElement>;

const sizeStyles: Record<TitleSize, string> = {
  display: "text-6xl leading-[0.9] md:text-8xl",
  h1: "text-5xl leading-none md:text-7xl",
  h2: "text-4xl leading-none md:text-6xl",
  h3: "text-3xl leading-tight md:text-5xl",
  h4: "text-2xl leading-tight md:text-4xl",
  h5: "text-xl leading-tight md:text-2xl",
  h6: "text-lg leading-tight",
};

const toneStyles: Record<TitleTone, string> = {
  default: "text-[var(--sw-color-ink)]",
  muted: "text-[var(--sw-color-muted)]",
  inverted: "text-white",
};

function sizeForOrder(order: TitleOrder): TitleSize {
  return `h${order}` as TitleSize;
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(function Title({
  as,
  asChild = false,
  children,
  className,
  order = 1,
  variant = "default",
  size,
  tone = "default",
  ...props
}: TitleProps, ref) {
  const resolvedSize = size ?? sizeForOrder(order);
  const Component = (asChild ? Slot : as ?? `h${order}`) as ElementType;

  return (
    <Component
      ref={ref}
      className={cn(
        variant === "default" && "font-anton uppercase tracking-normal",
        sizeStyles[size ?? sizeForOrder(order)],
        toneStyles[tone],
        className,
      )}
      {...swirskiAttrs("title", { size: resolvedSize, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

Title.displayName = "Title";
