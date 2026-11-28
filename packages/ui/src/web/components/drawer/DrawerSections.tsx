"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";
import { useDrawer, useDrawerStyles } from "./DrawerContext";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";

export type DrawerHeaderProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DrawerVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: DrawerSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DrawerTone;
} & HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader(
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
    const styles = useDrawerStyles();
    const variant = variantProp ?? styles?.variant ?? "default";
    const size = sizeProp ?? styles?.size ?? "md";
    const tone = toneProp ?? styles?.tone ?? "default";
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn("grid gap-2", className)}
        {...swirskiAttrs("drawer-header", { size, tone, variant })}
        {...props}
      />
    );
  },
) as unknown as PolymorphicComponent<DrawerHeaderProps, HTMLDivElement>;

DrawerHeader.displayName = "DrawerHeader";

export type DrawerTitleProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DrawerVariant;
  size?: DrawerSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DrawerTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle(
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
    const styles = useDrawer();
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
        {...swirskiAttrs("drawer-title", { size, tone, variant })}
        {...props}
      />
    );
  },
) as unknown as PolymorphicComponent<DrawerTitleProps, HTMLHeadingElement>;

DrawerTitle.displayName = "DrawerTitle";

export type DrawerDescriptionProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: DrawerVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: DrawerSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: DrawerTone;
} & HTMLAttributes<HTMLParagraphElement>;

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(function DrawerDescription(
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
  const styles = useDrawer();
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
      {...swirskiAttrs("drawer-description", { size, tone, variant })}
      {...props}
    />
  );
}) as unknown as PolymorphicComponent<DrawerDescriptionProps, HTMLParagraphElement>;

DrawerDescription.displayName = "DrawerDescription";
