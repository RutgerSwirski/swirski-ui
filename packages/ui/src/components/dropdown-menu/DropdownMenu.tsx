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
import { createPortal } from "react-dom";
import clsx from "clsx";

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenu components must be used inside DropdownMenu.");
  }

  return context;
}

export function DropdownMenu({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !rootRef.current?.contains(target) &&
        !contentRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, rootRef, contentRef }}>
      <div ref={rootRef} className={clsx("relative w-fit", className)} {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdownMenu();

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

export function DropdownMenuContent({
  className,
  align = "start",
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }) {
  const { contentRef, open, rootRef } = useDropdownMenu();
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }

    function updatePosition() {
      const rect = rootRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setPosition({
        left: align === "end" ? rect.right : rect.left,
        top: rect.bottom + 8,
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, open, rootRef]);

  if (!open || !position || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      className={clsx(
        "fixed z-[1000] min-w-48 border-4 border-black bg-white p-1 shadow-[8px_8px_0_#0B0B0C]",
        className,
      )}
      role="menu"
      style={{
        left: position.left,
        top: position.top,
        transform: align === "end" ? "translateX(-100%)" : undefined,
        ...style,
      }}
      {...props}
    />,
    document.body,
  );
}

export function DropdownMenuItem({
  className,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDropdownMenu();

  return (
    <button
      className={clsx(
        "block min-h-10 w-full px-3 py-2 text-left text-xs font-black uppercase transition hover:bg-[#FFD400]",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
      }}
      role="menuitem"
      type="button"
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={clsx("my-1 border-t-4 border-black", className)} />;
}
