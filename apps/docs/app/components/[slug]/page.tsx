import { notFound, redirect } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import ComponentPlayground from "@/components/ComponentPlayground";
import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
import generatedPropsMetadata from "@/content/generated-props.json";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  Grid,
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
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type GeneratedPropDoc = {
  name: string;
  prop: string;
  component: string;
  sourceType: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
};

type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
};

const generatedPropsByComponent = generatedPropsMetadata.components as Record<
  string,
  { props: GeneratedPropDoc[] }
>;

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
  {
    title: "Import",
  },
  {
    title: "Composition",
    optional: "compositionCode",
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
    title: "Returns",
    optional: "returns",
  },
] as const;

const componentOnlyDocs = componentDocs.filter(
  (component) => component.category !== "Hooks",
);

function getComponentIndex(slug: string) {
  return componentOnlyDocs.findIndex((item) => item.slug === slug);
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

function getHumanNote(
  prop: GeneratedPropDoc,
  manualProps: ComponentDoc["props"],
) {
  return manualProps.find(
    (manualProp) =>
      manualProp.name === prop.name ||
      manualProp.name === prop.prop ||
      manualProp.name === `${prop.component}.${prop.prop}`,
  );
}

function getPropRows(component: ComponentDoc) {
  const generatedProps =
    generatedPropsByComponent[component.slug]?.props.filter(
      (prop) => prop.type !== "never",
    ) ?? [];

  if (!generatedProps.length) {
    return {
      generatedCount: 0,
      rows: component.props,
    };
  }

  const generatedNames = new Set(
    generatedProps.flatMap((prop) => [
      prop.name,
      prop.prop,
      `${prop.component}.${prop.prop}`,
    ]),
  );
  const generatedRows = generatedProps.map<PropRow>((prop) => {
    const humanNote = getHumanNote(prop, component.props);

    return {
      name: prop.name,
      type: prop.type,
      required: prop.required,
      defaultValue: prop.defaultValue ?? humanNote?.defaultValue,
      description: humanNote?.description ?? prop.description,
    };
  });
  const manualRows = component.props.filter(
    (prop) => !generatedNames.has(prop.name),
  );

  return {
    generatedCount: generatedRows.length,
    rows: [...generatedRows, ...manualRows],
  };
}

function PropTable({ component }: { component: ComponentDoc }) {
  const { generatedCount, rows } = getPropRows(component);

  return (
    <section id="props" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
          <Title order={2} size="h3">
            Props
          </Title>
        </div>

        <Badge tone="white">
          {generatedCount
            ? `${generatedCount} generated`
            : `${rows.length} documented`}
        </Badge>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden pb-3 pr-3">
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
            {rows.map((prop) => (
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
      </div>
    </section>
  );
}

function ReturnTable({ component }: { component: ComponentDoc }) {
  if (!component.returns?.length) {
    return null;
  }

  return (
    <section id="returns" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#0057FF]" />
          <Title order={2} size="h3">
            Returns
          </Title>
        </div>

        <Badge tone="white">{component.returns.length} documented</Badge>
      </div>

      <div className="w-full min-w-0 max-w-full overflow-hidden pb-3 pr-3">
        <Table className="min-w-[42rem]">
          <TableHead>
            <TableRow>
              <TableHeader>Value</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Notes</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {component.returns.map((value) => (
              <TableRow key={value.name}>
                <TableCell className="align-top text-[#0B0B0C]">
                  <code className="font-black">{value.name}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code>{value.type}</code>
                </TableCell>
                <TableCell className="max-w-md align-top">
                  {value.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return componentOnlyDocs.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const componentIndex = getComponentIndex(slug);
  const component = componentOnlyDocs[componentIndex];

  if (!component) {
    const hook = componentDocs.find(
      (item) => item.category === "Hooks" && item.slug === slug,
    );

    if (hook) {
      redirect(`/hooks/${hook.slug}`);
    }

    return notFound();
  }

  const previousComponent =
    componentOnlyDocs[
      (componentIndex - 1 + componentOnlyDocs.length) % componentOnlyDocs.length
    ];
  const nextComponent =
    componentOnlyDocs[(componentIndex + 1) % componentOnlyDocs.length];
  const breakdownItems = baseBreakdownItems.filter((item) => {
    if (!("optional" in item)) {
      return true;
    }

    if (item.optional === "compositionCode") {
      return Boolean(component.compositionCode);
    }

    if (item.optional === "returns") {
      return Boolean(component.returns?.length);
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
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

          <Grid
            as="section"
            gap="xl"
            className="py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,20rem)] lg:items-end"
          >
            <div className="min-w-0 max-w-4xl">
              <SectionLabel>{component.category}</SectionLabel>

              <Title className="mt-6 break-words" size="display">
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

            <Grid
              gap="sm"
              className="w-full max-w-sm sm:max-w-sm lg:max-w-none"
            >
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

              <Button className="w-full">Request Changes</Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <Grid className="gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <Card
              interactive={false}
              className="min-w-0 bg-white shadow-[7px_7px_0_#0B0B0C]"
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

                <Grid gap="sm">
                  {breakdownItems.map((item) => (
                    <Button
                      key={item.title}
                      href={`#${item.title.toLowerCase()}`}
                      tone="white"
                      className="justify-start px-3 py-2 text-xs"
                    >
                      {item.title}
                    </Button>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </aside>

          <Grid className="gap-12">
            <CodePanel title="Import" code={component.importCode} />

            {component.compositionCode && (
              <CodePanel
                title="Composition"
                code={component.compositionCode}
                accent="bg-[#FFD400]"
              />
            )}

            {/* <section id="preview" className="min-w-0 scroll-mt-8">
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
                    {component.title}
                  </Title>
                  <Badge className="shrink-0" size="sm">
                    Preview
                  </Badge>
                </div>

                <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-visible bg-[#F5F5F3] p-4 sm:min-h-72 sm:p-6 md:p-10">
                  <div className="w-max min-w-full max-w-none">
                    {component.preview}
                  </div>
                </div>
              </div>
            </section> */}

            <ComponentPlayground
              slug={component.slug}
              fallbackUsageCode={component.usageCode}
            />

            <PropTable component={component} />

            <ReturnTable component={component} />

            <Grid
              as="section"
              columns={1}
              gap="md"
              className="border-t-4 border-black pt-8 sm:grid-cols-2 md:items-center"
            >
              <Button
                as={Link}
                href={`/components/${previousComponent.slug}`}
                tone="white"
                className="w-full text-xs sm:text-sm"
              >
                Previous: {previousComponent.title}
              </Button>
              <Button
                as={Link}
                href={`/components/${nextComponent.slug}`}
                className="w-full items-center gap-2 text-xs sm:text-sm"
              >
                Next: {nextComponent.title}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
