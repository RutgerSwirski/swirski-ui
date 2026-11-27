"use client";

import { useEffect } from "react";

export type UseEscapeKeyOptions = {
  enabled?: boolean;
  target?: Document | HTMLElement | Window | null;
};

/** Call a handler on Escape. Listens on the document by default. */
export function useEscapeKey(
  handler: (event: KeyboardEvent) => void,
  options: UseEscapeKeyOptions = {},
) {
  const { enabled = true, target } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const eventTarget = target ?? document;

    const listener = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;

      if (keyboardEvent.key === "Escape") {
        handler(keyboardEvent);
      }
    };

    eventTarget.addEventListener("keydown", listener);

    return () => eventTarget.removeEventListener("keydown", listener);
  }, [enabled, handler, target]);
}
