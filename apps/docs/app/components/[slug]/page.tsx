import { notFound } from "next/navigation";
import ComponentPlayground from "@/components/ComponentPlayground";
import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
import {
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  SectionLabel,
} from "@swirski/ui";

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
  Media: "bg-[#F5F5F3] text-black",
  Interaction: "bg-[#FFD400] text-black",
  Backgrounds: "bg-[#0B0B0C] text-white",
};

const categoryNotes: Record<ComponentDoc["category"], string> = {
  Typography: "Text primitives for Swirski-scale hierarchy and editorial rhythm.",
  Layout: "Structural helpers for keeping page composition consistent.",
  Cards: "Framed content primitives for links, previews and compact stories.",
  Buttons: "Action primitives with strong borders, shadows and pressed states.",
  Media: "Image and visual wrappers for framed editorial surfaces.",
  Interaction: "Behavioral primitives that add playful system-level feedback.",
  Backgrounds: "Pattern primitives for texture, poster fields and graphic panels.",
};

const breakdownItems = [
  {
    title: "Preview",
    body: "Rendered with the same props shown in the usage block.",
  },
  {
    title: "Playground",
    body: "Editable controls for the props that shape the visible example.",
  },
  {
    title: "Props",
    body: "A compact reference for the component API and defaults.",
  },
  {
    title: "Import",
    body: "The smallest package import needed for this component.",
  },
  {
    title: "Usage",
    body: "A pasteable starting point for composing the primitive.",
  },
];

function getComponentIndex(slug: string) {
  return componentDocs.findIndex((item) => item.slug === slug);
}

function CodePanel({
  title,
  code,
  accent = "bg-[#0057FF]",
}: {
  title: string;
  code: string;
  accent?: string;
}) {
  return (
    <section id={title.toLowerCase()} className="scroll-mt-8">
      <div className="mb-4 flex items-center gap-3">
        <span className={`h-5 w-5 border-4 border-black ${accent}`} />
        <h2 className="font-anton text-4xl uppercase leading-none">{title}</h2>
      </div>

      <pre className="overflow-x-auto border-4 border-black bg-[#0B0B0C] p-5 text-sm font-bold leading-7 text-white shadow-[7px_7px_0_#0057FF]">
        <code>{code}</code>
      </pre>
    </section>
  );
}

function PropTable({ component }: { component: ComponentDoc }) {
  return (
    <section id="props" className="scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
          <h2 className="font-anton text-4xl uppercase leading-none">Props</h2>
        </div>

        <p className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C]">
          {component.props.length} documented
        </p>
      </div>

      <div className="overflow-x-auto border-4 border-black bg-white shadow-[10px_10px_0_#0B0B0C]">
        <table className="w-full min-w-[48rem] border-collapse text-left">
          <thead className="bg-[#0B0B0C] text-white">
            <tr>
              <th className="border-b-4 border-black px-4 py-3 text-xs font-black uppercase">
                Prop
              </th>
              <th className="border-b-4 border-black px-4 py-3 text-xs font-black uppercase">
                Type
              </th>
              <th className="border-b-4 border-black px-4 py-3 text-xs font-black uppercase">
                Default
              </th>
              <th className="border-b-4 border-black px-4 py-3 text-xs font-black uppercase">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {component.props.map((prop) => (
              <tr key={prop.name} className="border-b-4 border-black last:border-b-0">
                <td className="px-4 py-4 align-top">
                  <code className="font-black">{prop.name}</code>
                  {prop.required && (
                    <span className="ml-2 border-2 border-black bg-[#FFD400] px-2 py-1 text-[0.65rem] font-black uppercase">
                      Required
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 align-top">
                  <code className="text-sm font-bold">{prop.type}</code>
                </td>
                <td className="px-4 py-4 align-top">
                  <code className="text-sm font-bold">
                    {prop.defaultValue ?? "-"}
                  </code>
                </td>
                <td className="max-w-md px-4 py-4 text-sm font-bold leading-6 text-black/70">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
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
    return notFound();
  }

  const previousComponent =
    componentDocs[
      (componentIndex - 1 + componentDocs.length) % componentDocs.length
    ];
  const nextComponent = componentDocs[(componentIndex + 1) % componentDocs.length];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.12}
          spacing={14}
          dotSize={1}
        />

        <Container className="relative z-10">
          <NavBar />

          <section className="grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16">
            <div className="max-w-4xl">
              <a
                href="/components"
                className="mb-6 inline-block border-4 border-black bg-white px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Back to index
              </a>

              <SectionLabel>{component.category}</SectionLabel>

              <h1 className="mt-6 font-anton text-6xl uppercase leading-none md:text-8xl">
                {component.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-black/70">
                {component.description}
              </p>
            </div>

            <div className="grid w-full max-w-sm gap-3 md:w-80">
              <div
                className={`border-4 border-black p-4 shadow-[6px_6px_0_#0B0B0C] ${categoryStyles[component.category]}`}
              >
                <p className="text-xs font-black uppercase opacity-70">
                  Component
                </p>
                <p className="mt-1 font-anton text-5xl uppercase leading-none">
                  {String(componentIndex + 1).padStart(2, "0")}
                </p>
              </div>
              <code className="border-4 border-black bg-white px-4 py-3 text-sm font-black shadow-[6px_6px_0_#0B0B0C]">
                {component.importCode}
              </code>
            </div>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <Card interactive={false} className="bg-white shadow-[7px_7px_0_#0B0B0C]">
              <CardContent>
                <p className="mb-4 text-xs font-black uppercase text-black/55">
                  Breakdown
                </p>

                <div className="grid gap-3">
                  <a
                    href="#preview"
                    className="border-4 border-black bg-[#FFD400] px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    Preview
                  </a>
                  <a
                    href="#playground"
                    className="border-4 border-black bg-[#0057FF] px-3 py-2 text-xs font-black uppercase text-white shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    Playground
                  </a>
                  <a
                    href="#props"
                    className="border-4 border-black bg-[#FF3131] px-3 py-2 text-xs font-black uppercase text-white shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    Props
                  </a>
                  <a
                    href="#import"
                    className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    Import
                  </a>
                  <a
                    href="#usage"
                    className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    Usage
                  </a>
                </div>

                <div className="mt-6 border-t-4 border-black pt-5">
                  <p className="text-xs font-black uppercase text-black/55">
                    Note
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-black/70">
                    {categoryNotes[component.category]}
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="grid gap-12">
            <section id="preview" className="scroll-mt-8">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 border-4 border-black bg-[#FFD400]" />
                  <h2 className="font-anton text-4xl uppercase leading-none">
                    Preview
                  </h2>
                </div>

                <p className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#0B0B0C]">
                  Live render
                </p>
              </div>

              <div className="border-4 border-black bg-white shadow-[10px_10px_0_#0B0B0C]">
                <div className="flex items-center justify-between border-b-4 border-black bg-[#0B0B0C] px-4 py-3 text-white">
                  <p className="font-anton text-2xl uppercase leading-none">
                    {component.title}
                  </p>
                  <code className="border-2 border-black bg-[#FFD400] px-3 py-1 text-xs font-black uppercase text-black">
                    Preview
                  </code>
                </div>

                <div className="min-h-72 overflow-hidden bg-[#F5F5F3] p-6 md:p-10">
                  {component.preview}
                </div>
              </div>
            </section>

            <ComponentPlayground slug={component.slug} />

            <PropTable component={component} />

            <section className="grid gap-5 md:grid-cols-3">
              {breakdownItems.map((item, index) => (
                <Card
                  key={item.title}
                  interactive={false}
                  className="bg-white shadow-[6px_6px_0_#0B0B0C]"
                >
                  <CardContent>
                    <p className="w-fit border-4 border-black bg-[#FF3131] px-3 py-2 font-anton text-2xl uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-lg font-black uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-black/65">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <CodePanel title="Import" code={component.importCode} />
            <CodePanel
              title="Usage"
              code={component.usageCode}
              accent="bg-[#FF3131]"
            />

            <section className="grid gap-4 border-t-4 border-black pt-8 md:grid-cols-2">
              <Button href={`/components/${previousComponent.slug}`} variant="white">
                Previous: {previousComponent.title}
              </Button>
              <Button
                href={`/components/${nextComponent.slug}`}
                className="md:ml-auto"
              >
                Next: {nextComponent.title}
              </Button>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
