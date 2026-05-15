import { HTMLAttributes } from "react";
import clsx from "clsx";

export function AlertDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx("mt-3 text-sm font-bold leading-6", className)} {...props} />;
}
