import { useCallback, useState } from "react";
import type { LayoutChangeEvent, ViewProps } from "react-native";

export type NativePatternVariant = "default" | "accent";
export type NativePatternSize = "sm" | "md" | "lg";
export type NativePatternTone = "default";

export type NativePatternLayout = {
  width: number;
  height: number;
};

export function usePatternLayout(onLayout?: ViewProps["onLayout"]) {
  const [layout, setLayout] = useState<NativePatternLayout>({
    height: 0,
    width: 0,
  });

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height, width } = event.nativeEvent.layout;

      setLayout((currentLayout) =>
        currentLayout.width === width && currentLayout.height === height
          ? currentLayout
          : { height, width },
      );

      onLayout?.(event);
    },
    [onLayout],
  );

  return { handleLayout, layout };
}

export function createPatternRange(length: number, spacing: number) {
  if (!Number.isFinite(length) || !Number.isFinite(spacing) || spacing <= 0) {
    return [];
  }

  return Array.from(
    { length: Math.max(0, Math.ceil(length / spacing) + 1) },
    (_, index) => index,
  );
}

export function isAccentIndex(index: number, accentEvery?: number) {
  return Boolean(accentEvery && accentEvery > 1 && index % accentEvery === 0);
}

export function toNativeAngle(value: number | `${number}deg`) {
  return typeof value === "number" ? `${value}deg` : value;
}
