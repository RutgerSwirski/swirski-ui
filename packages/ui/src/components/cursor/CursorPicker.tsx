"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";
import { useSwirskiCursor } from "./CursorProvider";

export type CursorPickerProps = {
  buttonTabIndex?: number;
  label?: string;
  showLabels?: boolean;
  variant?: "default";
  size?: "md";
  tone?: "default";
} & HTMLAttributes<HTMLDivElement>;

export const CursorPicker = forwardRef<HTMLDivElement, CursorPickerProps>(
  function CursorPicker({
  buttonTabIndex,
  className,
  label = "Cursor",
  showLabels = true,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { cursorId, cursors, setCursor } = useSwirskiCursor();

  return (
    <div
      ref={ref}
      aria-label={label}
      className={cn(
        "inline-flex flex-wrap gap-2 border-4 border-black bg-[#F5F5F3] p-2 shadow-[6px_6px_0_#0B0B0C]",
        className,
      )}
      role="radiogroup"
      {...swirskiAttrs("cursor-picker", { size, tone, variant })}
      {...props}
    >
      {cursors.map((cursor) => {
        const isSelected = cursor.id === cursorId;

        return (
          <button
            aria-checked={isSelected}
            aria-label={cursor.name}
            className={cn(
              "group relative flex min-h-14 min-w-14 items-center gap-2 border-4 border-black bg-white px-3 py-2 text-left transition-all duration-150",
              "hover:-translate-y-1 hover:shadow-[5px_5px_0_#0B0B0C]",
              "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]",
              isSelected
                ? "translate-x-1 translate-y-1 shadow-none"
                : "shadow-[4px_4px_0_#0B0B0C]",
            )}
            key={cursor.id}
            onClick={() => setCursor(cursor.id)}
            role="radio"
            style={{ backgroundColor: isSelected ? cursor.swatch : undefined }}
            tabIndex={buttonTabIndex}
            title={cursor.description}
            type="button"
          >
            <span
              aria-hidden="true"
              className="block size-8 shrink-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${cursor.preview}")` }}
            />

            {showLabels ? (
              <span
                className={cn(
                  "pr-1 font-black uppercase leading-none tracking-normal",
                  isSelected && cursor.id !== "bolt"
                    ? "text-white"
                    : "text-black",
                )}
              >
                {cursor.name}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
});

CursorPicker.displayName = "CursorPicker";
