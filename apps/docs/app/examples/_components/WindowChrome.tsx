import type { ReactNode } from "react";
import { Text } from "@swirski/ui";

type WindowChromeProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function WindowChrome({
  title,
  children,
  className = "",
}: WindowChromeProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-black bg-white shadow-[9px_9px_0_#0B0B0C] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b-4 border-black bg-[#0B0B0C] px-4 py-3 text-white">
        <Text
          className="uppercase text-current"
          component="span"
          size="xs"
          weight="black"
        >
          {title}
        </Text>
        <div aria-hidden="true" className="flex gap-2">
          <span className="size-3 border-2 border-white bg-[#FF3131]" />
          <span className="size-3 border-2 border-white bg-[#FFD400]" />
          <span className="size-3 border-2 border-white bg-[#0057FF]" />
        </div>
      </div>
      {children}
    </div>
  );
}
