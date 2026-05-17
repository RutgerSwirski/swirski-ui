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

const systemItems = [
  {
    label: "01",
    title: "Shared design language",
    body: "Tone, size and variant create a common API across components, so Button, Badge, Card, Text and future components all speak the same language.",
    code: `type SwirskiTone = "default" | "muted" | "blue" | "yellow" | "red";

type SwirskiSize = "xs" | "sm" | "md" | "lg" | "xl" | "display";

type SwirskiVariant = "solid" | "outline" | "soft" | "ghost" | "plain";`,
  },
  {
    label: "02",
    title: "Reusable system props",
    body: "SwirskiSystemProps gives every component the same base contract: className, variant, size and tone. Components can narrow these values when they need their own specific options.",
    code: `type ButtonProps = SwirskiSystemProps<
  "solid" | "outline" | "ghost",
  "sm" | "md" | "lg",
  "default" | "yellow" | "blue" | "red"
>;`,
  },
  {
    label: "03",
    title: "Class merging",
    body: "The cn helper combines class names safely. It keeps component styles readable while still allowing users to override or extend styles with className.",
    code: `export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}`,
  },
  {
    label: "04",
    title: "Data attributes",
    body: "swirskiAttrs adds predictable data attributes to components. This makes styling, debugging and documentation easier because every component exposes its identity and state in the DOM.",
    code: `<button
  data-swirski-component="button"
  data-swirski-size="md"
  data-swirski-tone="yellow"
  data-swirski-variant="solid"
/>`,
  },
  {
    label: "05",
    title: "Composed refs",
    body: "composeRefs lets Swirski UI keep its own forwarded ref while also preserving the child component's ref. This is especially important for polymorphic components and Slot behaviour.",
    code: `ref: composeRefs(forwardedRef, childRef)`,
  },
  {
    label: "06",
    title: "Slot and asChild",
    body: "Slot allows a component to pass its styling and behaviour into a child element. This is what makes Button asChild work with links without rendering invalid nested markup.",
    code: `<Button asChild>
  <a href="/pieces">View pieces</a>
</Button>`,
  },
];

const principles = [
  "Small utilities before heavy abstractions.",
  "Consistent props across components.",
  "className escape hatches everywhere.",
  "Data attributes for styling and debugging.",
  "asChild support for flexible composition.",
  "Readable source that users can understand and adapt.",
];

const workflowItems = [
  {
    title: "Package workflow",
    body: "Install @swirski/ui when you want a normal component library. You import components from the package and receive updates through npm.",
    code: "pnpm add @swirski/ui",
  },
  {
    title: "Swirski CLI workflow",
    body: "Use @swirski/cli when you want components copied into your app. The copied files use the same system helpers, but the source is now yours.",
    code: "pnpm exec swirski add button",
  },
  {
    title: "shadcn registry workflow",
    body: "Use the hosted registry when your app already uses shadcn. shadcn installs Swirski registry items from ui.swirski.dev.",
    code: "pnpm dlx shadcn@latest add https://ui.swirski.dev/r/button.json",
  },
];

export default function SystemPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative overflow-hidden border-b-4 border-black bg-white">
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
            className="py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16"
          >
            <div className="max-w-4xl">
              <SectionLabel>System</SectionLabel>

              <Title className="mt-6" size="display">
                Swirski System
              </Title>

              <Text
                className="mt-6 max-w-2xl"
                size="lg"
                tone="muted"
                weight="bold"
              >
                The Swirski system is the small foundation layer behind the UI
                package. It defines the shared props, utilities, data
                attributes, ref handling and polymorphic Slot behaviour that
                make components consistent, reusable and easy to customize.
              </Text>
            </div>

            <Card
              interactive={false}
              className="w-full max-w-sm bg-[#FF3131]  shadow-[8px_8px_0_#0B0B0C] md:w-80"
            >
              <CardContent>
                <Badge tone="black">Core file</Badge>

                <Title className="mt-5" order={2} size="h2">
                  /ui/system
                </Title>

                <Text className="mt-3" size="sm" weight="medium">
                  The contract layer for every Swirski component.
                </Text>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <Grid gap="xl" className="lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>How it ships</SectionLabel>

            <Title className="mt-5" order={2} size="h1">
              One system, three install paths.
            </Title>

            <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
              The package, Swirski CLI and shadcn registry all expose the same
              visual language: bold defaults, shared props, CSS variables,
              className escape hatches and predictable data attributes.
            </Text>
          </div>

          <div className="grid gap-4">
            {workflowItems.map((item, index) => (
              <Card
                key={item.title}
                interactive={false}
                className="bg-white shadow-[5px_5px_0_#0B0B0C]"
              >
                <CardContent>
                  <Badge
                    tone={
                      index === 2 ? "blue" : index === 1 ? "red" : "yellow"
                    }
                  >
                    {item.title}
                  </Badge>
                  <Text className="mt-4" tone="muted" weight="bold">
                    {item.body}
                  </Text>
                  <pre className="mt-4 overflow-x-auto border-4 border-black bg-[#0B0B0C] p-4 text-sm font-bold text-[#F5F5F3]">
                    <code>{item.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Container>

      <Container className="py-12 md:py-16">
        <Grid gap="xl" className="lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Why it exists</SectionLabel>

            <Title className="mt-5" order={2} size="h1">
              One small system. Many reusable components.
            </Title>

            <Text className="mt-5 max-w-xl" tone="muted" weight="bold">
              Instead of every component inventing its own props and internal
              behaviour, the system file gives Swirski UI a shared base. That
              makes the library easier to maintain, easier to document and
              easier for developers to learn.
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <Card
                key={principle}
                interactive={false}
                className="bg-white shadow-[5px_5px_0_#0B0B0C]"
              >
                <CardContent>
                  <Text weight="black">{principle}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Container>

      <Container className="pb-16">
        <div className="mb-8">
          <SectionLabel>Inside the system</SectionLabel>

          <Title className="mt-5" order={2} size="h1">
            What the system file provides
          </Title>
        </div>

        <div className="grid gap-6">
          {systemItems.map((item) => (
            <Card
              key={item.title}
              interactive={false}
              className="overflow-hidden bg-white shadow-[6px_6px_0_#0B0B0C]"
            >
              <CardContent>
                <Grid gap="lg" className="lg:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <Badge tone="yellow">{item.label}</Badge>

                    <Title className="mt-5" order={3} size="h2">
                      {item.title}
                    </Title>

                    <Text className="mt-3" tone="muted" weight="bold">
                      {item.body}
                    </Text>
                  </div>

                  <pre className="overflow-x-auto border-4 border-black bg-[#0B0B0C] p-5 text-sm font-bold leading-relaxed text-[#F5F5F3] shadow-[4px_4px_0_#FF3131]">
                    <code>{item.code}</code>
                  </pre>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <Card
          interactive={false}
          className="bg-[#FFD600] shadow-[8px_8px_0_#0B0B0C]"
        >
          <CardContent>
            <Grid gap="xl" className="lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Badge tone="black">Example</Badge>

                <Title className="mt-5" order={2} size="h1">
                  How a component uses the system
                </Title>

                <Text className="mt-4 max-w-xl" weight="bold">
                  A Swirski component can use the same pattern every time:
                  choose the rendered element, merge styles, add data
                  attributes, forward refs and expose a className escape hatch.
                </Text>
              </div>

              <div>
                <pre className="overflow-x-auto border-4 border-black bg-white p-5 text-sm font-bold leading-relaxed shadow-[5px_5px_0_#0B0B0C]">
                  <code>{`const Comp = asChild ? Slot : "button";

return (
  <Comp
    ref={ref}
    className={cn(buttonStyles({ variant, size, tone }), className)}
    {...swirskiAttrs("button", { variant, size, tone })}
    {...props}
  />
);`}</code>
                </pre>

                <Button className="mt-6" href="/build-component" tone="white">
                  Build a component
                </Button>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
