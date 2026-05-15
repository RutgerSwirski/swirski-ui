import { HTMLAttributes } from "react";
import clsx from "clsx";

export type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <h3
      className={clsx("font-anton text-2xl uppercase leading-none", className)}
      {...props}
    />
  );
}
