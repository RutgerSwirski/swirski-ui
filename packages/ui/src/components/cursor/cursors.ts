export type SwirskiCursorId = "bolt" | "sticker" | "brush" | "target";
export type CursorId = SwirskiCursorId | (string & {});

export type SwirskiCursor = {
  id: CursorId;
  name: string;
  description: string;
  active: string;
  cursor: string;
  pointer: string;
  text?: string;
  zoomIn?: string;
  zoomOut?: string;
  preview: string;
  swatch: string;
};

function toDataUri(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22")}`;
}

function cursorValue(
  svg: string,
  hotspotX: number,
  hotspotY: number,
  fallback: "auto" | "pointer" | "text" | "zoom-in" | "zoom-out",
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
  const text = pixelTextCursor(fill, accent, shadow);
  const zoomIn = pixelMagnifier(fill, accent, shadow, "in");
  const zoomOut = pixelMagnifier(fill, accent, shadow, "out");

  return {
    active: cursorValue(active, 14, 10, "pointer"),
    cursor: cursorValue(cursor, 5, 2, "auto"),
    pointer: cursorValue(pointer, 15, 3, "pointer"),
    text: cursorValue(text, 16, 16, "text"),
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
