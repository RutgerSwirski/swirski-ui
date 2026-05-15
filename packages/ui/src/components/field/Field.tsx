import { HTMLAttributes } from "react";
import clsx from "clsx";

export type FieldProps = HTMLAttributes<HTMLDivElement>;

export function Field({ className, ...props }: FieldProps) {
  return <div className={clsx("grid gap-2", className)} {...props} />;
}
