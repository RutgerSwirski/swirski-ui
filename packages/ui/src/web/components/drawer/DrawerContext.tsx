"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useId, useState } from "react";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  labelledById?: string;
  describedById?: string;
  setLabelledById: (id: string | undefined) => void;
  setDescribedById: (id: string | undefined) => void;
};

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export type DrawerProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

export function useDrawer() {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("Drawer components must be used inside Drawer.");
  }

  return context;
}

export function Drawer({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  variant: _variant = "default",
  size: _size = "md",
  tone: _tone = "default",
}: DrawerProps) {
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
    <DrawerContext.Provider
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
    </DrawerContext.Provider>
  );
}
