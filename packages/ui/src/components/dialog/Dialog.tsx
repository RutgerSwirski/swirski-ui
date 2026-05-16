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

export type DialogVariant = "default" | "compact";
export type DialogSize = "sm" | "md" | "lg";
export type DialogTone = "default";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  hasDescription: boolean;
  setHasTitle: (value: boolean) => void;
  setHasDescription: (value: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export type DialogProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used inside Dialog.");
  }

  return context;
}

export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  variant: _variant = "default",
  size: _size = "md",
  tone: _tone = "default",
}: DialogProps) {
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
    <DialogContext.Provider
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
    </DialogContext.Provider>
  );
}

export type DialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

const buttonSizeStyles: Record<DialogSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-6 py-4 text-lg",
};

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({
  asChild = false,
  className,
  children,
  variant = "default",
  size = "md",
  tone = "default",
  onClick,
  ...props
}, ref) {
  const { setOpen } = useDialog();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex border-4 border-black bg-[#0057FF] font-black uppercase text-white shadow-[5px_5px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
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
      {...swirskiAttrs("dialog-trigger", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

DialogTrigger.displayName = "DialogTrigger";

export type DialogContentProps = {
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

const contentSizeStyles: Record<DialogSize, string> = {
  sm: "max-w-md p-5",
  md: "max-w-lg p-6",
  lg: "max-w-2xl p-7",
};

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({
  className,
  children,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { descriptionId, hasDescription, hasTitle, open, setOpen, titleId } =
    useDialog();
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

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <button
        aria-label="Close dialog"
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div
        ref={composeRefs(contentRef, ref)}
        className={cn(
          "relative z-10 w-full border-4 border-black bg-white shadow-[12px_12px_0_#0B0B0C]",
          contentSizeStyles[size],
          variant === "compact" && "shadow-[8px_8px_0_#0B0B0C]",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : props["aria-labelledby"]}
        aria-describedby={
          hasDescription ? descriptionId : props["aria-describedby"]
        }
        tabIndex={-1}
        {...swirskiAttrs("dialog-content", { size, tone, variant })}
        {...props}
      >
        {children}
      </div>
    </div>,
    portalRoot,
  );
});

DialogContent.displayName = "DialogContent";

export type DialogHeaderProps = {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({
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
      {...swirskiAttrs("dialog-header", { size, tone, variant })}
      {...props}
    />
  );
});

DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { setHasTitle, titleId } = useDialog();
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
      {...swirskiAttrs("dialog-title", { size, tone, variant })}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLParagraphElement>;

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(function DialogDescription({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { descriptionId, setHasDescription } = useDialog();
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
      {...swirskiAttrs("dialog-description", { size, tone, variant })}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

export type DialogFooterProps = {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({
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
      className={cn("mt-6 flex flex-wrap justify-end gap-3", className)}
      {...swirskiAttrs("dialog-footer", { size, tone, variant })}
      {...props}
    />
  );
});

DialogFooter.displayName = "DialogFooter";

export type DialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
};

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose({
  asChild = false,
  className,
  children = "Close",
  variant = "default",
  size = "md",
  tone = "default",
  onClick,
  ...props
}, ref) {
  const { setOpen } = useDialog();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "border-4 border-black bg-white font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
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
      {...swirskiAttrs("dialog-close", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

DialogClose.displayName = "DialogClose";
