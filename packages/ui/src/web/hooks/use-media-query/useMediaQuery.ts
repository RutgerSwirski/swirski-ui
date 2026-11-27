"use client";

import { useEffect, useState } from "react";

/** Track a CSS media query. Returns the initial value until the browser checks it. */
export function useMediaQuery(query: string, initialValue = false) {
  const [matches, setMatches] = useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
