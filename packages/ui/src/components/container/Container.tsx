import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type ContainerVariant = "default" | "fluid";
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type ContainerTone = "default";

export type ContainerProps = {
  asChild?: boolean;
  children?: ReactNode;
  variant?: ContainerVariant;
  size?: ContainerSize;
  tone?: ContainerTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-150",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    {
      asChild = false,
      children,
      className,
      variant = "default",
      size = "lg",
      tone = "default",
      ...props
    },
    ref,
  ) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
          variant === "default" && sizeStyles[size],
          className,
        )}
        {...swirskiAttrs("container", { size, tone, variant })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";
