"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { cn, swirskiAttrs } from "../../system";
import { CursorContext } from "./CursorContext";
import { cursorSelectorStyles, cursorVariableNames } from "./cursor-selectors";
import { getPressedCursorState, type PressedCursorState } from "./cursor-state";
import { getCursorStyle } from "./cursor-style";
import { findCursor, getStoredCursor, storeCursor } from "./cursor-storage";
import { swirskiCursors, type CursorId, type SwirskiCursor } from "./cursors";

export { useSwirskiCursor } from "./CursorContext";

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

    const [pressedCursor, setPressedCursor] =
      useState<PressedCursorState | null>(null);

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
      if (!pressedCursor || typeof window === "undefined") {
        return;
      }

      const releaseCursor = () => {
        setPressedCursor(null);
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
    }, [pressedCursor]);

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

    const value = useMemo(
      () => ({
        cursor: activeCursor,
        cursorId: activeCursor.id,
        cursors,
        setCursor,
      }),
      [activeCursor, cursors, setCursor],
    );

    const cursorStyle = useMemo(() => {
      return getCursorStyle(activeCursor);
    }, [activeCursor]);

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
        const value = cursorStyle[name];

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
          data-swirski-cursor-pressed={pressedCursor ? "true" : undefined}
          data-swirski-cursor-pressed-state={pressedCursor ?? undefined}
          {...swirskiAttrs("cursor-provider", { size, tone, variant })}
          style={{ ...cursorStyle, ...style }}
          onPointerDownCapture={(event) => {
            onPointerDownCapture?.(event);

            if (event.pointerType === "mouse") {
              setPressedCursor(getPressedCursorState(event.target));
            }
          }}
          {...props}
        >
          {children}
        </div>
      </CursorContext.Provider>
    );
  },
);

CursorProvider.displayName = "CursorProvider";
