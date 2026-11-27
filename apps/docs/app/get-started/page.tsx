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
  Text,
  Title,
} from "@swirski/ui";

const workflowCards = [
  {
    label: "Most familiar",
    title: "Install as a component library",
    body: "Use this when you want the normal React package experience: install once, import components, and receive updates through npm.",
    href: "#package",
    cta: "Package workflow",
    tone: "yellow" as const,
  },
  {
    label: "Most editable",
    title: "Copy source with Swirski CLI",
    body: "Use this when you want Swirski components copied into your app so your team can change the source directly.",
    href: "#swirski-cli",
    cta: "CLI workflow",
    tone: "red" as const,
  },
  {
    label: "Most shadcn",
    title: "Install from the hosted registry",
    body: "Use this when your project already uses shadcn and you want Swirski items through the same registry workflow.",
    href: "#shadcn",
    cta: "Registry workflow",
    tone: "blue" as const,
  },
];

const platformCards = [
  {
    label: "Web",
    title: "React and Next.js apps",
    body: "Import CSS once, then use the full web component library from @swirski/ui.",
    code: `import "@swirski/ui/styles.css";
import { Button, Card, Title } from "@swirski/ui";`,
    tone: "yellow" as const,
  },
  {
    label: "Native",
    title: "React Native apps",
    body: "Use the native entrypoint and run the setup helper once so bundled fonts match the web package.",
    code: `pnpm exec swirski-native setup

import { Button, Card, Title } from "@swirski/ui/native";`,
    tone: "blue" as const,
  },
];

const packageSteps = [
  {
    title: "Install the package",
    body: "This gives you the complete component library from the @swirski/ui package.",
    code: "pnpm add @swirski/ui",
  },
  {
    title: "Import the styles once",
    body: "In Next.js App Router, add this import to app/layout.tsx. In other React apps, put it in your app entry.",
    code: 'import "@swirski/ui/styles.css";',
  },
  {
    title: "Use components",
    body: "Compose a hero with a heading, supporting copy, and an action. Button variant sets the treatment and tone sets the color.",
    code: `import { Button, HeroActions, HeroKicker, HeroLead, HeroTitle } from "@swirski/ui";

export default function Page() {
  return (
    <section>
      <HeroKicker>Swirski Studio</HeroKicker>
      <HeroTitle order={1}>Made to be worn</HeroTitle>
      <HeroLead>One-off pieces and custom remakes.</HeroLead>
      <HeroActions>
        <Button href="/pieces" variant="outline" tone="blue">
          Browse pieces
        </Button>
      </HeroActions>
    </section>
  );
}`,
  },
];

const cliSteps = [
  {
    title: "Install the Swirski CLI",
    body: "The CLI copies component source into your app instead of importing it from node_modules.",
    code: "pnpm add -D @swirski/cli",
  },
  {
    title: "Create a config",
    body: "The config tells the CLI where copied component folders should go.",
    code: "pnpm exec swirski init",
  },
  {
    title: "Copy one or many",
    body: "Add a single item, a small set, or the entire local registry.",
    code: `pnpm exec swirski add button
pnpm exec swirski add button card dialog
pnpm exec swirski add --all`,
  },
];

const shadcnSteps = [
  {
    title: "Preview a registry item",
    body: "Use view when you want to inspect what the shadcn CLI will install.",
    code: "pnpm dlx shadcn@latest view https://ui.swirski.dev/r/button.json",
  },
  {
    title: "Install one item",
    body: "Pass the hosted Swirski registry item URL to shadcn add.",
    code: "pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json",
  },
  {
    title: "Install several items",
    body: "shadcn can add multiple registry items in one command. For a full source copy, Swirski CLI also supports add --all.",
    code: `pnpm dlx shadcn@latest add \\
  https://ui.swirski.dev/r/button.json \\
  https://ui.swirski.dev/r/card.json \\
  https://ui.swirski.dev/r/dialog.json`,
  },
];

function StepList({
  steps,
  accent = "yellow",
}: {
  steps: typeof packageSteps;
  accent?: "yellow" | "red" | "blue";
}) {
  const accentClass =
    accent === "red"
      ? "text-[#FF3131]"
      : accent === "blue"
        ? "text-[#0057FF]"
        : "text-[#FFD400]";

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
            className={`font-anton ${accentClass}`}
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

            <Text className="text-docs-muted" size="sm" weight="bold">
              {body}
            </Text>

            <CodeBlock code={code} className="mt-1" />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

function WorkflowSection({
  id,
  label,
  title,
  body,
  steps,
  accent,
}: {
  id: string;
  label: string;
  title: string;
  body: string;
  steps: typeof packageSteps;
  accent: "yellow" | "red" | "blue";
}) {
  const badgeTone =
    accent === "red" ? "red" : accent === "blue" ? "blue" : "yellow";

  return (
    <section id={id} className="scroll-mt-8">
      <Card interactive={false} className="h-full bg-docs-surface">
        <CardContent className="p-6">
          <Badge tone={badgeTone}>{label}</Badge>

          <Title className="mt-5" order={2} size="h2">
            {title}
          </Title>

          <Text className="mt-4 max-w-2xl" tone="muted" weight="bold">
            {body}
          </Text>

          <div className="mt-8">
            <StepList steps={steps} accent={accent} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-docs-paper text-docs-ink">
      <div className="relative overflow-hidden border-b-4 border-docs-ink bg-docs-surface">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.16}
          spacing={13}
          dotSize={1.2}
        />

        <Container className="relative z-10">
          <NavBar />

          <section className="py-14 md:py-16">
            <Grid
              gap="xl"
              className="lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end"
            >
              <div>
                <SectionLabel>Get started</SectionLabel>

                <Title className="mt-6 max-w-4xl" order={1} size="display">
                  Pick the workflow that matches how you build.
                </Title>

                <Text
                  className="mt-6 max-w-2xl"
                  size="lg"
                  tone="muted"
                  weight="bold"
                >
                  Swirski UI can act like a regular component library, a
                  source-copy CLI, or a shadcn-compatible registry. The
                  components are the same design language; the install workflow
                  changes how much ownership you want.
                </Text>
              </div>

              <Card interactive={false} className="docs-accent-yellow">
                <CardContent className="p-6">
                  <Badge tone="black">Short version</Badge>
                  <Text className="mt-5" weight="black">
                    Package for speed. Swirski CLI for full source ownership.
                    shadcn registry when your app already uses shadcn.
                  </Text>
                </CardContent>
              </Card>
            </Grid>
          </section>
        </Container>
      </div>

      <Container className="py-14 md:py-18">
        {/* <Grid gap="lg" className="md:grid-cols-1">
          {workflowCards.map((item) => (
            <Card key={item.title} interactive={false} className="bg-docs-surface">
              <CardContent className="flex h-full flex-col p-6">
                <Badge tone={item.tone}>{item.label}</Badge>
                <Title className="mt-5" order={2} size="h3">
                  {item.title}
                </Title>
                <Text className="mt-3" tone="muted" weight="bold">
                  {item.body}
                </Text>
                <Button className="mt-6 w-fit" href={item.href} tone="white">
                  {item.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid> */}

        <Grid gap="xl">
          <section id="platforms" className="scroll-mt-8">
            <Grid gap="lg" className="lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <SectionLabel>Platforms</SectionLabel>
                <Title className="mt-6" order={2} size="h2">
                  Web and native live in the same package.
                </Title>
                <Text className="mt-5" tone="muted" weight="bold">
                  Most of the docs show the web components from @swirski/ui.
                  React Native apps use @swirski/ui/native and the native setup
                  helper for bundled fonts.
                </Text>
                <Button className="mt-6" href="/native" tone="yellow">
                  Native setup
                </Button>
              </div>

              <Grid gap="lg" className="md:grid-cols-2">
                {platformCards.map((platform) => (
                  <Card
                    key={platform.label}
                    interactive={false}
                    className="bg-docs-surface"
                  >
                    <CardContent className="flex h-full flex-col p-6">
                      <Badge tone={platform.tone}>{platform.label}</Badge>
                      <Title className="mt-5" order={3} size="h4">
                        {platform.title}
                      </Title>
                      <Text className="mt-3" tone="muted" weight="bold">
                        {platform.body}
                      </Text>
                      <CodeBlock className="mt-6" code={platform.code} />
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </section>

          <WorkflowSection
            id="package"
            label="Workflow 01"
            title="Install as a component library."
            body="This is the easiest path for most users. You get typed React components, package updates, and the least setup."
            steps={packageSteps}
            accent="yellow"
          />

          <WorkflowSection
            id="swirski-cli"
            label="Workflow 02"
            title="Copy source with the Swirski CLI."
            body="This is for teams that like the shadcn idea but want Swirski's own registry and simple copy command. The source lands in your project and becomes yours."
            steps={cliSteps}
            accent="red"
          />

          <WorkflowSection
            id="shadcn"
            label="Workflow 03"
            title="Install from the shadcn-compatible registry."
            body="This is for projects that already use shadcn. Swirski publishes registry item JSON at ui.swirski.dev so the shadcn CLI can view and add individual items."
            steps={shadcnSteps}
            accent="blue"
          />
        </Grid>

        <section className="pt-14 md:pt-20">
          <Card
            interactive={false}
            className="docs-inverse shadow-[8px_8px_0_#FFD400]"
          >
            <CardContent className="p-6 md:p-8">
              <Grid gap="lg" className="lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <Badge tone="yellow">Need a rule of thumb?</Badge>

                  <Title className="mt-5 text-current" order={2} size="h2">
                    Start with the package. Switch to copy workflows when you
                    need ownership.
                  </Title>

                  <Text className="mt-4 max-w-2xl text-docs-muted" weight="bold">
                    Less technical users can treat Swirski like a normal UI
                    package. More technical users can copy components through
                    Swirski CLI or shadcn and edit the source directly.
                  </Text>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href="/components" tone="yellow">
                    Browse components
                  </Button>
                  <Button href="/cli" tone="white">
                    CLI and registry
                  </Button>
                </div>
              </Grid>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
