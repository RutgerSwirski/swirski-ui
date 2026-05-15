import { HTMLAttributes } from "react";
import clsx from "clsx";

export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <p
      className={clsx("text-sm font-black leading-5 text-[#C1121F]", className)}
      {...props}
    />
  );
}
