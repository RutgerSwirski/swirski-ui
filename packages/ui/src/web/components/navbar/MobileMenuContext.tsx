"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useId, useState } from "react";
import type { NavbarSize, NavbarTone, NavbarVariant } from "./Navbar";

type MobileMenuContextValue = {
  contentId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export type MobileMenuProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: NavbarVariant;
  size?: NavbarSize;
  tone?: NavbarTone;
};

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error("MobileMenu components must be used inside MobileMenu.");
  }

  return context;
}

export function MobileMenu({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  variant: _variant = "default",
  size: _size = "md",
  tone: _tone = "default",
}: MobileMenuProps) {
  const contentId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <MobileMenuContext.Provider
      value={{ contentId, open: currentOpen, setOpen }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
