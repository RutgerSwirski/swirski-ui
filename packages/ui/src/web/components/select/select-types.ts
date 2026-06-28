import type { ReactNode } from "react";

export type SelectVariant = "default" | "filled";
export type SelectSize = "sm" | "md" | "lg";
export type SelectTone = "default";

export type SelectOption = {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
};
