import {
  AnchorHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { Slot, cn, focusVisibleStyles, swirskiAttrs } from "../../system";

export type BreadcrumbVariant = "default" | "plain";
export type BreadcrumbSize = "sm" | "md";
export type BreadcrumbTone = "default" | "muted";

export type BreadcrumbProps = {
  asChild?: boolean;
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  tone?: BreadcrumbTone;
} & HTMLAttributes<HTMLElement>;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({
  asChild = false,
  className,
  variant = "default",
  size = "sm",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "nav";

  return (
    <Component
      ref={ref}
      aria-label="Breadcrumb"
      className={className}
      {...swirskiAttrs("breadcrumb", { size, tone, variant })}
      {...props}
    />
  );
});

Breadcrumb.displayName = "Breadcrumb";

export type BreadcrumbListProps = {
  asChild?: boolean;
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  tone?: BreadcrumbTone;
} & HTMLAttributes<HTMLOListElement>;

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({
  asChild = false,
  className,
  variant = "default",
  size = "sm",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "ol";

  return (
    <Component
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2 text-sm font-black uppercase", className)}
      {...swirskiAttrs("breadcrumb-list", { size, tone, variant })}
      {...props}
    />
  );
});

BreadcrumbList.displayName = "BreadcrumbList";

export type BreadcrumbItemProps = {
  asChild?: boolean;
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  tone?: BreadcrumbTone;
} & HTMLAttributes<HTMLLIElement>;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({
  asChild = false,
  className,
  variant = "default",
  size = "sm",
  tone = "default",
  ...props
}, ref) {
  const Component = asChild ? Slot : "li";

  return (
    <Component
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...swirskiAttrs("breadcrumb-item", { size, tone, variant })}
      {...props}
    />
  );
});

BreadcrumbItem.displayName = "BreadcrumbItem";

export type BreadcrumbLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as?: ElementType;
  asChild?: boolean;
  children?: ReactNode;
  variant?: "default" | "plain";
  size?: BreadcrumbSize;
  tone?: "default" | "muted";
};

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({
  as: Component = "a",
  asChild = false,
  className,
  variant = "default",
  size = "sm",
  tone = "default",
  ...props
}, ref) {
  const ResolvedComponent = (asChild ? Slot : Component) as ElementType;

  return (
    <ResolvedComponent
      ref={ref}
      className={cn(
        "outline-none",
        focusVisibleStyles,
        variant === "default" && "underline decoration-4 underline-offset-4",
        className,
      )}
      {...swirskiAttrs("breadcrumb-link", { size, tone, variant })}
      {...props}
    />
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

export type BreadcrumbPageProps = {
  asChild?: boolean;
  variant?: "default" | "plain";
  size?: BreadcrumbSize;
  tone?: "muted" | "default";
} & HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({
  asChild = false,
  className,
  variant = "default",
  size = "sm",
  tone = "muted",
  ...props
}, ref) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      ref={ref}
      className={cn(tone === "muted" && "text-black/55", className)}
      aria-current="page"
      {...swirskiAttrs("breadcrumb-page", { size, tone, variant })}
      {...props}
    />
  );
});

BreadcrumbPage.displayName = "BreadcrumbPage";

export type BreadcrumbSeparatorProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: "default" | "plain";
  size?: BreadcrumbSize;
  tone?: "muted" | "default";
} & HTMLAttributes<HTMLSpanElement>;

export const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(function BreadcrumbSeparator({
  asChild = false,
  className,
  children = "/",
  variant = "default",
  size = "sm",
  tone = "muted",
  ...props
}, ref) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      ref={ref}
      className={cn(tone === "muted" && "text-black/35", className)}
      aria-hidden="true"
      {...swirskiAttrs("breadcrumb-separator", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
