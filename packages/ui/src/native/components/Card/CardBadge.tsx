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

export type NativeCardBadgeTone = "white" | "yellow" | "blue" | "red" | "black";
export type NativeCardBadgeVariant = "solid" | "outline";
export type NativeCardBadgeSize = "sm" | "md";
export type NativeCardBadgePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type NativeCardBadgeProps = Omit<RNTextProps, "style"> & {
  children?: ReactNode;
  variant?: NativeCardBadgeVariant;
  size?: NativeCardBadgeSize;
  tone?: NativeCardBadgeTone;
  position?: NativeCardBadgePosition;
  style?: StyleProp<TextStyle>;
};

const toneStyles: Record<NativeCardBadgeTone, TextStyle> = {
  white: { backgroundColor: swirskiColors.white, color: swirskiColors.black },
  yellow: { backgroundColor: swirskiColors.yellow, color: swirskiColors.black },
  blue: { backgroundColor: swirskiColors.blue, color: swirskiColors.white },
  red: { backgroundColor: swirskiColors.red, color: swirskiColors.white },
  black: { backgroundColor: swirskiColors.black, color: swirskiColors.white },
};

const sizeStyles: Record<NativeCardBadgeSize, TextStyle> = {
  sm: { fontSize: 14, lineHeight: 20, paddingHorizontal: 8, paddingVertical: 4 },
  md: { fontSize: 16, lineHeight: 24, paddingHorizontal: 12, paddingVertical: 6 },
};

const positionStyles: Record<NativeCardBadgePosition, TextStyle> = {
  "top-left": { left: 12, top: 12 },
  "top-right": { right: 12, top: 12 },
  "bottom-left": { bottom: 12, left: 12 },
  "bottom-right": { bottom: 12, right: 12 },
};

export const NativeCardBadge = forwardRef<
  ComponentRef<typeof RNText>,
  NativeCardBadgeProps
>(function NativeCardBadge(
  {
    children,
    variant = "solid",
    size = "sm",
    tone = "white",
    position = "top-left",
    style,
    ...props
  },
  ref,
) {
  const cardTextTone = useNativeCardTextTone();
  const outlineColor =
    cardTextTone === "inverted" ? swirskiColors.white : swirskiColors.ink;

  return (
    <RNText
      ref={ref}
      style={[
        {
          borderColor: swirskiColors.black,
          borderWidth: 2,
          elevation: 2,
          fontFamily: nativeFontFamilies.heading,
          letterSpacing: 0,
          maxWidth: "88%",
          position: "absolute",
          shadowColor: swirskiColors.shadow,
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
          textTransform: "uppercase",
          transform: [{ rotate: "-3deg" }],
          zIndex: 20,
        },
        positionStyles[position],
        variant === "solid"
          ? toneStyles[tone]
          : { backgroundColor: "transparent", color: outlineColor },
        sizeStyles[size],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
});

NativeCardBadge.displayName = "NativeCardBadge";

export default NativeCardBadge;
