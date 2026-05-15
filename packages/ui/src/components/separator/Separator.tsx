import { HTMLAttributes } from "react";
import clsx from "clsx";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
} & HTMLAttributes<HTMLDivElement>;

export function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      className={clsx(
        "bg-black",
        orientation === "horizontal" ? "h-1 w-full" : "h-full min-h-8 w-1",
        className,
      )}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
}
