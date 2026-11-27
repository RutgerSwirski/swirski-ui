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

export function getEnabledMenuItems(content: HTMLElement) {
  return Array.from(content.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    .filter((item) => item.closest('[role="menu"]') === content)
    .filter((item) => !item.hasAttribute("disabled"))
    .filter((item) => item.getAttribute("aria-disabled") !== "true");
}

export function focusMatchingMenuItem(content: HTMLElement, search: string) {
  const items = getEnabledMenuItems(content);
  const current = items.indexOf(content.ownerDocument.activeElement as HTMLElement);
  const characters = Array.from(search);
  const query = characters.every((character) => character === characters[0])
    ? characters[0]
    : search;
  const start = query.length === 1 ? current + 1 : Math.max(current, 0);
  for (let offset = 0; offset < items.length; offset += 1) {
    const item = items[(start + offset) % items.length];
    const referencedLabel = item.getAttribute("aria-labelledby")?.split(/\s+/)
      .map((id) => item.ownerDocument.getElementById(id)?.textContent ?? "").join(" ").trim();
    const label = referencedLabel || item.getAttribute("aria-label") || item.textContent || "";
    if (label.trim().toLocaleLowerCase().startsWith(query)) {
      item.focus();
      break;
    }
  }
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
