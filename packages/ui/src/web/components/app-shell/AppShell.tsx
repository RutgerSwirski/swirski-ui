"use client";

import { ElementType, HTMLAttributes, ReactNode, createContext, forwardRef, useContext } from "react";
import type { PolymorphicComponent } from "../../system";
import { Slot, cn, swirskiAttrs } from "../../system";

export type AppShellVariant = "default" | "compact";
export type AppShellSize = "sm" | "md" | "lg";
export type AppShellTone = "default" | "white" | "black";
export type AppShellSidebarWidth = "sm" | "md" | "lg";
export type AppShellSidebarCollapse = "md" | "lg" | "never";
export type AppShellContentWidth = "sm" | "md" | "lg" | "xl" | "full";

type AppShellBaseProps = {
  /** Renders the child as the root element. */
  asChild?: boolean;
  /** Shell content or composed AppShell regions. */
  children: ReactNode;
  /** Controls the density of shell chrome. */
  variant?: AppShellVariant;
  /** Controls shell spacing and region height. */
  size?: AppShellSize;
  /** Applies the shell surface treatment. */
  tone?: AppShellTone;
};

export type AppShellProps = AppShellBaseProps & HTMLAttributes<HTMLElement>;

const shellSizeStyles: Record<AppShellSize, string> = {
  sm: "[--sw-app-shell-content-padding:1rem] [--sw-app-shell-navbar-height:4rem]",
  md: "[--sw-app-shell-content-padding:1.5rem] [--sw-app-shell-navbar-height:5rem]",
  lg: "[--sw-app-shell-content-padding:2rem] [--sw-app-shell-navbar-height:5.5rem]",
};

const shellToneStyles: Record<AppShellTone, string> = {
  default: "bg-[var(--sw-color-paper)] text-[var(--sw-color-ink)]",
  white: "bg-[var(--sw-color-surface)] text-[var(--sw-color-ink)]",
  black: "bg-[var(--sw-color-ink)] text-[var(--sw-color-surface)]",
};

type AppShellStyle = Required<Pick<AppShellBaseProps, "size" | "tone" | "variant">>;

const AppShellContext = createContext<AppShellStyle | null>(null);

const defaultStyle: AppShellStyle = { size: "md", tone: "default", variant: "default" };

function useAppShellStyle({ size, tone, variant }: Partial<AppShellStyle>) {
  const shell = useContext(AppShellContext);
  return {
    size: size ?? (variant === "compact" ? "sm" : shell?.size) ?? defaultStyle.size,
    tone: tone ?? shell?.tone ?? defaultStyle.tone,
    variant: variant ?? shell?.variant ?? defaultStyle.variant,
    ownsSpacing: !shell || size !== undefined || variant !== undefined,
  };
}

const regionToneStyles = { ...shellToneStyles, default: shellToneStyles.white };

export const AppShell = forwardRef<HTMLElement, AppShellProps>(
  function AppShell(
    {
      asChild = false,
      children,
      className,
      variant = "default",
      size: sizeProp,
      tone = "default",
      ...props
    },
    ref,
  ) {
    const size = sizeProp ?? (variant === "compact" ? "sm" : "md");
    const Component = (asChild ? Slot : "div") as ElementType;

    return (
      <AppShellContext.Provider value={{ size, tone, variant }}>
        <Component
          ref={ref}
          className={cn(
            "flex min-h-screen w-full min-w-0",
            shellSizeStyles[size],
            shellToneStyles[tone],
            className,
          )}
          {...swirskiAttrs("app-shell", { size, tone, variant })}
          {...props}
        >
          {children}
        </Component>
      </AppShellContext.Provider>
    );
  },
) as unknown as PolymorphicComponent<AppShellProps, HTMLElement>;

AppShell.displayName = "AppShell";

export type AppShellSidebarProps = AppShellBaseProps & {
  /** Responsive sidebar width. */
  width?: AppShellSidebarWidth;
  /** Viewport where the sidebar becomes visible. */
  collapseBelow?: AppShellSidebarCollapse;
  /** Moves the sidebar to either edge of the shell. */
  side?: "left" | "right";
  /** Keeps the sidebar pinned while the page scrolls. */
  sticky?: boolean;
} & HTMLAttributes<HTMLElement>;

const sidebarWidthStyles: Record<AppShellSidebarWidth, string> = {
  sm: "w-56",
  md: "w-64",
  lg: "w-72",
};

const sidebarCollapseStyles: Record<AppShellSidebarCollapse, string> = {
  md: "hidden md:flex",
  lg: "hidden lg:flex",
  never: "flex",
};

export const AppShellSidebar = forwardRef<HTMLElement, AppShellSidebarProps>(
  function AppShellSidebar(
    {
      asChild = false,
      children,
      className,
      collapseBelow = "md",
      side = "left",
      sticky = true,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      width: widthProp,
      ...props
    },
    ref,
  ) {
    const { size, tone, variant } = useAppShellStyle({ size: sizeProp, tone: toneProp, variant: variantProp });
    const Component = (asChild ? Slot : "aside") as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          "min-h-screen shrink-0 flex-col border-[color:var(--sw-color-ink)]",
          regionToneStyles[tone],
          sidebarCollapseStyles[collapseBelow],
          sidebarWidthStyles[widthProp ?? size],
          side === "left" && "border-r-[length:var(--sw-border-width)]",
          side === "right" &&
            "order-last border-l-[length:var(--sw-border-width)]",
          sticky && "sticky top-0 h-screen overflow-y-auto",
          variant === "compact" && "text-sm",
          className,
        )}
        {...swirskiAttrs("app-shell-sidebar", { size, tone, variant })}
        data-side={side}
        {...props}
      >
        {children}
      </Component>
    );
  },
) as unknown as PolymorphicComponent<AppShellSidebarProps, HTMLElement>;

AppShellSidebar.displayName = "AppShellSidebar";

export type AppShellBodyProps = AppShellBaseProps & HTMLAttributes<HTMLElement>;

export const AppShellBody = forwardRef<HTMLElement, AppShellBodyProps>(
  function AppShellBody(
    {
      asChild = false,
      children,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const { size, tone, variant, ownsSpacing } = useAppShellStyle({ size: sizeProp, tone: toneProp, variant: variantProp });
    const Component = (asChild ? Slot : "div") as ElementType;

    return (
      <AppShellContext.Provider value={{ size, tone, variant }}>
        <Component
          ref={ref}
          className={cn(
            "flex min-h-screen min-w-0 flex-1 flex-col",
            ownsSpacing && shellSizeStyles[size],
            toneProp !== undefined && shellToneStyles[tone],
            className,
          )}
          {...swirskiAttrs("app-shell-body", { size, tone, variant })}
          {...props}
        >
          {children}
        </Component>
      </AppShellContext.Provider>
    );
  },
) as unknown as PolymorphicComponent<AppShellBodyProps, HTMLElement>;

AppShellBody.displayName = "AppShellBody";

export type AppShellNavbarProps = AppShellBaseProps & {
  /** Keeps the navbar pinned to the top edge while scrolling. */
  sticky?: boolean;
} & HTMLAttributes<HTMLElement>;

export const AppShellNavbar = forwardRef<HTMLElement, AppShellNavbarProps>(
  function AppShellNavbar(
    {
      asChild = false,
      children,
      className,
      sticky = true,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const { size, tone, variant, ownsSpacing } = useAppShellStyle({ size: sizeProp, tone: toneProp, variant: variantProp });
    const Component = (asChild ? Slot : "header") as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          "z-20 flex min-h-[var(--sw-app-shell-navbar-height)] shrink-0 items-center gap-4 border-b-[length:var(--sw-border-width)] border-[color:var(--sw-color-ink)] px-[var(--sw-app-shell-content-padding)]",
          regionToneStyles[tone],
          ownsSpacing && shellSizeStyles[size],
          sticky && "sticky top-0",
          variant === "compact" && "text-sm",
          className,
        )}
        {...swirskiAttrs("app-shell-navbar", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
) as unknown as PolymorphicComponent<AppShellNavbarProps, HTMLElement>;

AppShellNavbar.displayName = "AppShellNavbar";

export type AppShellMainProps = AppShellBaseProps & HTMLAttributes<HTMLElement>;

export const AppShellMain = forwardRef<HTMLElement, AppShellMainProps>(
  function AppShellMain(
    {
      asChild = false,
      children,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      ...props
    },
    ref,
  ) {
    const { size, tone, variant, ownsSpacing } = useAppShellStyle({ size: sizeProp, tone: toneProp, variant: variantProp });
    const Component = (asChild ? Slot : "main") as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          "min-w-0 flex-1 px-[var(--sw-app-shell-content-padding)] py-[var(--sw-app-shell-content-padding)]",
          ownsSpacing && shellSizeStyles[size],
          toneProp !== undefined && shellToneStyles[tone],
          className,
        )}
        {...swirskiAttrs("app-shell-main", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
) as unknown as PolymorphicComponent<AppShellMainProps, HTMLElement>;

AppShellMain.displayName = "AppShellMain";

export type AppShellContentProps = Omit<AppShellBaseProps, "size" | "tone" | "variant"> & {
  /** @deprecated Use width or style to set content dimensions. */
  size?: AppShellSize;
  /** @deprecated Style the content with className or style. */
  tone?: AppShellTone;
  /** @deprecated Style the content with className or style. */
  variant?: AppShellVariant;
  /** Maximum width for readable application content. */
  width?: AppShellContentWidth;
} & HTMLAttributes<HTMLElement>;

const contentWidthStyles: Record<AppShellContentWidth, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export const AppShellContent = forwardRef<HTMLElement, AppShellContentProps>(
  function AppShellContent(
    {
      asChild = false,
      children,
      className,
      variant: variantProp,
      size: sizeProp,
      tone: toneProp,
      width = "lg",
      ...props
    },
    ref,
  ) {
    const { size, tone, variant } = useAppShellStyle({ size: sizeProp, tone: toneProp, variant: variantProp });
    const Component = (asChild ? Slot : "div") as ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full min-w-0",
          contentWidthStyles[width],
          className,
        )}
        {...swirskiAttrs("app-shell-content", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
) as unknown as PolymorphicComponent<AppShellContentProps, HTMLElement>;

AppShellContent.displayName = "AppShellContent";
