"use client";
import { useOverlayLayer } from "../../system/overlay";

import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
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
  /** Controlled selected option value. Pair with onValueChange. */
  value?: string;
  /** Initial uncontrolled selection. Defaults to the first enabled option. */
  defaultValue?: string;
  /** Called with the option value when the user selects an option. */
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  /** ID of the owning form when rendered outside it. */
  form?: string;
  /** Block form submission when no option is selected. */
  required?: boolean;
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
    open,
    defaultOpen = false,
    onOpenChange,
    placeholder = "Select an option",
    disabled = false,
    name,
    form,
    required = false,
    selectedIndicator = "x",
    showSelectedIndicator = false,
    className,
    triggerClassName,
    contentClassName,
    optionClassName,
    variant = "default",
    size = "md",
    tone = "default",
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-errormessage": ariaErrorMessage,
    ...props
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const formInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const typeaheadSearchRef = useRef("");
  const typeaheadTimeoutRef = useRef<number | null>(null);
  const portalRoot = usePortalRoot();
  const generatedId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const requestedOpen = open ?? internalOpen;
  const isOpen = !disabled && requestedOpen;
  const setIsOpen = useCallback((nextOpen: boolean) => {
    if (nextOpen === requestedOpen) return;
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }, [onOpenChange, open, requestedOpen]);
  const [initialValue] = useState(
    defaultValue ?? options.find((option) => !option.disabled)?.value ?? "",
  );
  const [internalValue, setInternalValue] = useState(initialValue);
  const isControlled = value !== undefined;

  useEffect(() => {
    const owner = formInputRef.current?.form;
    if (!owner) return;

    let active = true;
    function handleReset(event: Event) {
      queueMicrotask(() => {
        if (!active || event.defaultPrevented) return;
        if (!isControlled) setInternalValue(initialValue);
        setIsOpen(false);
      });
    }
    owner.addEventListener("reset", handleReset);
    return () => {
      active = false;
      owner.removeEventListener("reset", handleReset);
    };
  }, [form, initialValue, isControlled, setIsOpen]);
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
  const valueLabelId = `${generatedId}-value`;
  const popupVisible = isOpen && Boolean(portalRoot);
  const activeOption = options[highlightedIndex];
  const triggerLabel = selectedOption ? optionText(selectedOption) : placeholder;

  useEffect(() => {
    return () => {
      if (typeaheadTimeoutRef.current) {
        window.clearTimeout(typeaheadTimeoutRef.current);
      }
    };
  }, []);

  useOverlayLayer({
    open: popupVisible,
    rootRef,
    contentRef,
    onEscape: () => {
      clearTypeahead();
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    onOutside: () => setIsOpen(false),
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setHighlightedIndex((currentIndex) => {
      const highlighted = options[currentIndex];
      if (highlighted && !highlighted.disabled) {
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
    triggerRef.current?.focus();
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

    if (event.key === "Tab") {
      clearTypeahead();
      setIsOpen(false);
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
      <input
        ref={formInputRef}
        aria-hidden="true"
        className="sr-only pointer-events-none"
        disabled={disabled}
        form={form}
        name={name}
        onChange={() => {}}
        onInvalid={(event) => {
          // Keep native submission blocking, but focus the visible control.
          event.preventDefault();
          triggerRef.current?.focus();
        }}
        required={required}
        tabIndex={-1}
        type={required ? "text" : "hidden"}
        value={required && !selectedOption ? "" : selectedValue}
      />

      <button
        ref={triggerRef}
        id={id ?? generatedId}
        role="combobox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (id === undefined && !ariaLabel ? valueLabelId : undefined)}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-errormessage={ariaErrorMessage}
        aria-required={required || undefined}
        aria-activedescendant={
          popupVisible && activeOption && !activeOption.disabled
            ? `${listboxId}-option-${highlightedIndex}`
            : undefined
        }
        aria-controls={popupVisible ? listboxId : undefined}
        aria-expanded={popupVisible}
        aria-haspopup="listbox"
        className={cn(
          "flex w-full items-center justify-between gap-3 border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] text-left font-black uppercase text-[var(--sw-color-ink)] shadow-[4px_4px_0_var(--sw-color-shadow)] outline-none transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--sw-color-shadow)] active:translate-x-1 active:translate-y-1 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:shadow-[4px_4px_0_var(--sw-color-shadow)]",
          focusVisibleStyles,
          disabledInteractiveStyles,
          variant === "default"
            ? "bg-[var(--sw-color-surface)]"
            : "bg-[var(--sw-color-paper)]",
          triggerSizeStyles[size],
          triggerClassName,
        )}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        type="button"
        {...swirskiAttrs("select-trigger", { size, tone, variant })}
      >
        <span id={valueLabelId} className={cn(!selectedOption && "text-[color:var(--sw-color-muted)]")}>
          {triggerLabel}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-6 shrink-0 place-items-center border-2 border-[color:var(--sw-color-ink)] bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)] leading-none transition",
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
            ariaLabel={ariaLabel}
            ariaLabelledBy={ariaLabelledBy ?? (ariaLabel ? undefined : valueLabelId)}
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
