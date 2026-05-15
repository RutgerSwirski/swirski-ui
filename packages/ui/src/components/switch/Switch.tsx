import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type SwitchProps = {
  label?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Switch({
  label,
  description,
  className,
  containerClassName,
  disabled,
  ...props
}: SwitchProps) {
  return (
    <label
      className={clsx(
        "group inline-flex w-fit items-center gap-3",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        containerClassName,
      )}
    >
      <span className="relative inline-flex h-8 w-14 shrink-0 items-center border-4 border-black bg-white shadow-[4px_4px_0_#0B0B0C] transition group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none">
        <input
          type="checkbox"
          role="switch"
          className={clsx("peer sr-only", className)}
          disabled={disabled}
          {...props}
        />
        <span className="absolute inset-0 bg-white transition peer-checked:bg-[#0057FF] peer-focus-visible:shadow-[0_0_0_3px_#FFD400]" />
        <span className="relative ml-1 size-4 border-2 border-black bg-[#FFD400] transition peer-checked:translate-x-6 peer-checked:bg-white" />
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
}
