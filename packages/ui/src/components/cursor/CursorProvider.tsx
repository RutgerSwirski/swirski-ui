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
  "--swirski-cursor-active",
  "--swirski-cursor-copy",
  "--swirski-cursor-crosshair",
  "--swirski-cursor-disabled",
  "--swirski-cursor-grab",
  "--swirski-cursor-grabbing",
  "--swirski-cursor-help",
  "--swirski-cursor-move",
  "--swirski-cursor-not-allowed",
  "--swirski-cursor-pointer",
  "--swirski-cursor-progress",
  "--swirski-cursor-resize",
  "--swirski-cursor-text",
  "--swirski-cursor-wait",
  "--swirski-cursor-zoom-in",
  "--swirski-cursor-zoom-out",
] as const;

type PressedCursorState = "active" | "grabbing";

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
    input[type="range"],
    input[type="button"],
    input[type="checkbox"],
    input[type="radio"],
    input[type="reset"],
    input[type="submit"],
    [role="button"],
    .cursor-pointer,
    [data-cursor="pointer"]
  ) {
    cursor: var(--swirski-cursor-pointer);
  }

  [data-swirski-cursor] :is(
    input:not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"]),
    textarea,
    [contenteditable="true"],
    .cursor-text,
    [data-cursor="text"]
  ) {
    cursor: var(--swirski-cursor-text);
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
    [data-cursor="grab"],
    [data-cursor="pan"],
    [data-swirski-cursor-pan="true"],
    [draggable="true"],
    .cursor-grab
  ) {
    cursor: var(--swirski-cursor-grab);
  }

  [data-swirski-cursor] :is(
    [data-cursor="grabbing"],
    [data-cursor="panning"],
    [data-swirski-cursor-panning="true"],
    .cursor-grabbing
  ),
  [data-swirski-cursor] :is(
    [data-cursor="grab"],
    [data-cursor="pan"],
    [data-swirski-cursor-pan="true"],
    [draggable="true"],
    .cursor-grab
  ):active {
    cursor: var(--swirski-cursor-grabbing);
  }

  [data-swirski-cursor] :is(
    [data-cursor="move"],
    .cursor-all-scroll,
    .cursor-move
  ) {
    cursor: var(--swirski-cursor-move);
  }

  [data-swirski-cursor] :is(
    [data-cursor="resize"],
    [data-cursor$="-resize"],
    [data-resize-handle],
    [data-swirski-cursor-resize="true"],
    .cursor-col-resize,
    .cursor-ew-resize,
    .cursor-nesw-resize,
    .cursor-ns-resize,
    .cursor-nwse-resize,
    .cursor-row-resize
  ) {
    cursor: var(--swirski-cursor-resize);
  }

  [data-swirski-cursor] :is(
    [data-cursor="copy"],
    [data-cursor="alias"],
    .cursor-alias,
    .cursor-copy
  ) {
    cursor: var(--swirski-cursor-copy);
  }

  [data-swirski-cursor] :is(
    [data-cursor="crosshair"],
    [data-cursor="cell"],
    .cursor-cell,
    .cursor-crosshair
  ) {
    cursor: var(--swirski-cursor-crosshair);
  }

  [data-swirski-cursor] :is(
    [data-cursor="help"],
    .cursor-help
  ) {
    cursor: var(--swirski-cursor-help);
  }

  [data-swirski-cursor] :is(
    [aria-busy="true"],
    [data-busy="true"],
    [data-cursor="progress"],
    [data-loading="true"],
    .cursor-progress
  ) {
    cursor: var(--swirski-cursor-progress);
  }

  [data-swirski-cursor] :is(
    [data-cursor="wait"],
    .cursor-wait
  ) {
    cursor: var(--swirski-cursor-wait);
  }

  [data-swirski-cursor] :is(
    [data-cursor="not-allowed"],
    .cursor-not-allowed
  ) {
    cursor: var(--swirski-cursor-not-allowed);
  }

  [data-swirski-cursor] :is(
    [data-cursor="active"],
    [data-swirski-cursor-state="active"],
    .cursor-active
  ) {
    cursor: var(--swirski-cursor-active);
  }

  [data-swirski-cursor] :is(
    a,
    button,
    summary,
    label,
    select,
    input[type="range"],
    input[type="button"],
    input[type="checkbox"],
    input[type="radio"],
    input[type="reset"],
    input[type="submit"],
    [role="button"],
    .cursor-pointer,
    [data-cursor="pointer"],
    [data-cursor="active"]
  ):active {
    cursor: var(--swirski-cursor-active);
  }

  [data-swirski-cursor][data-swirski-cursor-pressed-state="active"],
  [data-swirski-cursor][data-swirski-cursor-pressed-state="active"] * {
    cursor: var(--swirski-cursor-active);
  }

  [data-swirski-cursor][data-swirski-cursor-pressed-state="grabbing"],
  [data-swirski-cursor][data-swirski-cursor-pressed-state="grabbing"] * {
    cursor: var(--swirski-cursor-grabbing);
  }

  [data-swirski-cursor][data-swirski-cursor] :is(
    :disabled,
    [aria-disabled="true"],
    [data-cursor="disabled"],
    [data-disabled="true"],
    [data-state="disabled"],
    [disabled],
    .cursor-disabled
  ),
  [data-swirski-cursor][data-swirski-cursor] :is(
    :disabled,
    [aria-disabled="true"],
    [data-cursor="disabled"],
    [data-disabled="true"],
    [data-state="disabled"],
    [disabled],
    .cursor-disabled
  ):is(:hover, :active),
  [data-swirski-cursor][data-swirski-cursor] :is(
    :disabled,
    [aria-disabled="true"],
    [data-cursor="disabled"],
    [data-disabled="true"],
    [data-state="disabled"],
    [disabled],
    .cursor-disabled
  ) * {
    cursor: var(--swirski-cursor-disabled);
  }
}
`;

const disabledCursorSelector = [
  ":disabled",
  "[aria-disabled=\"true\"]",
  "[data-cursor=\"disabled\"]",
  "[data-cursor=\"not-allowed\"]",
  "[data-disabled=\"true\"]",
  "[data-state=\"disabled\"]",
  "[disabled]",
  ".cursor-disabled",
  ".cursor-not-allowed",
].join(", ");

const panningCursorSelector = [
  "[data-cursor=\"grab\"]",
  "[data-cursor=\"grabbing\"]",
  "[data-cursor=\"pan\"]",
  "[data-cursor=\"panning\"]",
  "[data-swirski-cursor-pan=\"true\"]",
  "[data-swirski-cursor-panning=\"true\"]",
  "[draggable=\"true\"]",
  ".cursor-grab",
  ".cursor-grabbing",
].join(", ");

const activeCursorSelector = [
  "a",
  "button",
  "summary",
  "label",
  "select",
  "input[type=\"range\"]",
  "input[type=\"button\"]",
  "input[type=\"checkbox\"]",
  "input[type=\"radio\"]",
  "input[type=\"reset\"]",
  "input[type=\"submit\"]",
  "[role=\"button\"]",
  ".cursor-pointer",
  "[data-cursor=\"active\"]",
  "[data-cursor=\"pointer\"]",
].join(", ");

function getPressedCursorState(target: EventTarget | null) {
  if (typeof Element === "undefined" || !(target instanceof Element)) {
    return null;
  }

  if (target.closest(disabledCursorSelector)) {
    return null;
  }

  const panningElement = target.closest(panningCursorSelector);
  const activeElement = target.closest(activeCursorSelector);

  if (
    panningElement &&
    (!activeElement ||
      panningElement === activeElement ||
      activeElement.contains(panningElement))
  ) {
    return "grabbing";
  }

  if (activeElement) {
    return "active";
  }

  return null;
}

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
          "--swirski-cursor-copy": activeCursor.copy ?? activeCursor.pointer,
          "--swirski-cursor-crosshair":
            activeCursor.crosshair ?? activeCursor.cursor,
          "--swirski-cursor-disabled":
            activeCursor.disabled ??
            activeCursor.notAllowed ??
            activeCursor.cursor,
          "--swirski-cursor-grab": activeCursor.grab ?? activeCursor.pointer,
          "--swirski-cursor-grabbing":
            activeCursor.grabbing ?? activeCursor.active,
          "--swirski-cursor-help": activeCursor.help ?? activeCursor.pointer,
          "--swirski-cursor-move":
            activeCursor.move ?? activeCursor.grab ?? activeCursor.pointer,
          "--swirski-cursor-not-allowed":
            activeCursor.notAllowed ?? activeCursor.cursor,
          "--swirski-cursor-progress":
            activeCursor.progress ?? activeCursor.pointer,
          "--swirski-cursor-resize":
            activeCursor.resize ??
            activeCursor.move ??
            activeCursor.grab ??
            activeCursor.pointer,
          "--swirski-cursor-text": activeCursor.text ?? activeCursor.cursor,
          "--swirski-cursor-wait":
            activeCursor.wait ?? activeCursor.progress ?? activeCursor.pointer,
          "--swirski-cursor-zoom-in": activeCursor.zoomIn ?? activeCursor.pointer,
          "--swirski-cursor-zoom-out":
            activeCursor.zoomOut ?? activeCursor.pointer,
        }) as CSSProperties,
      [
        activeCursor.active,
        activeCursor.copy,
        activeCursor.crosshair,
        activeCursor.cursor,
        activeCursor.disabled,
        activeCursor.grab,
        activeCursor.grabbing,
        activeCursor.help,
        activeCursor.move,
        activeCursor.notAllowed,
        activeCursor.pointer,
        activeCursor.progress,
        activeCursor.resize,
        activeCursor.text,
        activeCursor.wait,
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
  });

CursorProvider.displayName = "CursorProvider";

export function useSwirskiCursor() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useSwirskiCursor must be used inside CursorProvider.");
  }

  return context;
}
