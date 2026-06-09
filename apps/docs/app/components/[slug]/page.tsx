import { notFound, redirect } from "next/navigation";
import ComponentPlayground from "@/components/ComponentPlayground";
import {
  CodePanel,
  DetailHeaderFrame,
  DetailHero,
  DetailLayout,
  DetailPagination,
  PropTable,
  ReturnTable,
} from "@/components/DocsDetail";
import NavBar from "@/components/NavBar";
import { getComponentPropRows } from "@/content/component-props";
import { componentDocs, type ComponentDoc } from "@/content/components";
import { hookDocs } from "@/content/hooks";
import { Container } from "@swirski/ui";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryStyles: Record<ComponentDoc["category"], string> = {
  Typography: "bg-[#FFD400] text-black",
  Layout: "bg-white text-black",
  Cards: "bg-[#0057FF] text-white",
  Buttons: "bg-[#FF3131] text-white",
  Disclosure: "bg-[#FFD400] text-black",
  Feedback: "bg-[#0B0B0C] text-white",
  Forms: "bg-white text-black",
  Hooks: "bg-[#FF3131] text-white",
  Media: "bg-[#F5F5F3] text-black",
  Theming: "bg-[#0057FF] text-white",
  Interaction: "bg-[#FFD400] text-black",
  Backgrounds: "bg-[#0B0B0C] text-white",
};

const baseBreakdownItems = [
  { title: "Import" },
  { title: "Composition", optional: "compositionCode" },
  { title: "Playground" },
  { title: "Usage" },
  { title: "Props" },
  { title: "Returns", optional: "returns" },
] as const;

function getComponentIndex(slug: string) {
  return componentDocs.findIndex((item) => item.slug === slug);
}

function getBreakdownItems(component: ComponentDoc) {
  return baseBreakdownItems.filter((item) => {
    if (!("optional" in item)) {
      return true;
    }

    if (item.optional === "compositionCode") {
      return Boolean(component.compositionCode);
    }

    return Boolean(component.returns?.length);
  });
}

export function generateStaticParams() {
  return componentDocs.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const componentIndex = getComponentIndex(slug);
  const component = componentDocs[componentIndex];

  if (!component) {
    const hook = hookDocs.find((item) => item.slug === slug);

    if (hook) {
      redirect(`/hooks/${hook.slug}`);
    }

    return notFound();
  }

  const githubHref = `https://github.com/rutgerswirski/swirski-ui/issues/new?assignees=&labels=triage&template=bug_report.md&title=%5B${component.title}%5D+Issue+Title`;

  const previousComponent =
    componentDocs[
      (componentIndex - 1 + componentDocs.length) % componentDocs.length
    ];
  const nextComponent =
    componentDocs[(componentIndex + 1) % componentDocs.length];
  const { generatedCount, rows } = getComponentPropRows(component);

  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <DetailHeaderFrame accentColor="#0057FF">
        <Container className="relative z-10">
          <NavBar />
          <DetailHero
            action={{
              label: "Request Changes",
              href: githubHref,
              external: true,
            }}
            description={component.description}
            eyebrow={component.category}
            index={componentIndex}
            metaLabel="Component"
            title={component.title}
            toneClassName={categoryStyles[component.category]}
          />
        </Container>
      </DetailHeaderFrame>

      <Container className="py-16 md:py-20">
        <DetailLayout breakdownItems={getBreakdownItems(component)}>
          <CodePanel title="Import" code={component.importCode} />

          {component.compositionCode && (
            <CodePanel
              title="Composition"
              code={component.compositionCode}
              accent="bg-[#FFD400]"
            />
          )}

          <ComponentPlayground
            slug={component.slug}
            fallbackUsageCode={component.usageCode}
          />

          <PropTable
            rows={rows}
            badgeLabel={
              generatedCount
                ? `${generatedCount} generated`
                : `${rows.length} documented`
            }
          />

          <ReturnTable rows={component.returns} />

          <DetailPagination
            previousHref={`/components/${previousComponent.slug}`}
            previousTitle={previousComponent.title}
            nextHref={`/components/${nextComponent.slug}`}
            nextTitle={nextComponent.title}
          />
        </DetailLayout>
      </Container>
    </main>
  );
}
