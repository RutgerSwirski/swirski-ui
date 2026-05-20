export type SwirskiCursorId = "bolt" | "sticker" | "brush" | "target";
export type CursorId = SwirskiCursorId | (string & {});

export type SwirskiCursor = {
  id: CursorId;
  name: string;
  description: string;
  active: string;
  cursor: string;
  pointer: string;
  copy?: string;
  crosshair?: string;
  disabled?: string;
  grab?: string;
  grabbing?: string;
  help?: string;
  move?: string;
  notAllowed?: string;
  progress?: string;
  resize?: string;
  text?: string;
  wait?: string;
  zoomIn?: string;
  zoomOut?: string;
  preview: string;
  swatch: string;
};

type CursorFallback =
  | "auto"
  | "copy"
  | "crosshair"
  | "grab"
  | "grabbing"
  | "help"
  | "move"
  | "not-allowed"
  | "pointer"
  | "progress"
  | "text"
  | "wait"
  | "zoom-in"
  | "zoom-out";

function toDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22")}`;
}

function cursorValue(
  svg: string,
  hotspotX: number,
  hotspotY: number,
  fallback: CursorFallback,
) {
  return `url("${toDataUri(svg)}") ${hotspotX} ${hotspotY}, ${fallback}`;
}

function pixelArrow(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M9 5h4v3h3v3h3v3h3v3h3v4h-8v3h3v5h-6v-5h-3l-3 5H8v-8H5V5z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M5 1h5v3h3v3h3v3h3v3h3v3h4v7h-8v2h3v7h-8v-6h-2l-3 6H3v-8H1V1z" fill="#0B0B0C"/>

  <!-- main fill -->
  <path d="M6 4h3v3h3v3h3v3h3v3h4v3h-8v4h3v5h-2v-6h-5l-3 6H6v-8H4V4z" fill="${fill}"/>

  <!-- pop-art inner cut -->
  <path d="M9 7h2v3h3v3h3v2h-5v3H9z" fill="${accent}"/>

  <!-- stitch / halftone marks -->
  <path d="M7 6h1v1H7zM10 10h1v1h-1zM13 13h1v1h-1zM16 16h1v1h-1z" fill="#0B0B0C"/>
</svg>`;
}

function pixelTextCursor(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M13 4h8v4h-3v18h3v4h-8v-4h3V8h-3z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M10 1h12v7h-4v16h4v7H10v-7h4V8h-4z" fill="#0B0B0C"/>

  <!-- main fill -->
  <path d="M13 4h6v2h-3v20h3v2h-6v-2h3V6h-3z" fill="${fill}"/>

  <!-- pop-art highlight -->
  <path d="M17 7h1v17h-1zM14 5h2v1h-2zM14 26h2v1h-2z" fill="${accent}"/>
</svg>`;
}

function pixelHand(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M16 5h5v4h3v3h3v15h-2v4H12v-3H9v-4H7v-4H5v-6h5v2h2V5z" fill="${shadow}"/>

  <!-- black outline -->
  <path d="M12 1h7v4h3v3h3v3h3v16h-2v4H10v-3H7v-4H5v-4H3v-8h6v2h2V1z" fill="#0B0B0C"/>

  <!-- hand fill -->
  <path d="M14 4h3v15h2V8h2v12h2v-9h2v13h-2v3H11v-3H9v-4H7v-5h2v2h5z" fill="${fill}"/>

  <!-- graphic palm shadow / sticker fold -->
  <path d="M17 8h1v12h-3v-2h2zM21 10h1v10h-2V10zM24 13h1v10h-2V13zM10 18h4v2h-4z" fill="${accent}"/>

  <!-- Swirski stitch marks -->
  <path d="M12 23h1v1h-1zM14 24h1v1h-1zM16 23h1v1h-1zM18 24h1v1h-1z" fill="#0B0B0C"/>
</svg>`;
}

function pixelMagnifier(
  fill: string,
  accent: string,
  shadow: string,
  mode: "in" | "out",
) {
  const verticalMark =
    mode === "in" ? `<path d="M14 9h3v11h-3z" fill="#0B0B0C"/>` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M8 4h11v3h4v4h3v11h-3v3h3v3h3v3h-7v-3h-3v-3H8v-3H5V8h3z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M6 1h14v3h4v4h3v14h-3v2h3v3h3v5h-8v-3h-3v-3H6v-3H3V5h3z" fill="#0B0B0C"/>

  <!-- lens fill -->
  <path d="M8 4h10v3h3v3h3v10h-3v3H8v-3H6V7h2z" fill="${fill}"/>

  <!-- handle fill -->
  <path d="M20 23h3v3h3v3h-3v-3h-3z" fill="${fill}"/>

  <!-- plus/minus mark -->
  <path d="M10 13h11v3H10z" fill="#0B0B0C"/>
  ${verticalMark}

  <!-- highlight -->
  <path d="M9 6h5v2H9zM8 8h2v5H8z" fill="${accent}"/>
</svg>`;
}

function pixelGrabHand(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M10 10h3V5h5v4h3V7h5v4h3v13h-2v5H11v-3H8v-4H6v-7h4z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M6 8h4V2h8v4h3V5h6v4h3v16h-2v5H8v-3H5v-4H3V11h3z" fill="#0B0B0C"/>

  <!-- open hand fill -->
  <path d="M8 11h4V5h3v13h2V8h2v11h2V8h2v11h2v-7h2v12h-2v3H10v-3H8v-4H6v-6h2z" fill="${fill}"/>

  <!-- palm highlight -->
  <path d="M15 7h1v12h-3v-2h2zM19 10h1v9h-2v-9zM23 10h1v9h-2v-9zM9 18h5v2H9z" fill="${accent}"/>

  <!-- stitch marks -->
  <path d="M11 23h1v1h-1zM13 24h1v1h-1zM15 23h1v1h-1zM17 24h1v1h-1z" fill="#0B0B0C"/>
</svg>`;
}

function pixelGrabbingHand(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M10 8h4V5h5v3h4v2h4v15h-2v5H11v-3H8v-4H6V12h4z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M7 5h6V2h7v3h4v2h4v3h2v16h-2v5H9v-3H6v-4H4V9h3z" fill="#0B0B0C"/>

  <!-- closed fist fill -->
  <path d="M9 9h4V6h4v5h2V8h3v5h2v-3h2v4h2v10h-2v3H10v-3H8v-4H6v-8h3z" fill="${fill}"/>

  <!-- compressed knuckle highlight -->
  <path d="M13 7h2v5h-2zM18 10h2v4h-2zM23 12h2v3h-2zM9 15h18v2H9zM11 18h12v2H11z" fill="${accent}"/>

  <!-- stitch marks -->
  <path d="M12 23h1v1h-1zM14 24h1v1h-1zM16 23h1v1h-1zM18 24h1v1h-1z" fill="#0B0B0C"/>
</svg>`;
}

function pixelMoveCursor(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M14 4h5v5h5v5h5v5h-5v5h-5v5h-5v-5H9v-5H4v-5h5V9h5z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M12 0h8v6h6v6h6v8h-6v6h-6v6h-8v-6H6v-6H0v-8h6V6h6z" fill="#0B0B0C"/>

  <!-- four-way arrow fill -->
  <path d="M15 4h2v7h7v2h4v2h-4v2h-7v7h-2v-7H8v-2H4v-2h4v-2h7z" fill="${fill}"/>

  <!-- center pop -->
  <path d="M13 13h6v6h-6zM16 6h1v4h-1zM22 15h4v1h-4zM16 22h1v4h-1zM6 15h4v1H6z" fill="${accent}"/>
</svg>`;
}

function pixelCrosshair(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M16 3h4v9h9v4h-9v4h9v4h-9v6h-4v-6h-4v6H8v-6H2v-4h6v-4H2v-4h6V3h4v9h4z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M13 0h6v10h10v6H19v2h10v6H19v8h-6v-8h-2v8H5v-8H0v-6h5v-2H0v-6h5V0h6v10h2z" fill="#0B0B0C"/>

  <!-- crosshair fill -->
  <path d="M15 3h2v11h11v2H17v2h11v2H17v9h-2v-9h-2v9h-2v-9H3v-2h8v-2H3v-2h8V3h2v11h2z" fill="${fill}"/>

  <!-- target pop -->
  <path d="M13 13h6v6h-6zM15 15h2v2h-2z" fill="${accent}"/>
</svg>`;
}

function pixelBadgeArrow(
  fill: string,
  accent: string,
  shadow: string,
  mark: "ban" | "copy" | "help" | "progress" | "wait",
) {
  const markPath = {
    ban: `<path d="M19 18h7v2h2v7h-2v2h-7v-2h-2v-7h2z" fill="${fill}"/>
    <path d="M20 20h5v1h1v5h-1v1h-5v-1h-1v-5h1z" fill="#0B0B0C"/>
    <path d="M21 21h3v1h1v3h-1v1h-3v-1h-1v-3h1z" fill="${accent}"/>
    <path d="M20 24h2v-2h2v-1h2v2h-2v2h-2v1h-2z" fill="#0B0B0C"/>`,
    copy: `<path d="M18 17h8v3h3v9H18z" fill="#0B0B0C"/>
    <path d="M20 19h4v3h3v5h-7z" fill="${fill}"/>
    <path d="M23 17h5v7h-2v-5h-3zM22 21h3v3h-3z" fill="${accent}"/>`,
    help: `<path d="M20 17h7v2h2v6h-2v2h-2v2h-5v-4h2v-2h2v-2h-4z" fill="#0B0B0C"/>
    <path d="M22 19h3v1h1v3h-2v2h-2v-3h2v-1h-2zM22 27h3v2h-3z" fill="${accent}"/>`,
    progress: `<path d="M19 17h8v2h2v8h-2v2h-8v-2h-2v-8h2z" fill="#0B0B0C"/>
    <path d="M20 19h6v2h1v5h-1v1h-6v-1h-1v-6h1z" fill="${fill}"/>
    <path d="M22 20h2v5h3v2h-5zM20 20h2v2h-2z" fill="${accent}"/>`,
    wait: `<path d="M19 17h9v3h-2v2h-2v2h2v2h2v3h-9v-3h2v-2h2v-2h-2v-2h-2z" fill="#0B0B0C"/>
    <path d="M21 19h5v1h-2v2h-1v-2h-2zM23 24h1v2h2v1h-5v-1h2z" fill="${accent}"/>`,
  }[mark];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M9 5h4v3h3v3h3v3h3v3h3v4h-8v3h3v5h-6v-5h-3l-3 5H8v-8H5V5z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M5 1h5v3h3v3h3v3h3v3h3v3h4v7h-8v2h3v7h-8v-6h-2l-3 6H3v-8H1V1z" fill="#0B0B0C"/>

  <!-- main fill -->
  <path d="M6 4h3v3h3v3h3v3h3v3h4v3h-8v4h3v5h-2v-6h-5l-3 6H6v-8H4V4z" fill="${fill}"/>

  <!-- pop-art inner cut -->
  <path d="M9 7h2v3h3v3h3v2h-5v3H9z" fill="${accent}"/>

  ${markPath}
</svg>`;
}

function pixelDisabledCursor(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- offset comic shadow -->
  <path d="M9 2h14v3h4v4h3v14h-3v4h-4v3H9v-3H5v-4H2V9h3V5h4z" fill="${shadow}"/>

  <!-- black chunky outline -->
  <path d="M7 0h16v3h4v4h3v18h-3v4h-4v3H7v-3H3v-4H0V7h3V3h4z" fill="#0B0B0C"/>

  <!-- disabled badge fill -->
  <path d="M9 4h12v2h4v4h2v12h-2v4h-4v2H9v-2H6v-4H4V10h2V6h3z" fill="${fill}"/>

  <!-- diagonal no-entry slash -->
  <path d="M21 7h4v4h-2v3h-3v3h-3v3h-3v3h-3v2H7v-4h3v-3h3v-3h3v-3h3V9h2z" fill="#0B0B0C"/>
  <path d="M22 9h1v1h-2v3h-3v3h-3v3h-3v3h-3v1H8v-1h3v-3h3v-3h3v-3h3v-3h2z" fill="${accent}"/>

  <!-- chunky edge highlights -->
  <path d="M9 6h5v2H9zM7 8h2v5H7zM22 24h3v2h-3zM25 19h2v5h-2z" fill="${accent}"/>
</svg>`;
}

function pixelClickHand(fill: string, accent: string, shadow: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges">
  <!-- action marks -->
  <path d="M4 4h3v2H4zM7 7h2v2H7zM23 3h2v4h-2zM26 7h3v2h-3z" fill="${accent}"/>

  <!-- offset comic shadow -->
  <path d="M15 9h5v2h4v3h3v13h-2v4H11v-3H8v-4H6v-4H4v-6h5v-2h4V9z" fill="${shadow}"/>

  <!-- black outline -->
  <path d="M12 5h7v2h4v3h3v3h2v13h-2v4H9v-3H6v-4H4v-4H2v-8h6V9h4z" fill="#0B0B0C"/>

  <!-- compressed hand fill -->
  <path d="M14 8h3v3h4v3h3v1h2v9h-2v3H10v-3H8v-4H6v-5h2v3h6z" fill="${fill}"/>

  <!-- pressed highlight -->
  <path d="M17 11h4v3h2v2h-7zM22 16h2v8h-2zM9 16h5v2H9z" fill="${accent}"/>

  <!-- tiny halftone/stitch dots -->
  <path d="M12 22h1v1h-1zM14 23h1v1h-1zM16 22h1v1h-1zM18 23h1v1h-1z" fill="#0B0B0C"/>
</svg>`;
}

function pixelCursorSet(fill: string, accent: string, shadow: string) {
  const cursor = pixelArrow(fill, accent, shadow);
  const pointer = pixelHand(fill, accent, shadow);
  const active = pixelClickHand(fill, accent, shadow);
  const copy = pixelBadgeArrow(fill, accent, shadow, "copy");
  const crosshair = pixelCrosshair(fill, accent, shadow);
  const disabled = pixelDisabledCursor(fill, accent, shadow);
  const grab = pixelGrabHand(fill, accent, shadow);
  const grabbing = pixelGrabbingHand(fill, accent, shadow);
  const help = pixelBadgeArrow(fill, accent, shadow, "help");
  const move = pixelMoveCursor(fill, accent, shadow);
  const notAllowed = pixelBadgeArrow(fill, accent, shadow, "ban");
  const progress = pixelBadgeArrow(fill, accent, shadow, "progress");
  const wait = pixelBadgeArrow(fill, accent, shadow, "wait");
  const text = pixelTextCursor(fill, accent, shadow);
  const zoomIn = pixelMagnifier(fill, accent, shadow, "in");
  const zoomOut = pixelMagnifier(fill, accent, shadow, "out");

  return {
    active: cursorValue(active, 14, 10, "pointer"),
    copy: cursorValue(copy, 5, 2, "copy"),
    crosshair: cursorValue(crosshair, 16, 16, "crosshair"),
    cursor: cursorValue(cursor, 5, 2, "auto"),
    disabled: cursorValue(disabled, 16, 16, "not-allowed"),
    grab: cursorValue(grab, 15, 8, "grab"),
    grabbing: cursorValue(grabbing, 15, 8, "grabbing"),
    help: cursorValue(help, 5, 2, "help"),
    move: cursorValue(move, 16, 16, "move"),
    notAllowed: cursorValue(notAllowed, 5, 2, "not-allowed"),
    pointer: cursorValue(pointer, 15, 3, "pointer"),
    progress: cursorValue(progress, 5, 2, "progress"),
    resize: cursorValue(move, 16, 16, "move"),
    text: cursorValue(text, 16, 16, "text"),
    wait: cursorValue(wait, 5, 2, "wait"),
    zoomIn: cursorValue(zoomIn, 15, 15, "zoom-in"),
    zoomOut: cursorValue(zoomOut, 15, 15, "zoom-out"),
    preview: toDataUri(cursor),
  };
}

const studioClassic = pixelCursorSet("#FFFFFF", "#F5F5F3", "#00D7DF");
const bangYellow = pixelCursorSet("#FFD400", "#FFFFFF", "#0057FF");
const comicPink = pixelCursorSet("#FF4FD8", "#FFD400", "#0057FF");
const stitchGreen = pixelCursorSet("#00D084", "#FFFFFF", "#FF4FD8");

export const swirskiCursors: SwirskiCursor[] = [
  {
    id: "bolt",
    name: "Studio Classic",
    description: "White sticker cursor with a cyan comic shadow.",
    ...studioClassic,
    swatch: "#00D7DF",
  },
  {
    id: "sticker",
    name: "Bang Yellow",
    description: "Yellow pop-art cursor with a bold blue offset shadow.",
    ...bangYellow,
    swatch: "#FFD400",
  },
  {
    id: "brush",
    name: "Comic Pink",
    description: "Hot pink cursor set with yellow highlights and blue shadow.",
    ...comicPink,
    swatch: "#FF4FD8",
  },
  {
    id: "target",
    name: "Stitch Green",
    description: "Green cursor set with a pink stitched comic shadow.",
    ...stitchGreen,
    swatch: "#00D084",
  },
];

export function getSwirskiCursor(id: CursorId) {
  return swirskiCursors.find((cursor) => cursor.id === id) ?? swirskiCursors[0];
}
