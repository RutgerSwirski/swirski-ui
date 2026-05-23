export const cursorVariableNames = [
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

export const cursorSelectorStyles = `
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
