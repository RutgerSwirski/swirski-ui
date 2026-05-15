import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type BadgeTone = "blue" | "yellow" | "red" | "white" | "black";

export type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "md";
} & HTMLAttributes<HTMLSpanElement>;

const toneStyles: Record<BadgeTone, string> = {
  blue: "bg-[#0057FF] text-white",
  yellow: "bg-[#FFD400] text-black",
  red: "bg-[#FF3131] text-white",
  white: "bg-white text-black",
  black: "bg-[#0B0B0C] text-white",
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
        "inline-flex w-fit items-center border-2 border-black font-black uppercase leading-none tracking-wide shadow-[3px_3px_0_#0B0B0C]",
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
