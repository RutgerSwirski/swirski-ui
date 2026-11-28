import { forwardRef, useMemo } from "react";
import type { ComponentRef } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { swirskiColors } from "../../../shared/tokens";
import {
  createPatternRange,
  isAccentIndex,
  toNativeAngle,
  type NativePatternSize,
  type NativePatternTone,
  type NativePatternVariant,
  usePatternLayout,
} from "../../system/patterns";

export type NativeDiagonalLinesVariant = NativePatternVariant;
export type NativeDiagonalLinesSize = NativePatternSize;
export type NativeDiagonalLinesTone = NativePatternTone;

export type NativeDiagonalLinesProps = Omit<ViewProps, "children" | "style"> & {
  angle?: number | `${number}deg`;
  color?: string;
  opacity?: number;
  spacing?: number;
  thickness?: number;
  accentColor?: string;
  accentEvery?: number;
  accentThickness?: number;
  /** @deprecated This has no effect on built-in styling. Use style to customize. */
  variant?: NativeDiagonalLinesVariant;
  /** @deprecated This has no effect on built-in styling. Use style to customize. */
  size?: NativeDiagonalLinesSize;
  /** @deprecated Omit this prop. The component uses the only supported value by default. */
  tone?: NativeDiagonalLinesTone;
  style?: StyleProp<ViewStyle>;
};

export const NativeDiagonalLines = forwardRef<
  ComponentRef<typeof View>,
  NativeDiagonalLinesProps
>(function NativeDiagonalLines(
  {
    accentColor,
    accentEvery,
    accentThickness = 5,
    angle = -45,
    color = swirskiColors.ink,
    onLayout,
    opacity = 0.2,
    pointerEvents = "none",
    spacing = 18,
    style,
    thickness = 2,
    variant: _variant = "default",
    size: _size = "md",
    tone: _tone = "default",
    ...props
  },
  ref,
) {
  const { handleLayout, layout } = usePatternLayout(onLayout);
  const diagonalSize = Math.ceil(
    Math.sqrt(layout.width ** 2 + layout.height ** 2) * 2,
  );
  const lineIndexes = useMemo(
    () => createPatternRange(diagonalSize, spacing),
    [diagonalSize, spacing],
  );

  return (
    <View
      ref={ref}
      onLayout={handleLayout}
      pointerEvents={pointerEvents}
      style={[styles.root, { opacity }, style]}
      {...props}
    >
      {diagonalSize > 0 ? (
        <View
          style={[
            styles.rotatedLayer,
            {
              height: diagonalSize,
              left: (layout.width - diagonalSize) / 2,
              top: (layout.height - diagonalSize) / 2,
              transform: [{ rotate: toNativeAngle(angle) }],
              width: diagonalSize,
            },
          ]}
        >
          {lineIndexes.map((index) => {
            const accented = isAccentIndex(index, accentEvery);

            return (
              <View
                key={index}
                style={[
                  styles.line,
                  {
                    backgroundColor: accented ? accentColor ?? color : color,
                    left: index * spacing,
                    width: accented ? accentThickness : thickness,
                  },
                ]}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
});

NativeDiagonalLines.displayName = "NativeDiagonalLines";

const styles = StyleSheet.create({
  line: {
    bottom: 0,
    position: "absolute",
    top: 0,
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  rotatedLayer: {
    position: "absolute",
  },
});

export default NativeDiagonalLines;
