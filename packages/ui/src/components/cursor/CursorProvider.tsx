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
const cursorVariableNames = [
  "--swirski-cursor",
  "--swirski-cursor-pointer",
  "--swirski-cursor-active",
  "--swirski-cursor-text",
  "--swirski-cursor-zoom-in",
  "--swirski-cursor-zoom-out",
] as const;

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
    [data-cursor="zoom-in"],
    [data-swirski-cursor-zoom="in"],
    .cursor-zoom-in
  ) {
    cursor: var(--swirski-cursor-zoom-in);
  }

  [data-swirski-cursor] :is(
    [data-cursor="zoom-out"],
    [data-swirski-cursor-zoom="out"],
    .cursor-zoom-out
  ) {
    cursor: var(--swirski-cursor-zoom-out);
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
    [data-cursor="text"],
    [contenteditable="true"]
  ) {
    cursor: var(--swirski-cursor-text);
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
  function CursorProvider(
    {
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
    },
    ref,
  ) {
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

  const cursorStyle = useMemo(
    () =>
      ({
        "--swirski-cursor": activeCursor.cursor,
        "--swirski-cursor-pointer": activeCursor.pointer,
        "--swirski-cursor-active": activeCursor.active,
        "--swirski-cursor-text": activeCursor.text ?? activeCursor.cursor,
        "--swirski-cursor-zoom-in": activeCursor.zoomIn ?? activeCursor.pointer,
        "--swirski-cursor-zoom-out":
          activeCursor.zoomOut ?? activeCursor.pointer,
      }) as CSSProperties,
    [
      activeCursor.active,
      activeCursor.cursor,
      activeCursor.pointer,
      activeCursor.text,
      activeCursor.zoomIn,
      activeCursor.zoomOut,
    ],
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const body = document.body;
    const previousCursor = body.getAttribute("data-swirski-cursor");
    const previousVariables = cursorVariableNames.map((name) =>
      body.style.getPropertyValue(name),
    );

    body.setAttribute("data-swirski-cursor", activeCursor.id);
    cursorVariableNames.forEach((name) => {
      const value = cursorStyle[name as keyof typeof cursorStyle];

      if (typeof value === "string") {
        body.style.setProperty(name, value);
      }
    });

    return () => {
      if (previousCursor === null) {
        body.removeAttribute("data-swirski-cursor");
      } else {
        body.setAttribute("data-swirski-cursor", previousCursor);
      }

      cursorVariableNames.forEach((name, index) => {
        const previousValue = previousVariables[index];

        if (previousValue) {
          body.style.setProperty(name, previousValue);
        } else {
          body.style.removeProperty(name);
        }
      });
    };
  }, [activeCursor.id, cursorStyle]);

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
