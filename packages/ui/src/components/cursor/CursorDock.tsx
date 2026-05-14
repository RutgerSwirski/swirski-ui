"use client";

import clsx from "clsx";
import { useState } from "react";
import { CursorPicker } from "./CursorPicker";
import { useSwirskiCursor } from "./CursorProvider";

export type CursorDockProps = {
  className?: string;
  label?: string;
  position?: "fixed" | "absolute";
  side?: "left" | "right";
};

export function CursorDock({
  className,
  label = "Choose cursor",
  position = "fixed",
  side = "right",
}: CursorDockProps) {
  const { cursor } = useSwirskiCursor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "group top-1/2 z-50 flex -translate-y-1/2 items-center gap-0",
        position === "fixed" ? "fixed" : "absolute",
        side === "right" ? "right-0 flex-row" : "left-0 flex-row-reverse",
        className,
      )}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      onFocus={() => setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        aria-hidden={!isOpen}
        className={clsx(
          "overflow-hidden transition-[max-width,opacity,transform] duration-200 ease-out",
          isOpen
            ? "max-w-[calc(100vw-5rem)] opacity-100"
            : "max-w-0 opacity-0",
          side === "right"
            ? isOpen
              ? "translate-x-0"
              : "translate-x-4"
            : isOpen
              ? "translate-x-0"
              : "-translate-x-4",
        )}
      >
        <CursorPicker
          className={clsx(
            "mx-3 w-max max-w-[calc(100vw-6rem)]",
            !isOpen && "pointer-events-none",
          )}
          label={label}
          buttonTabIndex={isOpen ? undefined : -1}
          showLabels
        />
      </div>

      <button
        aria-expanded={isOpen}
        aria-label={label}
        className={clsx(
          "grid size-14 place-items-center border-4 border-black bg-[#FFD400] shadow-[5px_5px_0_#0B0B0C] transition-all duration-150",
          "hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
          "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]",
          side === "right" ? "border-r-0" : "border-l-0",
        )}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span
          aria-hidden="true"
          className="block size-8 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${cursor.preview}")` }}
        />
      </button>
    </div>
  );
}
