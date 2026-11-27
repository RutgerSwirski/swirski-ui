import { forwardRef, type HTMLAttributes } from "react";
import { cn, swirskiAttrs } from "../../system";
import { layoutAlignStyles, layoutGapStyles } from "../../system/layout";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  /** Space between children. Defaults to md. */
  gap?: keyof typeof layoutGapStyles;
  /** Horizontal alignment. Defaults to stretch. */
  align?: keyof typeof layoutAlignStyles;
};

/** Arrange children vertically with consistent spacing. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack({ gap = "md", align = "stretch", className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", layoutGapStyles[gap], layoutAlignStyles[align], className)}
        {...swirskiAttrs("stack")}
        {...props}
      />
    );
  },
);
