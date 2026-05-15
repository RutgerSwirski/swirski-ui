"use client";

import { useCallback, useEffect, useState } from "react";

export type UseClipboardOptions = {
  timeout?: number;
};

function copyWithTextarea(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function useClipboard({ timeout = 1600 }: UseClipboardOptions = {}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), timeout);

    return () => window.clearTimeout(timeoutId);
  }, [copied, timeout]);

  const copy = useCallback(async (value: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        copyWithTextarea(value);
      }

      setCopied(true);
      setError(null);
    } catch (copyError) {
      const nextError =
        copyError instanceof Error
          ? copyError
          : new Error("Unable to copy to clipboard.");

      setError(nextError);
      setCopied(false);
      throw nextError;
    }
  }, []);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  return { copied, copy, error, reset };
}
