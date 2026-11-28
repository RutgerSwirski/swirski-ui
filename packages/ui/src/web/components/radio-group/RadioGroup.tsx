"use client";

import {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from "react";
import { useFieldControl } from "../../system/field";
import { cn, swirskiAttrs } from "../../system";

export type RadioGroupVariant = "default" | "card";
export type RadioGroupSize = "sm" | "md" | "lg";
export type RadioGroupTone = "yellow" | "blue" | "red";

export type RadioGroupOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  options: RadioGroupOption[];
  required?: boolean;
  disabled?: boolean;
  form?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: RadioGroupVariant;
  size?: RadioGroupSize;
  tone?: RadioGroupTone;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "checked"
    | "defaultChecked"
    | "id"
    | "name"
    | "onChange"
    | "type"
    | "value"
    | "size"
    | "color"
  >;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange"
>;

const controlSizeStyles: Record<RadioGroupSize, string> = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
};

const dotSizeStyles: Record<RadioGroupSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

const toneStyles: Record<RadioGroupTone, string> = {
  yellow: "peer-checked:bg-[var(--sw-color-yellow)]",
  blue: "peer-checked:bg-[var(--sw-color-blue)]",
  red: "peer-checked:bg-[var(--sw-color-red)]",
};

const dotToneStyles: Record<RadioGroupTone, string> = {
  yellow: "bg-[var(--sw-color-on-yellow)]",
  blue: "bg-[var(--sw-color-on-blue)]",
  red: "bg-[var(--sw-color-on-red)]",
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      name,
      options,
      value,
      defaultValue,
      onValueChange,
      inputProps,
      className,
      variant = "default",
      size: sizeProp,
      required: requiredProp,
      disabled: disabledProp,
      form: formProp,
      tone = "yellow",
      ...props
    },
    ref,
  ) {
    const {
      className: inputClassName,
      disabled: inputDisabled,
      required: inputRequired,
      form: inputForm,
      ...nativeInputProps
    } = inputProps ?? {};

    const generatedId = useId();
    const field = useFieldControl({
      ...props,
      required: requiredProp ?? inputRequired,
      disabled: disabledProp ?? inputDisabled,
    }, "group");
    const size = sizeProp ?? field.size ?? "md";
    const form = formProp ?? inputForm;
    const groupDisabled = field.disabled;
    const groupRequired = field.required;

    return (
      <div
        ref={ref}
        className={cn("grid gap-3", className)}
        {...props}
        id={field.id}
        role="radiogroup"
        aria-labelledby={field["aria-labelledby"]}
        aria-describedby={field["aria-describedby"]}
        aria-invalid={field["aria-invalid"]}
        aria-required={props["aria-required"] ?? (groupRequired || undefined)}
        aria-disabled={props["aria-disabled"] ?? (groupDisabled || undefined)}
        {...swirskiAttrs("radio-group", { size, tone, variant })}
      >
        {options.map((option, index) => {
          const disabled = Boolean(groupDisabled || option.disabled);
          const labelId = `${generatedId}-option-${index}-label`;
          const descriptionId = option.description ? `${generatedId}-option-${index}-description` : undefined;
          return (
            <label
              key={option.value}
              className={cn(
                "group inline-flex w-fit items-start gap-3",
                variant === "card" &&
                  "border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-3 shadow-[4px_4px_0_var(--sw-color-shadow)]",
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer",
              )}
              data-swirski-radio-option={option.value}
            >
              <span
                className={cn(
                  "relative mt-0.5 grid shrink-0 place-items-center",
                  controlSizeStyles[size],
                )}
              >
                <input
                  className={cn("peer sr-only", inputClassName)}
                  defaultChecked={value === undefined ? defaultValue === option.value : undefined}
                  checked={
                    value === undefined ? undefined : value === option.value
                  }
                  id={`${generatedId}-option-${index}`}
                  disabled={disabled}
                  required={groupRequired && !disabled}
                  form={form}
                  name={name}
                  onChange={() => onValueChange?.(option.value)}
                  type="radio"
                  value={option.value}
                  {...swirskiAttrs("radio-group-input", { size, tone, variant })}
                  {...nativeInputProps}
                  aria-labelledby={nativeInputProps["aria-labelledby"] ?? (nativeInputProps["aria-label"] ? undefined : labelId)}
                  aria-describedby={[nativeInputProps["aria-describedby"], descriptionId].filter(Boolean).join(" ") || undefined}
                  aria-invalid={nativeInputProps["aria-invalid"] ?? field["aria-invalid"]}
                />
                <span
                  className={cn(
                    "absolute inset-0 rounded-full border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] shadow-[var(--sw-shadow-sm)] sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] peer-focus-visible:shadow-[4px_4px_0_var(--sw-color-focus)]",
                    toneStyles[tone],
                    "peer-aria-invalid:outline-2 peer-aria-invalid:outline-[color:var(--sw-color-red)]",
                  )}
                />
                <span
                  className={cn(
                    "relative hidden rounded-full peer-checked:block",
                    dotToneStyles[tone],
                    dotSizeStyles[size],
                  )}
                />
              </span>
              <span className="grid gap-1">
                <span id={labelId} className="font-black leading-5">{option.label}</span>
                {option.description && (
                  <span id={descriptionId} className="text-sm font-bold leading-5 text-[color:var(--sw-color-muted)]">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
