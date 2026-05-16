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
import { createPortal } from "react-dom";
import { Slot, cn, composeRefs, swirskiAttrs } from "../../system";
import { usePortalRoot } from "../../system/usePortalRoot";

export type DropdownMenuVariant = "default" | "compact";
export type DropdownMenuSize = "sm" | "md" | "lg";
export type DropdownMenuTone = "default";

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

export type DropdownMenuProps = {
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
} & HTMLAttributes<HTMLDivElement>;

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu(
    {
      children,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
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
      <div
        ref={composeRefs(rootRef, ref)}
        className={cn("relative w-fit", className)}
        {...swirskiAttrs("dropdown-menu", { size, tone, variant })}
        {...props}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
  },
);

DropdownMenu.displayName = "DropdownMenu";

export type DropdownMenuTriggerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: DropdownMenuVariant;
    size?: DropdownMenuSize;
    tone?: DropdownMenuTone;
  };

const triggerSizeStyles: Record<DropdownMenuSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-base",
};

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(function DropdownMenuTrigger({
  asChild = false,
  className,
  variant = "default",
  size = "md",
  tone = "default",
  onClick,
  ...props
}, ref) {
  const { open, setOpen } = useDropdownMenu();
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
      {...swirskiAttrs("dropdown-menu-trigger", { size, tone, variant })}
      {...props}
    />
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export type DropdownMenuContentProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end";
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
};

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(function DropdownMenuContent({
  className,
  align = "start",
  variant = "default",
  size = "md",
  tone = "default",
  style,
  ...props
}, ref) {
  const { contentRef, open, rootRef } = useDropdownMenu();
  const portalRoot = usePortalRoot();
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

  if (!open || !position || !portalRoot) {
    return null;
  }

  return createPortal(
    <div
      ref={composeRefs(contentRef, ref)}
      className={cn(
        "fixed z-[1000] min-w-48 border-4 border-black bg-white p-1 shadow-[8px_8px_0_#0B0B0C]",
        variant === "compact" && "shadow-[4px_4px_0_#0B0B0C]",
        className,
      )}
      role="menu"
      {...swirskiAttrs("dropdown-menu-content", { size, tone, variant })}
      style={{
        left: position.left,
        top: position.top,
        transform: align === "end" ? "translateX(-100%)" : undefined,
        ...style,
      }}
      {...props}
    />,
    portalRoot,
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

export type DropdownMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
};

const itemSizeStyles: Record<DropdownMenuSize, string> = {
  sm: "min-h-9 px-2 py-1.5 text-xs",
  md: "min-h-10 px-3 py-2 text-xs",
  lg: "min-h-12 px-4 py-3 text-sm",
};

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(function DropdownMenuItem({
  asChild = false,
  className,
  onClick,
  variant = "default",
  size = "md",
  tone = "default",
  ...props
}, ref) {
  const { setOpen } = useDropdownMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "block w-full text-left font-black uppercase transition hover:bg-[#FFD400]",
        itemSizeStyles[size],
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
      }}
      role="menuitem"
      type={asChild ? undefined : "button"}
      {...swirskiAttrs("dropdown-menu-item", { size, tone, variant })}
      {...props}
    />
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";

export type DropdownMenuSeparatorProps = {
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
} & HTMLAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator(
  { className, variant = "default", size = "md", tone = "default", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("my-1 border-t-4 border-black", className)}
      {...swirskiAttrs("dropdown-menu-separator", { size, tone, variant })}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
