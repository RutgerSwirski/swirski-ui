import { LabelHTMLAttributes } from "react";
import clsx from "clsx";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={clsx("text-sm font-black uppercase tracking-wide", className)}
      {...props}
    />
  );
}
