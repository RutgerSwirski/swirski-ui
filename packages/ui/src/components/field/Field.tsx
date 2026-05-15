import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Field({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("grid gap-2", className)} {...props} />;
}
