"use client";

import { useControllableState } from "../../hooks/use-controllable-state/useControllableState";
import type { ReactNode } from "react";
import { createContext, useContext, useId, useState } from "react";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";

type DrawerContextValue = {
  variant: DrawerVariant;
  size: DrawerSize;
  tone: DrawerTone;
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

export function useDrawerStyles() {
  return useContext(DrawerContext);
}

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
  variant = "default",
  size = "md",
  tone = "default",
}: DrawerProps) {
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
    <DrawerContext.Provider
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
    </DrawerContext.Provider>
  );
}
