import type { DialogSize } from "./dialog-types";

export const dialogButtonSizeStyles: Record<DialogSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-6 py-4 text-lg",
};

export const dialogContentSizeStyles: Record<DialogSize, string> = {
  sm: "max-w-md p-5",
  md: "max-w-lg p-6",
  lg: "max-w-2xl p-7",
};
