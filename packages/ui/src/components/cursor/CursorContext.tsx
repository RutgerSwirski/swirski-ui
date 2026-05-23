"use client";

import { createContext, useContext } from "react";
import type { CursorId, SwirskiCursor } from "./cursors";

export type CursorContextValue = {
  cursor: SwirskiCursor;
  cursorId: CursorId;
  cursors: SwirskiCursor[];
  setCursor: (cursorId: CursorId) => void;
};

export const CursorContext = createContext<CursorContextValue | null>(null);

export function useSwirskiCursor() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useSwirskiCursor must be used inside CursorProvider.");
  }

  return context;
}
