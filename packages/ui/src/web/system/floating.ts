"use client";

import {
  autoUpdate,
  computePosition,
  flip,
  offset as floatingOffset,
  shift,
  type Placement,
  type Strategy,
} from "@floating-ui/dom";
import { useEffect, useState, type CSSProperties, type RefObject } from "react";

type UseFloatingPositionOptions<
  TReference extends HTMLElement,
  TFloating extends HTMLElement,
> = {
  floatingRef: RefObject<TFloating | null>;
  matchReferenceWidth?: boolean;
  offset?: number;
  open: boolean;
  padding?: number;
  placement?: Placement;
  referenceRef: RefObject<TReference | null>;
  strategy?: Strategy;
};

function hiddenStyle(strategy: Strategy): CSSProperties {
  return {
    left: 0,
    opacity: 0,
    pointerEvents: "none",
    position: strategy,
    top: 0,
  };
}

export function useFloatingPosition<
  TReference extends HTMLElement = HTMLElement,
  TFloating extends HTMLElement = HTMLElement,
>({
  floatingRef,
  matchReferenceWidth = false,
  offset = 8,
  open,
  padding = 12,
  placement = "bottom-start",
  referenceRef,
  strategy = "fixed",
}: UseFloatingPositionOptions<TReference, TFloating>) {
  const [style, setStyle] = useState<CSSProperties>(() =>
    hiddenStyle(strategy),
  );

  useEffect(() => {
    if (!open) {
      setStyle(hiddenStyle(strategy));
      return;
    }

    const reference = referenceRef.current;
    const floating = floatingRef.current;

    if (!reference || !floating) {
      return;
    }

    let active = true;

    const updatePosition = () => {
      const referenceWidth = matchReferenceWidth
        ? reference.getBoundingClientRect().width
        : undefined;

      void computePosition(reference, floating, {
        middleware: [
          floatingOffset(offset),
          flip({ padding }),
          shift({ padding }),
        ],
        placement,
        strategy,
      }).then(({ x, y }) => {
        if (!active) {
          return;
        }

        setStyle({
          left: x,
          opacity: 1,
          position: strategy,
          top: y,
          width: referenceWidth,
        });
      });
    };

    const cleanup = autoUpdate(reference, floating, updatePosition, {
      elementResize: typeof ResizeObserver !== "undefined",
      layoutShift: typeof IntersectionObserver !== "undefined",
    });

    return () => {
      active = false;
      cleanup();
    };
  }, [
    floatingRef,
    matchReferenceWidth,
    offset,
    open,
    padding,
    placement,
    referenceRef,
    strategy,
  ]);

  return style;
}
