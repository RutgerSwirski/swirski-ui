"use client";

import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Slot, cn, composeRefs, swirskiAttrs } from "../../system";
import { usePortalRoot } from "../../system/usePortalRoot";

export type DropdownMenuVariant = "default" | "compact";
export type DropdownMenuSize = "sm" | "md" | "lg";
export type DropdownMenuTone = "default";
type DropdownMenuFocusIntent = "first" | "last" | null;

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  contentId: string;
  focusIntentRef: MutableRefObject<DropdownMenuFocusIntent>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenu components must be used inside DropdownMenu.");
  }

  return context;
}

function getEnabledMenuItems(content: HTMLElement) {
  return Array.from(content.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    .filter((item) => !item.hasAttribute("disabled"))
    .filter((item) => item.getAttribute("aria-disabled") !== "true");
}

function getCurrentMenuItemIndex(content: HTMLElement) {
  return getEnabledMenuItems(content).findIndex(
    (item) => item === document.activeElement,
  );
}

function focusMenuItem(content: HTMLElement, index: number) {
  const items = getEnabledMenuItems(content);

  if (!items.length) {
    return;
  }

  const nextIndex = (index + items.length) % items.length;
  items[nextIndex]?.focus();
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
  const contentId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const focusIntentRef = useRef<DropdownMenuFocusIntent>(null);
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        setOpen,
        rootRef,
        triggerRef,
        contentRef,
        contentId,
        focusIntentRef,
      }}
    >
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
  onKeyDown,
  ...props
}, ref) {
  const { contentId, focusIntentRef, open, setOpen, triggerRef } =
    useDropdownMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={composeRefs(triggerRef, ref)}
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
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (
          event.key === "ArrowDown" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          focusIntentRef.current = "first";
          setOpen(true);
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          focusIntentRef.current = "last";
          setOpen(true);
        }
      }}
      type={asChild ? undefined : "button"}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
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
  onKeyDown,
  style,
  ...props
}, ref) {
  const {
    contentId,
    contentRef,
    focusIntentRef,
    open,
    rootRef,
    setOpen,
    triggerRef,
  } = useDropdownMenu();
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

  useEffect(() => {
    if (!open || !position || !contentRef.current || !focusIntentRef.current) {
      return;
    }

    focusMenuItem(
      contentRef.current,
      focusIntentRef.current === "first" ? 0 : -1,
    );
    focusIntentRef.current = null;
  }, [contentRef, focusIntentRef, open, position]);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented || !contentRef.current) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusMenuItem(
        contentRef.current,
        getCurrentMenuItemIndex(contentRef.current) + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusMenuItem(
        contentRef.current,
        getCurrentMenuItemIndex(contentRef.current) - 1,
      );
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusMenuItem(contentRef.current, 0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusMenuItem(contentRef.current, -1);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

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
      id={contentId}
      onKeyDown={handleKeyDown}
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
  const { setOpen, triggerRef } = useDropdownMenu();
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "block w-full text-left font-black uppercase transition hover:bg-[#FFD400] focus-visible:bg-[#FFD400] focus-visible:outline-none disabled:cursor-not-allowed disabled:text-black/35",
        itemSizeStyles[size],
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          setOpen(false);
          triggerRef.current?.focus();
        }
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
