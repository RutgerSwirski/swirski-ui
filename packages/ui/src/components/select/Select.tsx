"use client";

import {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { usePortalRoot } from "../../system/usePortalRoot";

export type SelectVariant = "default" | "filled";
export type SelectSize = "sm" | "md" | "lg";
export type SelectTone = "default";

export type SelectOption = {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  triggerClassName?: string;
  contentClassName?: string;
  optionClassName?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  tone?: SelectTone;
} & Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">;

const triggerSizeStyles: Record<SelectSize, string> = {
  sm: "min-h-10 px-3 py-1.5 text-xs",
  md: "min-h-12 px-3 py-2 text-sm",
  lg: "min-h-14 px-4 py-3 text-base",
};

const optionSizeStyles: Record<SelectSize, string> = {
  sm: "min-h-9 px-2 py-1.5 text-xs",
  md: "min-h-10 px-3 py-2 text-xs",
  lg: "min-h-12 px-4 py-3 text-sm",
};

function optionText(option: SelectOption) {
  return option.label ?? option.value;
}

function optionSearchText(option: SelectOption) {
  if (typeof option.label === "string" || typeof option.label === "number") {
    return String(option.label);
  }

  return option.value;
}

function getEnabledIndex(options: SelectOption[], startIndex = 0) {
  const directIndex = options.findIndex(
    (option, index) => index >= startIndex && !option.disabled,
  );

  if (directIndex !== -1) {
    return directIndex;
  }

  return options.findIndex((option) => !option.disabled);
}

function getLastEnabledIndex(options: SelectOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) {
      return index;
    }
  }

  return -1;
}

function moveHighlight(
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

function findMatchingOptionIndex(
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

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  disabled = false,
  name,
  className,
  triggerClassName,
  contentClassName,
  optionClassName,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const typeaheadSearchRef = useRef("");
  const typeaheadTimeoutRef = useRef<number | null>(null);
  const portalRoot = usePortalRoot();
  const generatedId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [contentPosition, setContentPosition] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options.find((option) => !option.disabled)?.value ?? "",
  );
  const selectedValue = value ?? internalValue;
  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );
  const [highlightedIndex, setHighlightedIndex] = useState(
    getEnabledIndex(options, selectedIndex >= 0 ? selectedIndex : 0),
  );
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );
  const listboxId = `${generatedId}-listbox`;

  useEffect(() => {
    return () => {
      if (typeaheadTimeoutRef.current) {
        window.clearTimeout(typeaheadTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !rootRef.current?.contains(target) &&
        !contentRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setContentPosition(null);
      return;
    }

    function updatePosition() {
      const rect = rootRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setContentPosition({
        left: rect.left,
        top: rect.bottom + 8,
        width: rect.width,
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setHighlightedIndex((currentIndex) => {
      if (currentIndex >= 0 && !options[currentIndex]?.disabled) {
        return currentIndex;
      }

      return getEnabledIndex(options, selectedIndex >= 0 ? selectedIndex : 0);
    });
  }, [isOpen, options, selectedIndex]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) {
      return;
    }

    const option = document.getElementById(
      `${listboxId}-option-${highlightedIndex}`,
    );

    option?.scrollIntoView?.({ block: "nearest" });
  }, [highlightedIndex, isOpen, listboxId]);

  function selectValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    clearTypeahead();
    setIsOpen(false);
  }

  function clearTypeahead() {
    typeaheadSearchRef.current = "";

    if (typeaheadTimeoutRef.current) {
      window.clearTimeout(typeaheadTimeoutRef.current);
      typeaheadTimeoutRef.current = null;
    }
  }

  function queueTypeaheadReset() {
    if (typeaheadTimeoutRef.current) {
      window.clearTimeout(typeaheadTimeoutRef.current);
    }

    typeaheadTimeoutRef.current = window.setTimeout(() => {
      typeaheadSearchRef.current = "";
      typeaheadTimeoutRef.current = null;
    }, 700);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((currentIndex) =>
        moveHighlight(options, currentIndex, event.key === "ArrowDown" ? 1 : -1),
      );
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(getEnabledIndex(options, 0));
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(getLastEnabledIndex(options));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      const highlightedOption = options[highlightedIndex];

      if (highlightedOption && !highlightedOption.disabled) {
        selectValue(highlightedOption.value);
      }

      return;
    }

    if (event.key === "Escape") {
      clearTypeahead();
      setIsOpen(false);
      return;
    }

    if (
      event.key.length === 1 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      event.preventDefault();

      typeaheadSearchRef.current = `${typeaheadSearchRef.current}${event.key}`;
      queueTypeaheadReset();

      const nextIndex = findMatchingOptionIndex(
        options,
        typeaheadSearchRef.current,
        highlightedIndex >= 0 ? highlightedIndex : selectedIndex,
      );

      if (nextIndex !== -1) {
        setIsOpen(true);
        setHighlightedIndex(nextIndex);
      }
    }
  }

  return (
    <div
      ref={composeRefs(rootRef, ref)}
      className={cn("relative min-w-0", className)}
      {...swirskiAttrs("select", { size, tone, variant })}
      {...props}
    >
      {name && <input type="hidden" name={name} value={selectedValue} />}

      <button
        aria-activedescendant={
          isOpen && highlightedIndex >= 0
            ? `${listboxId}-option-${highlightedIndex}`
            : undefined
        }
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "flex w-full items-center justify-between gap-3 border-4 border-black text-left font-black uppercase text-[#0B0B0C] shadow-[4px_4px_0_#0B0B0C] outline-none transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B0B0C] focus-visible:shadow-[6px_6px_0_#0057FF] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500",
          variant === "default" ? "bg-white" : "bg-[#F5F5F3]",
          triggerSizeStyles[size],
          triggerClassName,
        )}
        disabled={disabled}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        onKeyDown={handleKeyDown}
        type="button"
        {...swirskiAttrs("select-trigger", { size, tone, variant })}
      >
        <span className={cn(!selectedOption && "text-black/50")}>
          {selectedOption ? optionText(selectedOption) : placeholder}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-6 shrink-0 place-items-center border-2 border-black bg-[#FFD400] leading-none transition",
            isOpen && "rotate-180",
          )}
        >
          v
        </span>
      </button>

      {isOpen &&
        contentPosition &&
        portalRoot &&
        createPortal(
          <div
            ref={contentRef}
            className={cn(
              "fixed z-[1000] max-h-64 overflow-y-auto border-4 border-black bg-white p-1 shadow-[7px_7px_0_#0B0B0C]",
              contentClassName,
            )}
            id={listboxId}
            role="listbox"
            {...swirskiAttrs("select-content", { size, tone, variant })}
            style={{
              left: contentPosition.left,
              top: contentPosition.top,
              width: contentPosition.width,
            }}
          >
            {options.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isHighlighted = index === highlightedIndex;

              return (
                <button
                  aria-disabled={option.disabled}
                  aria-selected={isSelected}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 text-left font-black uppercase transition",
                    optionSizeStyles[size],
                    isHighlighted && !option.disabled && "bg-[#FFD400]",
                    isSelected && "bg-[#0057FF] text-white",
                    option.disabled
                      ? "cursor-not-allowed text-black/35"
                      : "hover:bg-[#FFD400] hover:text-black",
                    optionClassName,
                  )}
                  disabled={option.disabled}
                  id={`${listboxId}-option-${index}`}
                  key={option.value}
                  onClick={() => selectValue(option.value)}
                  onMouseEnter={() => {
                    if (!option.disabled) {
                      setHighlightedIndex(index);
                    }
                  }}
                  role="option"
                  type="button"
                  {...swirskiAttrs("select-option", { size, tone, variant })}
                >
                  <span>{optionText(option)}</span>
                  {isSelected && <span aria-hidden="true">x</span>}
                </button>
              );
            })}
          </div>,
          portalRoot,
        )}
    </div>
  );
});

Select.displayName = "Select";
