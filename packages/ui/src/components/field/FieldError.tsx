import { HTMLAttributes } from "react";
import clsx from "clsx";

export function FieldError({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={clsx("text-sm font-black leading-5 text-[#C1121F]", className)}
      {...props}
    />
  );
}
