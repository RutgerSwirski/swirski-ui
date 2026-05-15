import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type BadgeTone = "blue" | "yellow" | "red" | "white" | "black";

export type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "md";
  withShadow?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

const toneStyles: Record<BadgeTone, string> = {
  blue: "bg-[var(--sw-color-blue)] text-white",
  yellow: "bg-[var(--sw-color-yellow)] text-[var(--sw-color-ink)]",
  red: "bg-[var(--sw-color-red)] text-white",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export function Badge({
  children,
  tone = "yellow",
  size = "md",
  className,
  withShadow = true,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit items-center border-2 border-[color:var(--sw-color-ink)] font-black uppercase leading-none tracking-wide",
        toneStyles[tone],
        sizeStyles[size],
        withShadow && "shadow-(--sw-shadow-sm)",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
