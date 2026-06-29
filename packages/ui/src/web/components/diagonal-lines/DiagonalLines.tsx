import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn, swirskiAttrs } from "../../system";

export type DiagonalLinesVariant = "default" | "accent";
export type DiagonalLinesSize = "sm" | "md" | "lg";
export type DiagonalLinesTone = "default";

export type DiagonalLinesProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> & {
  angle?: number | string;
  color?: string;
  opacity?: CSSProperties["opacity"];
  spacing?: number | string;
  thickness?: number | string;
  accentColor?: string;
  accentEvery?: number;
  accentThickness?: number | string;
  variant?: DiagonalLinesVariant;
  size?: DiagonalLinesSize;
  tone?: DiagonalLinesTone;
};

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function toCssAngle(value: number | string) {
  return typeof value === "number" ? `${value}deg` : value;
}

export const DiagonalLines = forwardRef<HTMLDivElement, DiagonalLinesProps>(
  function DiagonalLines(
    {
      angle = -45,
      className,
      color = "#0B0B0C",
      opacity = 0.2,
      spacing = 18,
      thickness = 2,
      accentColor,
      accentEvery,
      accentThickness = 5,
      variant = "default",
      size = "md",
      tone = "default",
      style,
      ...props
    },
    ref,
  ) {
    const lineAngle = toCssAngle(angle);
    const lineSpacing = toCssLength(spacing);
    const lineThickness = toCssLength(thickness);
    const layers = [
      `repeating-linear-gradient(${lineAngle}, ${color} 0 ${lineThickness}, transparent ${lineThickness} ${lineSpacing})`,
    ];

    if (accentEvery && accentEvery > 1) {
      const accentSpacing =
        typeof spacing === "number"
          ? `${spacing * accentEvery}px`
          : `calc(${spacing} * ${accentEvery})`;

      const accentLineThickness = toCssLength(accentThickness);

      layers.unshift(
        `repeating-linear-gradient(${lineAngle}, ${
          accentColor ?? color
        } 0 ${accentLineThickness}, transparent ${accentLineThickness} ${accentSpacing})`,
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn("pointer-events-none absolute", className)}
        style={{
          opacity,
          backgroundImage: layers.join(", "),
          ...style,
        }}
        {...swirskiAttrs("diagonal-lines", { size, tone, variant })}
        {...props}
      />
    );
  },
);

DiagonalLines.displayName = "DiagonalLines";
