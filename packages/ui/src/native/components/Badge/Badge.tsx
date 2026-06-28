import { forwardRef } from "react";
import type { ComponentRef, ReactNode } from "react";
import type {
  StyleProp,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { Text as RNText } from "react-native";

import { swirskiColors } from "../../../shared/tokens";
import { nativeFontFamilies } from "../../system/fonts";

export type NativeBadgeTone = "blue" | "yellow" | "red" | "white" | "black";
export type NativeBadgeVariant = "solid" | "outline" | "soft";
export type NativeBadgeSize = "sm" | "md" | "lg";

export type NativeBadgeProps = Omit<RNTextProps, "style"> & {
  children?: ReactNode;
  variant?: NativeBadgeVariant;
  tone?: NativeBadgeTone;
  size?: NativeBadgeSize;
  withShadow?: boolean;
  style?: StyleProp<TextStyle>;
};

const sizeStyles: Record<NativeBadgeSize, TextStyle> = {
  sm: { fontSize: 12, lineHeight: 12, paddingHorizontal: 8, paddingVertical: 4 },
  md: { fontSize: 14, lineHeight: 14, paddingHorizontal: 12, paddingVertical: 6 },
  lg: { fontSize: 16, lineHeight: 16, paddingHorizontal: 16, paddingVertical: 8 },
};

const solidToneStyles: Record<NativeBadgeTone, TextStyle> = {
  blue: { backgroundColor: swirskiColors.blue, color: swirskiColors.white },
  yellow: { backgroundColor: swirskiColors.yellow, color: swirskiColors.ink },
  red: { backgroundColor: swirskiColors.red, color: swirskiColors.white },
  white: { backgroundColor: swirskiColors.surface, color: swirskiColors.ink },
  black: { backgroundColor: swirskiColors.ink, color: swirskiColors.surface },
};

const outlineToneStyles: Record<NativeBadgeTone, TextStyle> = {
  blue: { backgroundColor: swirskiColors.surface, color: swirskiColors.blue },
  yellow: { backgroundColor: swirskiColors.surface, color: swirskiColors.ink },
  red: { backgroundColor: swirskiColors.surface, color: swirskiColors.red },
  white: { backgroundColor: "transparent", borderColor: swirskiColors.surface, color: swirskiColors.surface },
  black: { backgroundColor: swirskiColors.surface, color: swirskiColors.ink },
};

const softToneStyles: Record<NativeBadgeTone, TextStyle> = {
  blue: { backgroundColor: "rgba(0, 87, 255, 0.15)", color: swirskiColors.blue },
  yellow: { backgroundColor: "rgba(255, 212, 0, 0.35)", color: swirskiColors.ink },
  red: { backgroundColor: "rgba(255, 49, 49, 0.15)", color: swirskiColors.red },
  white: { backgroundColor: "rgba(255, 255, 255, 0.25)", color: swirskiColors.surface },
  black: { backgroundColor: "rgba(11, 11, 12, 0.1)", color: swirskiColors.ink },
};

const variantToneStyles: Record<
  NativeBadgeVariant,
  Record<NativeBadgeTone, TextStyle>
> = {
  solid: solidToneStyles,
  outline: outlineToneStyles,
  soft: softToneStyles,
};

export const NativeBadge = forwardRef<
  ComponentRef<typeof RNText>,
  NativeBadgeProps
>(function NativeBadge(
  {
    children,
    variant = "solid",
    tone = "yellow",
    size = "md",
    withShadow = true,
    style,
    ...props
  },
  ref,
) {
  return (
    <RNText
      ref={ref}
      style={[
        {
          alignSelf: "flex-start",
          borderColor: swirskiColors.ink,
          borderWidth: 2,
          fontFamily: nativeFontFamilies.bodyBlack,
          fontWeight: "900",
          letterSpacing: 0.4,
          textTransform: "uppercase",
        },
        withShadow
          ? {
              elevation: 3,
              shadowColor: swirskiColors.shadow,
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 0,
            }
          : undefined,
        variantToneStyles[variant][tone],
        sizeStyles[size],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
});

NativeBadge.displayName = "NativeBadge";

export default NativeBadge;
