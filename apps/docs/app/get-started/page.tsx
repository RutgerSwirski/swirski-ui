import {
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  DotGrid,
  Grid,
  SectionLabel,
  Text,
  Title,
} from "@swirski/ui";

import CodeBlock from "@/components/CodeBlock";
import NavBar from "@/components/NavBar";

const packageSteps = [
  {
    title: "Install the package",
    body: "Use Swirski UI like a normal React component library. This gives you access to the full component set through @swirski/ui imports.",
    code: "pnpm add @swirski/ui",
  },
  {
    title: "Import the styles",
    body: "Load the Swirski UI styles once in your app entry file or root layout.",
    code: 'import "@swirski/ui/styles.css";',
  },
  {
    title: "Use components",
    body: "Import the components you need and compose them inside your pages.",
    code: `import { Button, Card, Title } from "@swirski/ui";

export default function Page() {
  return (
    <Card>
      <Title size="h2">Build loud.</Title>
      <Button>Start</Button>
    </Card>
  );
}`,
  },
];

const cliSteps = [
  {
    title: "Run the CLI",
    body: "Use the CLI when you want source-owned components copied into your project instead of importing them from the package.",
    code: "npx @swirski/cli@latest init",
  },
  {
    title: "Add components",
    body: "Pull only the components you need. The files are copied into your app so you can edit them directly.",
    code: "npx @swirski/cli@latest add button card dialog",
  },
  {
    title: "Customize freely",
    body: "Change the markup, classes, tokens and behaviour. The component source is now part of your project.",
    code: `// components/ui/button.tsx
// Edit the copied source like any other local component.`,
  },
];

function StepList({
  steps,
  accent = "yellow",
}: {
  steps: typeof packageSteps;
  accent?: "yellow" | "red";
}) {
  return (
    <Grid as="ol" gap="md">
      {steps.map(({ title, body, code }, index) => (
        <Grid
          as="li"
          key={title}
          gap="md"
          className="grid-cols-[3rem_1fr] border-b-4 border-black/15 pb-5 last:border-b-0 last:pb-0"
        >
          <Text
            className={
              accent === "yellow"
                ? "font-anton text-[#FFD400]"
                : "font-anton text-[#FF3131]"
            }
            component="span"
            size="2xl"
            weight="black"
          >
            {String(index + 1).padStart(2, "0")}
          </Text>

          <Grid className="gap-3">
            <Text component="span" size="xl" weight="bold">
              {title}
            </Text>

            <Text className="text-black/70" size="sm" weight="bold">
              {body}
            </Text>

            <CodeBlock code={code} className="mt-1" />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative overflow-hidden border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.16}
          spacing={13}
          dotSize={1.2}
        />

        <Container className="relative z-10">
          <NavBar />

          <section className="py-16">
            <Grid gap="xl">
              <SectionLabel>Get started</SectionLabel>

              <Title className="mt-6 max-w-4xl" order={1} size="display">
                Choose how you want to use Swirski UI.
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                Install the full component package when you want speed, or use
                the CLI when you want to copy components into your own codebase
                and customize everything.
              </Text>
              <Card interactive={false} className="max-w-2xl">
                <CardContent className="p-6">
                  <Badge tone="yellow">Two workflows</Badge>

                  <Title className="mt-5 " order={2} size="h3">
                    Package or source-owned.
                  </Title>

                  <Text className="mt-3 text-black/75" size="sm" weight="bold">
                    Both workflows use the same Swirski visual language: strong
                    defaults, reusable props, theme tokens and className escape
                    hatches.
                  </Text>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="#package" tone="yellow">
                      Full package
                    </Button>
                    <Button href="#cli" tone="white">
                      CLI workflow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </section>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <Grid gap="xl" className="lg:grid-cols-1">
          <section id="package">
            <Card interactive={false} className="h-full ">
              <CardContent className="p-6">
                <Badge tone="yellow">Option 01</Badge>

                <Title className="mt-5" order={2} size="h2">
                  Use the full component package.
                </Title>

                <Text className="mt-4 max-w-xl" tone="muted" weight="bold">
                  Best when you want to move quickly and import Swirski
                  components directly from the package.
                </Text>

                <div className="mt-8">
                  <StepList steps={packageSteps} accent="yellow" />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/components">Browse components</Button>
                  <Button href="/system" tone="white">
                    System docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="cli">
            <Card interactive={false} className="h-full ">
              <CardContent className="p-6">
                <Badge tone="red">Option 02</Badge>

                <Title className="mt-5" order={2} size="h2">
                  Copy components with the CLI.
                </Title>

                <Text className="mt-4 max-w-xl" tone="muted" weight="bold">
                  Best when you want full ownership of the component source and
                  plan to customize the code inside your own project.
                </Text>

                <div className="mt-8">
                  <StepList steps={cliSteps} accent="red" />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/cli">CLI docs</Button>
                  <Button href="/components" tone="white">
                    View components
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </Grid>

        <section className="pt-16 md:pt-20">
          <Card
            interactive={false}
            className="bg-[#FFD400] shadow-[8px_8px_0_#0B0B0C]"
          >
            <CardContent className="p-6 md:p-8">
              <Grid gap="lg" className="md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <Badge tone="black">Which should I choose?</Badge>

                  <Title className="mt-5" order={2} size="h2">
                    Package for speed. CLI for ownership.
                  </Title>

                  <Text className="mt-4 max-w-2xl" weight="bold">
                    Use the package when you want reliable imports and fast
                    setup. Use the CLI when you want the Swirski starting point
                    but need complete control over the final component code.
                  </Text>
                </div>

                <Button href="/components" tone="white">
                  Start with components
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
