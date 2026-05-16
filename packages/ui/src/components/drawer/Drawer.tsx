"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Slot, cn, composeRefs, swirskiAttrs } from "../../system";
import { focusInitialElement, trapFocus } from "../../system/focus";
import { usePortalRoot } from "../../system/usePortalRoot";

export type DrawerVariant = "default" | "compact";
export type DrawerSize = "sm" | "md" | "lg";
export type DrawerTone = "default";

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  setHasTitle: (value: boolean) => void;
  setHasDescription: (value: boolean) => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export type DrawerProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
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
  variant: _variant = "default",
  size: _size = "md",
  tone: _tone = "default",
}: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const isControlled = open !== undefined;
  const currentOpen = open ?? internalOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <DrawerContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        titleId,
        descriptionId,
        hasTitle,
        hasDescription,
        setHasTitle,
        setHasDescription,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export type DrawerTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

const buttonSizeStyles: Record<DrawerSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-6 py-4 text-lg",
};

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function DrawerTrigger({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  onClick,
  ...props
}, ref) {
  const { setOpen } = useDrawer();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "border-4 border-black bg-[#0057FF] font-black uppercase text-white shadow-[5px_5px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        buttonSizeStyles[size],
        variant === "compact" && "shadow-[3px_3px_0_#0B0B0C]",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      type={asChild ? undefined : "button"}
      {...swirskiAttrs("drawer-trigger", { size, tone, variant })}
      {...props}
    />
  );
});

DrawerTrigger.displayName = "DrawerTrigger";

export type DrawerContentProps = HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right" | "top" | "bottom";
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent({
  side = "right",
  className,
  children,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { descriptionId, hasDescription, hasTitle, open, setOpen, titleId } =
    useDrawer();
  const portalRoot = usePortalRoot();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const animationFrame = window.requestAnimationFrame(() => {
      if (contentRef.current) {
        focusInitialElement(contentRef.current);
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (contentRef.current) {
        trapFocus(contentRef.current, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
      ) {
        previouslyFocusedElement.focus();
      }
    };
  }, [open, setOpen]);

  if (!open || !portalRoot) {
    return null;
  }

  const sideStyles = {
    left: "left-0 top-0 h-full w-full max-w-sm",
    right: "right-0 top-0 h-full w-full max-w-sm",
    top: "left-0 top-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/45">
      <button
        aria-label="Close drawer"
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div
        ref={composeRefs(contentRef, ref)}
        className={cn(
          "absolute border-4 border-black bg-white p-6 shadow-[12px_12px_0_#0B0B0C]",
          sideStyles[side],
          variant === "compact" && "p-5 shadow-[8px_8px_0_#0B0B0C]",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : props["aria-labelledby"]}
        aria-describedby={
          hasDescription ? descriptionId : props["aria-describedby"]
        }
        tabIndex={-1}
        {...swirskiAttrs("drawer-content", { size, tone, variant })}
        {...props}
      >
        {children}
      </div>
    </div>,
    portalRoot,
  );
});

DrawerContent.displayName = "DrawerContent";

export type DrawerHeaderProps = {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
} & HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn("grid gap-2", className)}
      {...swirskiAttrs("drawer-header", { size, tone, variant })}
      {...props}
    />
  );
});

DrawerHeader.displayName = "DrawerHeader";

export type DrawerTitleProps = {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { setHasTitle, titleId } = useDrawer();
  const Component = asChild ? Slot : "h2";

  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);

  return (
    <Component
      ref={ref}
      className={cn("font-anton text-4xl uppercase leading-none", className)}
      id={props.id ?? titleId}
      {...swirskiAttrs("drawer-title", { size, tone, variant })}
      {...props}
    />
  );
});

DrawerTitle.displayName = "DrawerTitle";

export type DrawerDescriptionProps = {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
} & HTMLAttributes<HTMLParagraphElement>;

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(function DrawerDescription({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { descriptionId, setHasDescription } = useDrawer();
  const Component = asChild ? Slot : "p";

  useEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);

  return (
    <Component
      ref={ref}
      className={cn("text-sm font-bold leading-6 text-black/65", className)}
      id={props.id ?? descriptionId}
      {...swirskiAttrs("drawer-description", { size, tone, variant })}
      {...props}
    />
  );
});

DrawerDescription.displayName = "DrawerDescription";

export type DrawerCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
};

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose({
  asChild = false,
  className,
  children = "Close",
  variant = "default",
  size = "md",
  tone = "default",
  onClick,
  ...props
}, ref) {
  const { setOpen } = useDrawer();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "mt-6 border-4 border-black bg-white font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        buttonSizeStyles[size],
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      type={asChild ? undefined : "button"}
      {...swirskiAttrs("drawer-close", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

DrawerClose.displayName = "DrawerClose";
