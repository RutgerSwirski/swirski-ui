import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function Tooltip({
  children,
  content,
  className,
  ...props
}: TooltipProps) {
  return (
    <span className={clsx("group relative inline-flex", className)} {...props}>
      {children}

      <span className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-50 hidden w-max max-w-56 -translate-x-1/2 border-4 border-black bg-[#0B0B0C] px-3 py-2 text-xs font-black uppercase leading-5 text-white shadow-[5px_5px_0_#FFD400] group-hover:block group-focus-within:block">
        {content}
      </span>
    </span>
  );
}
