"use client";

import { useMemo } from "react";

export type IsPathnameActiveOptions = {
  exact?: boolean;
};

export type PathnameUrl = string | URL;

const URL_BASE = "https://swirski.local";

function toPathname(value: PathnameUrl) {
  if (value instanceof URL) {
    return normalizePathname(value.pathname);
  }

  return normalizePathname(new URL(value, URL_BASE).pathname);
}

function normalizePathname(pathname: string) {
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;

  if (normalizedPathname === "/") {
    return normalizedPathname;
  }

  return normalizedPathname.replace(/\/+$/, "");
}

export function isPathnameActive(
  pathname: PathnameUrl,
  currentUrl: PathnameUrl,
  { exact = false }: IsPathnameActiveOptions = {},
) {
  const targetPathname = toPathname(pathname);
  const currentPathname = toPathname(currentUrl);

  if (exact || targetPathname === "/") {
    return currentPathname === targetPathname;
  }

  return (
    currentPathname === targetPathname ||
    currentPathname.startsWith(`${targetPathname}/`)
  );
}

export function useIsPathnameActive(
  pathname: PathnameUrl,
  currentUrl: PathnameUrl,
  { exact = false }: IsPathnameActiveOptions = {},
) {
  return useMemo(
    () => isPathnameActive(pathname, currentUrl, { exact }),
    [currentUrl, exact, pathname],
  );
}
