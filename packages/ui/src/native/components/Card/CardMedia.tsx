import { forwardRef } from "react";
import type { ComponentRef, ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";

import { swirskiColors } from "../../../shared/tokens";

export type NativeCardMediaVariant = "default" | "flush";
export type NativeCardMediaSize = "sm" | "md" | "lg";

export type NativeCardMediaProps = Omit<ViewProps, "style"> & {
  children?: ReactNode;
  variant?: NativeCardMediaVariant;
  size?: NativeCardMediaSize;
  aspect?: number | `${number}/${number}`;
  style?: StyleProp<ViewStyle>;
};

function resolveAspectRatio(aspect: NativeCardMediaProps["aspect"]) {
  if (typeof aspect === "number") {
    return aspect;
  }

  const [width, height] = (aspect ?? "4/3").split("/").map(Number);
  return width && height ? width / height : 4 / 3;
}

export const NativeCardMedia = forwardRef<
  ComponentRef<typeof View>,
  NativeCardMediaProps
>(function NativeCardMedia(
  { aspect = "4/3", children, variant = "default", style, ...props },
  ref,
) {
  return (
    <View
      ref={ref}
      style={[
        {
          aspectRatio: resolveAspectRatio(aspect),
          backgroundColor: swirskiColors.white,
          overflow: "hidden",
          position: "relative",
        },
        variant === "default"
          ? {
              borderBottomColor: swirskiColors.black,
              borderBottomWidth: 4,
            }
          : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

NativeCardMedia.displayName = "NativeCardMedia";

export default NativeCardMedia;
