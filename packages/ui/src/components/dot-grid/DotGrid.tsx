import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn, swirskiAttrs } from "../../system";

export type DotGridVariant = "default" | "accent";
export type DotGridSize = "sm" | "md" | "lg";
export type DotGridTone = "default";

export type DotGridProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> & {
  color?: string;
  opacity?: CSSProperties["opacity"];
  spacing?: number | string;
  dotSize?: number | string;
  accentColor?: string;
  accentEvery?: number;
  accentDotSize?: number | string;
  variant?: DotGridVariant;
  size?: DotGridSize;
  tone?: DotGridTone;
};

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

export const DotGrid = forwardRef<HTMLDivElement, DotGridProps>(function DotGrid({
  className,
  color = "currentColor",
  opacity,
  spacing = 13,
  dotSize = 1.2,
  accentColor,
  accentEvery,
  accentDotSize = 3,
  variant = "default",
  size = "md",
  tone = "default",
  style,
  ...props
}, ref) {
  const gridSpacing = toCssLength(spacing);
  const primaryDotSize = toCssLength(dotSize);
  const layers = [
    `radial-gradient(${color} ${primaryDotSize}, transparent ${primaryDotSize})`,
  ];
  const backgroundSizes = [`${gridSpacing} ${gridSpacing}`];

  if (accentEvery && accentEvery > 1) {
    const accentSpacing =
      typeof spacing === "number"
        ? `${spacing * accentEvery}px`
        : `calc(${spacing} * ${accentEvery})`;
    const largeDotSize = toCssLength(accentDotSize);

    layers.unshift(
      `radial-gradient(${accentColor ?? color} ${largeDotSize}, transparent ${largeDotSize})`
    );
    backgroundSizes.unshift(`${accentSpacing} ${accentSpacing}`);
  }

  const dotGridStyle = {
    backgroundImage: layers.join(", "),
    backgroundSize: backgroundSizes.join(", "),
    ...(opacity === undefined ? {} : { opacity }),
    ...style,
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute text-[#0B0B0C] opacity-20", className)}
      style={dotGridStyle}
      {...swirskiAttrs("dot-grid", { size, tone, variant })}
      {...props}
    />
  );
});

DotGrid.displayName = "DotGrid";
