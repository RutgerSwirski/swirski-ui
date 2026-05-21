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
