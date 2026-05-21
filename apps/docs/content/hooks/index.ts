import type { HookDoc } from "../types";
import { useDisclosureHookDoc } from "./use-disclosure/hook";
import { useControllableStateHookDoc } from "./use-controllable-state/hook";
import { useClickOutsideHookDoc } from "./use-click-outside/hook";
import { useEscapeKeyHookDoc } from "./use-escape-key/hook";
import { useIsPathnameActiveHookDoc } from "./use-is-pathname-active/hook";
import { useLocalStorageHookDoc } from "./use-local-storage/hook";
import { useMediaQueryHookDoc } from "./use-media-query/hook";
import { useReducedMotionHookDoc } from "./use-reduced-motion/hook";
import { useClipboardHookDoc } from "./use-clipboard/hook";

export type { HookDoc, PropDoc } from "../types";

export const hookDocs: HookDoc[] = [
  useDisclosureHookDoc,
  useControllableStateHookDoc,
  useClickOutsideHookDoc,
  useEscapeKeyHookDoc,
  useIsPathnameActiveHookDoc,
  useLocalStorageHookDoc,
  useMediaQueryHookDoc,
  useReducedMotionHookDoc,
  useClipboardHookDoc,
];
