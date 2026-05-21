import { Badge, Title } from "@swirski/ui";
import type { ReactNode } from "react";

export function LivePreviewPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section id="preview" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#FFD400]" />
          <Title order={2} size="h3">
            Preview
          </Title>
        </div>

        <Badge tone="white">Live render</Badge>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0_#0B0B0C] sm:shadow-[10px_10px_0_#0B0B0C]">
        <div className="flex min-w-0 items-center justify-between gap-3 border-b-4 border-black bg-[#0B0B0C] px-4 py-3 text-white">
          <Title className="min-w-0 break-words" order={3} size="h5">
            {title}
          </Title>
          <Badge className="shrink-0" size="sm">
            Preview
          </Badge>
        </div>

        <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-visible bg-[#F5F5F3] p-4 sm:min-h-72 sm:p-6 md:p-10">
          <div className="w-max min-w-full max-w-none">{children}</div>
        </div>
      </div>
    </section>
  );
}
