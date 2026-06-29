"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useId, useState } from "react";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";

type DialogContextValue = {
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
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

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
  variant: _variant = "default",
  size: _size = "md",
  tone: _tone = "default",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [labelledById, setLabelledById] = useState<string | undefined>();
  const [describedById, setDescribedById] = useState<string | undefined>();
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  const setOpen = useCallback((nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  return (
    <DialogContext.Provider
      value={{
        open: currentOpen,
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
