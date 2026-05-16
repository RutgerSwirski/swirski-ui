import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import NavBar from "@/components/NavBar";
import { componentDocs, type ComponentDoc } from "@/content/components";
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

const hookDocs = componentDocs.filter(
  (component) => component.category === "Hooks",
);

const breakdownItems = [
  {
    title: "Import",
  },
  {
    title: "Preview",
  },
  {
    title: "Usage",
  },
  {
    title: "Props",
  },
  {
    title: "Returns",
  },
];

function getHookIndex(slug: string) {
  return hookDocs.findIndex((item) => item.slug === slug);
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

function PropTable({ hook }: { hook: ComponentDoc }) {
  return (
    <section id="props" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#FF3131]" />
          <Title order={2} size="h3">
            Props
          </Title>
        </div>

        <Badge tone="white">{hook.props.length} documented</Badge>
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
            {hook.props.map((prop) => (
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

function ReturnTable({ hook }: { hook: ComponentDoc }) {
  return (
    <section id="returns" className="min-w-0 scroll-mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 border-4 border-black bg-[#0057FF]" />
          <Title order={2} size="h3">
            Returns
          </Title>
        </div>

        <Badge tone="white">{hook.returns?.length ?? 0} documented</Badge>
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
            {hook.returns?.map((value) => (
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
      <div className="relative border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#FF3131"
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
              <SectionLabel>Hook</SectionLabel>

              <Title className="mt-6 break-words" size="display">
                {hook.title}
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                {hook.description}
              </Text>
            </div>

            <Grid gap="sm" className="w-full max-w-sm sm:max-w-sm lg:max-w-none">
              <div className="border-4 border-black bg-[#FF3131] p-4 text-white shadow-[6px_6px_0_#0B0B0C]">
                <Text
                  className="uppercase text-current opacity-80"
                  size="xs"
                  weight="black"
                >
                  Hook
                </Text>

                <Title className="mt-1 text-current" order={2} size="h2">
                  {String(hookIndex + 1).padStart(2, "0")}
                </Title>
              </div>

              <Button className="w-full" href="/hooks">
                Back to hooks
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <Grid
          className="gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
        >
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
            <CodePanel title="Import" code={hook.importCode} />

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
                  <Title
                    className="min-w-0 break-words"
                    order={3}
                    size="h5"
                  >
                    {hook.title}
                  </Title>
                  <Badge className="shrink-0" size="sm">
                    Preview
                  </Badge>
                </div>

                <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-visible bg-[#F5F5F3] p-4 sm:min-h-72 sm:p-6 md:p-10">
                  <div className="w-max min-w-full max-w-none">
                    {hook.preview}
                  </div>
                </div>
              </div>
            </section>

            <CodePanel title="Usage" code={hook.usageCode} accent="bg-[#FF3131]" />

            <PropTable hook={hook} />

            <ReturnTable hook={hook} />

            <Grid
              as="section"
              columns={1}
              gap="md"
              className="border-t-4 border-black pt-8 sm:grid-cols-2 md:items-center"
            >
              <Button
                as={Link}
                href={`/hooks/${previousHook.slug}`}
                tone="white"
                className="w-full text-xs sm:text-sm"
              >
                Previous: {previousHook.title}
              </Button>
              <Button
                as={Link}
                href={`/hooks/${nextHook.slug}`}
                className="w-full items-center gap-2 text-xs sm:text-sm"
              >
                Next: {nextHook.title}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
