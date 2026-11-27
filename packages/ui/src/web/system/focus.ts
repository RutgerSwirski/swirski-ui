const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) =>
      element.tabIndex >= 0 &&
      !element.matches(":disabled, input[type=hidden]") &&
      !element.closest("[hidden], [inert], [aria-hidden=true]") &&
      getComputedStyle(element).visibility === "visible" &&
      !hasDisplayNoneAncestor(element),
    );
}

function hasDisplayNoneAncestor(element: HTMLElement) {
  for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
    if (getComputedStyle(ancestor).display === "none") return true;
  }
  return false;
}

export function focusInitialElement(container: HTMLElement) {
  const firstFocusable = getFocusableElements(container)[0] ?? container;
  firstFocusable.focus();
}

export function trapFocus(
  container: HTMLElement,
  event: KeyboardEvent,
  portals: HTMLElement[] = [],
) {
  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = [...new Set([container, ...portals].flatMap(getFocusableElements))];

  if (focusableElements.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;
  const currentIndex = focusableElements.findIndex((element) => element === activeElement);

  if (portals.length && currentIndex >= 0) {
    const offset = event.shiftKey ? -1 : 1;
    event.preventDefault();
    focusableElements[(currentIndex + offset + focusableElements.length) % focusableElements.length].focus();
    return;
  }

  const focusOutsideSequence = currentIndex < 0;

  if (event.shiftKey && (activeElement === firstElement || focusOutsideSequence)) {
    event.preventDefault();
    lastElement.focus();
    return;
  }

  if (!event.shiftKey && (activeElement === lastElement || focusOutsideSequence)) {
    event.preventDefault();
    firstElement.focus();
  }
}
