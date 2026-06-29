"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type UseLocalStorageOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const serialize = options.serialize ?? JSON.stringify;
  const deserialize = options.deserialize ?? JSON.parse;
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue !== null) {
        setValue(deserialize(storedValue));
      }
    } catch {
      setValue(defaultValue);
    }
  }, [defaultValue, deserialize, key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, serialize(value));
    } catch {
      // Ignore storage failures in private browsing and restricted contexts.
    }
  }, [key, serialize, value]);

  function removeValue() {
    try {
      window.localStorage.removeItem(key);
    } finally {
      setValue(defaultValue);
    }
  }

  return [value, setValue, removeValue];
}
