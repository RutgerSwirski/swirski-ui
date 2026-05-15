import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type BadgeTone = "blue" | "yellow" | "red" | "white" | "black";

export type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "md";
} & HTMLAttributes<HTMLSpanElement>;

const toneStyles: Record<BadgeTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-white",
  yellow: "bg-[var(--sw-color-yellow)] text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-red)] text-white",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

const sizeStyles = {
  sm: "px-2 py-1 text-[0.68rem]",
  md: "px-3 py-1.5 text-xs",
};

export function Badge({
  children,
  tone = "yellow",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit items-center border-2 border-[color:var(--sw-color-ink)] font-black uppercase leading-none tracking-wide shadow-[var(--sw-shadow-sm)]",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
