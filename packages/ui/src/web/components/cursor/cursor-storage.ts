import {
  getSwirskiCursor,
  swirskiCursors,
  type CursorId,
  type SwirskiCursor,
} from "./cursors";

export function getStoredCursor(
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

export function storeCursor(storageKey: string | false, cursorId: CursorId) {
  if (storageKey === false || typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, cursorId);
  } catch {
    // Ignore storage errors, for example private browsing or blocked storage.
  }
}

export function findCursor(cursors: SwirskiCursor[], cursorId: CursorId) {
  return (
    cursors.find((cursor) => cursor.id === cursorId) ??
    getSwirskiCursor(cursorId) ??
    cursors[0] ??
    swirskiCursors[0]
  );
}
