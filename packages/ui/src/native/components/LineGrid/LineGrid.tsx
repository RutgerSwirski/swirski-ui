import { forwardRef, useMemo } from "react";
import type { ComponentRef } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { swirskiColors } from "../../../shared/tokens";
import {
  createPatternRange,
  isAccentIndex,
  type NativePatternSize,
  type NativePatternTone,
  type NativePatternVariant,
  usePatternLayout,
} from "../../system/patterns";

export type NativeLineGridDirection = "both" | "horizontal" | "vertical";
export type NativeLineGridVariant = NativePatternVariant;
export type NativeLineGridSize = NativePatternSize;
export type NativeLineGridTone = NativePatternTone;

export type NativeLineGridProps = Omit<ViewProps, "children" | "style"> & {
  color?: string;
  opacity?: number;
  spacing?: number;
  thickness?: number;
  direction?: NativeLineGridDirection;
  horizontalColor?: string;
  horizontalSpacing?: number;
  horizontalThickness?: number;
  verticalColor?: string;
  verticalSpacing?: number;
  verticalThickness?: number;
  accentColor?: string;
  accentEvery?: number;
  accentThickness?: number;
  variant?: NativeLineGridVariant;
  size?: NativeLineGridSize;
  tone?: NativeLineGridTone;
  style?: StyleProp<ViewStyle>;
};

export const NativeLineGrid = forwardRef<
  ComponentRef<typeof View>,
  NativeLineGridProps
>(function NativeLineGrid(
  {
    accentColor,
    accentEvery,
    accentThickness = 3,
    color = swirskiColors.ink,
    direction = "both",
    horizontalColor,
    horizontalSpacing,
    horizontalThickness,
    onLayout,
    opacity = 0.2,
    pointerEvents = "none",
    spacing = 18,
    style,
    thickness = 1,
    verticalColor,
    verticalSpacing,
    verticalThickness,
    variant: _variant = "default",
    size: _size = "md",
    tone: _tone = "default",
    ...props
  },
  ref,
) {
  const { handleLayout, layout } = usePatternLayout(onLayout);
  const resolvedHorizontalSpacing = horizontalSpacing ?? spacing;
  const resolvedVerticalSpacing = verticalSpacing ?? spacing;
  const horizontalIndexes = useMemo(
    () => createPatternRange(layout.height, resolvedHorizontalSpacing),
    [layout.height, resolvedHorizontalSpacing],
  );
  const verticalIndexes = useMemo(
    () => createPatternRange(layout.width, resolvedVerticalSpacing),
    [layout.width, resolvedVerticalSpacing],
  );

  return (
    <View
      ref={ref}
      onLayout={handleLayout}
      pointerEvents={pointerEvents}
      style={[styles.root, { opacity }, style]}
      {...props}
    >
      {(direction === "both" || direction === "vertical") &&
        verticalIndexes.map((column) => {
          const accented = isAccentIndex(column, accentEvery);

          return (
            <View
              key={`vertical-${column}`}
              style={[
                styles.verticalLine,
                {
                  backgroundColor: accented
                    ? accentColor ?? verticalColor ?? color
                    : verticalColor ?? color,
                  left: column * resolvedVerticalSpacing,
                  width: accented
                    ? accentThickness
                    : verticalThickness ?? thickness,
                },
              ]}
            />
          );
        })}

      {(direction === "both" || direction === "horizontal") &&
        horizontalIndexes.map((row) => {
          const accented = isAccentIndex(row, accentEvery);

          return (
            <View
              key={`horizontal-${row}`}
              style={[
                styles.horizontalLine,
                {
                  backgroundColor: accented
                    ? accentColor ?? horizontalColor ?? color
                    : horizontalColor ?? color,
                  height: accented
                    ? accentThickness
                    : horizontalThickness ?? thickness,
                  top: row * resolvedHorizontalSpacing,
                },
              ]}
            />
          );
        })}
    </View>
  );
});

NativeLineGrid.displayName = "NativeLineGrid";

const styles = StyleSheet.create({
  horizontalLine: {
    left: 0,
    position: "absolute",
    right: 0,
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  verticalLine: {
    bottom: 0,
    position: "absolute",
    top: 0,
  },
});

export default NativeLineGrid;
