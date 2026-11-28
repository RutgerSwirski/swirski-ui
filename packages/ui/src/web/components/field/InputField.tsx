"use client";

import { forwardRef, useId, type ReactNode } from "react";
import { Field } from "./Field";
import { FieldError } from "./FieldError";
import { FieldHint } from "./FieldHint";
import { Input, type InputProps } from "./Input";
import { Label } from "./Label";

export type InputFieldProps = InputProps & {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  fieldClassName?: string;
};

/** A native input with a label and optional description and validation text. */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ label, hint, error, id, fieldClassName, tone, ...props }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [props["aria-describedby"], hintId, errorId]
      .filter(Boolean)
      .join(" ");

    return (
      <Field className={fieldClassName} controlId={inputId} size={props.size}>
        <Label htmlFor={inputId}>{label}</Label>
        <Input
          {...props}
          ref={ref}
          id={inputId}
          tone={tone ?? (errorId ? "danger" : undefined)}
          aria-describedby={describedBy || undefined}
          aria-invalid={props["aria-invalid"] ?? (errorId ? true : undefined)}
        />
        {hintId && <FieldHint id={hintId}>{hint}</FieldHint>}
        {errorId && <FieldError id={errorId}>{error}</FieldError>}
      </Field>
    );
  },
);
