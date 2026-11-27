"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type UseLocalStorageOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

/** Persist a value in browser storage. Returns the value, setter, and reset action. */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const serialize = options.serialize ?? JSON.stringify;
  const deserialize = options.deserialize ?? JSON.parse;
  const [value, setValue] = useState(defaultValue);
  const defaultValueRef = useRef(defaultValue);
  const deserializeRef = useRef(deserialize);
  const serializeRef = useRef(serialize);
  const valueRef = useRef(value);

  defaultValueRef.current = defaultValue;
  deserializeRef.current = deserialize;
  serializeRef.current = serialize;
  valueRef.current = value;

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);

      const nextValue =
        storedValue === null
          ? defaultValueRef.current
          : deserializeRef.current(storedValue);
      valueRef.current = nextValue;
      setValue(nextValue);
    } catch {
      valueRef.current = defaultValueRef.current;
      setValue(defaultValueRef.current);
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key) {
        return;
      }

      try {
        const nextValue =
          event.newValue === null
            ? defaultValueRef.current
            : deserializeRef.current(event.newValue);
        valueRef.current = nextValue;
        setValue(nextValue);
      } catch {
        valueRef.current = defaultValueRef.current;
        setValue(defaultValueRef.current);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  const setStoredValue = useCallback<Dispatch<SetStateAction<T>>>(
    (nextValue) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (previousValue: T) => T)(valueRef.current)
          : nextValue;

      valueRef.current = resolvedValue;
      setValue(resolvedValue);

      try {
        window.localStorage.setItem(
          key,
          serializeRef.current(resolvedValue),
        );
      } catch {
        // Keep local React state usable when storage is unavailable.
      }
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } finally {
      valueRef.current = defaultValueRef.current;
      setValue(defaultValueRef.current);
    }
  }, [key]);

  return [value, setStoredValue, removeValue];
}
