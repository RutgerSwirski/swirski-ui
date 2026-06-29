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

export type NativeDotGridVariant = NativePatternVariant;
export type NativeDotGridSize = NativePatternSize;
export type NativeDotGridTone = NativePatternTone;

export type NativeDotGridProps = Omit<ViewProps, "children" | "style"> & {
  color?: string;
  opacity?: number;
  spacing?: number;
  dotSize?: number;
  accentColor?: string;
  accentEvery?: number;
  accentDotSize?: number;
  variant?: NativeDotGridVariant;
  size?: NativeDotGridSize;
  tone?: NativeDotGridTone;
  style?: StyleProp<ViewStyle>;
};

export const NativeDotGrid = forwardRef<
  ComponentRef<typeof View>,
  NativeDotGridProps
>(function NativeDotGrid(
  {
    accentColor,
    accentDotSize = 3,
    accentEvery,
    color = swirskiColors.ink,
    dotSize = 1.2,
    onLayout,
    opacity = 0.2,
    pointerEvents = "none",
    spacing = 13,
    style,
    variant: _variant = "default",
    size: _size = "md",
    tone: _tone = "default",
    ...props
  },
  ref,
) {
  const { handleLayout, layout } = usePatternLayout(onLayout);
  const columns = useMemo(
    () => createPatternRange(layout.width, spacing),
    [layout.width, spacing],
  );
  const rows = useMemo(
    () => createPatternRange(layout.height, spacing),
    [layout.height, spacing],
  );

  return (
    <View
      ref={ref}
      onLayout={handleLayout}
      pointerEvents={pointerEvents}
      style={[styles.root, { opacity }, style]}
      {...props}
    >
      {rows.flatMap((row) =>
        columns.map((column) => {
          const accented =
            isAccentIndex(row, accentEvery) && isAccentIndex(column, accentEvery);
          const resolvedDotSize = accented ? accentDotSize : dotSize;

          return (
            <View
              key={`${row}-${column}`}
              style={[
                styles.dot,
                {
                  backgroundColor: accented ? accentColor ?? color : color,
                  borderRadius: resolvedDotSize / 2,
                  height: resolvedDotSize,
                  left: column * spacing,
                  top: row * spacing,
                  width: resolvedDotSize,
                },
              ]}
            />
          );
        }),
      )}
    </View>
  );
});

NativeDotGrid.displayName = "NativeDotGrid";

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
});

export default NativeDotGrid;
