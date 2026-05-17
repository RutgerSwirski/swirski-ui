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

const workflow = [
  {
    label: "01",
    title: "Name the component",
    body: "Pick a lowercase registry slug, a PascalCase export, and the category where the component belongs.",
    detail: "`empty-state` becomes `EmptyState`, lives in `components/empty-state`, and appears at `/components/empty-state`.",
  },
  {
    label: "02",
    title: "Design the API",
    body: "Start with `variant`, `size`, `tone`, `className`, forwarded refs, and native element props. Add custom props only when the component truly needs them.",
    detail: "A Swirski component should feel familiar next to Button, Card, Badge, Select, and Dialog.",
  },
  {
    label: "03",
    title: "Build the source",
    body: "Use `forwardRef`, `cn`, `swirskiAttrs`, and `Slot` when polymorphic composition is useful.",
    detail: "Keep the component readable enough that CLI and shadcn users can own the copied source.",
  },
  {
    label: "04",
    title: "Document and register it",
    body: "Add the docs entry, playground entry, registry manifest entry, and package exports before calling the component done.",
    detail: "The package, Swirski CLI, shadcn registry, docs, and LLM context should all tell the same story.",
  },
];

const fileChecklist = [
  {
    file: "packages/ui/src/components/<slug>/<Name>.tsx",
    purpose: "Component source and exported prop types.",
  },
  {
    file: "packages/ui/src/components/<slug>/index.ts",
    purpose: "Local component exports.",
  },
  {
    file: "packages/ui/src/components/<slug>/<Name>.test.tsx",
    purpose: "Behavior, accessibility, and keyboard tests for interactive components.",
  },
  {
    file: "packages/ui/src/components/<slug>/<Name>.stories.tsx",
    purpose: "Storybook coverage when the component benefits from visual states.",
  },
  {
    file: "packages/ui/src/index.ts",
    purpose: "Package-level export.",
  },
  {
    file: "apps/docs/content/components.tsx",
    purpose: "Component docs entry: title, description, imports, usage, preview, props, category.",
  },
  {
    file: "apps/docs/content/playgrounds.tsx",
    purpose: "Live playground controls and generated usage snippet.",
  },
  {
    file: "registry/swirski.registry.json",
    purpose: "Swirski CLI and shadcn registry source manifest.",
  },
];

const qualityChecks = [
  "Use semantic HTML before custom roles.",
  "Forward refs to the interactive or root element users need.",
  "Expose `className` and preserve native props.",
  "Add `swirskiAttrs` with component, size, tone, and variant.",
  "Support `asChild` only when polymorphic rendering solves a real composition problem.",
  "Cover keyboard behavior for menus, overlays, custom inputs, tabs, and disclosure components.",
  "Avoid hidden package dependencies in registry items.",
  "Run metadata, tests, build, and registry generation before release.",
];

const componentScaffold = `import {
  HTMLAttributes,
  forwardRef,
} from "react";
import { cn, swirskiAttrs } from "../../system";

export type EmptyStateVariant = "default" | "compact";
export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateTone = "default" | "yellow" | "blue";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: EmptyStateVariant;
  size?: EmptyStateSize;
  tone?: EmptyStateTone;
} & HTMLAttributes<HTMLDivElement>;

const sizeStyles: Record<EmptyStateSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const toneStyles: Record<EmptyStateTone, string> = {
  default: "bg-white",
  yellow: "bg-[#FFD400]",
  blue: "bg-[#0057FF] text-white",
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState({
    action,
    className,
    description,
    title,
    variant = "default",
    size = "md",
    tone = "default",
    ...props
  }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "border-4 border-black shadow-[6px_6px_0_#0B0B0C]",
          sizeStyles[size],
          toneStyles[tone],
          variant === "compact" && "shadow-[3px_3px_0_#0B0B0C]",
          className,
        )}
        {...swirskiAttrs("empty-state", { size, tone, variant })}
        {...props}
      >
        <h2 className="font-anton text-4xl uppercase leading-none">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm font-bold opacity-75">
            {description}
          </p>
        )}
        {action && <div className="mt-5">{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";`;

const indexScaffold = `export { EmptyState } from "./EmptyState";
export type {
  EmptyStateProps,
  EmptyStateSize,
  EmptyStateTone,
  EmptyStateVariant,
} from "./EmptyState";`;

const docsScaffold = `{
  slug: "empty-state",
  title: "EmptyState",
  category: "Feedback",
  description: "A framed empty-state panel for zero-data screens.",
  importCode: 'import { EmptyState } from "@swirski/ui";',
  usageCode: \`<EmptyState
  title="No projects yet"
  description="Create your first project to start organizing work."
  action={<Button>New project</Button>}
/>\`,
  preview: (
    <EmptyState
      title="No projects yet"
      description="Create your first project to start organizing work."
      action={<Button>New project</Button>}
    />
  ),
  props: [
    {
      name: "title",
      type: "string",
      required: true,
      description: "Main empty-state heading.",
    },
  ],
}`;

const registryScaffold = `{ "name": "empty-state", "category": "feedback", "description": "Framed empty-state panel.", "source": "packages/ui/src/components/empty-state" }`;

const verificationCommands = `pnpm docs:metadata
pnpm test:ui
pnpm build:ui
pnpm registry:shadcn
pnpm build`;

function NumberedCard({
  label,
  title,
  body,
  detail,
}: {
  label: string;
  title: string;
  body: string;
  detail: string;
}) {
  return (
    <Card interactive={false} className="h-full bg-white">
      <CardContent className="flex h-full flex-col">
        <Badge tone={label === "03" ? "red" : label === "04" ? "blue" : "yellow"}>
          {label}
        </Badge>
        <Title className="mt-5" order={2} size="h4">
          {title}
        </Title>
        <Text className="mt-3" tone="muted" weight="bold">
          {body}
        </Text>
        <Text className="mt-5 border-t-4 border-black/15 pt-4" size="sm" weight="black">
          {detail}
        </Text>
      </CardContent>
    </Card>
  );
}

export default function BuildComponentPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative overflow-hidden border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.14}
          spacing={14}
          dotSize={1}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            gap="xl"
            className="py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:items-end"
          >
            <div className="max-w-4xl">
              <SectionLabel>Build</SectionLabel>

              <Title className="mt-6 max-w-4xl" order={1} size="display">
                Build a Swirski component.
              </Title>

              <Text className="mt-6 max-w-2xl" size="lg" tone="muted" weight="bold">
                A Swirski component is more than a React file. It needs a
                consistent API, source ownership, docs, playground metadata,
                registry metadata, and enough tests to make copied source safe.
              </Text>
            </div>

            <Card interactive={false} className="bg-[#FFD400]">
              <CardContent>
                <Badge tone="black">Rule of thumb</Badge>
                <Text className="mt-5" weight="black">
                  If a user installs it through the package, Swirski CLI, or
                  shadcn registry, the component should feel equally complete.
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <Grid gap="lg" className="md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item) => (
            <NumberedCard key={item.title} {...item} />
          ))}
        </Grid>
      </Container>

      <Grid as={Container} gap="xl" className="pb-14 md:pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>Shape</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Start with the component contract.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            Most Swirski components narrow the shared system ideas into local
            `Variant`, `Size`, and `Tone` unions. The source should stay plain
            enough to understand after it has been copied into an app.
          </Text>
        </div>

        <CodeBlock code={componentScaffold} />
      </Grid>

      <Container className="pb-14 md:pb-20">
        <Grid gap="xl" className="lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionLabel>Files</SectionLabel>
            <Title className="mt-6" order={2} size="h1">
              Add every surface the component touches.
            </Title>
            <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
              The package export, docs, playground, CLI registry, and hosted
              registry all depend on small metadata files. Missing one creates
              a component that exists in code but disappears somewhere else.
            </Text>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>File</TableHeader>
                <TableHeader>Purpose</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileChecklist.map((item) => (
                <TableRow key={item.file}>
                  <TableCell>
                    <code className="font-black text-[#0B0B0C]">{item.file}</code>
                  </TableCell>
                  <TableCell>{item.purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Container>

      <Container className="pb-14 md:pb-20">
        <Grid gap="lg" className="lg:grid-cols-3">
          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="yellow">Export</Badge>
              <Title className="mt-5" order={2} size="h3">
                Local index
              </Title>
              <Text className="mt-3" tone="muted" weight="bold">
                Keep component folders self-contained, then re-export them from
                the package root.
              </Text>
              <div className="mt-5">
                <CodeBlock code={indexScaffold} />
              </div>
            </CardContent>
          </Card>

          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="red">Docs</Badge>
              <Title className="mt-5" order={2} size="h3">
                Component entry
              </Title>
              <Text className="mt-3" tone="muted" weight="bold">
                Give the docs page enough data to render imports, usage,
                preview, props, generated metadata, and playground fallback.
              </Text>
              <div className="mt-5">
                <CodeBlock code={docsScaffold} />
              </div>
            </CardContent>
          </Card>

          <Card interactive={false} className="bg-white">
            <CardContent>
              <Badge tone="blue">Registry</Badge>
              <Title className="mt-5" order={2} size="h3">
                Manifest entry
              </Title>
              <Text className="mt-3" tone="muted" weight="bold">
                The registry manifest drives the Swirski CLI and generated
                shadcn-compatible JSON.
              </Text>
              <div className="mt-5">
                <CodeBlock code={registryScaffold} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Container>

      <Grid
        as={Container}
        gap="xl"
        className="border-y-4 border-black py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <SectionLabel>Quality</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Ship the behavior, not just the look.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            Components copied into apps need to be understandable and reliable.
            Interactive pieces should include role, focus, keyboard, disabled,
            controlled/uncontrolled, and close-state tests where relevant.
          </Text>
        </div>

        <Grid gap="sm" className="sm:grid-cols-2">
          {qualityChecks.map((check, index) => (
            <div
              key={check}
              className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#0B0B0C]"
            >
              <Badge tone={index % 3 === 0 ? "yellow" : index % 3 === 1 ? "red" : "blue"}>
                {String(index + 1).padStart(2, "0")}
              </Badge>
              <Text className="mt-4" weight="black">
                {check}
              </Text>
            </div>
          ))}
        </Grid>
      </Grid>

      <Grid as={Container} gap="xl" className="py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>Verify</SectionLabel>
          <Title className="mt-6" order={2} size="h1">
            Regenerate and test the whole path.
          </Title>
          <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
            The docs metadata and registry JSON are generated. Rebuild them
            before merging so docs, package exports, and registry installs do
            not drift apart.
          </Text>
          <Button className="mt-6" href="/system" tone="white">
            Review the system
          </Button>
        </div>

        <CodeBlock code={verificationCommands} />
      </Grid>
    </main>
  );
}
