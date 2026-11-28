"use client";

import { createContext, useContext, useEffect } from "react";

type FieldPart = "label" | "description" | "error";

export type FieldContextValue = {
  controlId: string;
  explicitControlId?: string;
  labelable?: boolean;
  size: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  parts: Record<FieldPart, string[]>;
  registerPart: (part: FieldPart, id: string) => () => void;
  registerControl: (id: string | undefined, labelable: boolean) => () => void;
};

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldPart(part: FieldPart, id?: string) {
  const field = useContext(FieldContext);
  const register = field?.registerPart;
  useEffect(() => {
    if (id !== undefined) return register?.(part, id);
  }, [id, part, register]);
  return field;
}

type ControlProps = {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
};

function joinIds(...ids: Array<string | undefined>) {
  return [...new Set(ids.flatMap((id) => id?.split(/\s+/) ?? []).filter(Boolean))].join(" ") || undefined;
}

export function useFieldControl(props: ControlProps, mode: "native" | "composite" | "group" = "native") {
  const field = useContext(FieldContext);
  const register = field?.registerControl;
  const explicitId = props.id;
  useEffect(() => {
    if (explicitId !== undefined || mode === "group") return register?.(explicitId, mode !== "group");
  }, [explicitId, mode, register]);

  return {
    id: explicitId ?? field?.controlId,
    size: field?.size,
    required: props.required ?? field?.required,
    disabled: props.disabled ?? field?.disabled,
    readOnly: props.readOnly ?? field?.readOnly,
    "aria-invalid": props["aria-invalid"] ?? field?.invalid ?? (field?.parts.error.length ? true : undefined),
    "aria-labelledby": props["aria-labelledby"] ?? (mode !== "native" && !props["aria-label"]
      ? joinIds(...(field?.parts.label ?? []))
      : undefined),
    "aria-describedby": joinIds(
      props["aria-describedby"],
      ...(field?.parts.description ?? []),
      ...(field?.parts.error ?? []),
    ),
  };
}
