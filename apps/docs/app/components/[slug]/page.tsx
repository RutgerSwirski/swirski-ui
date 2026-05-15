import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import ComponentPlayground from "@/components/ComponentPlayground";
import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  SectionLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Title,
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
  Disclosure: "bg-[#FFD400] text-black",
  Feedback: "bg-[#0B0B0C] text-white",
  Forms: "bg-white text-black",
  Hooks: "bg-[#FF3131] text-white",
  Media: "bg-[#F5F5F3] text-black",
  Theming: "bg-[#0057FF] text-white",
  Interaction: "bg-[#FFD400] text-black",
  Backgrounds: "bg-[#0B0B0C] text-white",
};

const breakdownItems = [
  {
    title: "Preview",
  },
  {
    title: "Playground",
  },
  {
    title: "Usage",
  },
  {
    title: "Props",
  },
  {
    title: "Import",
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

function PropTable({ component }: { component: ComponentDoc }) {
  return (
    <section id="props" className="scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
          <Title order={2} size="h3">
            Props
          </Title>
        </div>

        <Badge tone="white">
          {component.props.length} documented
        </Badge>
      </div>

      <Table className="min-w-[48rem]">
        <TableHead>
          <TableRow>
            <TableHeader>Prop</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Default</TableHeader>
            <TableHeader>Notes</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {component.props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="align-top text-[#0B0B0C]">
                <code className="font-black">{prop.name}</code>
                {prop.required && (
                  <Badge className="ml-2" size="sm">
                    Required
                  </Badge>
                )}
              </TableCell>
              <TableCell className="align-top">
                <code>{prop.type}</code>
              </TableCell>
              <TableCell className="align-top">
                <code>{prop.defaultValue ?? "-"}</code>
              </TableCell>
              <TableCell className="max-w-md align-top">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
  const nextComponent =
    componentDocs[(componentIndex + 1) % componentDocs.length];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F5F5F3] text-[#0B0B0C]">
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
              <SectionLabel>{component.category}</SectionLabel>

              <Title className="mt-6" size="display">
                {component.title}
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                {component.description}
              </Text>
            </div>

            <div className="grid w-full min-w-0 max-w-sm gap-3 md:w-80">
              <div
                className={`border-4 border-black p-4 shadow-[6px_6px_0_#0B0B0C] ${categoryStyles[component.category]}`}
              >
                <Text
                  className="uppercase text-current opacity-70"
                  size="xs"
                  weight="black"
                >
                  Component
                </Text>
                <Title className="mt-1 text-current" order={2} size="h2">
                  {String(componentIndex + 1).padStart(2, "0")}
                </Title>
              </div>

              <CodeBlock code={component.importCode} />
            </div>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <Card
              interactive={false}
              className="bg-white shadow-[7px_7px_0_#0B0B0C]"
            >
              <CardContent>
                <Text
                  className="mb-4 uppercase"
                  size="xs"
                  tone="muted"
                  weight="black"
                >
                  Breakdown
                </Text>

                <div className="grid gap-3">
                  {breakdownItems.map((item) => (
                    <Button
                      key={item.title}
                      href={`#${item.title.toLowerCase()}`}
                      variant="white"
                      className="justify-start px-3 py-2 text-xs"
                    >
                      {item.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="grid min-w-0 gap-12">
            <CodePanel title="Import" code={component.importCode} />

            <section id="preview" className="scroll-mt-8">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 border-4 border-black bg-[#FFD400]" />
                  <Title order={2} size="h3">
                    Preview
                  </Title>
                </div>

                <Badge tone="white">Live render</Badge>
              </div>

              <div className="border-4 border-black bg-white shadow-[10px_10px_0_#0B0B0C]">
                <div className="flex items-center justify-between border-b-4 border-black bg-[#0B0B0C] px-4 py-3 text-white">
                  <Title order={3} size="h5" tone="inverted">
                    {component.title}
                  </Title>
                  <Badge size="sm">Preview</Badge>
                </div>

                <div className="min-h-72 overflow-hidden bg-[#F5F5F3] p-6 md:p-10">
                  {component.preview}
                </div>
              </div>
            </section>

            <ComponentPlayground
              slug={component.slug}
              fallbackUsageCode={component.usageCode}
            />

            <PropTable component={component} />

            <section className="grid gap-4 border-t-4 border-black pt-8 md:grid-cols-2">
              <Button
                href={`/components/${previousComponent.slug}`}
                variant="white"
                className="w-fit"
              >
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
