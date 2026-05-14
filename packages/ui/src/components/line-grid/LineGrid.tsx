import type { CSSProperties, HTMLAttributes } from "react";

type LineGridDirection = "both" | "horizontal" | "vertical";

export type LineGridProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> & {
  color?: string;
  opacity?: CSSProperties["opacity"];
  spacing?: number | string;
  thickness?: number | string;
  direction?: LineGridDirection;
  horizontalColor?: string;
  horizontalSpacing?: number | string;
  horizontalThickness?: number | string;
  verticalColor?: string;
  verticalSpacing?: number | string;
  verticalThickness?: number | string;
  accentColor?: string;
  accentEvery?: number;
  accentThickness?: number | string;
};

function toCssLength(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

function multiplyCssLength(value: number | string, multiplier: number) {
  return typeof value === "number"
    ? `${value * multiplier}px`
    : `calc(${value} * ${multiplier})`;
}

function getLineLayers({
  direction,
  horizontalColor,
  horizontalSpacing,
  horizontalThickness,
  verticalColor,
  verticalSpacing,
  verticalThickness,
}: {
  direction: LineGridDirection;
  horizontalColor: string;
  horizontalSpacing: string;
  horizontalThickness: string;
  verticalColor: string;
  verticalSpacing: string;
  verticalThickness: string;
}) {
  const layers: Array<{ image: string; size: string }> = [];

  if (direction === "both" || direction === "vertical") {
    layers.push({
      image: `linear-gradient(to right, ${verticalColor} ${verticalThickness}, transparent ${verticalThickness})`,
      size: `${verticalSpacing} ${horizontalSpacing}`,
    });
  }

  if (direction === "both" || direction === "horizontal") {
    layers.push({
      image: `linear-gradient(to bottom, ${horizontalColor} ${horizontalThickness}, transparent ${horizontalThickness})`,
      size: `${verticalSpacing} ${horizontalSpacing}`,
    });
  }

  return layers;
}

export function LineGrid({
  className = "",
  color = "#0B0B0C",
  opacity = 0.2,
  spacing = 18,
  thickness = 1,
  direction = "both",
  horizontalColor,
  horizontalSpacing,
  horizontalThickness,
  verticalColor,
  verticalSpacing,
  verticalThickness,
  accentColor,
  accentEvery,
  accentThickness = 3,
  style,
  ...props
}: LineGridProps) {
  const lineSettings = {
    direction,
    horizontalColor: horizontalColor ?? color,
    horizontalSpacing: toCssLength(horizontalSpacing ?? spacing),
    horizontalThickness: toCssLength(horizontalThickness ?? thickness),
    verticalColor: verticalColor ?? color,
    verticalSpacing: toCssLength(verticalSpacing ?? spacing),
    verticalThickness: toCssLength(verticalThickness ?? thickness),
  };
  const layers = getLineLayers(lineSettings);

  if (accentEvery && accentEvery > 1) {
    const accentLayers = getLineLayers({
      direction,
      horizontalColor: accentColor ?? lineSettings.horizontalColor,
      horizontalSpacing: multiplyCssLength(
        horizontalSpacing ?? spacing,
        accentEvery
      ),
      horizontalThickness: toCssLength(accentThickness),
      verticalColor: accentColor ?? lineSettings.verticalColor,
      verticalSpacing: multiplyCssLength(
        verticalSpacing ?? spacing,
        accentEvery
      ),
      verticalThickness: toCssLength(accentThickness),
    });

    layers.unshift(...accentLayers);
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        opacity,
        backgroundImage: layers.map(({ image }) => image).join(", "),
        backgroundSize: layers.map(({ size }) => size).join(", "),
        ...style,
      }}
      {...props}
    />
  );
}
