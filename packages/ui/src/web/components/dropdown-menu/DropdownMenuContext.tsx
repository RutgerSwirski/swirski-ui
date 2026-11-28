"use client";

import type { MutableRefObject, RefObject } from "react";
import { createContext, useContext } from "react";
import type { DropdownMenuFocusIntent, DropdownMenuSize, DropdownMenuTone, DropdownMenuVariant } from "./dropdown-menu-types";

export type DropdownMenuContextValue = {
  variant: DropdownMenuVariant;
  size: DropdownMenuSize;
  tone: DropdownMenuTone;
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  contentId: string;
  focusIntentRef: MutableRefObject<DropdownMenuFocusIntent>;
};

export const DropdownMenuContext =
  createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenuStyles() {
  return useContext(DropdownMenuContext);
}

export function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenu components must be used inside DropdownMenu.");
  }

  return context;
}
