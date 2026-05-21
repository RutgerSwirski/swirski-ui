import CodeBlock from "@/components/CodeBlock";
import { Title } from "@swirski/ui";

export function CodePanel({
  title,
  code,
  accent = "bg-[#0057FF]",
}: {
  title: string;
  code: string;
  accent?: string;
}) {
  return (
    <section id={title.toLowerCase()} className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className={`h-5 w-5 border-4 border-black ${accent}`} />
        <Title order={2} size="h3">
          {title}
        </Title>
      </div>

      <CodeBlock code={code} />
    </section>
  );
}
