import type { DropdownMenuSize } from "./dropdown-menu-types";

export const triggerSizeStyles: Record<DropdownMenuSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-base",
};

export const itemSizeStyles: Record<DropdownMenuSize, string> = {
  sm: "min-h-9 px-2 py-1.5 text-xs",
  md: "min-h-10 px-3 py-2 text-xs",
  lg: "min-h-12 px-4 py-3 text-sm",
};

function getEnabledMenuItems(content: HTMLElement) {
  return Array.from(content.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    .filter((item) => !item.hasAttribute("disabled"))
    .filter((item) => item.getAttribute("aria-disabled") !== "true");
}

export function getCurrentMenuItemIndex(content: HTMLElement) {
  return getEnabledMenuItems(content).findIndex(
    (item) => item === document.activeElement,
  );
}

export function focusMenuItem(content: HTMLElement, index: number) {
  const items = getEnabledMenuItems(content);

  if (!items.length) {
    return;
  }

  const nextIndex = (index + items.length) % items.length;
  items[nextIndex]?.focus();
}
