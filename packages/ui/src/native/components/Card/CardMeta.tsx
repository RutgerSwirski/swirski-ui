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

export type NativeCardMetaSize = "sm" | "md";
export type NativeCardMetaTone = "default" | "muted" | "inverted";
export type NativeCardMetaVariant = "default" | "plain";

export type NativeCardMetaProps = Omit<RNTextProps, "style"> & {
  children?: ReactNode;
  variant?: NativeCardMetaVariant;
  size?: NativeCardMetaSize;
  tone?: NativeCardMetaTone;
  style?: StyleProp<TextStyle>;
};

const mutedInk = "rgba(11, 11, 12, 0.68)";

const sizeStyles: Record<NativeCardMetaSize, TextStyle> = {
  sm: { fontSize: 12, lineHeight: 16 },
  md: { fontSize: 14, lineHeight: 20 },
};

const toneStyles: Record<NativeCardMetaTone, TextStyle> = {
  default: { color: swirskiColors.ink },
  muted: { color: mutedInk },
  inverted: { color: swirskiColors.white },
};

export const NativeCardMeta = forwardRef<
  ComponentRef<typeof RNText>,
  NativeCardMetaProps
>(function NativeCardMeta(
  { children, size = "sm", tone, style, ...props },
  ref,
) {
  const cardTextTone = useNativeCardTextTone();
  const resolvedTone = tone ?? cardTextTone;

  return (
    <RNText
      ref={ref}
      style={[
        {
          fontFamily: nativeFontFamilies.bodyBlack,
          fontWeight: "900",
          marginTop: 24,
          textTransform: "uppercase",
        },
        sizeStyles[size],
        toneStyles[resolvedTone],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
});

NativeCardMeta.displayName = "NativeCardMeta";

export default NativeCardMeta;
