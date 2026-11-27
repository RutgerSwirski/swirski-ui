"use client";

import { useMediaQuery } from "../use-media-query";

/** Track the browser’s reduced-motion preference. Defaults to false before the first browser check. */
export function useReducedMotion(initialValue = false) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue);
}
