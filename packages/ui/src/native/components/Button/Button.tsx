import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Animated, Pressable, Text } from "react-native";

import { resolveButtonStyleConfig, type SharedButtonProps } from "../../../shared/contracts";
import { swirskiColors, swirskiRadii, swirskiSpacing, swirskiTypography } from "../../../shared/tokens";
import { nativeFontFamilies } from "../../system/fonts";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 6,
          }
        : {}),
    },
    textStyle: {
      ...sizeConfig,
      fontFamily: nativeFontFamilies.bodyBlack,
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
  onPressIn,
  onPressOut,
  style,
  textStyle: textStyleProp,
  ...props
}: NativeButtonProps) {
  const pressProgress = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);
  const { containerStyle, textStyle } = getButtonStyles({
    disabled,
    size,
    tone,
    variant,
    withShadow,
  });
  const { variant: normalizedVariant } = resolveButtonStyleConfig({
    variant,
    tone,
  });
  const usesShadowFeedback = withShadow && normalizedVariant !== "ghost";
  const animatedFeedbackStyle = useMemo(
    () => ({
      transform: usesShadowFeedback
        ? [
            {
              translateX: pressProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 6],
              }),
            },
            {
              translateY: pressProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 6],
              }),
            },
            {
              scale: pressProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.99],
              }),
            },
          ]
        : [
            {
              scale: pressProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.98],
              }),
            },
          ],
    }),
    [pressProgress, usesShadowFeedback],
  );

  useEffect(() => {
    if (disabled) {
      setIsPressed(false);
      pressProgress.setValue(0);
    }
  }, [disabled, pressProgress]);

  const runPressAnimation = (toValue: number) => {
    if (disabled) {
      return;
    }

    Animated.spring(pressProgress, {
      damping: 14,
      mass: 0.7,
      stiffness: 520,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    setIsPressed(true);
    runPressAnimation(1);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setIsPressed(false);
    runPressAnimation(0);
    onPressOut?.(event);
  };

  const pressableState = useMemo(
    () => ({
      pressed: isPressed,
    }),
    [isPressed],
  );

  return (
    <AnimatedPressable
      accessibilityLabel={accessibilityLabel ?? (typeof children === "string" ? children : undefined)}
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        containerStyle,
        animatedFeedbackStyle,
        isPressed && usesShadowFeedback
          ? {
              elevation: 0,
              shadowOffset: { width: 0, height: 0 },
            }
          : undefined,
        typeof style === "function" ? style(pressableState) : style,
      ]}
      {...props}
    >
      <Text style={[textStyle, textStyleProp]}>{children}</Text>
    </AnimatedPressable>
  );
}

export default NativeButton;
