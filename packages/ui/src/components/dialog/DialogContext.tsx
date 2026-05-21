"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useId, useState } from "react";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  setHasTitle: (value: boolean) => void;
  setHasDescription: (value: boolean) => void;
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
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <DialogContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        titleId,
        descriptionId,
        hasTitle,
        hasDescription,
        setHasTitle,
        setHasDescription,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
