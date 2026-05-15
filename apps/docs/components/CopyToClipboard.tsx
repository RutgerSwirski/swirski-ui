"use client";

import { useEffect, useState } from "react";

type CopyToClipboardProps = {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
};

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 3h12v12h-4v4H4V7h4V3Z"
        fill="#0057FF"
        stroke="#0B0B0C"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M8 7h8v12H4V7h4Z"
        fill="#FFFFFF"
        stroke="#0B0B0C"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path d="M8 11h4M8 15h5" stroke="#0B0B0C" strokeWidth="2.5" />
    </svg>
  );
}

function CopiedIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 12.5 9.2 18 20 6"
        stroke="#0B0B0C"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M4 12.5 9.2 18 20 6"
        stroke="#00D084"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

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

export default function CopyToClipboard({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
}: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = window.setTimeout(() => setIsCopied(false), 1600);

    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  async function handleCopy() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      copyWithTextarea(value);
    }

    setIsCopied(true);
  }

  return (
    <button
      aria-label={isCopied ? copiedLabel : label}
      aria-live="polite"
      className={`grid size-11 place-items-center border-4 border-black bg-[#FFD400] text-black shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${className}`}
      onClick={handleCopy}
      title={isCopied ? copiedLabel : label}
      type="button"
    >
      {isCopied ? <CopiedIcon /> : <CopyIcon />}
      <span className="sr-only">{isCopied ? copiedLabel : label}</span>
    </button>
  );
}
