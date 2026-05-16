import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  DiagonalLines,
  DotGrid,
  Grid,
  ImageFrame,
  Input,
  LineGrid,
  Progress,
  SectionLabel,
  Select,
  Separator,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Title,
} from "@swirski/ui";

export const metadata: Metadata = {
  title: "Examples | Swirski UI",
  description: "Full interface examples built with the Swirski UI package.",
};

const metricTiles = [
  { label: "Pipeline", value: "$4.2M", note: "+18% vs. last month" },
  { label: "NPS", value: "72", note: "Enterprise accounts" },
  { label: "Seats", value: "18.4K", note: "Active this week" },
];

const deals = [
  {
    account: "Northstar HR",
    owner: "Iris",
    stage: "Expansion",
    value: "$78K",
    progress: 82,
  },
  {
    account: "Forge Labs",
    owner: "Malik",
    stage: "Procurement",
    value: "$124K",
    progress: 64,
  },
  {
    account: "Atlas Freight",
    owner: "Noa",
    stage: "Security",
    value: "$51K",
    progress: 48,
  },
];

const portfolioProjects = [
  {
    title: "Mercury Commerce",
    type: "Identity",
    color: "bg-[#FF3131]",
  },
  {
    title: "North Pier",
    type: "Web",
    color: "bg-[#0057FF]",
  },
  {
    title: "Signal House",
    type: "Product",
    color: "bg-[#FFD400]",
  },
];

const commerceProducts = [
  {
    name: "Grid Tote",
    price: "$74",
    tag: "Best seller",
    color: "bg-[#FFD400]",
    accent: "bg-[#0057FF]",
    kind: "bag",
  },
  {
    name: "Loop Lamp",
    price: "$128",
    tag: "New",
    color: "bg-[#0057FF]",
    accent: "bg-[#FFD400]",
    kind: "lamp",
  },
  {
    name: "Modular Pack",
    price: "$96",
    tag: "Low stock",
    color: "bg-[#FF3131]",
    accent: "bg-[#F5F5F3]",
    kind: "pack",
  },
];

function ExampleIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <SectionLabel>{eyebrow}</SectionLabel>
        <Title className="mt-6 max-w-4xl" order={2} size="h2">
          {title}
        </Title>
      </div>
      <Text className="max-w-md" tone="muted" weight="bold">
        {body}
      </Text>
    </div>
  );
}

function WindowChrome({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border-4 border-black bg-white shadow-[9px_9px_0_#0B0B0C] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b-4 border-black bg-[#0B0B0C] px-4 py-3 text-white">
        <Text
          className="uppercase text-current"
          component="span"
          size="xs"
          weight="black"
        >
          {title}
        </Text>
        <div aria-hidden="true" className="flex gap-2">
          <span className="size-3 border-2 border-white bg-[#FF3131]" />
          <span className="size-3 border-2 border-white bg-[#FFD400]" />
          <span className="size-3 border-2 border-white bg-[#0057FF]" />
        </div>
      </div>
      {children}
    </div>
  );
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex h-24 items-end border-2 border-black bg-white">
      <div
        className={`${color} h-full w-full border-t-2 border-black`}
        style={{
          transform: `scaleY(${value / 100})`,
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}

function ProductArt({
  product,
  className = "",
}: {
  product: (typeof commerceProducts)[number];
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-56 overflow-hidden border-4 border-black ${product.color} ${className}`}
    >
      <DiagonalLines
        className="inset-0"
        color="#FFFFFF"
        opacity={0.23}
        spacing={14}
        accentEvery={5}
      />

      {product.kind === "bag" && (
        <>
          <div className="absolute left-1/2 top-10 h-16 w-24 -translate-x-1/2 border-4 border-b-0 border-black bg-white" />
          <div className="absolute bottom-8 left-1/2 h-28 w-36 -translate-x-1/2 border-4 border-black bg-white shadow-[7px_7px_0_#0B0B0C]" />
          <div
            className={`absolute bottom-16 left-1/2 h-10 w-16 -translate-x-1/2 border-4 border-black ${product.accent}`}
          />
        </>
      )}

      {product.kind === "lamp" && (
        <>
          <div className="absolute left-1/2 top-10 h-20 w-36 -translate-x-1/2 border-4 border-black bg-white shadow-[7px_7px_0_#0B0B0C]" />
          <div
            className={`absolute left-1/2 top-[7.25rem] h-24 w-5 -translate-x-1/2 border-x-4 border-black ${product.accent}`}
          />
          <div className="absolute bottom-9 left-1/2 h-8 w-32 -translate-x-1/2 border-4 border-black bg-white" />
        </>
      )}

      {product.kind === "pack" && (
        <>
          <div className="absolute bottom-8 left-1/2 h-36 w-32 -translate-x-1/2 border-4 border-black bg-white shadow-[7px_7px_0_#0B0B0C]" />
          <div
            className={`absolute bottom-20 left-1/2 h-14 w-20 -translate-x-1/2 border-4 border-black ${product.accent}`}
          />
          <div className="absolute bottom-28 left-[calc(50%-5.5rem)] h-16 w-8 border-4 border-black bg-white" />
          <div className="absolute bottom-28 right-[calc(50%-5.5rem)] h-16 w-8 border-4 border-black bg-white" />
        </>
      )}

      <Badge className="absolute left-3 top-3" tone="black" withShadow={false}>
        {product.tag}
      </Badge>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F3] text-[#0B0B0C]">
      <div className="relative overflow-hidden border-b-4 border-black bg-white">
        <DotGrid
          className="inset-0"
          color="#0057FF"
          opacity={0.13}
          spacing={14}
          dotSize={1.2}
          accentEvery={6}
          accentDotSize={2.6}
        />

        <Container className="relative z-10">
          <NavBar />

          <Grid
            as="section"
            gap="2xl"
            className="min-h-[calc(100vh-5rem)] py-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,31rem)] lg:items-center lg:py-20"
          >
            <div className="min-w-0">
              <SectionLabel>Examples</SectionLabel>
              <Title className="mt-6 max-w-4xl" order={1} size="display">
                Whole UI moods, same kit.
              </Title>
              <Text
                className="mt-7 max-w-2xl"
                size="xl"
                tone="muted"
                weight="bold"
              >
                A little gallery of production-shaped screens made from the
                package primitives: dashboards, portfolios, mobile tools and
                storefronts that keep the Swirski snap.
              </Text>

              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="#saas" icon="arrow-up-right" iconSide="right">
                  SaaS dashboard
                </Button>
                <Button href="#portfolio" variant="white">
                  Portfolio
                </Button>
                <Button href="#commerce" variant="yellow">
                  E-commerce
                </Button>
              </div>
            </div>

            <WindowChrome title="style mixer" className="bg-[#FFD400]">
              <Grid gap="md" className="p-4">
                <Grid columns={2} gap="sm">
                  {["B2B SaaS", "Portfolio", "Creator", "Commerce"].map(
                    (item, index) => (
                      <Card
                        key={item}
                        interactive={false}
                        withShadow={false}
                        className={
                          index === 0
                            ? "bg-[#0057FF] text-white"
                            : index === 1
                              ? "bg-white"
                              : index === 2
                                ? "bg-[#FF3131] text-white"
                                : "bg-[#F5F5F3]"
                        }
                      >
                        <CardContent className="min-h-28">
                          <Text
                            className="uppercase"
                            size="xs"
                            weight="black"
                          >
                            0{index + 1}
                          </Text>
                          <Title
                            className="mt-3"
                            order={3}
                            size="h5"
                          >
                            {item}
                          </Title>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </Grid>
                <div className="border-4 border-black bg-white p-4">
                  <Text
                    className="uppercase"
                    size="xs"
                    tone="muted"
                    weight="black"
                  >
                    System pieces
                  </Text>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Card",
                      "Button",
                      "Table",
                      "Tabs",
                      "Select",
                      "Progress",
                      "Badge",
                    ].map((item) => (
                      <Badge key={item} tone="white" withShadow={false}>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Grid>
            </WindowChrome>
          </Grid>
        </Container>
      </div>

      <Grid
        as={Container}
        className="gap-20 py-16 md:gap-24 md:py-20"
      >
        <section id="saas" className="scroll-mt-8">
          <ExampleIntro
            eyebrow="B2B SaaS"
            title="A dense account dashboard with hard edges and useful hierarchy."
            body="Tables, controls and summaries stay compact enough for repeated work while still carrying a memorable visual voice."
          />

          <div className="relative mt-8 overflow-hidden border-4 border-black bg-[#EAF1F8] p-4 shadow-[12px_12px_0_#0057FF]">
            <LineGrid
              className="inset-0"
              color="#0B0B0C"
              opacity={0.08}
              spacing={22}
              accentEvery={4}
              accentColor="#0057FF"
            />

            <Grid
              gap="md"
              className="relative lg:grid-cols-[15rem_minmax(0,1fr)]"
            >
              <aside className="border-4 border-black bg-[#0B0B0C] p-4 text-white">
                <div className="flex items-center gap-3">
                  <Avatar className="bg-[#FFD400] text-black">
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <Text
                      className="text-current"
                      component="span"
                      size="xs"
                      weight="black"
                    >
                      Swirski Accounts
                    </Text>
                    <Text className="text-white/65" size="xs" weight="bold">
                      Enterprise
                    </Text>
                  </div>
                </div>

                <Grid gap="xs" className="mt-8">
                  {["Pipeline", "Accounts", "Forecast", "Health"].map(
                    (item, index) => (
                      <button
                        className={`border-2 border-white px-3 py-2 text-left text-xs font-black uppercase ${
                          index === 0
                            ? "bg-[#FFD400] text-black"
                            : "bg-transparent text-white"
                        }`}
                        key={item}
                        type="button"
                      >
                        {item}
                      </button>
                    ),
                  )}
                </Grid>

                <Separator className="my-6 bg-white" />

                <Text className="text-white/70" size="sm" weight="bold">
                  Renewal target
                </Text>
                <Title className="mt-2 text-current" order={3} size="h3">
                  91%
                </Title>
              </aside>

              <Grid gap="md">
                <Grid gap="md" className="md:grid-cols-3">
                  {metricTiles.map((metric) => (
                    <div
                      className="border-4 border-black bg-white p-4 shadow-[5px_5px_0_#0B0B0C]"
                      key={metric.label}
                    >
                      <Text
                        className="uppercase"
                        size="xs"
                        tone="muted"
                        weight="black"
                      >
                        {metric.label}
                      </Text>
                      <Title className="mt-2" order={3} size="h3">
                        {metric.value}
                      </Title>
                      <Text
                        className="mt-2"
                        size="sm"
                        tone="muted"
                        weight="bold"
                      >
                        {metric.note}
                      </Text>
                    </div>
                  ))}
                </Grid>

                <Grid
                  gap="md"
                  className="xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]"
                >
                  <div className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <Title order={3} size="h4">
                          Expansion deals
                        </Title>
                        <Text tone="muted" weight="bold">
                          May close plan
                        </Text>
                      </div>
                      <Select
                        className="w-full sm:w-56"
                        defaultValue="enterprise"
                        options={[
                          { value: "enterprise", label: "Enterprise" },
                          { value: "midmarket", label: "Mid-market" },
                          { value: "startups", label: "Startups" },
                        ]}
                      />
                    </div>

                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeader>Account</TableHeader>
                          <TableHeader>Owner</TableHeader>
                          <TableHeader>Stage</TableHeader>
                          <TableHeader>Value</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {deals.map((deal) => (
                          <TableRow key={deal.account}>
                            <TableCell className="text-black">
                              {deal.account}
                            </TableCell>
                            <TableCell>{deal.owner}</TableCell>
                            <TableCell>
                              <Badge tone="white" size="sm" withShadow={false}>
                                {deal.stage}
                              </Badge>
                            </TableCell>
                            <TableCell>{deal.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#0B0B0C]">
                    <Title order={3} size="h5">
                      Forecast shape
                    </Title>
                    <Grid columns={6} gap="xs" align="end" className="mt-5">
                      {[42, 58, 38, 76, 64, 92].map((value, index) => (
                        <MiniBar
                          key={value}
                          value={value}
                          color={
                            index % 3 === 0
                              ? "bg-[#0057FF]"
                              : index % 3 === 1
                                ? "bg-[#FFD400]"
                                : "bg-[#FF3131]"
                          }
                        />
                      ))}
                    </Grid>
                    <Grid gap="md" className="mt-5">
                      {deals.map((deal) => (
                        <div key={deal.account}>
                          <div className="mb-2 flex justify-between gap-3">
                            <Text size="xs" weight="black">
                              {deal.account}
                            </Text>
                            <Text size="xs" tone="muted" weight="black">
                              {deal.progress}%
                            </Text>
                          </div>
                          <Progress value={deal.progress} />
                        </div>
                      ))}
                    </Grid>
                    <Switch
                      containerClassName="mt-5"
                      defaultChecked
                      label="Auto-risk alerts"
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-8">
          <ExampleIntro
            eyebrow="Portfolio"
            title="An editorial portfolio that feels loud without becoming loose."
            body="The same primitives can relax into a public-facing layout: big type, framed work, biography and crisp calls to action."
          />

          <div className="relative mt-8 overflow-hidden border-4 border-black bg-[#FCEFE8] p-4 shadow-[12px_12px_0_#FF3131]">
            <DiagonalLines
              className="inset-0"
              color="#FF3131"
              opacity={0.1}
              spacing={22}
              accentEvery={5}
              accentColor="#0B0B0C"
            />

            <Grid
              gap="md"
              className="relative lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex min-h-[32rem] flex-col justify-between border-4 border-black bg-[#0B0B0C] p-5 text-white md:p-7">
                <div>
                  <Badge tone="yellow">Independent designer</Badge>
                  <Title className="mt-6 text-current" order={3} size="h1">
                    Rhea Juno
                  </Title>
                  <Text
                    className="mt-5 max-w-md text-white/75"
                    size="lg"
                    weight="bold"
                  >
                    Product identities, art-directed web systems and launch
                    pages for teams with strong opinions.
                  </Text>
                </div>

                <Grid gap="md">
                  <Grid columns={3} gap="sm">
                    {[
                      ["42", "Projects"],
                      ["11", "Awards"],
                      ["06", "Years"],
                    ].map(([value, label]) => (
                      <div className="border-2 border-white p-3" key={label}>
                        <Text className="text-current" size="xs" weight="black">
                          {label}
                        </Text>
                        <Title
                          className="mt-1 text-current"
                          order={4}
                          size="h4"
                        >
                          {value}
                        </Title>
                      </div>
                    ))}
                  </Grid>
                  <div className="flex flex-wrap gap-3">
                    <Button href="#commerce" variant="yellow" withShadow={false}>
                      View work
                    </Button>
                    <Button
                      href="/components"
                      variant="white"
                      withShadow={false}
                    >
                      Components
                    </Button>
                  </div>
                </Grid>
              </div>

              <Grid gap="md">
                <ImageFrame className="min-h-64 border-4 bg-white p-4 shadow-[7px_7px_0_#0B0B0C]">
                  <Grid
                    gap="md"
                    className="h-full min-h-56 md:grid-cols-[1.25fr_0.75fr]"
                  >
                    <div className="relative overflow-hidden border-4 border-black bg-[#FFD400] p-4">
                      <DotGrid
                        className="inset-0"
                        color="#0B0B0C"
                        opacity={0.18}
                        spacing={15}
                      />
                      <div className="relative flex h-full flex-col justify-end">
                        <Badge tone="black">Featured</Badge>
                        <Title className="mt-4" order={3} size="h3">
                          Brand system for louder launches.
                        </Title>
                      </div>
                    </div>
                    <Grid gap="md">
                      <div className="border-4 border-black bg-[#0057FF] p-4 text-white">
                        <Text
                          className="uppercase text-current"
                          size="xs"
                          weight="black"
                        >
                          Sprint
                        </Text>
                        <Title
                          className="mt-3 text-current"
                          order={4}
                          size="h4"
                        >
                          8 weeks
                        </Title>
                      </div>
                      <div className="border-4 border-black bg-white p-4">
                        <Text size="sm" tone="muted" weight="bold">
                          Strategy, visual identity, product UI and a launch
                          site shipped as one connected surface.
                        </Text>
                      </div>
                    </Grid>
                  </Grid>
                </ImageFrame>

                <Grid gap="md" className="md:grid-cols-3">
                  {portfolioProjects.map((project) => (
                    <div
                      className="border-4 border-black bg-white p-3 shadow-[5px_5px_0_#0B0B0C]"
                      key={project.title}
                    >
                      <div
                        className={`h-28 border-4 border-black ${project.color}`}
                      />
                      <Text
                        className="mt-4 uppercase"
                        size="xs"
                        tone="muted"
                        weight="black"
                      >
                        {project.type}
                      </Text>
                      <Title className="mt-1" order={3} size="h5">
                        {project.title}
                      </Title>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </section>

        <section id="commerce" className="scroll-mt-8">
          <ExampleIntro
            eyebrow="E-commerce"
            title="A shoppable storefront with product theatre and practical buying controls."
            body="Product art, filtering, a cart summary and checkout actions show how the package can handle a consumer surface without losing its graphic bite."
          />

          <div className="relative mt-8 overflow-hidden border-4 border-black bg-[#FFF1BF] p-4 shadow-[12px_12px_0_#FFD400]">
            <LineGrid
              className="inset-0"
              color="#0B0B0C"
              opacity={0.08}
              spacing={24}
              accentEvery={4}
              accentColor="#FF3131"
            />

            <Grid gap="md" className="relative">
              <div className="border-4 border-black bg-white p-4 shadow-[7px_7px_0_#0B0B0C] md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4">
                  <div>
                    <Badge tone="red">Studio store</Badge>
                    <Title className="mt-3" order={3} size="h3">
                      Objects for loud desks.
                    </Title>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button href="/components/button" variant="white" withShadow={false}>
                      Components
                    </Button>
                    <Button variant="yellow" withShadow={false}>
                      Checkout $298
                    </Button>
                  </div>
                </div>

                <Grid
                  gap="lg"
                  className="mt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]"
                >
                  <ProductArt
                    className="min-h-[28rem]"
                    product={commerceProducts[0]}
                  />

                  <Grid gap="lg" content="between">
                    <div>
                      <Text
                        className="uppercase"
                        size="xs"
                        tone="muted"
                        weight="black"
                      >
                        Featured drop
                      </Text>
                      <Title className="mt-2" order={3} size="h2">
                        Grid Tote
                      </Title>
                      <Text className="mt-4 max-w-xl" tone="muted" weight="bold">
                        A structured daily carry with bright panels, chunky
                        hardware and enough contrast to make every product card
                        feel intentional.
                      </Text>
                    </div>

                    <Grid gap="sm" className="sm:grid-cols-2">
                      <Select
                        defaultValue="yellow"
                        options={[
                          { value: "yellow", label: "Yellow / Blue" },
                          { value: "red", label: "Red / White" },
                          { value: "black", label: "Black / Yellow" },
                        ]}
                      />
                      <Select
                        defaultValue="large"
                        options={[
                          { value: "small", label: "Small" },
                          { value: "large", label: "Large" },
                          { value: "xl", label: "XL" },
                        ]}
                      />
                    </Grid>

                    <Tabs defaultValue="details">
                      <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        <TabsTrigger value="returns">Returns</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details">
                        <Text tone="muted" weight="bold">
                          Recycled canvas, reinforced base, three internal
                          pockets and a high-contrast product label.
                        </Text>
                      </TabsContent>
                      <TabsContent value="shipping">
                        <Text tone="muted" weight="bold">
                          Free two-day shipping over $150 with simple delivery
                          windows at checkout.
                        </Text>
                      </TabsContent>
                      <TabsContent value="returns">
                        <Text tone="muted" weight="bold">
                          Thirty-day returns with prepaid labels and store
                          credit available instantly.
                        </Text>
                      </TabsContent>
                    </Tabs>

                    <Grid
                      gap="sm"
                      className="sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <Button>Add to cart</Button>
                      <Text className="font-anton text-4xl leading-none">
                        $74
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </div>

              <Grid
                gap="md"
                className="lg:grid-cols-[16rem_minmax(0,1fr)_18rem]"
              >
                <aside className="border-4 border-black bg-[#0B0B0C] p-4 text-white shadow-[6px_6px_0_#0B0B0C]">
                  <Text className="text-current uppercase" size="xs" weight="black">
                    Filters
                  </Text>
                  <Grid gap="md" className="mt-5">
                    <Checkbox
                      defaultChecked
                      label="In stock"
                      containerClassName="text-white"
                    />
                    <Checkbox
                      label="New arrivals"
                      containerClassName="text-white"
                    />
                    <Checkbox
                      defaultChecked
                      label="Ships this week"
                      containerClassName="text-white"
                    />
                    <Separator className="bg-white/40" />
                    <Switch
                      defaultChecked
                      label="Gift wrap"
                      containerClassName="text-white"
                    />
                  </Grid>
                </aside>

                <Grid gap="md" className="md:grid-cols-3">
                  {commerceProducts.map((product) => (
                    <div
                      className="border-4 border-black bg-white p-3 shadow-[5px_5px_0_#0B0B0C]"
                      key={product.name}
                    >
                      <ProductArt className="min-h-48" product={product} />
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <Title order={4} size="h5">
                            {product.name}
                          </Title>
                          <Text tone="muted" weight="bold">
                            {product.price}
                          </Text>
                        </div>
                        <Badge tone="white" withShadow={false}>
                          Add
                        </Badge>
                      </div>
                    </div>
                  ))}
                </Grid>

                <aside className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#0B0B0C]">
                  <Text className="uppercase" size="xs" tone="muted" weight="black">
                    Cart summary
                  </Text>
                  <Title className="mt-2" order={3} size="h4">
                    3 items
                  </Title>

                  <Grid gap="sm" className="mt-5">
                    {commerceProducts.map((product) => (
                      <div
                        className="flex items-center justify-between gap-3 border-b-2 border-black pb-3 last:border-b-0 last:pb-0"
                        key={product.name}
                      >
                        <Text size="sm" weight="black">
                          {product.name}
                        </Text>
                        <Text size="sm" tone="muted" weight="black">
                          {product.price}
                        </Text>
                      </div>
                    ))}
                  </Grid>

                  <div className="mt-5 border-4 border-black bg-[#FFD400] p-3">
                    <Text size="xs" weight="black">
                      Free shipping unlocked
                    </Text>
                    <Progress className="mt-2" value={100} />
                  </div>

                  <Button className="mt-5 w-full" variant="blue">
                    Pay now
                  </Button>
                </aside>
              </Grid>
            </Grid>
          </div>
        </section>
      </Grid>
    </main>
  );
}
