import { HTMLAttributes } from "react";
import clsx from "clsx";

export function AlertTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={clsx("font-anton text-2xl uppercase leading-none", className)}
      {...props}
    />
  );
}
