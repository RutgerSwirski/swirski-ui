import { ElementType, HTMLAttributes, ReactNode, createElement } from "react";
import clsx from "clsx";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type GridAlign = "start" | "center" | "end" | "stretch";
export type GridContent = "start" | "center" | "end" | "between";

export type GridProps = {
  as?: ElementType;
  children: ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  align?: GridAlign;
  content?: GridContent;
  className?: string;
} & Omit<
  HTMLAttributes<HTMLElement>,
  "align" | "children" | "className" | "content"
>;

const columnStyles: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const gapStyles: Record<GridGap, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
  xl: "gap-8",
  "2xl": "gap-10",
};

const alignStyles: Record<GridAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const contentStyles: Record<GridContent, string> = {
  start: "content-start",
  center: "content-center",
  end: "content-end",
  between: "content-between",
};

export function Grid({
  as = "div",
  children,
  columns,
  gap,
  align,
  content,
  className,
  ...props
}: GridProps) {
  return createElement(
    as,
    {
      className: clsx(
        "grid min-w-0",
        columns && columnStyles[columns],
        gap && gapStyles[gap],
        align && alignStyles[align],
        content && contentStyles[content],
        className,
      ),
      ...props,
    },
    children,
  );
}
