import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Slot, cn, swirskiAttrs } from "../../system";

export type ImageFrameVariant = "default" | "plain";
export type ImageFrameSize = "sm" | "md" | "lg";
export type ImageFrameTone = "paper" | "white" | "black";

export type ImageFrameProps = {
  asChild?: boolean;
  children?: ReactNode;
  caption?: ReactNode;
  variant?: ImageFrameVariant;
  size?: ImageFrameSize;
  tone?: ImageFrameTone;
} & HTMLAttributes<HTMLDivElement>;

const toneStyles: Record<ImageFrameTone, string> = {
  paper: "bg-[#F5F5F3]",
  white: "bg-white",
  black: "bg-[#0B0B0C] text-white",
};

export const ImageFrame = forwardRef<HTMLDivElement, ImageFrameProps>(
  function ImageFrame({
    asChild = false,
    children,
    className,
    caption,
    variant = "default",
    size = "md",
    tone = "paper",
    ...props
  }, ref) {
    const Component = asChild ? Slot : "div";

    return (
      <Component
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          variant === "default" &&
            "border-2 border-black shadow-[5px_5px_0_#0B0B0C]",
          toneStyles[tone],
          className,
        )}
        {...swirskiAttrs("image-frame", { size, tone, variant })}
        {...props}
      >
        {children}

        {caption && (
          <p
            className="absolute bottom-2 left-2 right-2 w-fit border-2 border-black bg-[#F5F5F3] p-2 text-center text-xs font-black uppercase"
            {...swirskiAttrs("image-frame-caption", { size, tone, variant })}
          >
            {caption}
          </p>
        )}
      </Component>
    );
  },
);

ImageFrame.displayName = "ImageFrame";
