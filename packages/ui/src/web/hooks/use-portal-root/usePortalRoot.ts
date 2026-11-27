"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const PortalRootContext = createContext<HTMLElement | null | undefined>(undefined);

/** Return the nearest provider’s portal host after mount, or document.body outside a provider. */
export function usePortalRoot() {
  const scopedRoot = useContext(PortalRootContext);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (scopedRoot === undefined) setPortalRoot(document.body);
  }, [scopedRoot]);

  return scopedRoot === undefined ? portalRoot : scopedRoot;
}
