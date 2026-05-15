import { AnchorHTMLAttributes, HTMLAttributes } from "react";
import clsx from "clsx";

export function Breadcrumb({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={className} {...props} />;
}

export function BreadcrumbList({
  className,
  ...props
}: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={clsx("flex flex-wrap items-center gap-2 text-sm font-black uppercase", className)}
      {...props}
    />
  );
}

export function BreadcrumbItem({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return <li className={clsx("flex items-center gap-2", className)} {...props} />;
}

export function BreadcrumbLink({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={clsx("underline decoration-4 underline-offset-4", className)} {...props} />;
}

export function BreadcrumbPage({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={clsx("text-black/55", className)} aria-current="page" {...props} />;
}

export function BreadcrumbSeparator({
  className,
  children = "/",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={clsx("text-black/35", className)} aria-hidden="true" {...props}>
      {children}
    </span>
  );
}
