"use client";

import type { PlaygroundDefinition } from "../types";
import { badgePlayground } from "./badge/playground";
import { alertPlayground } from "./alert/playground";
import { buttonPlayground } from "./button/playground";
import { cardPlayground } from "./card/playground";
import { fieldPlayground } from "./field/playground";
import { selectPlayground } from "./select/playground";
import { checkboxPlayground } from "./checkbox/playground";
import { switchPlayground } from "./switch/playground";
import { accordionPlayground } from "./accordion/playground";
import { titlePlayground } from "./title/playground";
import { textPlayground } from "./text/playground";
import { dotGridPlayground } from "./dot-grid/playground";
import { lineGridPlayground } from "./line-grid/playground";
import { diagonalLinesPlayground } from "./diagonal-lines/playground";
import { cursorPlayground } from "./cursor/playground";
import { swirskiProviderPlayground } from "./swirski-provider/playground";
import { dialogPlayground } from "./dialog/playground";
import { popoverPlayground } from "./popover/playground";
import { dropdownMenuPlayground } from "./dropdown-menu/playground";
import { tooltipPlayground } from "./tooltip/playground";
import { tabsPlayground } from "./tabs/playground";
import { tablePlayground } from "./table/playground";
import { appShellPlayground } from "./app-shell/playground";
import { gridPlayground } from "./grid/playground";
import { toastPlayground } from "./toast/playground";
import { progressPlayground } from "./progress/playground";
import { loaderPlayground } from "./loader/playground";
import { skeletonPlayground } from "./skeleton/playground";
import { radioGroupPlayground } from "./radio-group/playground";
import { sliderPlayground } from "./slider/playground";
import { avatarPlayground } from "./avatar/playground";
import { navbarPlayground } from "./navbar/playground";
import { breadcrumbPlayground } from "./breadcrumb/playground";
import { paginationPlayground } from "./pagination/playground";
import { separatorPlayground } from "./separator/playground";
import { drawerPlayground } from "./drawer/playground";

export type {
  PlaygroundControl,
  PlaygroundDefinition,
  PlaygroundValue,
  PlaygroundValues,
} from "../types";

export const playgroundDefinitions: Record<string, PlaygroundDefinition> = {
  badge: badgePlayground,
  alert: alertPlayground,
  button: buttonPlayground,
  card: cardPlayground,
  field: fieldPlayground,
  select: selectPlayground,
  checkbox: checkboxPlayground,
  switch: switchPlayground,
  accordion: accordionPlayground,
  title: titlePlayground,
  text: textPlayground,
  "dot-grid": dotGridPlayground,
  "line-grid": lineGridPlayground,
  "diagonal-lines": diagonalLinesPlayground,
  cursor: cursorPlayground,
  "swirski-provider": swirskiProviderPlayground,
  dialog: dialogPlayground,
  popover: popoverPlayground,
  "dropdown-menu": dropdownMenuPlayground,
  tooltip: tooltipPlayground,
  tabs: tabsPlayground,
  table: tablePlayground,
  "app-shell": appShellPlayground,
  grid: gridPlayground,
  toast: toastPlayground,
  progress: progressPlayground,
  loader: loaderPlayground,
  skeleton: skeletonPlayground,
  "radio-group": radioGroupPlayground,
  slider: sliderPlayground,
  avatar: avatarPlayground,
  navbar: navbarPlayground,
  breadcrumb: breadcrumbPlayground,
  pagination: paginationPlayground,
  separator: separatorPlayground,
  drawer: drawerPlayground,
};
