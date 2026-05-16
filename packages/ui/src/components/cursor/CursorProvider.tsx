"use client";

import {
  createContext,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn, swirskiAttrs } from "../../system";
import {
  getSwirskiCursor,
  swirskiCursors,
  CursorId,
  SwirskiCursor,
} from "./cursors";

type CursorContextValue = {
  cursor: SwirskiCursor;
  cursorId: CursorId;
  cursors: SwirskiCursor[];
  setCursor: (cursorId: CursorId) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export type CursorProviderProps = {
  children: ReactNode;
  cursors?: SwirskiCursor[];
  cursor?: CursorId;
  defaultCursor?: CursorId;
  onCursorChange?: (cursorId: CursorId) => void;
  storageKey?: string | false;
  variant?: "default";
  size?: "md";
  tone?: "default";
} & HTMLAttributes<HTMLDivElement>;

const cursorSelectorStyles = `
@media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
  [data-swirski-cursor] {
    cursor: var(--swirski-cursor);
  }

  [data-swirski-cursor] :is(
    a,
    button,
    summary,
    label,
    select,
    input[type="button"],
    input[type="checkbox"],
    input[type="radio"],
    input[type="reset"],
    input[type="submit"],
    [role="button"],
    [data-cursor="pointer"]
  ) {
    cursor: var(--swirski-cursor-pointer);
  }

  [data-swirski-cursor] :is(
    a,
    button,
    summary,
    label,
    select,
    input[type="button"],
    input[type="checkbox"],
    input[type="radio"],
    input[type="reset"],
    input[type="submit"],
    [role="button"],
    [data-cursor="pointer"],
    [data-cursor="active"]
  ):active {
    cursor: var(--swirski-cursor-active);
  }

  [data-swirski-cursor][data-swirski-cursor-pressed="true"],
  [data-swirski-cursor][data-swirski-cursor-pressed="true"] * {
    cursor: var(--swirski-cursor-active);
  }

  [data-swirski-cursor] :is(
    input:not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="reset"]):not([type="submit"]),
    textarea,
    [contenteditable="true"]
  ) {
    cursor: text;
  }
}
`;

function getStoredCursor(
  storageKey: string | false,
  cursors: SwirskiCursor[],
): CursorId | null {
  if (storageKey === false || typeof window === "undefined") {
    return null;
  }

  try {
    const storedCursor = window.localStorage.getItem(storageKey);

    if (!storedCursor) {
      return null;
    }

    const exists = cursors.some((cursor) => cursor.id === storedCursor);

    return exists ? (storedCursor as CursorId) : null;
  } catch {
    return null;
  }
}

function storeCursor(storageKey: string | false, cursorId: CursorId) {
  if (storageKey === false || typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, cursorId);
  } catch {
    // Ignore storage errors, for example private browsing or blocked storage.
  }
}

function findCursor(cursors: SwirskiCursor[], cursorId: CursorId) {
  return (
    cursors.find((cursor) => cursor.id === cursorId) ??
    getSwirskiCursor(cursorId) ??
    cursors[0] ??
    swirskiCursors[0]
  );
}

export const CursorProvider = forwardRef<HTMLDivElement, CursorProviderProps>(
  function CursorProvider({
  children,
  className,
  cursors = swirskiCursors,
  cursor,
  defaultCursor = "bolt",
  onCursorChange,
  storageKey = "swirski-cursor",
  variant = "default",
  size = "md",
  tone = "default",
  onPointerDownCapture,
  style,
  ...props
}, ref) {
  const isControlled = cursor !== undefined;

  const [selectedCursor, setSelectedCursor] = useState<CursorId>(() => {
    return defaultCursor;
  });

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (isControlled) {
      return;
    }

    const storedCursor = getStoredCursor(storageKey, cursors);

    if (storedCursor) {
      setSelectedCursor(storedCursor);
    }
  }, [cursors, isControlled, storageKey]);

  useEffect(() => {
    if (!isPressed || typeof window === "undefined") {
      return;
    }

    const releaseCursor = () => {
      setIsPressed(false);
    };

    window.addEventListener("pointerup", releaseCursor);
    window.addEventListener("pointercancel", releaseCursor);
    window.addEventListener("blur", releaseCursor);
    window.addEventListener("contextmenu", releaseCursor);

    return () => {
      window.removeEventListener("pointerup", releaseCursor);
      window.removeEventListener("pointercancel", releaseCursor);
      window.removeEventListener("blur", releaseCursor);
      window.removeEventListener("contextmenu", releaseCursor);
    };
  }, [isPressed]);

  const cursorId = cursor ?? selectedCursor;

  const activeCursor = useMemo(() => {
    return findCursor(cursors, cursorId);
  }, [cursors, cursorId]);

  const setCursor = useCallback(
    (nextCursor: CursorId) => {
      const cursorExists = cursors.some((cursor) => cursor.id === nextCursor);

      if (!cursorExists) {
        return;
      }

      if (!isControlled) {
        setSelectedCursor(nextCursor);
      }

      storeCursor(storageKey, nextCursor);
      onCursorChange?.(nextCursor);
    },
    [cursors, isControlled, onCursorChange, storageKey],
  );

  const value = useMemo<CursorContextValue>(
    () => ({
      cursor: activeCursor,
      cursorId: activeCursor.id,
      cursors,
      setCursor,
    }),
    [activeCursor, cursors, setCursor],
  );

  const cursorStyle = {
    "--swirski-cursor": activeCursor.cursor,
    "--swirski-cursor-pointer": activeCursor.pointer,
    "--swirski-cursor-active": activeCursor.active,
  } as CSSProperties;

  return (
    <CursorContext.Provider value={value}>
      <style>{cursorSelectorStyles}</style>

      <div
        ref={ref}
        className={cn("min-h-full", className)}
        data-swirski-cursor={activeCursor.id}
        data-swirski-cursor-pressed={isPressed ? "true" : undefined}
        {...swirskiAttrs("cursor-provider", { size, tone, variant })}
        style={{ ...cursorStyle, ...style }}
        onPointerDownCapture={(event) => {
          onPointerDownCapture?.(event);

          if (event.pointerType === "mouse") {
            setIsPressed(true);
          }
        }}
        {...props}
      >
        {children}
      </div>
    </CursorContext.Provider>
  );
});

CursorProvider.displayName = "CursorProvider";

export function useSwirskiCursor() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useSwirskiCursor must be used inside CursorProvider.");
  }

  return context;
}
