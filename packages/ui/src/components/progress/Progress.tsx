import { HTMLAttributes } from "react";
import clsx from "clsx";

export type ProgressProps = {
  value?: number;
  max?: number;
} & HTMLAttributes<HTMLDivElement>;

export function Progress({
  value = 0,
  max = 100,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={clsx("h-6 overflow-hidden border-4 border-black bg-white", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      {...props}
    >
      <div className="h-full bg-[#0057FF]" style={{ width: `${percentage}%` }} />
    </div>
  );
}
