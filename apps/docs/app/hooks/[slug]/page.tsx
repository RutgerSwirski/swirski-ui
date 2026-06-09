import { notFound } from "next/navigation";
import {
  CodePanel,
  DetailHeaderFrame,
  DetailHero,
  DetailLayout,
  DetailPagination,
  LivePreviewPanel,
  PropTable,
  ReturnTable,
} from "@/components/DocsDetail";
import NavBar from "@/components/NavBar";
import { hookDocs } from "@/content/hooks";
import { Container } from "@swirski/ui";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const breakdownItems = [
  { title: "Import" },
  { title: "Preview" },
  { title: "Usage" },
  { title: "Props" },
  { title: "Returns" },
];

function getHookIndex(slug: string) {
  return hookDocs.findIndex((item) => item.slug === slug);
}

export function generateStaticParams() {
  return hookDocs.map((hook) => ({
    slug: hook.slug,
  }));
}

export default async function HookPage({ params }: Props) {
  const { slug } = await params;
  const hookIndex = getHookIndex(slug);
  const hook = hookDocs[hookIndex];

  if (!hook) {
    return notFound();
  }

  const previousHook =
    hookDocs[(hookIndex - 1 + hookDocs.length) % hookDocs.length];
  const nextHook = hookDocs[(hookIndex + 1) % hookDocs.length];

  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <DetailHeaderFrame accentColor="#FF3131">
        <Container className="relative z-10">
          <NavBar />
          <DetailHero
            action={{
              href: "/hooks",
              label: "Back to hooks",
            }}
            description={hook.description}
            eyebrow="Hook"
            index={hookIndex}
            metaLabel="Hook"
            title={hook.title}
            toneClassName="bg-[#FF3131] text-white"
          />
        </Container>
      </DetailHeaderFrame>

      <Container className="py-16 md:py-20">
        <DetailLayout breakdownItems={breakdownItems}>
          <CodePanel title="Import" code={hook.importCode} />

          <LivePreviewPanel title={hook.title}>{hook.preview}</LivePreviewPanel>

          <CodePanel
            title="Usage"
            code={hook.usageCode}
            accent="bg-[#FF3131]"
          />

          <PropTable rows={hook.props} />

          <ReturnTable rows={hook.returns} />

          <DetailPagination
            previousHref={`/hooks/${previousHook.slug}`}
            previousTitle={previousHook.title}
            nextHref={`/hooks/${nextHook.slug}`}
            nextTitle={nextHook.title}
          />
        </DetailLayout>
      </Container>
    </main>
  );
}
