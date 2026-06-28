import type { ReactNode } from "react";
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Pressable, Text } from "react-native";

import { resolveButtonStyleConfig, type SharedButtonProps } from "../../../shared/contracts";
import { swirskiColors, swirskiRadii, swirskiSpacing, swirskiTypography } from "../../../shared/tokens";

export type NativeButtonProps = SharedButtonProps &
  Omit<PressableProps, "children" | "style"> & {
    children?: ReactNode;
    style?: PressableProps["style"];
    textStyle?: StyleProp<TextStyle>;
  };

function getButtonStyles({
  disabled,
  size = "md",
  tone = "blue",
  variant = "solid",
  withShadow = true,
}: Pick<NativeButtonProps, "disabled" | "size" | "tone" | "variant" | "withShadow">) {
  const { variant: normalizedVariant, tone: normalizedTone } = resolveButtonStyleConfig({
    variant,
    tone,
  });

  const sizeConfig = swirskiTypography.button[size];
  const baseStyle: ViewStyle = {
    alignItems: "center",
    borderColor: swirskiColors.ink,
    borderRadius: swirskiRadii.md,
    borderWidth: 4,
    flexDirection: "row",
    gap: swirskiSpacing.xs,
    justifyContent: "center",
    minHeight: size === "sm" ? 40 : size === "lg" ? 56 : 48,
    opacity: disabled ? 0.6 : 1,
    paddingHorizontal: size === "sm" ? swirskiSpacing.sm : size === "lg" ? swirskiSpacing.lg : swirskiSpacing.md,
    paddingVertical: size === "sm" ? 8 : size === "lg" ? 12 : 10,
  };

  const variantStyles: Record<string, ViewStyle> = {
    solid: {
      backgroundColor:
        normalizedTone === "blue"
          ? swirskiColors.blue
          : normalizedTone === "yellow"
            ? swirskiColors.yellow
            : normalizedTone === "red"
              ? swirskiColors.red
              : normalizedTone === "white"
                ? swirskiColors.white
                : swirskiColors.black,
      borderColor: swirskiColors.ink,
    },
    outline: {
      backgroundColor: swirskiColors.surface,
      borderColor: swirskiColors.ink,
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
  };

  const toneStyles: Record<string, TextStyle> = {
    solid: {
      color:
        normalizedTone === "white" || normalizedTone === "yellow"
          ? swirskiColors.black
          : swirskiColors.white,
    },
    outline: {
      color:
        normalizedTone === "blue"
          ? swirskiColors.blue
          : normalizedTone === "yellow"
            ? swirskiColors.yellow
            : normalizedTone === "red"
              ? swirskiColors.red
              : normalizedTone === "white"
                ? swirskiColors.white
                : swirskiColors.black,
    },
    ghost: {
      color:
        normalizedTone === "blue"
          ? swirskiColors.blue
          : normalizedTone === "yellow"
            ? swirskiColors.yellow
            : normalizedTone === "red"
              ? swirskiColors.red
              : normalizedTone === "white"
                ? swirskiColors.white
                : swirskiColors.black,
    },
  };

  return {
    containerStyle: {
      ...baseStyle,
      ...variantStyles[normalizedVariant],
      ...(withShadow && normalizedVariant !== "ghost"
        ? {
            shadowColor: swirskiColors.shadow,
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 4,
          }
        : {}),
    },
    textStyle: {
      ...sizeConfig,
      color: toneStyles[normalizedVariant].color,
    },
  };
}

export function NativeButton({
  children,
  disabled,
  size = "md",
  tone = "blue",
  variant = "solid",
  withShadow = true,
  accessibilityLabel,
  style,
  textStyle: textStyleProp,
  ...props
}: NativeButtonProps) {
  const { containerStyle, textStyle } = getButtonStyles({
    disabled,
    size,
    tone,
    variant,
    withShadow,
  });

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? (typeof children === "string" ? children : undefined)}
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        containerStyle,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      <Text style={[textStyle, textStyleProp]}>{children}</Text>
    </Pressable>
  );
}

export default NativeButton;
