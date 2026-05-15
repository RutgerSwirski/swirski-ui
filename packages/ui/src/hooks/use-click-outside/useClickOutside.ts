"use client";

import { RefObject, useEffect } from "react";

export type UseClickOutsideOptions = {
  enabled?: boolean;
  events?: Array<"mousedown" | "pointerdown" | "touchstart">;
};

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
  options: UseClickOutsideOptions = {},
) {
  const { enabled = true, events = ["pointerdown"] } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: Event) => {
      const element = ref.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    events.forEach((eventName) => {
      document.addEventListener(eventName, listener);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, listener);
      });
    };
  }, [enabled, events, handler, ref]);
}
