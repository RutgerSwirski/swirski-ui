import { fireEvent, render, screen } from "@testing-library/react";
import { createRef, type ComponentRef } from "react";
import type { Pressable } from "react-native";
import { expect, it, vi } from "vitest";
import { NativeButton } from "./Button";

vi.mock("../../system/press-motion", () => ({
  usePressMotion: () => ({
    progress: { interpolate: () => 0 },
    animate: vi.fn(),
    reduced: true,
  }),
}));

vi.mock("react-native", async () => {
  const { forwardRef } = await import("react");
  const Pressable = forwardRef<HTMLButtonElement, {
    accessibilityLabel: string;
    accessibilityState: { busy?: boolean };
    children: React.ReactNode;
    disabled: boolean;
    onPress: () => void;
  }>(function Pressable({ accessibilityLabel, accessibilityState, children, disabled, onPress }, ref) {
    return (
      <button ref={ref} aria-label={accessibilityLabel} aria-busy={accessibilityState.busy} disabled={disabled} onClick={onPress}>
        {children}
      </button>
    );
  });
  return {
    Animated: { createAnimatedComponent: (component: unknown) => component },
    Pressable,
    Platform: { select: (options: { default: string }) => options.default },
    Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  };
});

it("forwards the Pressable ref and blocks activation while loading", () => {
  const ref = createRef<ComponentRef<typeof Pressable>>();
  const onPress = vi.fn();
  const { rerender, unmount } = render(<NativeButton loading ref={ref} onPress={onPress}>Save</NativeButton>);
  const button = screen.getByRole("button", { name: "Save" });
  expect(ref.current).toBe(button);
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute("aria-busy", "true");
  fireEvent.click(button);
  expect(onPress).not.toHaveBeenCalled();

  rerender(<NativeButton ref={ref} onPress={onPress}>Save</NativeButton>);
  fireEvent.click(button);
  expect(onPress).toHaveBeenCalledOnce();
  unmount();
  expect(ref.current).toBeNull();
});
