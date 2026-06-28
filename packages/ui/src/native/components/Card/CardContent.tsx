import { forwardRef } from "react";
import type { ComponentRef, ReactNode } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";

export type NativeCardContentSize = "sm" | "md" | "lg";
export type NativeCardContentVariant = "default" | "flush";

export type NativeCardContentProps = Omit<ViewProps, "style"> & {
  children?: ReactNode;
  size?: NativeCardContentSize;
  variant?: NativeCardContentVariant;
  style?: StyleProp<ViewStyle>;
};

const sizeStyles: Record<NativeCardContentSize, ViewStyle> = {
  sm: { padding: 16 },
  md: { padding: 20 },
  lg: { padding: 24 },
};

export const NativeCardContent = forwardRef<
  ComponentRef<typeof View>,
  NativeCardContentProps
>(function NativeCardContent(
  { children, size = "md", variant = "default", style, ...props },
  ref,
) {
  return (
    <View
      ref={ref}
      style={[{ minWidth: 0 }, variant === "default" && sizeStyles[size], style]}
      {...props}
    >
      {children}
    </View>
  );
});

NativeCardContent.displayName = "NativeCardContent";

export default NativeCardContent;
