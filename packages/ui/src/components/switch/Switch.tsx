import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type SwitchVariant = "default" | "card";
export type SwitchSize = "sm" | "md" | "lg";
export type SwitchTone = "blue" | "yellow" | "red";

export type SwitchProps = {
  label?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  variant?: SwitchVariant;
  size?: SwitchSize;
  tone?: SwitchTone;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "color">;

const trackSizeStyles: Record<SwitchSize, string> = {
  sm: "h-7 w-12",
  md: "h-8 w-14",
  lg: "h-9 w-16",
};

const thumbSizeStyles: Record<SwitchSize, string> = {
  sm: "size-3 peer-checked:translate-x-5",
  md: "size-4 peer-checked:translate-x-6",
  lg: "size-5 peer-checked:translate-x-7",
};

const toneStyles: Record<SwitchTone, string> = {
  blue: "peer-checked:bg-[#0057FF]",
  yellow: "peer-checked:bg-[#FFD400]",
  red: "peer-checked:bg-[#FF3131]",
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({
  label,
  description,
  className,
  containerClassName,
  inputClassName,
  disabled,
  variant = "default",
  size = "md",
  tone = "blue",
  ...props
}, ref) {
  return (
    <label
      className={cn(
        "group inline-flex w-fit items-center gap-3",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        variant === "card" && "border-4 border-black bg-white p-3 shadow-[4px_4px_0_#0B0B0C]",
        containerClassName,
        className,
      )}
      {...swirskiAttrs("switch", { size, tone, variant })}
    >
      <span className={cn("relative inline-flex shrink-0 items-center border-4 border-black bg-white shadow-[4px_4px_0_#0B0B0C] transition group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none", trackSizeStyles[size])}>
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          className={cn("peer sr-only", inputClassName)}
          disabled={disabled}
          {...swirskiAttrs("switch-input", { size, tone, variant })}
          {...props}
        />
        <span className={cn("absolute inset-0 bg-white transition peer-focus-visible:shadow-[0_0_0_3px_#FFD400]", toneStyles[tone])} />
        <span className={cn("relative ml-1 border-2 border-black bg-[#FFD400] transition peer-checked:bg-white", thumbSizeStyles[size])} />
      </span>
      {(label || description) && (
        <span className="grid gap-1">
          {label && <span className="font-black leading-5">{label}</span>}
          {description && (
            <span className="text-sm font-bold leading-5 text-neutral-600">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

Switch.displayName = "Switch";
