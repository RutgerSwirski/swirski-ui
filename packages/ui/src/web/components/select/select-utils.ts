import type { SelectOption, SelectSize } from "./select-types";

export const triggerSizeStyles: Record<SelectSize, string> = {
  sm: "min-h-10 px-3 py-1.5 text-xs",
  md: "min-h-12 px-3 py-2 text-sm",
  lg: "min-h-14 px-4 py-3 text-base",
};

export const optionSizeStyles: Record<SelectSize, string> = {
  sm: "min-h-9 px-2 py-1.5 text-xs",
  md: "min-h-10 px-3 py-2 text-xs",
  lg: "min-h-12 px-4 py-3 text-sm",
};

export function optionText(option: SelectOption) {
  return option.label ?? option.value;
}

function optionSearchText(option: SelectOption) {
  if (typeof option.label === "string" || typeof option.label === "number") {
    return String(option.label);
  }

  return option.value;
}

export function getEnabledIndex(options: SelectOption[], startIndex = 0) {
  const directIndex = options.findIndex(
    (option, index) => index >= startIndex && !option.disabled,
  );

  if (directIndex !== -1) {
    return directIndex;
  }

  return options.findIndex((option) => !option.disabled);
}

export function getLastEnabledIndex(options: SelectOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

export function moveHighlight(
  options: SelectOption[],
  currentIndex: number,
  direction: 1 | -1,
) {
  if (!options.some((option) => !option.disabled)) {
    return currentIndex;
  }

  let nextIndex = currentIndex;

  for (let count = 0; count < options.length; count += 1) {
    nextIndex = (nextIndex + direction + options.length) % options.length;

    if (!options[nextIndex]?.disabled) {
      return nextIndex;
    }
  }

  return currentIndex;
}

export function findMatchingOptionIndex(
  options: SelectOption[],
  search: string,
  currentIndex: number,
) {
  if (!search || !options.length) {
    return -1;
  }

  const normalizedSearch = search.toLowerCase();
  const isRepeatedCharacterSearch =
    normalizedSearch.length > 1 &&
    normalizedSearch.split("").every((char) => char === normalizedSearch[0]);
  const lookup = isRepeatedCharacterSearch
    ? normalizedSearch[0]
    : normalizedSearch;

  for (let offset = 1; offset <= options.length; offset += 1) {
    const index = (currentIndex + offset + options.length) % options.length;
    const option = options[index];

    if (
      option &&
      !option.disabled &&
      optionSearchText(option).toLowerCase().startsWith(lookup)
    ) {
      return index;
    }
  }

  return -1;
}
