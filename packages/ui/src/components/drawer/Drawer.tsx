"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export type DrawerProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function useDrawer() {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("Drawer components must be used inside Drawer.");
  }

  return context;
}

export function Drawer({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <DrawerContext.Provider value={{ open: currentOpen, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDrawer();

  return (
    <button
      className={clsx(
        "border-4 border-black bg-[#0057FF] px-5 py-3 font-black uppercase text-white shadow-[5px_5px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        className,
      )}
      onClick={() => setOpen(true)}
      type="button"
      {...props}
    />
  );
}

export function DrawerContent({
  side = "right",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" | "top" | "bottom" }) {
  const { open, setOpen } = useDrawer();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  const sideStyles = {
    left: "left-0 top-0 h-full w-full max-w-sm",
    right: "right-0 top-0 h-full w-full max-w-sm",
    top: "left-0 top-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45">
      <button
        aria-label="Close drawer"
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div
        className={clsx(
          "absolute border-4 border-black bg-white p-6 shadow-[12px_12px_0_#0B0B0C]",
          sideStyles[side],
          className,
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("grid gap-2", className)} {...props} />;
}

export function DrawerTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={clsx("font-anton text-4xl uppercase leading-none", className)} {...props} />
  );
}

export function DrawerDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm font-bold leading-6 text-black/65", className)} {...props} />
  );
}

export function DrawerClose({
  className,
  children = "Close",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDrawer();

  return (
    <button
      className={clsx(
        "mt-6 border-4 border-black bg-white px-4 py-2 font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        className,
      )}
      onClick={() => setOpen(false)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
