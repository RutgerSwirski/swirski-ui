import CodeBlock from "@/components/CodeBlock";
import NavBar from "@/components/NavBar";
import NativeComponentIndex from "./NativeComponentIndex";
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

const platformRows = [
  {
    platform: "Web",
    importPath: "@swirski/ui",
    styles: 'import "@swirski/ui/styles.css";',
    setup: "Install the package, import CSS once, then use components.",
  },
  {
    platform: "React Native",
    importPath: "@swirski/ui/native",
    styles: "No CSS import for iOS or Android.",
    setup: "Run the native setup helper once so bundled fonts are linked.",
  },
];

const nativeSteps = [
  {
    title: "Install",
    body: "Install the same package you use for web projects.",
    code: "pnpm add @swirski/ui",
  },
  {
    title: "Link bundled fonts",
    body: "Bare React Native apps can run the setup helper from the app root.",
    code: "pnpm exec swirski-native setup",
  },
  {
    title: "Import native components",
    body: "Use the native entrypoint for React Native screens.",
    code: `import {
  Button,
  Card,
  CardBadge,
  CardContent,
  CardMeta,
  CardTitle,
  Text,
  Title,
} from "@swirski/ui/native";`,
  },
  {
    title: "Rebuild the app",
    body: "Rebuild iOS or Android after linking font assets.",
    code: `pnpm ios
# or
pnpm android`,
  },
];

function NativeStepList() {
  return (
    <Grid as="ol" gap="md">
      {nativeSteps.map((step, index) => (
        <Grid
          as="li"
          key={step.title}
          gap="md"
          className="grid-cols-[3rem_1fr] border-b-4 border-black/15 pb-5 last:border-b-0 last:pb-0"
        >
          <Text
            className="font-anton text-[#0057FF]"
            component="span"
            size="2xl"
            weight="black"
          >
            {String(index + 1).padStart(2, "0")}
          </Text>

          <Grid className="gap-3">
            <Text component="span" size="xl" weight="bold">
              {step.title}
            </Text>
            <Text className="text-black/70" size="sm" weight="bold">
              {step.body}
            </Text>
            <CodeBlock code={step.code} className="mt-1" />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default function NativePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative overflow-hidden border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          dotSize={1.1}
          opacity={0.14}
          spacing={13}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            gap="xl"
            className="py-14 md:grid-cols-[minmax(0,1fr)_22rem] md:items-end md:py-16"
          >
            <div>
              <SectionLabel>Native</SectionLabel>

              <Title className="mt-6 max-w-4xl" order={1} size="display">
                Swirski UI works on web and React Native.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                The web package is imported from @swirski/ui. React Native apps
                use @swirski/ui/native so the components render with React
                Native primitives and the same Swirski fonts.
              </Text>
            </div>

            <Card
              interactive={false}
              className="bg-[#FFD400] shadow-[8px_8px_0_#0B0B0C]"
            >
              <CardContent className="p-6">
                <Badge tone="black">Short version</Badge>
                <Text className="mt-5" weight="black">
                  Web imports CSS. Native runs swirski-native setup once. Both
                  come from the same @swirski/ui package.
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Grid as={Container} className="gap-14 py-16 md:py-20">
        <Grid as="section" gap="lg" className="md:grid-cols-1">
          {/* <Card interactive={false} className="bg-white">
            <CardContent className="p-6">
              <Badge tone="yellow">Web</Badge>
              <Title className="mt-5" order={2} size="h3">
                Use the regular React entrypoint.
              </Title>
              <Text className="mt-4" tone="muted" weight="bold">
                Web apps import the stylesheet once for tokens and fonts, then
                import components directly from @swirski/ui.
              </Text>
              <CodeBlock
                className="mt-6"
                code={`pnpm add @swirski/ui

import "@swirski/ui/styles.css";
import { Button, Card, Title } from "@swirski/ui";`}
              />
            </CardContent>
          </Card> */}

          <Card interactive={false} className="bg-white">
            <CardContent className="p-6">
              <Badge tone="blue">React Native</Badge>
              <Title className="mt-5" order={2} size="h3">
                Use the native entrypoint.
              </Title>
              <Text className="mt-4" tone="muted" weight="bold">
                iOS and Android apps do not import CSS. The native helper links
                the bundled font files so native cards, badges and text match
                the web styling.
              </Text>
              <CodeBlock
                className="mt-6"
                code={`pnpm add @swirski/ui
pnpm exec swirski-native setup

import { Button, Card, Title } from "@swirski/ui/native";`}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid
          as="section"
          gap="xl"
          className="border-y-4 border-black py-14 lg:grid-cols-1"
        >
          <div>
            <SectionLabel>Setup</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              Bare React Native setup.
            </Title>
            <Text className="mt-5" tone="muted" weight="bold">
              Swirski UI ships native font files with the package. The setup
              helper updates react-native.config.* and runs react-native-asset
              when it finds an iOS or Android project.
            </Text>
          </div>

          <Card interactive={false} className="bg-white">
            <CardContent className="p-6">
              <NativeStepList />
            </CardContent>
          </Card>
        </Grid>

        <NativeComponentIndex />

        <Grid as="section" gap="lg" className="lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel>Platforms</SectionLabel>
            <Title className="mt-6" order={2} size="h2">
              One package, two entrypoints.
            </Title>
            <Text className="mt-5 max-w-2xl" tone="muted" weight="bold">
              The web docs still show the full web component library. The native
              entrypoint starts smaller and exposes the React Native components
              that have been ported so far.
            </Text>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Platform</TableHeader>
                <TableHeader>Import</TableHeader>
                <TableHeader>Setup</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {platformRows.map((row) => (
                <TableRow key={row.platform}>
                  <TableCell>{row.platform}</TableCell>
                  <TableCell>
                    <code className="font-black text-[#0B0B0C]">
                      {row.importPath}
                    </code>
                  </TableCell>
                  <TableCell>
                    {row.setup} {row.styles}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <section>
          <Card
            interactive={false}
            className="bg-[#0B0B0C]  shadow-[8px_8px_0_#FFD400]"
          >
            <CardContent className="p-6 md:p-8">
              <Grid gap="lg" className="lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <Badge tone="yellow">Growing native support</Badge>

                  <Title className="mt-5 text-current" order={2} size="h2">
                    Web has the full catalog. Native has the first essentials.
                  </Title>

                  <Text className="mt-4 max-w-2xl text-white/75" weight="bold">
                    The native entrypoint can grow component by component while
                    keeping the same visual language and font setup as the web
                    package.
                  </Text>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href="/components" tone="white">
                    Web components
                  </Button>
                  <Button href="#native-components" tone="yellow">
                    Native components
                  </Button>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </section>
      </Grid>
    </main>
  );
}
