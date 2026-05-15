import { HTMLAttributes, ReactNode, createElement } from "react";
import clsx from "clsx";

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleTone = "default" | "muted" | "inverted";

export type TitleProps = {
  children: ReactNode;
  order?: TitleOrder;
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

export function Title({
  children,
  className,
  order = 1,
  size,
  tone = "default",
  ...props
}: TitleProps) {
  return createElement(
    `h${order}`,
    {
      className: clsx(
        "font-anton uppercase tracking-normal",
        sizeStyles[size ?? sizeForOrder(order)],
        toneStyles[tone],
        className,
      ),
      ...props,
    },
    children,
  );
}
