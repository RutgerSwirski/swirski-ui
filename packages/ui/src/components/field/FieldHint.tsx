import { HTMLAttributes } from "react";
import clsx from "clsx";

export function FieldHint({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={clsx("text-sm font-bold leading-5 text-neutral-600", className)}
      {...props}
    />
  );
}
