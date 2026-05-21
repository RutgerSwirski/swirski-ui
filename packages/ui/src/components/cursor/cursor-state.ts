export type PressedCursorState = "active" | "grabbing";

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

export function getPressedCursorState(target: EventTarget | null) {
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
