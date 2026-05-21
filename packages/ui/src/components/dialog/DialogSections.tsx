"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";
import { useDialog } from "./DialogContext";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";

export type DialogHeaderProps = {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(
    {
      asChild = false,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn("grid gap-2", className)}
        {...swirskiAttrs("dialog-header", { size, tone, variant })}
        {...props}
      />
    );
  },
);

DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = {
  asChild?: boolean;
  variant?: DialogVariant;
  size?: DialogSize;
  tone?: DialogTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle(
    {
      asChild = false,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
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
  },
);

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
>(function DialogDescription(
  {
    asChild = false,
    className,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  },
  ref,
) {
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
  function DialogFooter(
    {
      asChild = false,
      className,
      variant = "default",
      size = "md",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn("mt-6 flex flex-wrap justify-end gap-3", className)}
        {...swirskiAttrs("dialog-footer", { size, tone, variant })}
        {...props}
      />
    );
  },
);

DialogFooter.displayName = "DialogFooter";
