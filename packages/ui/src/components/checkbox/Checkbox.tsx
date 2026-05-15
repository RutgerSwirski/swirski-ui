import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type CheckboxProps = {
  label?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({
  label,
  description,
  className,
  containerClassName,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={clsx(
        "group inline-flex w-fit items-start gap-3",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        containerClassName,
      )}
    >
      <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
        <input
          type="checkbox"
          className={clsx("peer sr-only", className)}
          disabled={disabled}
          {...props}
        />
        <span className="absolute inset-0 border-4 border-black bg-white shadow-[3px_3px_0_#0B0B0C] transition peer-checked:bg-[#FFD400] peer-focus-visible:shadow-[4px_4px_0_#0057FF]" />
        <span className="relative hidden text-base font-black leading-none text-black peer-checked:block">
          x
        </span>
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
