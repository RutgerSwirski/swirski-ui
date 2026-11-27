import { forwardRef, type HTMLAttributes } from "react";
import { cn, swirskiAttrs } from "../../system";
import { layoutAlignStyles, layoutGapStyles } from "../../system/layout";

export type InlineProps = HTMLAttributes<HTMLDivElement> & {
  /** Space between children. Defaults to md. */
  gap?: keyof typeof layoutGapStyles;
  /** Vertical alignment. Defaults to center. */
  align?: keyof typeof layoutAlignStyles;
  /** Allow children to wrap. Defaults to true. */
  wrap?: boolean;
};

/** Arrange actions or other content horizontally. */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  function Inline({ gap = "md", align = "center", wrap = true, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          wrap ? "flex-wrap" : "flex-nowrap",
          layoutGapStyles[gap],
          layoutAlignStyles[align],
          className,
        )}
        {...swirskiAttrs("inline")}
        {...props}
      />
    );
  },
);
