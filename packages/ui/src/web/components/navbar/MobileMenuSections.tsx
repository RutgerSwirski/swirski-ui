"use client";

import type {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  MouseEvent,
} from "react";
import { useMobileMenuStyles } from "./MobileMenuContext";
import { forwardRef } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, focusVisibleStyles, swirskiAttrs } from "../../system";
import type { NavbarSize, NavbarTone, NavbarVariant } from "./Navbar";
import { useMobileMenu } from "./MobileMenuContext";

export type MobileMenuHeaderProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: NavbarVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: NavbarSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NavbarTone;
} & HTMLAttributes<HTMLDivElement>;

export const MobileMenuHeader = forwardRef<
  HTMLDivElement,
  MobileMenuHeaderProps
>(function MobileMenuHeader(
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
  const styles = useMobileMenuStyles();
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "flex items-start justify-between gap-4 border-b-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] pb-4",
        className,
      )}
      {...swirskiAttrs("mobile-menu-header", { size, tone, variant })}
      {...props}
    />
  );
}) as unknown as PolymorphicComponent<MobileMenuHeaderProps, HTMLDivElement>;

MobileMenuHeader.displayName = "MobileMenuHeader";

export type MobileMenuTitleProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: NavbarVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: NavbarSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NavbarTone;
} & HTMLAttributes<HTMLHeadingElement>;

export const MobileMenuTitle = forwardRef<
  HTMLHeadingElement,
  MobileMenuTitleProps
>(function MobileMenuTitle(
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
  const styles = useMobileMenuStyles();
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";
  const Component = asChild ? Slot : "h2";

  return (
    <Component
      ref={ref}
      className={cn("font-[family-name:var(--sw-font-heading)] text-3xl uppercase leading-none", className)}
      {...swirskiAttrs("mobile-menu-title", { size, tone, variant })}
      {...props}
    />
  );
}) as unknown as PolymorphicComponent<MobileMenuTitleProps, HTMLHeadingElement>;

MobileMenuTitle.displayName = "MobileMenuTitle";

export type MobileMenuNavProps = {
  asChild?: boolean;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  variant?: NavbarVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: NavbarSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NavbarTone;
} & HTMLAttributes<HTMLElement>;

export const MobileMenuNav = forwardRef<HTMLElement, MobileMenuNavProps>(
  function MobileMenuNav(
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
    const styles = useMobileMenuStyles();
    const variant = variantProp ?? styles?.variant ?? "default";
    const size = sizeProp ?? styles?.size ?? "md";
    const tone = toneProp ?? styles?.tone ?? "default";
    const Component = asChild ? Slot : "nav";

    return (
      <Component
        ref={ref}
        className={cn("grid gap-3 py-5", className)}
        {...swirskiAttrs("mobile-menu-nav", { size, tone, variant })}
        {...props}
      />
    );
  },
) as unknown as PolymorphicComponent<MobileMenuNavProps, HTMLElement>;

MobileMenuNav.displayName = "MobileMenuNav";

export type MobileMenuLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  as?: ElementType;
  asChild?: boolean;
  closeOnSelect?: boolean;
  variant?: NavbarVariant;
  /** @deprecated This only sets a data attribute. Omit it for built-in styling, or use className or style to customize. */
  size?: NavbarSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NavbarTone;
};

export const MobileMenuLink = forwardRef<
  HTMLAnchorElement,
  MobileMenuLinkProps
>(function MobileMenuLink(
  {
    active = false,
    as: Component = "a",
    asChild = false,
    className,
    closeOnSelect = true,
    onClick,
    variant: variantProp,
    size: sizeProp,
    tone: toneProp,
    ...props
  },
  ref,
) {
  const styles = useMobileMenu();
  const variant = variantProp ?? styles?.variant ?? "default";
  const size = sizeProp ?? styles?.size ?? "md";
  const tone = toneProp ?? styles?.tone ?? "default";

  const { setOpen } = styles;
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <ResolvedComponent
      ref={ref}
      className={cn(
        "flex min-h-14 items-center border-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-4 py-3 text-lg font-black uppercase no-underline outline-none sw-motion-transition transition duration-[var(--sw-motion-fast,150ms)] hover:bg-[var(--sw-color-yellow)] hover:text-[color:var(--sw-color-on-yellow)]",
        focusVisibleStyles,
        active
          ? "bg-[var(--sw-color-yellow)] text-[color:var(--sw-color-on-yellow)] shadow-[var(--sw-shadow-sm)]"
          : "bg-[var(--sw-color-paper)] text-[color:var(--sw-color-ink)]",
        variant === "compact" && "min-h-12 py-2 text-base",
        className,
      )}
      aria-current={active ? "page" : props["aria-current"]}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (!event.defaultPrevented && closeOnSelect) {
          setOpen(false);
        }
      }}
      {...swirskiAttrs("mobile-menu-link", { size, tone, variant })}
      data-active={active ? "" : undefined}
      {...props}
    />
  );
}) as unknown as PolymorphicComponent<MobileMenuLinkProps, HTMLAnchorElement>;

MobileMenuLink.displayName = "MobileMenuLink";
