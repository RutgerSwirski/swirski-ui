import { HTMLAttributes, ReactNode, createElement } from "react";
import clsx from "clsx";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextTone = "default" | "muted" | "subtle" | "inverted";
export type TextWeight = "regular" | "medium" | "bold" | "black";
export type TextElement = "p" | "span" | "div";

export type TextProps = {
  children: ReactNode;
  component?: TextElement;
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

export function Text({
  children,
  className,
  component = "p",
  size = "md",
  tone = "default",
  weight = "regular",
  ...props
}: TextProps) {
  return createElement(
    component,
    {
      className: clsx(
        sizeStyles[size],
        toneStyles[tone],
        weightStyles[weight],
        className,
      ),
      ...props,
    },
    children,
  );
}
