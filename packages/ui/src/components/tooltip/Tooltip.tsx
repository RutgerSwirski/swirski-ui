import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type TooltipVariant = "default";
export type TooltipSize = "sm" | "md";
export type TooltipTone = "black" | "yellow";

export type TooltipProps = {
  asChild?: boolean;
  children: ReactNode;
  content: ReactNode;
  variant?: TooltipVariant;
  size?: TooltipSize;
  tone?: TooltipTone;
} & HTMLAttributes<HTMLSpanElement>;

const sizeStyles: Record<TooltipSize, string> = {
  sm: "px-2 py-1 text-[0.65rem] leading-4",
  md: "px-3 py-2 text-xs leading-5",
};

const toneStyles: Record<TooltipTone, string> = {
  black: "bg-[#0B0B0C] text-white shadow-[5px_5px_0_#FFD400]",
  yellow: "bg-[#FFD400] text-black shadow-[5px_5px_0_#0B0B0C]",
};

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip({
  asChild = false,
  children,
  content,
  className,
  variant = "default",
  size = "md",
  tone = "black",
  ...props
}, ref) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      ref={ref}
      className={cn("group relative inline-flex", className)}
      {...swirskiAttrs("tooltip", { size, tone, variant })}
      {...props}
    >
      {children}

      <span
        className={cn(
          "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-50 hidden w-max max-w-56 -translate-x-1/2 border-4 border-black font-black uppercase group-hover:block group-focus-within:block",
          sizeStyles[size],
          toneStyles[tone],
        )}
        {...swirskiAttrs("tooltip-content", { size, tone, variant })}
      >
        {content}
      </span>
    </Component>
  );
});

Tooltip.displayName = "Tooltip";
