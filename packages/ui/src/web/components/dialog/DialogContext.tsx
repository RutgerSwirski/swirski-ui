"use client";

import { useControllableState } from "../../hooks/use-controllable-state/useControllableState";
import type { ReactNode } from "react";
import { createContext, useContext, useId, useState } from "react";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";

type DialogContextValue = {
  variant: DialogVariant;
  size: DialogSize;
  tone: DialogTone;
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  labelledById?: string;
  describedById?: string;
  setLabelledById: (id: string | undefined) => void;
  setDescribedById: (id: string | undefined) => void;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

export type DialogProps = {
  children: ReactNode;
  /** Controlled open state. Pair with onOpenChange. */
  open?: boolean;
  /** Initial uncontrolled open state. Defaults to false. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

export function useDialogStyles() {
  return useContext(DialogContext);
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used inside Dialog.");
  }

  return context;
}

export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  variant = "default",
  size = "md",
  tone = "default",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [labelledById, setLabelledById] = useState<string | undefined>();
  const [describedById, setDescribedById] = useState<string | undefined>();

  return (
    <DialogContext.Provider
      value={{
        open: currentOpen, variant, size, tone,
        setOpen,
        titleId,
        descriptionId,
        labelledById,
        describedById,
        setLabelledById,
        setDescribedById,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
