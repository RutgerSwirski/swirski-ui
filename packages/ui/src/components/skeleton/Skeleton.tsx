import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "animate-pulse border-4 border-black bg-neutral-200 shadow-[4px_4px_0_#0B0B0C]",
        className,
      )}
      {...props}
    />
  );
}
