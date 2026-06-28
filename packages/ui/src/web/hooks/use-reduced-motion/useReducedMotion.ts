"use client";

import { useMediaQuery } from "../use-media-query";

export function useReducedMotion(initialValue = false) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue);
}
