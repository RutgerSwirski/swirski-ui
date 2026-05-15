import CodeBlock from "@/components/CodeBlock";
import NavBar from "@/components/NavBar";
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

const commands = [
  {
    command: "swirski init",
    description:
      "Creates a swirski.config.json file with component and style paths.",
  },
  {
    command: "swirski list",
    description: "Prints every component available in the registry manifest.",
  },
  {
    command: "swirski add button card dialog",
    description:
      "Copies one or more component source folders into your configured app path.",
  },
  {
    command: "swirski add use-disclosure use-clipboard",
    description:
      "Copies hooks from the registry the same way it copies components.",
  },
  {
    command: "swirski add --all",
    description: "Copies every registry entry into your app.",
  },
];

const workflow = [
  {
    title: "Package mode",
    body: "Install @swirski/ui and import components from the package. This is the fastest path for apps that want updates from the library.",
  },
  {
    title: "Registry mode",
    body: "Use the CLI to copy component source into your app. This is closer to shadcn: you own the code and can edit it locally.",
  },
  {
    title: "Shared tokens",
    body: "Both modes use the same Swirski CSS variables and SwirskiProvider theme contract.",
  },
];

export default function CliPage() {
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
              <SectionLabel>CLI</SectionLabel>

              <Title className="mt-6" size="display">
                Registry workflow.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                Swirski CLI gives the package a shadcn-style path: list the
              registry, initialize config and copy component or hook source into your
                own app when you want full ownership.
              </Text>
            </div>

            <Card
              interactive={false}
              className="w-full max-w-sm bg-[#FFD400] shadow-[8px_8px_0_#0B0B0C] md:w-80"
            >
              <CardContent>
                <Badge tone="black">Local registry</Badge>
                <p className="mt-5 font-anton text-5xl uppercase leading-none">
                  35+
                </p>
                <Text className="mt-2" size="sm" weight="bold">
                  installable entries in registry/swirski.registry.json
                </Text>
              </CardContent>
            </Card>
          </section>
        </Container>
      </div>

      <Container className="grid gap-14 py-16 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Install</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Two ways to use Swirski UI.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              Use package imports for speed, or use the CLI when you want copied
              source that your app can fully own.
            </Text>
          </div>

          <div className="grid gap-5">
            <CodeBlock code="pnpm add @swirski/ui" />
            <CodeBlock code="pnpm add -D @swirski/cli" />
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {workflow.map((item, index) => (
            <Card
              key={item.title}
              interactive={false}
              className="bg-white shadow-[7px_7px_0_#0B0B0C]"
            >
              <CardContent>
                <Badge tone={index === 1 ? "blue" : "yellow"}>
                  {String(index + 1).padStart(2, "0")}
                </Badge>
                <Title className="mt-5" order={3} size="h4">
                  {item.title}
                </Title>
                <Text className="mt-3" tone="muted" weight="bold">
                  {item.body}
                </Text>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Commands</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Small command surface.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              The CLI is intentionally simple right now. It reads the local
              registry manifest and copies component folders into your app,
              skipping Storybook files.
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
              {commands.map((item) => (
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
        </section>

        <section className="grid gap-8 border-y-4 border-black py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Config</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Configure the copy target.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              `swirski init` creates this config in your app. Use `--path` on
              `swirski add` to override the component destination for one run.
            </Text>
          </div>

          <CodeBlock
            code={`{
  "componentsPath": "src/components/ui",
  "stylePath": "src/styles.css"
}`}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card
            interactive={false}
            className="bg-[#0B0B0C] text-white shadow-[10px_10px_0_#FFD400]"
          >
            <CardContent className="p-6">
              <Badge tone="yellow">Workspace examples</Badge>
              <div className="mt-5 grid gap-4">
                <CodeBlock
                  className="shadow-none"
                  code={`pnpm registry:list
pnpm --filter @swirski/cli start add button card dialog
pnpm --filter @swirski/cli start add use-disclosure use-clipboard
node packages/cli/src/index.js add select --dry-run`}
                />
              </div>
            </CardContent>
          </Card>

          <div>
            <SectionLabel>Next</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Where this goes.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              The next registry step is remote, shadcn-compatible JSON output
              per component and hook, plus richer dependency metadata and
              automatic style/token setup.
            </Text>
            <Button className="mt-6" href="/components/swirski-provider">
              Theme docs
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
