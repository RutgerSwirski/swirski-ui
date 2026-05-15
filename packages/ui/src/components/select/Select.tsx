"use client";

import {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

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
} & Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">;

function optionText(option: SelectOption) {
  return option.label ?? option.value;
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

export function Select({
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
  ...props
}: SelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const [isOpen, setIsOpen] = useState(false);
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
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
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
      return;
    }

    setHighlightedIndex(
      getEnabledIndex(options, selectedIndex >= 0 ? selectedIndex : 0),
    );
  }, [isOpen, options, selectedIndex]);

  function selectValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setIsOpen(false);
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
      setIsOpen(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className={clsx("relative min-w-0", className)}
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
        className={clsx(
          "flex min-h-12 w-full items-center justify-between gap-3 border-4 border-black bg-white px-3 py-2 text-left text-sm font-black uppercase text-[#0B0B0C] shadow-[4px_4px_0_#0B0B0C] outline-none transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#0B0B0C] focus-visible:shadow-[6px_6px_0_#0057FF] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500",
          triggerClassName,
        )}
        disabled={disabled}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span className={clsx(!selectedOption && "text-black/50")}>
          {selectedOption ? optionText(selectedOption) : placeholder}
        </span>
        <span
          aria-hidden="true"
          className={clsx(
            "grid size-6 shrink-0 place-items-center border-2 border-black bg-[#FFD400] leading-none transition",
            isOpen && "rotate-180",
          )}
        >
          v
        </span>
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-64 overflow-y-auto border-4 border-black bg-white p-1 shadow-[7px_7px_0_#0B0B0C]",
            contentClassName,
          )}
          id={listboxId}
          role="listbox"
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            const isHighlighted = index === highlightedIndex;

            return (
              <button
                aria-disabled={option.disabled}
                aria-selected={isSelected}
                className={clsx(
                  "flex min-h-10 w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs font-black uppercase transition",
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
              >
                <span>{optionText(option)}</span>
                {isSelected && <span aria-hidden="true">x</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
