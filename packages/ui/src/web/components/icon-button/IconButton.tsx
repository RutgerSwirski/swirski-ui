import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../system";
import { Button, type ButtonSize, type ButtonTone, type ButtonVariant } from "../button";

type IconButtonName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IconButtonName & {
  /** Decorative icon. Give the button a name with aria-label or aria-labelledby. */
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  withShadow?: boolean;
};

const widthStyles: Record<ButtonSize, string> = {
  sm: "w-10",
  md: "w-12",
  lg: "w-14",
};

/** A compact native action button with an accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ children, className, size = "md", ...props }, ref) {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("shrink-0 p-0!", widthStyles[size], className)}
        {...props}
      >
        <span aria-hidden="true" className="inline-flex">{children}</span>
      </Button>
    );
  },
);
