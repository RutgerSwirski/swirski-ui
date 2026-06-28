import { ElementType, HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type TextTone = "default" | "muted" | "subtle" | "inverted";
export type TextWeight = "regular" | "medium" | "bold" | "black";
export type TextElement = "p" | "span" | "div";
export type TextVariant = "default" | "lead" | "caption";

export type TextProps = {
  as?: ElementType;
  asChild?: boolean;
  children?: ReactNode;
  component?: TextElement;
  variant?: TextVariant;
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
} & HTMLAttributes<HTMLElement>;

const sizeStyles: Record<TextSize, string> = {
  xs: "text-xs leading-5",
  sm: "text-sm leading-6",
  md: "text-base leading-7",
  lg: "text-lg leading-8",
  xl: "text-xl leading-9",

  "2xl": "text-2xl leading-10",
};

const toneStyles: Record<TextTone, string> = {
  default: "text-[var(--sw-color-ink)]",
  muted: "text-[var(--sw-color-muted)]",
  subtle: "text-[var(--sw-color-muted)] opacity-80",
  inverted: "text-white",
};

const weightStyles: Record<TextWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
  black: "font-black",
};

const variantStyles: Record<TextVariant, string> = {
  default: "",
  lead: "max-w-prose",
  caption: "uppercase tracking-normal",
};

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as,
    asChild = false,
    children,
    className,
    component = "p",
    variant = "default",
    size = "md",
    tone = "default",
    weight = "regular",
    ...props
  }: TextProps,
  ref,
) {
  const Component = (asChild ? Slot : (as ?? component)) as ElementType;

  return (
    <Component
      ref={ref}
      className={cn(
        sizeStyles[size],
        toneStyles[tone],
        weightStyles[weight],
        variantStyles[variant],
        className,
      )}
      {...swirskiAttrs("text", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

Text.displayName = "Text";
