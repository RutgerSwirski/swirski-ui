"use client";

import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  cn,
  composeRefs,
  disabledInteractiveStyles,
  focusVisibleStyles,
  swirskiAttrs,
} from "../../system";
import { useFloatingPosition } from "../../system/floating";
import { usePortalRoot } from "../../hooks/use-portal-root/usePortalRoot";
import SelectContent from "./SelectContent";
import type {
  SelectOption,
  SelectSize,
  SelectTone,
  SelectVariant,
} from "./select-types";
import {
  findMatchingOptionIndex,
  getEnabledIndex,
  getLastEnabledIndex,
  moveHighlight,
  optionText,
  triggerSizeStyles,
} from "./select-utils";

export type {
  SelectOption,
  SelectSize,
  SelectTone,
  SelectVariant,
} from "./select-types";

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  selectedIndicator?: ReactNode;
  showSelectedIndicator?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  optionClassName?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  tone?: SelectTone;
} & Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">;

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select an option",
    disabled = false,
    name,
    selectedIndicator = "x",
    showSelectedIndicator = false,
    className,
    triggerClassName,
    contentClassName,
    optionClassName,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const typeaheadSearchRef = useRef("");
  const typeaheadTimeoutRef = useRef<number | null>(null);
  const portalRoot = usePortalRoot();
  const generatedId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options.find((option) => !option.disabled)?.value ?? "",
  );
  const contentStyle = useFloatingPosition({
    floatingRef: contentRef,
    matchReferenceWidth: true,
    open: isOpen,
    placement: "bottom-start",
    referenceRef: rootRef,
  });
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
        moveHighlight(
          options,
          currentIndex,
          event.key === "ArrowDown" ? 1 : -1,
        ),
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
          "flex w-full items-center justify-between gap-3 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] text-left font-black uppercase text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--sw-color-shadow)] active:translate-x-1 active:translate-y-1 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          variant === "default" ? "bg-[var(--sw-color-surface)]" : "bg-[var(--sw-color-paper)]",
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
            "grid size-6 shrink-0 place-items-center border-2 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] leading-none transition",
            isOpen && "rotate-180",
          )}
        >
          v
        </span>
      </button>

      {isOpen &&
        portalRoot &&
        createPortal(
          <SelectContent
            contentClassName={contentClassName}
            contentStyle={contentStyle}
            contentRef={contentRef}
            highlightedIndex={highlightedIndex}
            listboxId={listboxId}
            onOptionHover={setHighlightedIndex}
            onOptionSelect={selectValue}
            optionClassName={optionClassName}
            options={options}
            selectedIndicator={selectedIndicator}
            selectedValue={selectedValue}
            showSelectedIndicator={showSelectedIndicator}
            size={size}
            tone={tone}
            variant={variant}
          />,
          portalRoot,
        )}
    </div>
  );
});

Select.displayName = "Select";
