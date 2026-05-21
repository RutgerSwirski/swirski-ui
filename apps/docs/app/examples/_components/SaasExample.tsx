import {
  Avatar,
  AvatarFallback,
  Badge,
  Grid,
  LineGrid,
  Progress,
  Select,
  Separator,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Title,
} from "@swirski/ui";

import { deals, metricTiles } from "../_data";
import ExampleIntro from "./ExampleIntro";
import MiniBar from "./MiniBar";

const navItems = ["Pipeline", "Accounts", "Forecast", "Health"] as const;
const forecastValues = [42, 58, 38, 76, 64, 92] as const;

function forecastBarColor(index: number) {
  if (index % 3 === 0) {
    return "bg-[#0057FF]";
  }

  if (index % 3 === 1) {
    return "bg-[#FFD400]";
  }

  return "bg-[#FF3131]";
}

export default function SaasExample() {
  return (
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

        <Grid gap="md" className="relative lg:grid-cols-[15rem_minmax(0,1fr)]">
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
              {navItems.map((item, index) => (
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
              ))}
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
                  <Text className="uppercase" size="xs" tone="muted" weight="black">
                    {metric.label}
                  </Text>
                  <Title className="mt-2" order={3} size="h3">
                    {metric.value}
                  </Title>
                  <Text className="mt-2" size="sm" tone="muted" weight="bold">
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
                  {forecastValues.map((value, index) => (
                    <MiniBar
                      key={value}
                      value={value}
                      color={forecastBarColor(index)}
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
  );
}
