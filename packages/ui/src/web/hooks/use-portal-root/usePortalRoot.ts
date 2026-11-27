"use client";

import { useEffect, useState } from "react";

/** Return document.body after mount for portals. Returns null during server rendering. */
export function usePortalRoot() {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return portalRoot;
}
