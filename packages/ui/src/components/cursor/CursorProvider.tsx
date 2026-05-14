"use client";

import {
  createContext,
  CSSProperties,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
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
  className?: string;
  cursors?: SwirskiCursor[];
  cursor?: CursorId;
  defaultCursor?: CursorId;
  onCursorChange?: (cursorId: CursorId) => void;
  storageKey?: string | false;
};

const cursorSelectorStyles = `
[data-swirski-cursor] {
  cursor: var(--swirski-cursor);
}

[data-swirski-cursor] a,
[data-swirski-cursor] button,
[data-swirski-cursor] summary,
[data-swirski-cursor] label,
[data-swirski-cursor] select,
[data-swirski-cursor] input[type="button"],
[data-swirski-cursor] input[type="checkbox"],
[data-swirski-cursor] input[type="radio"],
[data-swirski-cursor] input[type="reset"],
[data-swirski-cursor] input[type="submit"],
[data-swirski-cursor] [role="button"],
[data-swirski-cursor] [data-cursor="pointer"] {
  cursor: var(--swirski-cursor-pointer);
}

[data-swirski-cursor] a:active,
[data-swirski-cursor] button:active,
[data-swirski-cursor] summary:active,
[data-swirski-cursor] label:active,
[data-swirski-cursor] select:active,
[data-swirski-cursor] input[type="button"]:active,
[data-swirski-cursor] input[type="checkbox"]:active,
[data-swirski-cursor] input[type="radio"]:active,
[data-swirski-cursor] input[type="reset"]:active,
[data-swirski-cursor] input[type="submit"]:active,
[data-swirski-cursor] [role="button"]:active,
[data-swirski-cursor] [data-cursor="active"] {
  cursor: var(--swirski-cursor-active);
}

[data-swirski-cursor][data-swirski-cursor-pressed="true"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] a,
[data-swirski-cursor][data-swirski-cursor-pressed="true"] button,
[data-swirski-cursor][data-swirski-cursor-pressed="true"] summary,
[data-swirski-cursor][data-swirski-cursor-pressed="true"] label,
[data-swirski-cursor][data-swirski-cursor-pressed="true"] select,
[data-swirski-cursor][data-swirski-cursor-pressed="true"] input[type="button"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] input[type="checkbox"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] input[type="radio"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] input[type="reset"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] input[type="submit"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] [role="button"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] [data-cursor="pointer"],
[data-swirski-cursor][data-swirski-cursor-pressed="true"] [data-cursor="active"] {
  cursor: var(--swirski-cursor-active);
}

[data-swirski-cursor] input,
[data-swirski-cursor] textarea,
[data-swirski-cursor] [contenteditable="true"] {
  cursor: text;
}
`;

export function CursorProvider({
  children,
  className,
  cursors = swirskiCursors,
  cursor,
  defaultCursor = "bolt",
  onCursorChange,
  storageKey = "swirski-cursor",
}: CursorProviderProps) {
  const [selectedCursor, setSelectedCursor] = useState<CursorId>(defaultCursor);
  const [isPressed, setIsPressed] = useState(false);
  const isControlled = cursor !== undefined;
  const cursorId = cursor ?? selectedCursor;
  const activeCursor =
    cursors.find((item) => item.id === cursorId) ?? getSwirskiCursor(cursorId);

  useEffect(() => {
    if (isControlled || storageKey === false || typeof window === "undefined") {
      return;
    }

    const storedCursor = window.localStorage.getItem(storageKey);
    const hasStoredCursor = cursors.some((item) => item.id === storedCursor);

    if (hasStoredCursor) {
      setSelectedCursor(storedCursor as CursorId);
    }
  }, [cursors, isControlled, storageKey]);

  useEffect(() => {
    if (!isPressed || typeof window === "undefined") {
      return;
    }

    const releaseCursor = () => setIsPressed(false);

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

  const setCursor = useCallback(
    (nextCursor: CursorId) => {
      if (!isControlled) {
        setSelectedCursor(nextCursor);
      }

      if (storageKey !== false && typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, nextCursor);
      }

      onCursorChange?.(nextCursor);
    },
    [isControlled, onCursorChange, storageKey],
  );

  const value = useMemo(
    () => ({
      cursor: activeCursor,
      cursorId: activeCursor.id,
      cursors,
      setCursor,
    }),
    [activeCursor, cursors, setCursor],
  );

  const style = {
    "--swirski-cursor-active": activeCursor.active,
    "--swirski-cursor": activeCursor.cursor,
    "--swirski-cursor-pointer": activeCursor.pointer,
  } as CSSProperties;

  return (
    <CursorContext.Provider value={value}>
      <style>{cursorSelectorStyles}</style>
      <div
        className={clsx("min-h-full", className)}
        data-swirski-cursor={activeCursor.id}
        data-swirski-cursor-pressed={isPressed ? "true" : undefined}
        onPointerDownCapture={(event) => {
          if (event.pointerType !== "mouse") {
            return;
          }

          setIsPressed(true);
        }}
        style={style}
      >
        {children}
      </div>
    </CursorContext.Provider>
  );
}

export function useSwirskiCursor() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useSwirskiCursor must be used inside CursorProvider.");
  }

  return context;
}
