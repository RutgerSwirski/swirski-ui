"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

export type PopoverProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover components must be used inside Popover.");
  }

  return context;
}

export function Popover({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: PopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  useEffect(() => {
    if (!currentOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [currentOpen]);

  return (
    <PopoverContext.Provider
      value={{ open: currentOpen, setOpen, rootRef }}
    >
      <div ref={rootRef} className={clsx("relative w-fit", className)} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = usePopover();

  return (
    <button
      className={clsx(
        "border-4 border-black bg-white px-4 py-2 font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        className,
      )}
      onClick={() => setOpen(!open)}
      type="button"
      {...props}
    />
  );
}

export function PopoverContent({
  className,
  align = "start",
  ...props
}: HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { open } = usePopover();

  if (!open) {
    return null;
  }

  return (
    <div
      className={clsx(
        "absolute top-[calc(100%+0.5rem)] z-40 w-72 border-4 border-black bg-white p-4 shadow-[8px_8px_0_#0B0B0C]",
        align === "end" ? "right-0" : "left-0",
        className,
      )}
      {...props}
    />
  );
}
