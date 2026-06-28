import type { CSSProperties } from "react";
import type { SwirskiCursor } from "./cursors";

export type CursorStyle = CSSProperties & Record<string, string>;

export function getCursorStyle(activeCursor: SwirskiCursor): CursorStyle {
  return {
    "--swirski-cursor": activeCursor.cursor,
    "--swirski-cursor-pointer": activeCursor.pointer,
    "--swirski-cursor-active": activeCursor.active,
    "--swirski-cursor-copy": activeCursor.copy ?? activeCursor.pointer,
    "--swirski-cursor-crosshair":
      activeCursor.crosshair ?? activeCursor.cursor,
    "--swirski-cursor-disabled":
      activeCursor.disabled ?? activeCursor.notAllowed ?? activeCursor.cursor,
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
    "--swirski-cursor-zoom-out": activeCursor.zoomOut ?? activeCursor.pointer,
  } as CursorStyle;
}
