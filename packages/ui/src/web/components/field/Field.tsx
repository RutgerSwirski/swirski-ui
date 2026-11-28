"use client";

import { HTMLAttributes, forwardRef, useCallback, useId, useState } from "react";
import type { PolymorphicComponent } from "../../system";
import { FieldContext, type FieldContextValue } from "../../system/field";
import { Slot, cn, swirskiAttrs } from "../../system";

export type FieldVariant = "default" | "inline";
export type FieldSize = "sm" | "md" | "lg";
export type FieldTone = "default";

export type FieldProps = {
  asChild?: boolean;
  /** Set the shared control ID when it needs to match a pre-existing ID. */
  controlId?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  variant?: FieldVariant;
  size?: FieldSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: FieldTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<FieldSize, string> = {
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-3",
};

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    asChild = false,
    controlId,
    required,
    disabled,
    invalid,
    readOnly,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const [parts, setParts] = useState<FieldContextValue["parts"]>({
    label: [], description: [], error: [],
  });
  const [control, setControl] = useState<{ id?: string; labelable: boolean }>();
  const registerPart = useCallback<FieldContextValue["registerPart"]>((part, id) => {
    setParts((current) => ({ ...current, [part]: [...current[part], id] }));
    return () => setParts((current) => ({
      ...current, [part]: current[part].filter((entry) => entry !== id),
    }));
  }, []);
  const registerControl = useCallback<FieldContextValue["registerControl"]>((id, labelable) => {
    const entry = { id, labelable };
    setControl(entry);
    return () => setControl((current) => current === entry ? undefined : current);
  }, []);
  const Component = asChild ? Slot : "div";

  return (
    <FieldContext.Provider value={{
      controlId: controlId ?? generatedId, explicitControlId: control?.id, labelable: control?.labelable, size,
      required, disabled, invalid, readOnly, parts, registerPart, registerControl,
    }}>
      <Component
        ref={ref}
        className={cn(
          variant === "inline" ? "flex items-center gap-3" : "grid",
          sizeStyles[size],
          className,
        )}
        data-invalid={(invalid ?? Boolean(parts.error.length)) ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        data-required={required ? "" : undefined}
        data-readonly={readOnly ? "" : undefined}
        {...swirskiAttrs("field", { size, tone, variant })}
        {...props}
      />
    </FieldContext.Provider>
  );
}) as unknown as PolymorphicComponent<FieldProps, HTMLDivElement>;

Field.displayName = "Field";
