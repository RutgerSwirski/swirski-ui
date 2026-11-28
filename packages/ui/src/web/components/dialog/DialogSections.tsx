"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";
import { useDialog, useDialogStyles } from "./DialogContext";
import type { DialogSize, DialogTone, DialogVariant } from "./dialog-types";

export type DialogHeaderProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DialogVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: DialogSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader(
    {
      asChild = false,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const styles = useDialogStyles();
    const variant = variantProp ?? styles?.variant ?? "default";
    const size = sizeProp ?? styles?.size ?? "md";
    const tone = toneProp ?? styles?.tone ?? "default";
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
) as unknown as PolymorphicComponent<DialogHeaderProps, HTMLDivElement>;

DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DialogVariant;
  size?: DialogSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DialogTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle(
    {
      asChild = false,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const styles = useDialog();
    const variant = variantProp ?? styles.variant ?? "default";
    const size = sizeProp ?? styles.size ?? "md";
    const tone = toneProp ?? styles.tone ?? "default";
    const { setLabelledById, titleId } = styles;
    const Component = asChild ? Slot : "h2";
    const id = props.id ?? titleId;

    useEffect(() => {
      setLabelledById(id);
      return () => setLabelledById(undefined);
    }, [id, setLabelledById]);

    return (
      <Component
        ref={ref}
        className={cn(
          "font-[family-name:var(--sw-font-heading)] uppercase leading-none",
          size === "sm" ? "text-2xl" : size === "lg" ? "text-5xl" : "text-4xl",
          className,
        )}
        id={id}
        {...swirskiAttrs("dialog-title", { size, tone, variant })}
        {...props}
      />
    );
  },
) as unknown as PolymorphicComponent<DialogTitleProps, HTMLHeadingElement>;

DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DialogVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: DialogSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DialogTone;
} & HTMLAttributes<HTMLParagraphElement>;

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(function DialogDescription(
  {
    asChild = false,
    className,
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    ...props
  },
  ref,
) {
  const styles = useDialog();
  const variant = variantProp ?? styles.variant ?? "default";
  const size = sizeProp ?? styles.size ?? "md";
  const tone = toneProp ?? styles.tone ?? "default";
  const { descriptionId, setDescribedById } = styles;
  const Component = asChild ? Slot : "p";
  const id = props.id ?? descriptionId;

  useEffect(() => {
    setDescribedById(id);
    return () => setDescribedById(undefined);
  }, [id, setDescribedById]);

  return (
    <Component
      ref={ref}
      className={cn("text-sm font-bold leading-6 text-[color:var(--sw-color-muted)]", className)}
      id={id}
      {...swirskiAttrs("dialog-description", { size, tone, variant })}
      {...props}
    />
  );
}) as unknown as PolymorphicComponent<DialogDescriptionProps, HTMLParagraphElement>;

DialogDescription.displayName = "DialogDescription";

export type DialogFooterProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DialogVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: DialogSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DialogTone;
} & HTMLAttributes<HTMLDivElement>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter(
    {
      asChild = false,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const styles = useDialogStyles();
    const variant = variantProp ?? styles?.variant ?? "default";
    const size = sizeProp ?? styles?.size ?? "md";
    const tone = toneProp ?? styles?.tone ?? "default";
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
) as unknown as PolymorphicComponent<DialogFooterProps, HTMLDivElement>;

DialogFooter.displayName = "DialogFooter";
