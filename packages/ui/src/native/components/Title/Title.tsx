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

export type NativeTitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type NativeTitleSize =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";
export type NativeTitleTone = "default" | "muted" | "inverted";
export type NativeTitleVariant = "default" | "plain";

export type NativeTitleProps = Omit<RNTextProps, "style"> & {
  children?: ReactNode;
  order?: NativeTitleOrder;
  variant?: NativeTitleVariant;
  size?: NativeTitleSize;
  tone?: NativeTitleTone;
  style?: StyleProp<TextStyle>;
};

const mutedInk = "rgba(11, 11, 12, 0.68)";

const sizeStyles: Record<NativeTitleSize, TextStyle> = {
  display: { fontSize: 60, lineHeight: 54 },
  h1: { fontSize: 48, lineHeight: 48 },
  h2: { fontSize: 36, lineHeight: 36 },
  h3: { fontSize: 30, lineHeight: 38 },
  h4: { fontSize: 24, lineHeight: 30 },
  h5: { fontSize: 20, lineHeight: 25 },
  h6: { fontSize: 18, lineHeight: 23 },
};

const toneStyles: Record<NativeTitleTone, TextStyle> = {
  default: { color: swirskiColors.ink },
  muted: { color: mutedInk },
  inverted: { color: swirskiColors.white },
};

function sizeForOrder(order: NativeTitleOrder): NativeTitleSize {
  return `h${order}` as NativeTitleSize;
}

export const NativeTitle = forwardRef<
  ComponentRef<typeof RNText>,
  NativeTitleProps
>(function NativeTitle(
  {
    children,
    order = 1,
    variant = "default",
    size,
    tone = "default",
    style,
    ...props
  },
  ref,
) {
  const resolvedSize = size ?? sizeForOrder(order);

  return (
    <RNText
      ref={ref}
      accessibilityRole="header"
      style={[
        variant === "default"
          ? {
              fontFamily: nativeFontFamilies.heading,
              textTransform: "uppercase",
            }
          : { fontFamily: nativeFontFamilies.body },
        sizeStyles[resolvedSize],
        toneStyles[tone],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
});

NativeTitle.displayName = "NativeTitle";

export default NativeTitle;
