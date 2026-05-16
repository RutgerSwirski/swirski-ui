"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot, cn, composeRefs, swirskiAttrs } from "../../system";

export type PopoverVariant = "default" | "compact";
export type PopoverSize = "sm" | "md" | "lg";
export type PopoverTone = "default";

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
  variant?: PopoverVariant;
  size?: PopoverSize;
  tone?: PopoverTone;
} & HTMLAttributes<HTMLDivElement>;

function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover components must be used inside Popover.");
  }

  return context;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
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
      <div
        ref={composeRefs(rootRef, ref)}
        className={cn("relative w-fit", className)}
        {...swirskiAttrs("popover", { size, tone, variant })}
        {...props}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
});

Popover.displayName = "Popover";

export type PopoverTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: PopoverVariant;
  size?: PopoverSize;
  tone?: PopoverTone;
};

const triggerSizeStyles: Record<PopoverSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-base",
};

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  onClick,
  ...props
}, ref) {
  const { open, setOpen } = usePopover();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "border-4 border-black bg-white font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        triggerSizeStyles[size],
        variant === "compact" && "shadow-none",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(!open);
        }
      }}
      type={asChild ? undefined : "button"}
      aria-expanded={open}
      {...swirskiAttrs("popover-trigger", { size, tone, variant })}
      {...props}
    />
  );
});

PopoverTrigger.displayName = "PopoverTrigger";

export type PopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end";
  variant?: PopoverVariant;
  size?: PopoverSize;
  tone?: PopoverTone;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({
  className,
  align = "start",
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { open } = usePopover();

  if (!open) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-[calc(100%+0.5rem)] z-40 w-72 border-4 border-black bg-white p-4 shadow-[8px_8px_0_#0B0B0C]",
        align === "end" ? "right-0" : "left-0",
        variant === "compact" && "p-3 shadow-[4px_4px_0_#0B0B0C]",
        className,
      )}
      {...swirskiAttrs("popover-content", { size, tone, variant })}
      {...props}
    />
  );
});

PopoverContent.displayName = "PopoverContent";
