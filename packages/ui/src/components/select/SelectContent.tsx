import type { ReactNode, Ref } from "react";
import { cn, swirskiAttrs } from "../../system";
import type {
  SelectOption,
  SelectSize,
  SelectTone,
  SelectVariant,
} from "./select-types";
import { optionSizeStyles, optionText } from "./select-utils";

export type SelectContentPosition = {
  left: number;
  top: number;
  width: number;
};

export type SelectContentProps = {
  contentClassName?: string;
  contentPosition: SelectContentPosition;
  contentRef: Ref<HTMLDivElement>;
  highlightedIndex: number;
  listboxId: string;
  onOptionHover: (index: number) => void;
  onOptionSelect: (value: string) => void;
  optionClassName?: string;
  options: SelectOption[];
  selectedIndicator: ReactNode;
  selectedValue: string;
  showSelectedIndicator: boolean;
  size: SelectSize;
  tone: SelectTone;
  variant: SelectVariant;
};

export default function SelectContent({
  contentClassName,
  contentPosition,
  contentRef,
  highlightedIndex,
  listboxId,
  onOptionHover,
  onOptionSelect,
  optionClassName,
  options,
  selectedIndicator,
  selectedValue,
  showSelectedIndicator,
  size,
  tone,
  variant,
}: SelectContentProps) {
  return (
    <div
      ref={contentRef}
      className={cn(
        "fixed z-[1000] max-h-64 min-w-50 overflow-y-auto border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-1 shadow-[7px_7px_0_var(--sw-color-shadow)]",
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
              isHighlighted && !option.disabled && "bg-[var(--sw-color-blue)] text-white",
              isSelected && "bg-[var(--sw-color-blue)] text-white",
              option.disabled
                ? "cursor-not-allowed text-black/35"
                : "hover:bg-[var(--sw-color-blue)] hover:text-white",
              optionClassName,
            )}
            disabled={option.disabled}
            id={`${listboxId}-option-${index}`}
            key={option.value}
            onClick={() => onOptionSelect(option.value)}
            onMouseEnter={() => {
              if (!option.disabled) {
                onOptionHover(index);
              }
            }}
            role="option"
            type="button"
            {...swirskiAttrs("select-option", { size, tone, variant })}
          >
            <span>{optionText(option)}</span>

            {showSelectedIndicator && isSelected && (
              <span aria-hidden="true">{selectedIndicator}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
