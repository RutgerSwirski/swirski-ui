import { HTMLAttributes, forwardRef } from "react";
import { cn, swirskiAttrs } from "../../system";

export type LoaderVariant =
  | "spinner"
  | "pixel-dots"
  | "pixel-bars"
  | "pixel-blocks"
  | "pixel-scan";

export type LoaderTone = "blue" | "yellow" | "red" | "pink" | "green" | "black";
export type LoaderSize = "sm" | "md" | "lg" | "xl" | "2xl";

export type LoaderProps = {
  variant?: LoaderVariant;
  tone?: LoaderTone;
  size?: LoaderSize;
  label?: string;
} & HTMLAttributes<HTMLSpanElement>;

const rootSizeStyles: Record<LoaderSize, string> = {
  sm: "min-h-5",
  md: "min-h-8",
  lg: "min-h-12",
  xl: "min-h-16",
  "2xl": "min-h-20",
};

const pixelSizeStyles: Record<LoaderSize, string> = {
  sm: "[--sw-loader-pixel:0.35rem] [--sw-loader-gap:0.2rem]",
  md: "[--sw-loader-pixel:0.5rem] [--sw-loader-gap:0.3rem]",
  lg: "[--sw-loader-pixel:0.7rem] [--sw-loader-gap:0.4rem]",
  xl: "[--sw-loader-pixel:1rem] [--sw-loader-gap:0.5rem]",
  "2xl": "[--sw-loader-pixel:1.2rem] [--sw-loader-gap:0.6rem]",
};

const barSizeStyles: Record<LoaderSize, string> = {
  sm: "[--sw-loader-bar-w:0.35rem] [--sw-loader-bar-h:1.15rem] [--sw-loader-gap:0.2rem]",
  md: "[--sw-loader-bar-w:0.5rem] [--sw-loader-bar-h:1.75rem] [--sw-loader-gap:0.3rem]",
  lg: "[--sw-loader-bar-w:0.7rem] [--sw-loader-bar-h:2.5rem] [--sw-loader-gap:0.4rem]",
  xl: "[--sw-loader-bar-w:1rem] [--sw-loader-bar-h:3.5rem] [--sw-loader-gap:0.5rem]",
  "2xl":
    "[--sw-loader-bar-w:1.2rem] [--sw-loader-bar-h:4.5rem] [--sw-loader-gap:0.6rem]",
};

const scanSizeStyles: Record<LoaderSize, string> = {
  sm: "h-5 w-20",
  md: "h-7 w-28",
  lg: "h-9 w-36",
  xl: "h-12 w-48",
  "2xl": "h-16 w-64",
};

const spinnerSizeStyles: Record<LoaderSize, string> = {
  sm: "size-5 border-[3px]",
  md: "size-8 border-4",
  lg: "size-12 border-[5px]",
  xl: "size-16 border-[6px]",
  "2xl": "size-20 border-[7px]",
};

const toneVars: Record<LoaderTone, string> = {
  blue: "[--sw-loader-main:#0057FF] [--sw-loader-accent:#FFD400] [--sw-loader-shadow:#00D7DF]",
  yellow:
    "[--sw-loader-main:#FFD400] [--sw-loader-accent:#FFFFFF] [--sw-loader-shadow:#0057FF]",
  red: "[--sw-loader-main:#FF3131] [--sw-loader-accent:#FFD400] [--sw-loader-shadow:#0057FF]",
  pink: "[--sw-loader-main:#FF4FD8] [--sw-loader-accent:#FFD400] [--sw-loader-shadow:#0057FF]",
  green:
    "[--sw-loader-main:#00D084] [--sw-loader-accent:#FFFFFF] [--sw-loader-shadow:#FF4FD8]",
  black:
    "[--sw-loader-main:#0B0B0C] [--sw-loader-accent:#FFD400] [--sw-loader-shadow:#00D7DF]",
};

const spinnerToneStyles: Record<LoaderTone, string> = {
  blue: "border-[#0B0B0C] border-t-[#0057FF] border-r-[#FFD400]",
  yellow: "border-[#0B0B0C] border-t-[#FFD400] border-r-[#0057FF]",
  red: "border-[#0B0B0C] border-t-[#FF3131] border-r-[#FFD400]",
  pink: "border-[#0B0B0C] border-t-[#FF4FD8] border-r-[#FFD400]",
  green: "border-[#0B0B0C] border-t-[#00D084] border-r-[#FF4FD8]",
  black: "border-[#0B0B0C] border-t-[#0B0B0C] border-r-[#FFD400]",
};

function PixelDot({ delay = "0ms", accent = false }) {
  return (
    <span
      className={cn(
        "relative block size-[var(--sw-loader-pixel)] animate-[swirski-pixel-bounce_720ms_steps(2,end)_infinite]",
        "[animation-delay:var(--sw-loader-delay)]",
        accent ? "bg-[var(--sw-loader-accent)]" : "bg-[var(--sw-loader-main)]",
      )}
      style={{ "--sw-loader-delay": delay } as React.CSSProperties}
    >
      <span className="absolute inset-0 border-2 border-black" />
      <span className="absolute left-[25%] top-[25%] size-[25%] bg-white/80" />
      <span className="absolute left-[35%] top-[35%] -z-10 size-full bg-[var(--sw-loader-shadow)]" />
    </span>
  );
}

function PixelDotsLoader({ size }: { size: LoaderSize }) {
  return (
    <span
      className={cn(
        "inline-flex items-end gap-[var(--sw-loader-gap)]",
        pixelSizeStyles[size],
      )}
    >
      <PixelDot delay="0ms" />
      <PixelDot delay="120ms" accent />
      <PixelDot delay="240ms" />
    </span>
  );
}

function PixelBar({ delay = "0ms", height = "100%", accent = false }) {
  return (
    <span
      className={cn(
        "relative block w-[var(--sw-loader-bar-w)] animate-[swirski-pixel-bars_820ms_steps(3,end)_infinite]",
        accent ? "bg-[var(--sw-loader-accent)]" : "bg-[var(--sw-loader-main)]",
      )}
      style={
        {
          height,
          "--sw-loader-delay": delay,
          animationDelay: delay,
        } as React.CSSProperties
      }
    >
      <span className="absolute inset-0 border-2 border-black" />
      <span className="absolute left-[30%] top-[12%] h-[18%] w-[35%] bg-white/80" />
      <span className="absolute left-[35%] top-[10%] -z-10 size-full bg-[var(--sw-loader-shadow)]" />
    </span>
  );
}

function PixelBarsLoader({ size }: { size: LoaderSize }) {
  return (
    <span
      className={cn(
        "inline-flex h-[var(--sw-loader-bar-h)] items-end gap-[var(--sw-loader-gap)]",
        barSizeStyles[size],
      )}
    >
      <PixelBar height="55%" delay="0ms" />
      <PixelBar height="100%" delay="120ms" accent />
      <PixelBar height="70%" delay="240ms" />
      <PixelBar height="85%" delay="360ms" accent />
    </span>
  );
}

function PixelBlocksLoader({ size }: { size: LoaderSize }) {
  return (
    <span
      className={cn(
        "grid grid-cols-3 gap-[var(--sw-loader-gap)]",
        pixelSizeStyles[size],
      )}
    >
      {Array.from({ length: 9 }).map((_, index) => {
        const isAccent = index === 1 || index === 4 || index === 7;

        return (
          <span
            key={index}
            className={cn(
              "relative block size-[var(--sw-loader-pixel)] animate-[swirski-pixel-flicker_900ms_steps(2,end)_infinite]",
              isAccent
                ? "bg-[var(--sw-loader-accent)]"
                : "bg-[var(--sw-loader-main)]",
            )}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <span className="absolute inset-0 border-2 border-black" />
            <span className="absolute left-[35%] top-[35%] -z-10 size-full bg-[var(--sw-loader-shadow)]" />
          </span>
        );
      })}
    </span>
  );
}

function PixelScanLoader({ size }: { size: LoaderSize }) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden border-4 border-black bg-white shadow-[4px_4px_0_#0B0B0C]",
        scanSizeStyles[size],
      )}
    >
      <span className="absolute inset-1 bg-[repeating-linear-gradient(90deg,var(--sw-loader-main)_0_8px,var(--sw-loader-accent)_8px_16px,transparent_16px_20px)] opacity-30" />

      <span className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-3 animate-[swirski-pixel-scan_900ms_steps(6,end)_infinite] border-2 border-black bg-[var(--sw-loader-main)] shadow-[3px_0_0_var(--sw-loader-shadow)]" />

      <span className="absolute bottom-1 left-1 right-1 h-1 bg-black" />
    </span>
  );
}

function SpinnerLoader({ size, tone }: { size: LoaderSize; tone: LoaderTone }) {
  return (
    <span
      className={cn(
        "block animate-spin rounded-full shadow-[3px_3px_0_#0B0B0C]",
        spinnerSizeStyles[size],
        spinnerToneStyles[tone],
      )}
    />
  );
}

export const Loader = forwardRef<HTMLSpanElement, LoaderProps>(function Loader(
  {
    variant = "pixel-dots",
    tone = "yellow",
    size = "md",
    label = "Loading",
    className,
    ...props
  },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-label={label}
      role="status"
      className={cn(
        "inline-flex items-center justify-center align-middle",
        rootSizeStyles[size],
        toneVars[tone],
        className,
      )}
      {...swirskiAttrs("loader", { size, tone, variant })}
      {...props}
    >
      {variant === "spinner" && <SpinnerLoader size={size} tone={tone} />}
      {variant === "pixel-dots" && <PixelDotsLoader size={size} />}
      {variant === "pixel-bars" && <PixelBarsLoader size={size} />}
      {variant === "pixel-blocks" && <PixelBlocksLoader size={size} />}
      {variant === "pixel-scan" && <PixelScanLoader size={size} />}

      <span className="sr-only">{label}</span>
    </span>
  );
});

Loader.displayName = "Loader";
