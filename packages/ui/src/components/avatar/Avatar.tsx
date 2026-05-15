import { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export function Avatar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "relative grid size-12 shrink-0 place-items-center overflow-hidden border-4 border-black bg-[#FFD400] font-black uppercase shadow-[4px_4px_0_#0B0B0C]",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  alt = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} className={clsx("size-full object-cover", className)} {...props} />;
}

export function AvatarFallback({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={clsx("text-sm leading-none", className)} {...props}>
      {children}
    </span>
  );
}
