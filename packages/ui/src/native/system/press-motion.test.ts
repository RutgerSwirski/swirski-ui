import { act, renderHook } from "@testing-library/react";
import { AccessibilityInfo, Animated } from "react-native";
import { beforeEach, expect, it, vi } from "vitest";
import { usePressMotion } from "./press-motion";

vi.mock("react-native", () => ({
  AccessibilityInfo: {
    addEventListener: vi.fn(),
    isReduceMotionEnabled: vi.fn(),
  },
  Animated: {
    Value: class {
      setValue = vi.fn();
      stopAnimation = vi.fn();
    },
    spring: vi.fn(() => ({ start: vi.fn() })),
  },
}));

const spring = { damping: 14, mass: 0.7, stiffness: 520 };
let changePreference: (reduced: boolean) => void;
let resolvePreference: (reduced: boolean) => void;
const remove = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(AccessibilityInfo.addEventListener).mockImplementation((event, listener) => {
    expect(event).toBe("reduceMotionChanged");
    changePreference = listener as typeof changePreference;
    return { remove };
  });
  vi.mocked(AccessibilityInfo.isReduceMotionEnabled).mockImplementation(
    () => new Promise((resolve) => { resolvePreference = resolve; }),
  );
});

it("stops and resets the spring when the system reduces motion, then resumes on the next press", async () => {
  const { result, unmount } = renderHook(() => usePressMotion(true, spring));
  expect(result.current.reduced).toBe(true);
  result.current.animate(1);
  expect(Animated.spring).not.toHaveBeenCalled();

  await act(async () => resolvePreference(false));
  result.current.animate(1);
  expect(Animated.spring).toHaveBeenCalledWith(result.current.progress, {
    ...spring, toValue: 1, useNativeDriver: true,
  });

  act(() => changePreference(true));
  expect(result.current.progress.stopAnimation).toHaveBeenCalled();
  expect(result.current.progress.setValue).toHaveBeenCalledWith(0);
  result.current.animate(0);
  expect(Animated.spring).toHaveBeenCalledTimes(1);

  act(() => changePreference(false));
  result.current.animate(1);
  expect(Animated.spring).toHaveBeenCalledTimes(2);
  unmount();
  expect(remove).toHaveBeenCalledOnce();
});

it("keeps the latest preference event and lets an app opt into static feedback", async () => {
  const { result, rerender } = renderHook(
    ({ reduceMotion }) => usePressMotion(true, spring, reduceMotion),
    { initialProps: { reduceMotion: true } },
  );
  act(() => changePreference(false));
  await act(async () => resolvePreference(true));
  expect(result.current.reduced).toBe(true);
  result.current.animate(1);
  expect(Animated.spring).not.toHaveBeenCalled();

  rerender({ reduceMotion: false });
  expect(result.current.reduced).toBe(false);
});
