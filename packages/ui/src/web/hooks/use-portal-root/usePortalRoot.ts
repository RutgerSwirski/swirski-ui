"use client";

import { useEffect, useState } from "react";

export function usePortalRoot() {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  return portalRoot;
}
