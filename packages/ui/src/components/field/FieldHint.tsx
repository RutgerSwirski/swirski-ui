import { HTMLAttributes } from "react";
import clsx from "clsx";

export type FieldHintProps = HTMLAttributes<HTMLParagraphElement>;

export function FieldHint({ className, ...props }: FieldHintProps) {
  return (
    <p
      className={clsx("text-sm font-bold leading-5 text-neutral-600", className)}
      {...props}
    />
  );
}
