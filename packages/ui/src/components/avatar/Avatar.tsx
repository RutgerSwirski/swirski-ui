import {
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type AvatarVariant = "square" | "rounded";
export type AvatarSize = "sm" | "md" | "lg";
export type AvatarTone = "yellow" | "blue" | "red" | "white" | "black";

export type AvatarProps = {
  asChild?: boolean;
  variant?: AvatarVariant;
  size?: AvatarSize;
  tone?: AvatarTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<AvatarSize, string> = {
  sm: "size-9 text-xs",
  md: "size-12 text-sm",
  lg: "size-16 text-base",
};

const toneStyles: Record<AvatarTone, string> = {
  yellow: "bg-[#FFD400] text-black",
  blue: "bg-[#0057FF] text-white",
  red: "bg-[#FF3131] text-white",
  white: "bg-white text-black",
  black: "bg-[#0B0B0C] text-white",
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar({
  asChild = false,
  className,
  variant = "square",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden border-4 border-black font-black uppercase shadow-[4px_4px_0_#0B0B0C]",
        sizeStyles[size],
        toneStyles[tone],
        variant === "rounded" && "rounded-full",
        className,
      )}
      {...swirskiAttrs("avatar", { size, tone, variant })}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

export type AvatarImageProps = {
  variant?: "default";
  size?: AvatarSize;
  tone?: AvatarTone;
} & ImgHTMLAttributes<HTMLImageElement>;

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage({
  className,
  alt = "",
  variant = "default",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  return (
    <img
      ref={ref}
      alt={alt}
      className={cn("size-full object-cover", className)}
      {...swirskiAttrs("avatar-image", { size, tone, variant })}
      {...props}
    />
  );
});

AvatarImage.displayName = "AvatarImage";

export type AvatarFallbackProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: "default";
  size?: AvatarSize;
  tone?: AvatarTone;
} & HTMLAttributes<HTMLSpanElement>;

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({
  asChild = false,
  className,
  children,
  variant = "default",
  size = "md",
  tone = "yellow",
  ...props
}, ref) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      ref={ref}
      className={cn("leading-none", className)}
      {...swirskiAttrs("avatar-fallback", { size, tone, variant })}
      {...props}
    >
      {children}
    </Component>
  );
});

AvatarFallback.displayName = "AvatarFallback";
