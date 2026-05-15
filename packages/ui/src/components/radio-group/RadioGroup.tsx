"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type RadioGroupOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange">;

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <div className={clsx("grid gap-3", className)} role="radiogroup">
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            "group inline-flex w-fit items-start gap-3",
            option.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          )}
        >
          <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
            <input
              className="peer sr-only"
              defaultChecked={defaultValue === option.value}
              checked={value === undefined ? undefined : value === option.value}
              disabled={option.disabled}
              name={name}
              onChange={() => onValueChange?.(option.value)}
              type="radio"
              value={option.value}
              {...props}
            />
            <span className="absolute inset-0 rounded-full border-4 border-black bg-white shadow-[3px_3px_0_#0B0B0C] peer-checked:bg-[#FFD400]" />
            <span className="relative hidden size-2 rounded-full bg-black peer-checked:block" />
          </span>
          <span className="grid gap-1">
            <span className="font-black leading-5">{option.label}</span>
            {option.description && (
              <span className="text-sm font-bold leading-5 text-neutral-600">
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}
