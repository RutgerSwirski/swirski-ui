import { useEffect, useState } from "react";
import { AccessibilityInfo, Animated } from "react-native";

type PressSpring = Pick<Animated.SpringAnimationConfig, "damping" | "mass" | "stiffness">;

export function usePressMotion(enabled: boolean, spring: PressSpring, reduceMotion = false) {
  const [progress] = useState(() => new Animated.Value(0));
  // Keep the control still until the device preference is known.
  const [systemReduced, setSystemReduced] = useState(true);

  useEffect(() => {
    let active = true;
    let receivedChange = false;
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", (reduced) => {
      receivedChange = true;
      setSystemReduced(reduced);
    });

    void AccessibilityInfo.isReduceMotionEnabled().then(
      (reduced) => {
        if (active && !receivedChange) setSystemReduced(reduced);
      },
      () => {
        // Keep static feedback if the preference could not be read.
      },
    );

    return () => {
      active = false;
      subscription?.remove();
    };
  }, []);

  const reduced = systemReduced || reduceMotion;
  const shouldAnimate = enabled && !reduced;

  useEffect(() => {
    if (!shouldAnimate) progress.setValue(0);
    return () => progress.stopAnimation();
  }, [progress, shouldAnimate]);

  const animate = (toValue: number) => {
    if (shouldAnimate) {
      Animated.spring(progress, { ...spring, toValue, useNativeDriver: true }).start();
    }
  };

  return { progress, animate, reduced };
}
