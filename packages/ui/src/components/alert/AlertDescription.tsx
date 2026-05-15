import { HTMLAttributes } from "react";
import clsx from "clsx";

export type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return <p className={clsx("mt-3 text-sm font-bold leading-6", className)} {...props} />;
}
