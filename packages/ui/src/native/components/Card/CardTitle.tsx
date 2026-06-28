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
import { useNativeCardTextTone } from "./CardContext";

export type NativeCardTitleSize = "sm" | "md" | "lg";
export type NativeCardTitleTone = "default" | "muted" | "inverted";
export type NativeCardTitleVariant = "default" | "plain";

export type NativeCardTitleProps = Omit<RNTextProps, "style"> & {
  children?: ReactNode;
  variant?: NativeCardTitleVariant;
  size?: NativeCardTitleSize;
  tone?: NativeCardTitleTone;
  style?: StyleProp<TextStyle>;
};

const mutedInk = "rgba(11, 11, 12, 0.68)";

const sizeStyles: Record<NativeCardTitleSize, TextStyle> = {
  sm: { fontSize: 24, lineHeight: 32 },
  md: { fontSize: 36, lineHeight: 40 },
  lg: { fontSize: 48, lineHeight: 48 },
};

const toneStyles: Record<NativeCardTitleTone, TextStyle> = {
  default: { color: swirskiColors.ink },
  muted: { color: mutedInk },
  inverted: { color: swirskiColors.white },
};

export const NativeCardTitle = forwardRef<
  ComponentRef<typeof RNText>,
  NativeCardTitleProps
>(function NativeCardTitle(
  { children, variant = "default", size = "md", tone, style, ...props },
  ref,
) {
  const cardTextTone = useNativeCardTextTone();
  const resolvedTone = tone ?? cardTextTone;

  return (
    <RNText
      ref={ref}
      accessibilityRole="header"
      style={[
        {
          fontFamily: nativeFontFamilies.heading,
          marginTop: 12,
          textTransform: "uppercase",
        },
        sizeStyles[size],
        toneStyles[resolvedTone],
        variant === "plain" ? { textDecorationLine: "none" } : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
});

NativeCardTitle.displayName = "NativeCardTitle";

export default NativeCardTitle;
