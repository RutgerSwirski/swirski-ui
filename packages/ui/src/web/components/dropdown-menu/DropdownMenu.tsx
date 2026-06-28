"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { DropdownMenuContext } from "./DropdownMenuContext";
import type {
  DropdownMenuFocusIntent,
  DropdownMenuSize,
  DropdownMenuTone,
  DropdownMenuVariant,
} from "./dropdown-menu-types";

export { DropdownMenuContent } from "./DropdownMenuContent";
export type { DropdownMenuContentProps } from "./DropdownMenuContent";
export { DropdownMenuItem } from "./DropdownMenuItem";
export type { DropdownMenuItemProps } from "./DropdownMenuItem";
export { DropdownMenuTrigger } from "./DropdownMenuTrigger";
export type { DropdownMenuTriggerProps } from "./DropdownMenuTrigger";
export type {
  DropdownMenuSize,
  DropdownMenuTone,
  DropdownMenuVariant,
} from "./dropdown-menu-types";

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
