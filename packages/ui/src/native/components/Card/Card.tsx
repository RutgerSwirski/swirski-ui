import { forwardRef, useEffect, useMemo, useState } from "react";
import type { ComponentRef, ReactNode } from "react";
import type {
  GestureResponderEvent,
  PressableProps,
  ViewStyle,
} from "react-native";
import { Animated, Pressable } from "react-native";

import { swirskiColors } from "../../../shared/tokens";
import { usePressMotion } from "../../system/press-motion";
import { NativeCardProvider, type NativeCardResolvedTextTone } from "./CardContext";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const pressSpring = { damping: 16, mass: 0.8, stiffness: 420 };

export type NativeCardVariant = "elevated" | "flat" | "outline";
export type NativeCardSize = "sm" | "md" | "lg";
export type NativeCardTone = "default" | "white" | "yellow" | "blue" | "black";

export type NativeCardProps = Omit<PressableProps, "children" | "style"> & {
  children?: ReactNode;
  reduceMotion?: boolean;
  interactive?: boolean;
  withShadow?: boolean;
  variant?: NativeCardVariant;
  size?: NativeCardSize;
  tone?: NativeCardTone;
  style?: PressableProps["style"];
};

const shadowOffsets: Record<NativeCardSize, number> = {
  sm: 4,
  md: 8,
  lg: 12,
};

const toneStyles: Record<NativeCardTone, ViewStyle> = {
  default: { backgroundColor: swirskiColors.paper },
  white: { backgroundColor: swirskiColors.surface },
  yellow: { backgroundColor: swirskiColors.yellow },
  blue: { backgroundColor: swirskiColors.blue },
  black: { backgroundColor: swirskiColors.ink },
};

const variantStyles: Record<NativeCardVariant, ViewStyle> = {
  elevated: {},
  flat: {},
  outline: { backgroundColor: "transparent" },
};

function shadowStyle(offset: number): ViewStyle {
  return {
    elevation: offset,
    shadowColor: swirskiColors.shadow,
    shadowOffset: { width: offset, height: offset },
    shadowOpacity: 1,
    shadowRadius: 0,
  };
}

function textToneForCard(tone: NativeCardTone): NativeCardResolvedTextTone {
  return tone === "blue" || tone === "black" ? "inverted" : "default";
}

export const NativeCard = forwardRef<
  ComponentRef<typeof Pressable>,
  NativeCardProps
>(function NativeCard(
  {
    accessibilityRole,
    children,
    disabled,
    interactive = true,
    onPress,
    onPressIn,
    onPressOut,
    reduceMotion,
    size = "md",
    style,
    tone = "default",
    variant = "elevated",
    withShadow,
    ...props
  },
  ref,
) {
  const [isPressed, setIsPressed] = useState(false);
  const resolvedWithShadow = withShadow ?? variant === "elevated";
  const canShowPressFeedback = interactive && !disabled;
  const { progress: pressProgress, animate, reduced } = usePressMotion(canShowPressFeedback, pressSpring, reduceMotion);
  const shadowOffset = shadowOffsets[size];
  const textTone = textToneForCard(tone);
  const animatedFeedbackStyle = useMemo(
    () => ({
      transform: [
        {
          translateY: pressProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, resolvedWithShadow ? Math.min(8, shadowOffset) : 2],
          }),
        },
        {
          scale: pressProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, resolvedWithShadow ? 0.99 : 0.98],
          }),
        },
      ],
    }),
    [pressProgress, resolvedWithShadow, shadowOffset],
  );

  useEffect(() => {
    if (!canShowPressFeedback) setIsPressed(false);
  }, [canShowPressFeedback]);

  const handlePressIn = (event: GestureResponderEvent) => {
    setIsPressed(true);
    animate(1);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setIsPressed(false);
    animate(0);
    onPressOut?.(event);
  };

  const pressableState = useMemo(
    () => ({
      pressed: isPressed,
    }),
    [isPressed],
  );

  return (
    <NativeCardProvider value={{ textTone }}>
      <AnimatedPressable
        accessibilityRole={accessibilityRole ?? (onPress ? "button" : undefined)}
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        ref={ref}
        style={[
          {
            borderColor: swirskiColors.ink,
            borderWidth: 4,
            minWidth: 0,
            opacity: disabled ? 0.6 : 1,
            position: "relative",
          },
          toneStyles[tone],
          variantStyles[variant],
          resolvedWithShadow ? shadowStyle(shadowOffset) : undefined,
          canShowPressFeedback && !reduced && animatedFeedbackStyle,
          canShowPressFeedback && reduced && isPressed && { opacity: 0.88 },
          isPressed && canShowPressFeedback && resolvedWithShadow
            ? shadowStyle(Math.min(4, shadowOffset))
            : undefined,
          typeof style === "function" ? style(pressableState) : style,
        ]}
        {...props}
      >
        {children}
      </AnimatedPressable>
    </NativeCardProvider>
  );
});

NativeCard.displayName = "NativeCard";

export default NativeCard;
