"use client";

import { useCallback } from "react";
import { useControllableState } from "../use-controllable-state";

export type UseDisclosureHandlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (opened: boolean) => void;
};

export type UseDisclosureOptions = {
  value?: boolean;
  onChange?: (opened: boolean) => void;
};

/** Manage an open state with open, close, and toggle actions. Initially closed by default. */
export function useDisclosure(
  defaultOpened = false,
  options: UseDisclosureOptions = {},
): [boolean, UseDisclosureHandlers] {
  const [opened, setOpened] = useControllableState({
    value: options.value,
    defaultValue: defaultOpened,
    onChange: options.onChange,
  });

  const open = useCallback(() => setOpened(true), [setOpened]);
  const close = useCallback(() => setOpened(false), [setOpened]);
  const toggle = useCallback(
    () => setOpened((currentOpened) => !currentOpened),
    [setOpened],
  );

  return [opened, { open, close, toggle, set: setOpened }];
}
