import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export type SliderProps = InputHTMLAttributes<HTMLInputElement>;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <input
      className={clsx("w-full accent-[#0057FF]", className)}
      type="range"
      {...props}
    />
  );
}
