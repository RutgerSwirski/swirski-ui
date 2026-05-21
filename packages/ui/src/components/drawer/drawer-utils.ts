import type { DrawerSide, DrawerSize } from "./drawer-types";

export const drawerButtonSizeStyles: Record<DrawerSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-6 py-4 text-lg",
};

export const drawerSideStyles: Record<DrawerSide, string> = {
  left: "left-0 top-0 h-full w-full max-w-sm",
  right: "right-0 top-0 h-full w-full max-w-sm",
  top: "left-0 top-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};
