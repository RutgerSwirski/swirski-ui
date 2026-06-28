"use client";

import type { MutableRefObject, RefObject } from "react";
import { createContext, useContext } from "react";
import type { DropdownMenuFocusIntent } from "./dropdown-menu-types";

export type DropdownMenuContextValue = {
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

export function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenu components must be used inside DropdownMenu.");
  }

  return context;
}
