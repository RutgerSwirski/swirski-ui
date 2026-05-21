import {
  Badge,
  Button,
  Checkbox,
  Grid,
  LineGrid,
  Progress,
  Select,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Title,
} from "@swirski/ui";

import { commerceProducts } from "../_data";
import ExampleIntro from "./ExampleIntro";
import ProductArt from "./ProductArt";

export default function CommerceExample() {
  return (
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
                <Button
                  href="/components/button"
                  tone="white"
                  withShadow={false}
                >
                  Components
                </Button>
                <Button tone="yellow" withShadow={false}>
                  Checkout $298
                </Button>
              </div>
            </div>

            <Grid
              gap="lg"
              className="mt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]"
            >
              <ProductArt className="min-h-[28rem]" product={commerceProducts[0]} />

              <Grid gap="lg" content="between">
                <div>
                  <Text className="uppercase" size="xs" tone="muted" weight="black">
                    Featured drop
                  </Text>
                  <Title className="mt-2" order={3} size="h2">
                    Grid Tote
                  </Title>
                  <Text className="mt-4 max-w-xl" tone="muted" weight="bold">
                    A structured daily carry with bright panels, chunky hardware
                    and enough contrast to make every product card feel
                    intentional.
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
                      Recycled canvas, reinforced base, three internal pockets
                      and a high-contrast product label.
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
                      Thirty-day returns with prepaid labels and store credit
                      available instantly.
                    </Text>
                  </TabsContent>
                </Tabs>

                <Grid gap="sm" className="sm:grid-cols-[1fr_auto] sm:items-center">
                  <Button>Add to cart</Button>
                  <Text className="font-anton text-4xl leading-none">$74</Text>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <Grid gap="md" className="lg:grid-cols-[16rem_minmax(0,1fr)_18rem]">
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
                <Checkbox label="New arrivals" containerClassName="text-white" />
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

              <Button className="mt-5 w-full" tone="blue">
                Pay now
              </Button>
            </aside>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}
