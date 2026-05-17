import CodeBlock from "@/components/CodeBlock";
import NavBar from "@/components/NavBar";
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

const installModes = [
  {
    title: "Component library",
    bestFor: "Apps that want the simplest setup and package updates.",
    command: "pnpm add @swirski/ui",
  },
  {
    title: "Swirski CLI",
    bestFor: "Apps that want copied source they can edit directly.",
    command: "pnpm add -D @swirski/cli",
  },
  {
    title: "shadcn registry",
    bestFor: "Apps that already use shadcn and want remote registry items.",
    command: "pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json",
  },
];

const swirskiCommands = [
  {
    command: "pnpm exec swirski init",
    description:
      "Creates swirski.config.json with the component output path.",
  },
  {
    command: "pnpm exec swirski list",
    description: "Prints every component and hook in the Swirski registry.",
  },
  {
    command: "pnpm exec swirski add button",
    description: "Copies one component folder into your configured app path.",
  },
  {
    command: "pnpm exec swirski add button card dialog",
    description: "Copies several registry entries in one command.",
  },
  {
    command: "pnpm exec swirski add --all",
    description: "Copies the full local Swirski registry into your app.",
  },
  {
    command: "pnpm exec swirski add select --dry-run",
    description: "Shows what would be copied without writing files.",
  },
];

export default function CliPage() {
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
            className="py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16"
          >
            <div className="max-w-4xl">
              <SectionLabel>CLI and registry</SectionLabel>

              <Title className="mt-6" size="display">
                Three ways to install Swirski UI.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                Swirski can be used as a normal package, copied with the
                Swirski CLI, or installed through the hosted shadcn-compatible
                registry. Pick the workflow based on how much source ownership
                you want.
              </Text>
            </div>

            <Card
              interactive={false}
              className="w-full max-w-sm bg-[#FFD400] shadow-[8px_8px_0_#0B0B0C] md:w-80"
            >
              <CardContent>
                <Badge tone="black">Registry URL</Badge>
                <Title className="mt-5 break-words" order={2} size="h4">
                  ui.swirski.dev
                </Title>
                <Text className="mt-3" size="sm" weight="bold">
                  Hosted JSON for shadcn plus a local manifest for the Swirski
                  CLI.
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Grid as={Container} className="gap-14 py-16 md:py-20">
        <Grid as="section" gap="lg" className="md:grid-cols-3">
          {installModes.map((mode, index) => (
            <Card
              key={mode.title}
              interactive={false}
              className="bg-white shadow-[7px_7px_0_#0B0B0C]"
            >
              <CardContent className="flex h-full flex-col">
                <Badge tone={index === 2 ? "blue" : index === 1 ? "red" : "yellow"}>
                  {String(index + 1).padStart(2, "0")}
                </Badge>
                <Title className="mt-5" order={2} size="h4">
                  {mode.title}
                </Title>
                <Text className="mt-3" tone="muted" weight="bold">
                  {mode.bestFor}
                </Text>
                <div className="mt-5">
                  <CodeBlock code={mode.command} />
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid
          as="section"
          gap="xl"
          className="border-y-4 border-black py-14 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <SectionLabel>Package</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Use Swirski as a regular component library.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              This is the fastest path for most apps. Install the package,
              import styles once, then import components from @swirski/ui.
            </Text>
            <Button className="mt-6" href="/get-started#package">
              Package setup
            </Button>
          </div>

          <Grid gap="md">
            <CodeBlock code="pnpm add @swirski/ui" />
            <CodeBlock code='import "@swirski/ui/styles.css";' />
            <CodeBlock
              code={`import { Button, Card, Title } from "@swirski/ui";`}
            />
          </Grid>
        </Grid>

        <Grid
          as="section"
          gap="xl"
          className="lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <SectionLabel>Swirski CLI</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Copy one component, several, or everything.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              The Swirski CLI reads registry/swirski.registry.json and copies
              source folders into your app. Copied components become local code
              that you can edit, rename, or reshape.
            </Text>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Command</TableHeader>
                <TableHeader>What it does</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {swirskiCommands.map((item) => (
                <TableRow key={item.command}>
                  <TableCell>
                    <code className="font-black text-[#0B0B0C]">
                      {item.command}
                    </code>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid
          as="section"
          gap="xl"
          className="border-y-4 border-black py-14 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <SectionLabel>shadcn registry</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Use Swirski through shadcn.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              The hosted registry lives at https://ui.swirski.dev/registry.json.
              Use direct item URLs for one-off installs, or add a namespace to
              components.json if you want shorter commands.
            </Text>
            <Text className="mt-4" tone="muted" weight="bold">
              shadcn is best for selected registry items. If you want the full
              Swirski source copied at once, use pnpm exec swirski add --all.
            </Text>
          </div>

          <Grid gap="md">
            <CodeBlock code="pnpm dlx shadcn@latest view https://ui.swirski.dev/r/button.json" />
            <CodeBlock code="pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json" />
            <CodeBlock
              code={`{
  "registries": {
    "@swirski": "https://ui.swirski.dev/r/{name}.json"
  }
}`}
            />
            <CodeBlock code="pnpm dlx shadcn@latest add @swirski/button @swirski/dialog" />
          </Grid>
        </Grid>

        <Grid
          as="section"
          gap="xl"
          className="lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <SectionLabel>Config</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Configure the Swirski copy target.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              pnpm exec swirski init creates this config in your app. Use
              --path on swirski add to override the component destination for
              one command.
            </Text>
          </div>

          <CodeBlock
            code={`{
  "componentsPath": "src/components/ui",
  "stylePath": "src/styles.css"
}`}
          />
        </Grid>

        <Card
          interactive={false}
          className="bg-[#0B0B0C] text-black shadow-[10px_10px_0_#FFD400]"
        >
          <CardContent className="p-6 md:p-8">
            <Grid gap="lg" className="lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Badge tone="yellow">Quick choice</Badge>
                <Title className="mt-5 text-current" order={2} size="h2">
                  Package for updates. CLI for ownership. shadcn for registry
                  access.
                </Title>
                <Text className="mt-4 max-w-2xl text-black/75" weight="bold">
                  These are three doors into the same Swirski design language.
                  The right one depends on whether you want imports, local
                  source, or shadcn-compatible registry installs.
                </Text>
              </div>

              <Button href="/components" tone="yellow">
                Browse components
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </main>
  );
}
