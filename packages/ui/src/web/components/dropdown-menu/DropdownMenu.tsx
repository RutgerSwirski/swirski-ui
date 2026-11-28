"use client";
import { useOverlayLayer } from "../../system/overlay";

import { useControllableState } from "../../hooks/use-controllable-state/useControllableState";
import type { HTMLAttributes } from "react";
import { forwardRef, useId, useRef } from "react";
import { cn, composeRefs, swirskiAttrs } from "../../system";
import { DropdownMenuContext, useDropdownMenuStyles } from "./DropdownMenuContext";
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
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  tone?: DropdownMenuTone;
} & HTMLAttributes<HTMLDivElement>;

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu(
    {
      children,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
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
    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    useOverlayLayer({
      open: open,
      rootRef,
      contentRef,
      onEscape: () => {
        setOpen(false);
        triggerRef.current?.focus();
      },
      onOutside: () => setOpen(false),
    });

    return (
      <DropdownMenuContext.Provider
        value={{
          open, variant, size, tone,
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
          data-state={open ? "open" : "closed"}
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
  { className, variant: variantProp, size: sizeProp, tone: toneProp, ...props },
  ref,
) {
  const styles = useDropdownMenuStyles();
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";
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
