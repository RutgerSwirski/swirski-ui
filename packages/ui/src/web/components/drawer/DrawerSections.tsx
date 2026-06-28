"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useEffect } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";
import { useDrawer } from "./DrawerContext";
import type { DrawerSize, DrawerTone, DrawerVariant } from "./drawer-types";

export type DrawerHeaderProps = {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
} & HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  function DrawerHeader(
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
        {...swirskiAttrs("drawer-header", { size, tone, variant })}
        {...props}
      />
    );
  },
);

DrawerHeader.displayName = "DrawerHeader";

export type DrawerTitleProps = {
  asChild?: boolean;
  variant?: DrawerVariant;
  size?: DrawerSize;
  tone?: DrawerTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle(
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
    const { setLabelledById, titleId } = useDrawer();
    const Component = asChild ? Slot : "h2";
    const id = props.id ?? titleId;

    useEffect(() => {
      setLabelledById(id);
      return () => setLabelledById(undefined);
    }, [id, setLabelledById]);

    return (
      <Component
        ref={ref}
        className={cn("font-anton text-4xl uppercase leading-none", className)}
        id={id}
        {...swirskiAttrs("drawer-title", { size, tone, variant })}
        {...props}
      />
    );
  },
);

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
>(function DrawerDescription(
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
  const { descriptionId, setDescribedById } = useDrawer();
  const Component = asChild ? Slot : "p";
  const id = props.id ?? descriptionId;

  useEffect(() => {
    setDescribedById(id);
    return () => setDescribedById(undefined);
  }, [id, setDescribedById]);

  return (
    <Component
      ref={ref}
      className={cn("text-sm font-bold leading-6 text-black/65", className)}
      id={id}
      {...swirskiAttrs("drawer-description", { size, tone, variant })}
      {...props}
    />
  );
});

DrawerDescription.displayName = "DrawerDescription";
