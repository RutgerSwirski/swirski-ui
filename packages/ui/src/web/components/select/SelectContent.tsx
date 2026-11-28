import type { CSSProperties, ReactNode, Ref } from "react";
import { cn, swirskiAttrs } from "../../system";
import type {
  SelectOption,
  SelectSize,
  SelectTone,
  SelectVariant,
} from "./select-types";
import { optionSizeStyles, optionText } from "./select-utils";

export type SelectContentProps = {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  contentClassName?: string;
  contentRef: Ref<HTMLDivElement>;
  contentStyle: CSSProperties;
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
  ariaLabel,
  ariaLabelledBy,
  contentClassName,
  contentRef,
  contentStyle,
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
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      ref={contentRef}
      className={cn(
        "fixed z-[1000] max-h-64 min-w-50 overflow-y-auto border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] bg-[var(--sw-color-surface)] p-1 shadow-[7px_7px_0_var(--sw-color-shadow)]",
        contentClassName,
      )}
      id={listboxId}
      role="listbox"
      data-state="open"
      {...swirskiAttrs("select-content", { size, tone, variant })}
      style={contentStyle}
    >
      {options.map((option, index) => {
        const isSelected = option.value === selectedValue;
        const isHighlighted = index === highlightedIndex;

        return (
          <div
            aria-disabled={option.disabled}
            aria-selected={isSelected}
            className={cn(
              "flex w-full items-center justify-between gap-3 text-left font-black uppercase sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)]",
              optionSizeStyles[size],
              isHighlighted &&
                !option.disabled &&
                "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
              isSelected && "bg-[var(--sw-color-blue)] text-[color:var(--sw-color-on-blue)]",
              option.disabled
                ? "cursor-not-allowed text-black/35"
                : "hover:bg-[var(--sw-color-blue)] hover:text-[color:var(--sw-color-on-blue)]",
              optionClassName,
            )}
            id={`${listboxId}-option-${index}`}
            key={option.value}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (!option.disabled) onOptionSelect(option.value);
            }}
            onMouseEnter={() => {
              if (!option.disabled) {
                onOptionHover(index);
              }
            }}
            role="option"
            {...swirskiAttrs("select-option", { size, tone, variant })}
          >
            <span>{optionText(option)}</span>

            {showSelectedIndicator && isSelected && (
              <span aria-hidden="true">{selectedIndicator}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
