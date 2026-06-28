import { forwardRef } from "react";
import type { ComponentRef, ReactNode } from "react";
import type {
  StyleProp,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { Text as RNText } from "react-native";

import { swirskiColors } from "../../../shared/tokens";
import { nativeBodyFontForWeight } from "../../system/fonts";

export type NativeTextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type NativeTextTone = "default" | "muted" | "subtle" | "inverted";
export type NativeTextWeight = "regular" | "medium" | "bold" | "black";
export type NativeTextVariant = "default" | "lead" | "caption";

export type NativeTextProps = Omit<RNTextProps, "style"> & {
  children?: ReactNode;
  variant?: NativeTextVariant;
  size?: NativeTextSize;
  tone?: NativeTextTone;
  weight?: NativeTextWeight;
  style?: StyleProp<TextStyle>;
};

const mutedInk = "rgba(11, 11, 12, 0.68)";
const subtleInk = "rgba(11, 11, 12, 0.54)";

const sizeStyles: Record<NativeTextSize, TextStyle> = {
  xs: { fontSize: 12, lineHeight: 20 },
  sm: { fontSize: 14, lineHeight: 24 },
  md: { fontSize: 16, lineHeight: 28 },
  lg: { fontSize: 18, lineHeight: 32 },
  xl: { fontSize: 20, lineHeight: 36 },
  "2xl": { fontSize: 24, lineHeight: 40 },
};

const toneStyles: Record<NativeTextTone, TextStyle> = {
  default: { color: swirskiColors.ink },
  muted: { color: mutedInk },
  subtle: { color: subtleInk },
  inverted: { color: swirskiColors.white },
};

const weightStyles: Record<NativeTextWeight, TextStyle> = {
  regular: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  bold: { fontWeight: "700" },
  black: { fontWeight: "900" },
};

const variantStyles: Record<NativeTextVariant, TextStyle> = {
  default: {},
  lead: { maxWidth: 680 },
  caption: { letterSpacing: 0.3, textTransform: "uppercase" },
};

export const NativeText = forwardRef<ComponentRef<typeof RNText>, NativeTextProps>(
  function NativeText(
    {
      children,
      variant = "default",
      size = "md",
      tone = "default",
      weight = "regular",
      style,
      ...props
    },
    ref,
  ) {
    return (
      <RNText
        ref={ref}
        style={[
          sizeStyles[size],
          toneStyles[tone],
          {
            ...weightStyles[weight],
            fontFamily: nativeBodyFontForWeight(weight),
          },
          variantStyles[variant],
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  },
);

NativeText.displayName = "NativeText";

export default NativeText;
