"use client";

import { useControllableState } from "../../hooks/use-controllable-state/useControllableState";
import type { ReactNode } from "react";
import { createContext, useContext, useId } from "react";
import { useNavbarStyles } from "./Navbar";
import type { NavbarSize, NavbarTone, NavbarVariant } from "./Navbar";

type MobileMenuContextValue = {
  contentId: string;
  variant: NavbarVariant;
  size: NavbarSize;
  tone: NavbarTone;
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

export function useMobileMenuStyles() {
  return useContext(MobileMenuContext);
}

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
  variant: variantProp,
  size: sizeProp,
  tone: toneProp,
}: MobileMenuProps) {
  const navbar = useNavbarStyles();
  const variant = variantProp ?? navbar?.variant ?? "default";
  const size = sizeProp ?? navbar?.size ?? "md";
  const tone = toneProp ?? navbar?.tone ?? "default";
  const contentId = useId();
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <MobileMenuContext.Provider
      value={{ contentId, open: currentOpen, variant, size, tone, setOpen }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}
